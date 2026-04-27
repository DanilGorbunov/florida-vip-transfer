import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const priceMatrix: Record<string, Record<string, number>> = {
  "Parrish": {
    "Sarasota Airport (SRQ)": 60,
    "Tampa Airport (TPA)": 120,
  },
  "Sarasota": {
    "Tampa Airport (TPA)": 160,
    "Naples": 250,
    "Orlando": 300,
    "Miami": 700,
  },
  "Sarasota Airport (SRQ)": {
    "Siesta Key": 110,
    "Anna Maria Island": 110,
    "Parrish": 60,
  },
  "Tampa Airport (TPA)": {
    "Sarasota": 250,
    "Parrish": 120,
    "Naples": 450,
  },
  "Orlando (MCO)": {
    "Sarasota": 400,
    "Naples": 600,
  },
};

const allLocations = [
  "Parrish",
  "Sarasota",
  "Sarasota Airport (SRQ)",
  "Tampa Airport (TPA)",
  "Siesta Key",
  "Anna Maria Island",
  "Naples",
  "Orlando (MCO)",
  "Miami",
];

const PriceCalculator = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { openBookingDialog } = useBooking();

  const getDestinations = (origin: string) => {
    if (!origin) return allLocations;
    const direct = Object.keys(priceMatrix[origin] || {});
    const reverse = Object.entries(priceMatrix)
      .filter(([, dests]) => dests[origin] !== undefined)
      .map(([key]) => key);
    return [...new Set([...direct, ...reverse])].filter((loc) => loc !== origin);
  };

  const getPrice = (): number | null => {
    if (!from || !to) return null;
    return priceMatrix[from]?.[to] ?? priceMatrix[to]?.[from] ?? null;
  };

  const price = getPrice();
  const destinations = getDestinations(from);

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Calculate Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Fare
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Fixed prices — no surge, no surprises
            </p>
          </div>

          <div className="luxury-card p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 text-primary" /> From
                </label>
                <Select
                  value={from}
                  onValueChange={(v) => {
                    setFrom(v);
                    setTo("");
                  }}
                >
                  <SelectTrigger className="w-full bg-background border-border h-12 text-base">
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    {allLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 text-primary" /> To
                </label>
                <Select value={to} onValueChange={setTo} disabled={!from}>
                  <SelectTrigger className="w-full bg-background border-border h-12 text-base">
                    <SelectValue
                      placeholder={from ? "Select destination" : "Select pickup first"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price display */}
            <div className="text-center py-10 border-y border-border mb-8 min-h-[120px] flex flex-col items-center justify-center">
              {!from && (
                <p className="text-muted-foreground text-lg">
                  Select your route to see the price
                </p>
              )}
              {from && !to && (
                <p className="text-muted-foreground text-lg">Now select your destination</p>
              )}
              {from && to && price !== null && (
                <>
                  <div className="text-7xl md:text-8xl font-bold text-primary leading-none mb-3">
                    ${price}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Fixed price · {from} → {to}
                  </p>
                </>
              )}
              {from && to && price === null && (
                <>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    Contact for pricing
                  </div>
                  <p className="text-muted-foreground text-sm">
                    We cover this route — reach out for a custom quote
                  </p>
                </>
              )}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="px-10 py-4 text-lg electric-glow hover-glow"
                onClick={() => openBookingDialog()}
                disabled={!from || !to}
              >
                Book This Route
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                No credit card required to request · Free cancellation 24h before pickup
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
