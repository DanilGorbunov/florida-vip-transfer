import { Check, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";

const rows = [
  {
    feature: "Price",
    uber: "Variable — surges up to 3×",
    us: "Fixed flat rate, always",
    uberBad: true,
  },
  {
    feature: "Long-distance rides",
    uber: "Driver may cancel or decline",
    us: "Our specialty — guaranteed",
    uberBad: true,
  },
  {
    feature: "Luggage",
    uber: "May refuse large or extra bags",
    us: "All luggage welcome, always",
    uberBad: true,
  },
  {
    feature: "Flight tracking",
    uber: "No",
    us: "Yes — we adjust for delays",
    uberBad: true,
  },
  {
    feature: "Privacy",
    uber: "Shared rides possible",
    us: "Always private",
    uberBad: true,
  },
  {
    feature: "Reliability",
    uber: "No-shows at 5am happen",
    us: "Confirmed & dedicated driver",
    uberBad: true,
  },
  {
    feature: "Child seats",
    uber: "Request not guaranteed",
    us: "Arranged on request",
    uberBad: true,
  },
];

const examples = [
  { route: "Tampa Airport → Sarasota", uber: "~$180–320 (surge)", us: "$250 fixed" },
  { route: "Orlando → Sarasota", uber: "~$280–450 (surge)", us: "$400 fixed" },
  { route: "Tampa Airport → Naples", uber: "~$300–500 (surge)", us: "$450 fixed" },
  { route: "Sarasota → Miami", uber: "Rarely available", us: "$700 fixed" },
];

const UberComparison = () => {
  const { openBookingDialog } = useBooking();

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Not Just{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Use Uber?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            For short city rides, Uber is fine. For Florida airport transfers and long-distance routes, the difference is significant.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Comparison table */}
          <div className="luxury-card rounded-2xl overflow-hidden mb-8">
            {/* Header */}
            <div className="grid grid-cols-3 bg-primary/10 px-6 py-4 border-b border-border">
              <div className="text-sm font-semibold text-muted-foreground"></div>
              <div className="text-center">
                <span className="text-sm font-bold text-muted-foreground">Uber / Lyft</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-primary">Florida VIP Transfer</span>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 px-6 py-4 border-b border-border/50 last:border-0 items-center"
              >
                <div className="text-sm font-medium text-foreground">{row.feature}</div>
                <div className="flex items-start gap-2 px-2">
                  <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {row.uber}
                  </span>
                </div>
                <div className="flex items-start gap-2 px-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-foreground leading-relaxed">{row.us}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Price examples */}
          <div className="luxury-card rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                Real price comparison — popular Florida routes
              </h3>
            </div>
            <div className="space-y-0 divide-y divide-border/50">
              {examples.map((ex, i) => (
                <div key={i} className="grid grid-cols-3 py-3 items-center">
                  <div className="text-sm text-foreground col-span-1">{ex.route}</div>
                  <div className="text-sm text-muted-foreground line-through text-center">
                    {ex.uber}
                  </div>
                  <div className="text-sm font-bold text-primary text-center">{ex.us}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Uber/Lyft prices are estimates based on typical rates including surge. Actual Uber prices vary.
            </p>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="px-10 py-4 text-lg electric-glow hover-glow"
              onClick={() => openBookingDialog()}
            >
              Book Fixed-Price Transfer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UberComparison;
