import { Car, UserCheck, Clock, Route, Shield, PhoneCall, DollarSign, MapPin } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Fair Fixed Prices",
    description: "No surge pricing, no hidden fees. You see the price upfront — it never changes, no matter the traffic or time of day."
  },
  {
    icon: Clock,
    title: "Always On Time",
    description: "Unlike Uber and Lyft, our drivers always arrive on time. We track your flight and adjust if you land early or late."
  },
  {
    icon: MapPin,
    title: "Based in Sarasota",
    description: "Our home base is Sarasota. We cover TPA, MCO, Miami and all surrounding areas — beaches, keys, and everything in between."
  },
  {
    icon: Car,
    title: "Airport Transfer Specialists",
    description: "Tampa, Orlando, Miami — we do airport runs daily. We know the terminals, the traffic, and the timing."
  },
  {
    icon: Shield,
    title: "Fully Licensed & Insured",
    description: "Every vehicle is fully insured and every driver is professionally licensed. Your safety is our first priority."
  },
  {
    icon: PhoneCall,
    title: "Hourly & Event Service",
    description: "Weddings, conferences, concerts, exhibitions — book by the hour for any special occasion."
  }
];

const WhyChoose = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Our Service
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Based in Sarasota. Serving Tampa, Orlando, Miami and the Florida coast — with fixed prices and drivers who actually show up on time.
          </p>
        </div>

        {/* Luggage Feature — split layout */}
        <div className="flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-border mb-12">
          <div className="md:w-1/2 h-72 md:h-auto">
            <img
              src="/images/c8.jpeg"
              alt="Spacious luggage capacity"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 bg-card p-8 md:p-12 flex flex-col justify-center">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Room for everything
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Generous Luggage Capacity
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Heading to the airport with full suitcases? Our vehicles are chosen for their spacious cargo areas — no squeezing bags in, no leaving anything behind.
            </p>
            <ul className="space-y-2 text-sm text-foreground">
              {[
                "Large checked suitcases — no problem",
                "Golf bags, strollers, beach gear",
                "Group trips with multiple passengers & luggage",
                "Comfortable seating even with full cargo",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
