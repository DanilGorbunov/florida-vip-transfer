import { useState, useCallback, useRef } from "react";
import Map, { Marker, Source, Layer, Popup, type MapRef } from "react-map-gl/mapbox";
import type { LineLayer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, MessageCircle, ChevronRight, Plus, Minus } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { useTheme } from "@/contexts/ThemeContext";

// ── config ────────────────────────────────────────────────────────────────────

const MAPBOX_TOKEN   = import.meta.env.VITE_MAPBOX_TOKEN as string;
const WHATSAPP_PHONE = "14153172089";

// ── data ──────────────────────────────────────────────────────────────────────

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

const connections = [
  { id: "c1",  a: "parrish", b: "tpa",     price: 120 },
  { id: "c2",  a: "parrish", b: "srq",     price: 60  },
  { id: "c3",  a: "srq",     b: "tpa",     price: 160 },
  { id: "c4",  a: "srq",     b: "orlando", price: 300 },
  { id: "c5",  a: "srq",     b: "miami",   price: 700 },
  { id: "c6",  a: "srq",     b: "naples",  price: 250 },
  { id: "c7",  a: "tpa",     b: "naples",  price: 450 },
  { id: "c8",  a: "orlando", b: "naples",  price: 600 },
  { id: "c9",  a: "srq",     b: "siesta",  price: 110 },
  { id: "c10", a: "srq",     b: "anna",    price: 110 },
];

const priceMap: Record<string, Record<string, number>> = {
  parrish: { srq: 60,  tpa: 120 },
  srq:     { siesta: 110, anna: 110, tpa: 160, naples: 250, orlando: 300, miami: 700 },
  tpa:     { srq: 250, parrish: 120, naples: 450 },
  orlando: { srq: 400, naples: 600 },
};

// ── helpers ───────────────────────────────────────────────────────────────────

const getPrice  = (a: string, b: string) => priceMap[a]?.[b] ?? priceMap[b]?.[a] ?? null;
const cityById  = (id: string) => cities.find(c => c.id === id);
const cityFull  = (id: string) => cityById(id)?.full ?? id;
const todayISO  = () => new Date().toISOString().split("T")[0];
const midpoint  = (a: typeof cities[0], b: typeof cities[0]) => ({
  lng: (a.lng + b.lng) / 2,
  lat: (a.lat + b.lat) / 2,
});
const cityRoutes = (id: string) =>
  connections
    .filter(c => c.a === id || c.b === id)
    .map(c => ({ dest: cityFull(c.a === id ? c.b : c.a), price: c.price }));

// ── map layers ────────────────────────────────────────────────────────────────

const glowLayer: LineLayer = {
  id: "route-glow",
  type: "line",
  paint: { "line-color": "hsl(210,85%,60%)", "line-width": 14, "line-opacity": 0.15, "line-blur": 8 },
  layout: { "line-cap": "round", "line-join": "round" },
};
const lineLayer: LineLayer = {
  id: "route-line",
  type: "line",
  paint: { "line-color": "hsl(210,85%,65%)", "line-width": 3, "line-opacity": 1 },
  layout: { "line-cap": "round", "line-join": "round" },
};

// ── component ─────────────────────────────────────────────────────────────────

