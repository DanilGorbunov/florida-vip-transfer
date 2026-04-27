const cities = [
  { id: "tpa", label: "TPA", full: "Tampa Airport", x: 112, y: 172, anchor: "start" },
  { id: "parrish", label: "Parrish", full: "Parrish", x: 114, y: 188, anchor: "start" },
  { id: "anna", label: "AMI", full: "Anna Maria Island", x: 100, y: 197, anchor: "end" },
  { id: "srq", label: "SRQ", full: "Sarasota Airport", x: 112, y: 210, anchor: "start" },
  { id: "siesta", label: "SK", full: "Siesta Key", x: 103, y: 220, anchor: "end" },
  { id: "naples", label: "Naples", full: "Naples", x: 128, y: 302, anchor: "start" },
  { id: "orlando", label: "MCO", full: "Orlando Airport", x: 200, y: 172, anchor: "end" },
  { id: "miami", label: "Miami", full: "Miami", x: 228, y: 340, anchor: "end" },
];

const routes = [
  { x1: 114, y1: 188, x2: 112, y2: 172, delay: 0 },     // Parrish → TPA
  { x1: 114, y1: 188, x2: 112, y2: 210, delay: 0.4 },   // Parrish → SRQ
  { x1: 112, y1: 210, x2: 200, y2: 172, delay: 0.8 },   // SRQ → Orlando
  { x1: 112, y1: 210, x2: 228, y2: 340, delay: 1.2 },   // SRQ → Miami
  { x1: 112, y1: 172, x2: 128, y2: 302, delay: 1.6 },   // TPA → Naples
  { x1: 200, y1: 172, x2: 128, y2: 302, delay: 2.0 },   // Orlando → Naples
];

const routeList = [
  { from: "Parrish", to: "Sarasota Airport (SRQ)", price: "$60" },
  { from: "Parrish", to: "Tampa Airport (TPA)", price: "$120" },
  { from: "SRQ", to: "Siesta Key / Anna Maria", price: "$110" },
  { from: "Sarasota", to: "Tampa Airport (TPA)", price: "$160" },
  { from: "Tampa Airport", to: "Sarasota", price: "$250" },
  { from: "Tampa Airport", to: "Naples", price: "$450" },
  { from: "Sarasota", to: "Naples", price: "$250" },
  { from: "Sarasota", to: "Orlando", price: "$300" },
  { from: "Orlando", to: "Sarasota", price: "$400" },
  { from: "Orlando", to: "Naples", price: "$600" },
  { from: "Sarasota", to: "Miami", price: "$700" },
  { from: "Hourly Rate", to: "Any destination", price: "$80/hr" },
];

const RouteMap = () => {
  return (
    <section className="py-20 bg-background">
      <style>{`
        @keyframes moveDash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.15; r: 7; }
          50% { opacity: 0.4; r: 10; }
        }
      `}</style>

      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Coverage{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Area
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Serving Southwest & Central Florida — 24/7
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center max-w-5xl mx-auto">
          {/* Florida SVG map */}
          <div className="w-full max-w-[280px] mx-auto lg:mx-0 flex-shrink-0">
            <svg viewBox="0 0 260 370" className="w-full drop-shadow-2xl">
              {/* Florida silhouette */}
              <path
                d="M 5,68 L 210,5 L 222,5 L 225,16 L 225,68
                   L 221,90 L 216,116 L 212,144 L 210,172 L 209,200
                   L 212,228 L 218,254 L 226,278 L 234,302 L 236,326
                   L 229,346 L 212,357 L 194,360 L 176,356 L 162,344
                   L 152,326 L 138,298 L 124,268 L 114,238 L 107,208
                   L 106,178 L 111,150 L 118,125 L 122,100 L 118,80
                   L 111,70 L 105,68 Z"
                fill="hsl(0 0% 13%)"
                stroke="hsl(0 0% 28%)"
                strokeWidth="1.2"
              />

              {/* Animated route lines */}
              {routes.map((r, i) => (
                <line
                  key={i}
                  x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                  stroke="hsl(210 85% 60%)"
                  strokeWidth="1.8"
                  strokeDasharray="5 4"
                  opacity="0.75"
                  style={{
                    animation: `moveDash 1.8s linear ${r.delay}s infinite`,
                  }}
                />
              ))}

              {/* City dots + pulse rings */}
              {cities.map((city) => (
                <g key={city.id}>
                  <circle
                    cx={city.x} cy={city.y} r="8"
                    fill="hsl(210 85% 60%)"
                    opacity="0.15"
                    style={{ animation: `pulseRing 2.5s ease-in-out ${Math.random() * 1}s infinite` }}
                  />
                  <circle
                    cx={city.x} cy={city.y} r="4"
                    fill="hsl(210 85% 60%)"
                  />
                  <text
                    x={city.anchor === "end" ? city.x - 10 : city.x + 10}
                    y={city.y + 4}
                    fontSize="8"
                    fontWeight="700"
                    fontFamily="sans-serif"
                    fill="hsl(0 0% 88%)"
                    textAnchor={city.anchor as "start" | "end"}
                  >
                    {city.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Route price list */}
          <div className="flex-1 w-full">
            <h3 className="text-xl font-bold text-foreground mb-5">All Routes & Prices</h3>
            <div className="space-y-0 divide-y divide-border">
              {routeList.map((route, i) => (
                <div key={i} className="flex items-center justify-between py-3 group">
                  <div className="text-sm">
                    <span className="text-muted-foreground">{route.from}</span>
                    <span className="mx-2 text-primary font-bold">→</span>
                    <span className="text-muted-foreground">{route.to}</span>
                  </div>
                  <span className="text-primary font-bold text-sm tabular-nums">
                    {route.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteMap;
