import { useState } from "react";
import { MapPin, Users, Clock } from "lucide-react";

const airports = [
  {
    code: "SRQ",
    name: "Sarasota-Bradenton",
    full: "Sarasota-Bradenton International Airport",
    meeting: "Exit baggage claim — we'll be right outside the main exit doors with your name sign. SRQ is a small, easy airport. Total walk from plane to our car: ~5 minutes.",
    terminal: "Single terminal — no confusion",
    tip: "One of the easiest airports in Florida. No long corridors, no confusing levels.",
    wait: "We monitor your flight. If it's delayed, we delay too — no extra charge.",
  },
  {
    code: "TPA",
    name: "Tampa International",
    full: "Tampa International Airport (TPA)",
    meeting: "Exit baggage claim on the Arrivals/Ground Level, walk outside to the curb. We'll be in the pickup lane with your name sign. For Terminal C (most domestic flights): Level 1, Door 6–8.",
    terminal: "Terminals A, B, C, E — we'll confirm your terminal when you book",
    tip: "TPA has a SkyConnect tram between the main terminal and airside. After landing, take the tram to the main terminal, then escalator/elevator down to baggage claim.",
    wait: "Real-time flight tracking — we'll be there when you land, not before or after.",
  },
  {
    code: "MCO",
    name: "Orlando International",
    full: "Orlando International Airport (MCO)",
    meeting: "After baggage claim, follow signs to 'Ground Transportation' on Level 1. Exit through the sliding doors — we'll meet you curbside with your name sign. Confirm your terminal (A or B) when booking.",
    terminal: "Terminal A (Gates 1–59) or Terminal B (Gates 70–129)",
    tip: "MCO is large — allow extra time after landing. The walk from gate to baggage claim can be 15–20 minutes. Don't rush — we're tracking your flight.",
    wait: "We track your flight and adjust — no charges for normal delays.",
  },
];

const AirportGuide = () => {
  const [active, setActive] = useState("SRQ");
  const airport = airports.find((a) => a.code === active)!;

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Where We{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Meet You
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Step-by-step for each airport — no stress, no confusion
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Airport tabs */}
          <div className="flex gap-2 mb-8 justify-center">
            {airports.map((a) => (
              <button
                key={a.code}
                onClick={() => setActive(a.code)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 ${
                  active === a.code
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {a.code}
                <span className="hidden sm:inline ml-1 font-normal opacity-70">· {a.name}</span>
              </button>
            ))}
          </div>

          {/* Content card */}
          <div className="luxury-card rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">{airport.full}</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">
                    Meeting Point
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {airport.meeting}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">Terminals</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {airport.terminal}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">
                    Flight Delays
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {airport.wait}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-primary/8 border border-primary/20 rounded-xl">
                <p className="text-sm text-foreground">
                  <span className="font-semibold text-primary">Tip: </span>
                  {airport.tip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirportGuide;
