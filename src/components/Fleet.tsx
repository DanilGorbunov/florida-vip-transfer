import { Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";

const vehicles = [
  {
    name: "Ford Expedition Max",
    seats: "Up to 7 seats",
    standard: "6 passengers + 4 large bags or 6 small bags",
    note: "Groups of 7–10 with luggage require 2 vehicles",
    tag: "Large Group",
    image: "/images/c1.jpeg",
  },
  {
    name: "Infiniti QX60",
    seats: "Up to 6 seats",
    standard: "5–6 passengers",
    note: null,
    tag: "Premium",
    image: "/images/c2.jpeg",
  },
  {
    name: "Toyota Sienna",
    seats: "Up to 7 seats",
    standard: "6–7 passengers",
    note: null,
    tag: "Family",
    image: "/images/c3.jpeg",
  },
  {
    name: "Audi Q7",
    seats: "Up to 6 seats",
    standard: "5–6 passengers",
    note: null,
    tag: "Luxury",
    image: "/images/c4.jpeg",
  },
];

const Fleet = () => {
  const { openBookingDialog } = useBooking();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Fleet
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Premium vehicles for every group size. Based in Sarasota.
          </p>
        </div>

        {/* Featured vehicle */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-3xl scale-90" />
            <img
              src={vehicles[0].image}
              alt={vehicles[0].name}
              className="relative rounded-3xl w-full object-cover shadow-2xl"
              style={{ aspectRatio: "4/3", objectPosition: "center" }}
            />
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
              {vehicles[0].tag}
            </div>
          </div>

          <div className="luxury-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-1">{vehicles[0].name}</h3>
            <p className="text-primary text-sm font-medium mb-5">{vehicles[0].seats}</p>

            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-foreground leading-relaxed">{vehicles[0].standard}</p>
            </div>

            <div className="flex items-start gap-3 mb-6 bg-primary/5 border border-primary/20 rounded-xl p-3">
              <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">{vehicles[0].note}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
              {["Climate control", "USB-C charging", "Wi-Fi on request", "Licensed & insured"].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <Button size="lg" className="w-full electric-glow hover-glow" onClick={() => openBookingDialog()}>
              Book this vehicle
            </Button>
          </div>
        </div>

        {/* Other vehicles */}
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5">
          {vehicles.slice(1).map((v, i) => (
            <div
              key={i}
              className="luxury-card rounded-2xl overflow-hidden border border-border/60 hover-lift cursor-pointer"
              onClick={() => openBookingDialog()}
            >
              <div className="relative">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/3", objectPosition: "center" }}
                />
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-border/60">
                  {v.tag}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-foreground mb-1">{v.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  {v.standard}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Fleet;
