import { MapPin, DollarSign, Car } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Choose your route",
    desc: "Select pickup and dropoff from our Florida cities. See your fixed price instantly — no estimate, no surprise.",
  },
  {
    number: "02",
    icon: DollarSign,
    title: "Confirm & book",
    desc: "Send your booking via WhatsApp or the full form. We confirm within 15 minutes with driver details.",
  },
  {
    number: "03",
    icon: Car,
    title: "Ride in comfort",
    desc: "Your driver tracks your flight and meets you curbside with a name sign. Door-to-door, every time.",
  },
];

const HowItWorks = () => (
  <section className="py-20 bg-secondary/10">
    <div className="container mx-auto px-6">

      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          How it{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            works
          </span>
        </h2>
        <p className="text-muted-foreground text-lg">Three steps from quote to curbside</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Connector line — desktop */}
        <div className="hidden md:block absolute top-10 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center group">
                {/* Icon circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary-foreground">{i + 1}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
