import { useRef, useEffect, useCallback } from "react";
import Map, { Marker, Source, Layer, type MapRef } from "react-map-gl/mapbox";
import type { LineLayer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "@/contexts/ThemeContext";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const cities = [
  { id: "tpa",     label: "TPA",     full: "Tampa Airport",     lng: -82.533, lat: 27.976 },
  { id: "parrish", label: "Parrish", full: "Parrish",           lng: -82.436, lat: 27.584 },
  { id: "anna",    label: "AMI",     full: "Anna Maria Island", lng: -82.733, lat: 27.522 },
  { id: "srq",     label: "SRQ",     full: "Sarasota / SRQ",   lng: -82.554, lat: 27.395 },
  { id: "siesta",  label: "SK",      full: "Siesta Key",        lng: -82.548, lat: 27.267 },
  { id: "naples",  label: "Naples",  full: "Naples",            lng: -81.795, lat: 26.142 },
  { id: "orlando", label: "MCO",     full: "Orlando Airport",   lng: -81.308, lat: 28.431 },
  { id: "miami",   label: "Miami",   full: "Miami",             lng: -80.192, lat: 25.762 },
];

const priceMap: Record<string, Record<string, number>> = {
  parrish: { srq: 60,  tpa: 120 },
  srq:     { siesta: 110, anna: 110, tpa: 160, naples: 250, orlando: 300, miami: 700 },
  tpa:     { srq: 250, parrish: 120, naples: 450 },
  orlando: { srq: 400, naples: 600 },
};

const getPrice = (a: string, b: string) =>
  priceMap[a]?.[b] ?? priceMap[b]?.[a] ?? null;

const cityById = (id: string) => cities.find(c => c.id === id);

const midpoint = (a: typeof cities[0], b: typeof cities[0]) => ({
  lng: (a.lng + b.lng) / 2,
  lat: (a.lat + b.lat) / 2,
});

const glowLayer: LineLayer = {
  id: "hero-route-glow",
  type: "line",
  paint: { "line-color": "hsl(210,85%,60%)", "line-width": 18, "line-opacity": 0.12, "line-blur": 10 },
  layout: { "line-cap": "round", "line-join": "round" },
};

const lineLayer: LineLayer = {
  id: "hero-route-line",
  type: "line",
  paint: { "line-color": "hsl(210,85%,65%)", "line-width": 3, "line-opacity": 0.9 },
  layout: { "line-cap": "round", "line-join": "round" },
};

interface HeroMapProps {
  from: string;
  to: string;
}

const HeroMap = ({ from, to }: HeroMapProps) => {
  const mapRef  = useRef<MapRef>(null);
  const { theme } = useTheme();

  const mapStyle = theme === "light"
    ? "mapbox://styles/mapbox/light-v11"
    : "mapbox://styles/mapbox/dark-v11";

  const price = from && to ? getPrice(from, to) : null;

  const fitRoute = useCallback((a: string, b: string) => {
    const ca = cityById(a), cb = cityById(b);
    if (!ca || !cb || !mapRef.current) return;
    mapRef.current.fitBounds(
      [[Math.min(ca.lng, cb.lng) - 0.5, Math.min(ca.lat, cb.lat) - 0.4],
       [Math.max(ca.lng, cb.lng) + 0.5, Math.max(ca.lat, cb.lat) + 0.4]],
      { duration: 900, padding: 80 }
    );
  }, []);

  // Fit map when route changes
  useEffect(() => {
    if (from && to) {
      fitRoute(from, to);
    } else {
      // Reset to default Florida view
      mapRef.current?.flyTo({ center: [-82.0, 27.2], zoom: 7, duration: 800 });
    }
  }, [from, to, fitRoute]);

  const routeGeoJSON: GeoJSON.FeatureCollection | null =
    from && to ? {
      type: "FeatureCollection",
      features: [{ type: "Feature", properties: {},
        geometry: { type: "LineString",
          coordinates: [[cityById(from)!.lng, cityById(from)!.lat],
                        [cityById(to)!.lng,   cityById(to)!.lat]] } }],
    } : null;

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border/40 shadow-2xl">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: -82.0, latitude: 27.2, zoom: 7 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        attributionControl={false}
        scrollZoom={false}
        dragPan={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
      >
        {/* Route line */}
        {routeGeoJSON && (
          <Source id="hero-route" type="geojson" data={routeGeoJSON}>
            <Layer {...glowLayer} />
            <Layer {...lineLayer} />
          </Source>
        )}

        {/* Price badge on route midpoint */}
        {from && to && (() => {
          const ca = cityById(from), cb = cityById(to);
          if (!ca || !cb || price === null) return null;
          const mid = midpoint(ca, cb);
          return (
            <Marker longitude={mid.lng} latitude={mid.lat} anchor="center">
              <div className="bg-foreground text-background text-[12px] font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none select-none">
                ${price} fixed
              </div>
            </Marker>
          );
        })()}

        {/* City markers */}
        {cities.map((city) => {
          const isFrom     = city.id === from;
          const isTo       = city.id === to;
          const isSelected = isFrom || isTo;
          const isDim      = (!!from || !!to) && !isSelected;

          return (
            <Marker key={city.id} longitude={city.lng} latitude={city.lat} anchor="center">
              <div
                className="flex flex-col items-center select-none pointer-events-none"
                style={{ opacity: isDim ? 0.2 : 1, transition: "opacity .3s" }}
              >
                <div
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded mb-1"
                  style={{
                    color:          isSelected
                      ? (theme === "light" ? "#fff" : "hsl(210 85% 85%)")
                      : (theme === "light" ? "#fff" : "hsl(0 0% 80%)"),
                    background:     isSelected
                      ? (theme === "light" ? "hsl(0 0% 8% / 0.95)" : "hsl(210 85% 20% / 0.85)")
                      : (theme === "light" ? "hsl(0 0% 12% / 0.8)" : "hsl(0 0% 0% / 0.55)"),
                    backdropFilter: "blur(4px)",
                    boxShadow:      isSelected ? "0 2px 8px rgba(0,0,0,0.4)" : "none",
                    transition:     "all .3s",
                    fontFamily:     "sans-serif",
                  }}
                >
                  {city.label}
                </div>
                <div style={{
                  width:        isSelected ? 13 : 8,
                  height:       isSelected ? 13 : 8,
                  borderRadius: "50%",
                  background:   isSelected
                    ? (theme === "light" ? "hsl(0 0% 8%)" : "hsl(210 85% 65%)")
                    : (theme === "light" ? "hsl(0 0% 25%)" : "hsl(210 60% 55%)"),
                  boxShadow:    isSelected
                    ? "0 0 0 3px rgba(0,0,0,0.15), 0 0 14px rgba(0,0,0,0.35)"
                    : "0 0 0 2px rgba(0,0,0,0.12)",
                  transition:   "all .3s",
                }} />
              </div>
            </Marker>
          );
        })}
      </Map>

      {/* Overlay hint when nothing selected */}
      {!from && !to && (
        <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
          <div className="px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 text-xs text-muted-foreground">
            Select cities to see your route
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroMap;