const RouteMapCalculator = () => {
  const [from,        setFrom]        = useState<string | null>(null);
  const [to,          setTo]          = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const [date,  setDate]  = useState("");
  const [time,  setTime]  = useState("");
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");

  const mapRef = useRef<MapRef>(null);
  const { openBookingDialog } = useBooking();
  const { theme } = useTheme();
  const mapStyle = theme === "light"
    ? "mapbox://styles/mapbox/light-v11"
    : "mapbox://styles/mapbox/dark-v11";

  const price     = from && to ? getPrice(from, to) : null;
  const hasResult = !!from && !!to;

  const fitRoute = useCallback((a: string, b: string) => {
    const ca = cityById(a), cb = cityById(b);
    if (!ca || !cb || !mapRef.current) return;
    mapRef.current.fitBounds(
      [[Math.min(ca.lng, cb.lng) - 0.35, Math.min(ca.lat, cb.lat) - 0.25],
       [Math.max(ca.lng, cb.lng) + 0.35, Math.max(ca.lat, cb.lat) + 0.25]],
      { duration: 800, padding: 80 }
    );
  }, []);

  const onCityClick = useCallback((id: string) => {
    setHoveredCity(null);
    setFrom(prev => {
      if (!prev)       { return id; }
      if (id === prev) { setTo(null); return null; }
      setTo(id);
      fitRoute(prev, id);
      return prev;
    });
  }, [fitRoute]);

  const reset = () => { setFrom(null); setTo(null); };

  const routeGeoJSON: GeoJSON.FeatureCollection | null =
    from && to ? {
      type: "FeatureCollection",
      features: [{ type: "Feature", properties: {},
        geometry: { type: "LineString",
          coordinates: [[cityById(from)!.lng, cityById(from)!.lat],
                        [cityById(to)!.lng,   cityById(to)!.lat]] } }],
    } : null;

  const whatsappUrl = (() => {
    if (!from || !to) return "#";
    const lines = [
      "Hi! I'd like to book a transfer.",
      `From: ${cityFull(from)}`,
      `To:   ${cityFull(to)}`,
      price ? `Price: $${price} (fixed)` : "Route: custom quote needed",
      date  ? `Date:  ${date}`  : "",
      time  ? `Time:  ${time}`  : "",
      name  ? `Name:  ${name}`  : "",
      phone ? `Phone: ${phone}` : "",
    ].filter(Boolean).join("\n");
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines)}`;
  })();

  const hint = !from
    ? "Select your pickup city"
    : !to
    ? `From ${cityFull(from)} — now select destination`
    : `${cityFull(from)} → ${cityFull(to)}`;

  // Connected routes when FROM is selected
  const relatedConns = from && !to
    ? connections.filter(c => c.a === from || c.b === from)
    : [];

  const inputCls =
    "h-10 bg-secondary/60 border-border/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-primary/60";

  return (
    <section className="relative bg-background overflow-hidden" style={{ height: "88vh", minHeight: 520 }} id="coverage">

      {/* ── Top overlay ───────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-5 pb-6 bg-gradient-to-b from-background/95 via-background/60 to-transparent pointer-events-none">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          Our Coverage{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Area</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1 transition-all duration-200">{hint}</p>
      </div>

      {/* ── Custom zoom buttons — right-center, above bottom sheet ──── */}
      <div className="absolute right-3 z-10 flex flex-col gap-1.5"
        style={{ top: "50%", transform: "translateY(-50%)" }}>
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="w-9 h-9 bg-background/90 border border-border/60 rounded-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors backdrop-blur-sm shadow-md"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="w-9 h-9 bg-background/90 border border-border/60 rounded-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors backdrop-blur-sm shadow-md"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* ── Mapbox ────────────────────────────────────────────────────── */}
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: -82.0, latitude: 27.2, zoom: 7 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        attributionControl={false}
        scrollZoom={false}
      >
        {/* Active route line */}
        {routeGeoJSON && (
          <Source id="route" type="geojson" data={routeGeoJSON}>
            <Layer {...glowLayer} />
            <Layer {...lineLayer} />
          </Source>
        )}

        {/* Price badges on related routes */}
        {relatedConns.map(c => {
          const ca = cityById(c.a), cb = cityById(c.b);
          if (!ca || !cb) return null;
          const mid = midpoint(ca, cb);
          return (
            <Marker key={`price-${c.id}`} longitude={mid.lng} latitude={mid.lat} anchor="center">
              <div
                className="bg-background/90 border border-primary/50 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm pointer-events-none select-none shadow"
                style={{ whiteSpace: "nowrap" }}
              >
                ${c.price}
              </div>
            </Marker>
          );
        })}

        {/* Price badge on active route */}
        {from && to && (() => {
          const ca = cityById(from), cb = cityById(to);
          if (!ca || !cb) return null;
          const mid = midpoint(ca, cb);
          const conn = connections.find(c =>
            (c.a === from && c.b === to) || (c.a === to && c.b === from)
          );
          if (!conn) return null;
          return (
            <Marker longitude={mid.lng} latitude={mid.lat} anchor="center">
              <div className="bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg pointer-events-none select-none">
                ${conn.price}
              </div>
            </Marker>
          );
        })()}

        {/* Hover popup — desktop only, no selection active */}
        {hoveredCity && !from && (() => {
          const city = cityById(hoveredCity);
          const routes = cityRoutes(hoveredCity);
          if (!city || routes.length === 0) return null;
          return (
            <Popup
              longitude={city.lng}
              latitude={city.lat}
              anchor="bottom"
              offset={18}
              closeButton={false}
              closeOnClick={false}
              className="route-popup"
            >
              <div className="text-[11px] font-semibold text-foreground/70 uppercase tracking-wide mb-1.5">
                {city.full}
              </div>
              {routes.map((r, i) => (
                <div key={i} className="flex justify-between gap-4 text-[12px]">
                  <span className="text-muted-foreground">→ {r.dest}</span>
                  <span className="text-primary font-bold">${r.price}</span>
                </div>
              ))}
            </Popup>
          );
        })()}

        {/* City markers */}
        {cities.map((city) => {
          const isFrom     = city.id === from;
          const isTo       = city.id === to;
          const isSelected = isFrom || isTo;
          const isDim      = !!from && !isSelected && !to;
          return (
            <Marker key={city.id} longitude={city.lng} latitude={city.lat} anchor="center"
              onClick={() => onCityClick(city.id)}>
              <div
                className="flex flex-col items-center cursor-pointer select-none"
                style={{ opacity: isDim ? 0.25 : 1, transition: "opacity .25s" }}
                onMouseEnter={() => { if (!from) setHoveredCity(city.id); }}
                onMouseLeave={() => setHoveredCity(null)}
              >
                <div
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded mb-1"
                  style={{
                    color:          isSelected
                      ? (theme === "light" ? "#fff" : "hsl(210 85% 80%)")
                      : (theme === "light" ? "#fff" : "hsl(0 0% 82%)"),
                    background:     isSelected
                      ? (theme === "light" ? "hsl(0 0% 10% / 0.9)" : "hsl(210 85% 20% / 0.8)")
                      : (theme === "light" ? "hsl(0 0% 15% / 0.8)" : "hsl(0 0% 0% / 0.5)"),
                    backdropFilter: "blur(4px)",
                    boxShadow:      isSelected ? "0 2px 8px rgba(0,0,0,0.4)" : "none",
                    transition:     "all .25s",
                    fontFamily:     "sans-serif",
                  }}
                >
                  {city.label}
                </div>
                <div style={{
                  width:        isSelected ? 14 : 9,
                  height:       isSelected ? 14 : 9,
                  borderRadius: "50%",
                  background:   isSelected
                    ? (theme === "light" ? "hsl(0 0% 10%)" : "hsl(210 85% 65%)")
                    : (theme === "light" ? "hsl(0 0% 20%)" : "hsl(210 70% 55%)"),
                  boxShadow:    isSelected
                    ? "0 0 0 3px rgba(0,0,0,0.2), 0 0 12px rgba(0,0,0,0.4)"
                    : "0 0 0 2px rgba(0,0,0,0.15)",
                  transition: "all .25s",
                }} />
              </div>
            </Marker>
          );
        })}
      </Map>

      {/* ── Bottom sheet ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          transform:  hasResult ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.45s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        <div className="pointer-events-auto bg-background/96 backdrop-blur-2xl border-t border-border/50 rounded-t-3xl shadow-2xl">
          <div className="max-w-lg mx-auto px-5 pt-4 pb-6">
            <div className="w-10 h-1 rounded-full bg-border/60 mx-auto mb-4" />

            {/* Route + price */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">
                  {from && to ? `${cityFull(from)} → ${cityFull(to)}` : ""}
                </div>
                {price !== null ? (
                  <>
                    <span className="text-4xl font-bold text-primary">${price}</span>
                    <span className="text-xs text-muted-foreground ml-2">fixed · no surge</span>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-foreground">Custom quote</span>
                )}
              </div>
              <button onClick={reset}
                className="w-8 h-8 rounded-full bg-secondary/60 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Reset">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Quick form */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <Input type="date" value={date} min={todayISO()} onChange={e => setDate(e.target.value)} className={inputCls} />
              <Input type="time" value={time} onChange={e => setTime(e.target.value)} className={inputCls} />
              <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className={inputCls} />
              <Input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
            </div>

            {/* CTAs */}
            <div className="flex gap-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-11 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-colors text-sm">
                <MessageCircle className="w-4 h-4 fill-white" />
                Book via WhatsApp
              </a>
              <Button variant="outline" className="h-11 px-4 border-border text-sm shrink-0" onClick={() => openBookingDialog()}>
                Full form <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default RouteMapCalculator;
