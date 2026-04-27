import { Star } from "lucide-react";

const reviews = [
  {
    name: "Michael R.",
    route: "Tampa Airport → Sarasota",
    rating: 5,
    quote:
      "Driver tracked my flight and was already waiting when I came out of arrivals. Spotless SUV, super comfortable ride. Way better than Uber for this distance.",
  },
  {
    name: "Sandra K.",
    route: "Parrish → Sarasota Airport",
    rating: 4,
    quote:
      "Fixed price, no surprises — exactly what I needed for an early-morning flight. Driver helped with the bags and got me there on time. Would have been 5 stars but the pickup was a few minutes late.",
  },
  {
    name: "James & Carol T.",
    route: "Orlando → Sarasota",
    rating: 5,
    quote:
      "We do this drive every winter when we fly into MCO. Tried Uber once, never again. Florida VIP Transfer is reliable, comfortable, and honestly not much more expensive.",
  },
  {
    name: "Lisa M.",
    route: "SRQ → Siesta Key",
    rating: 4,
    quote:
      "Arrived exhausted after a long connection. Driver was there, car was cold and ready. 15 minutes to our condo on Siesta Key. Only minor thing — hard to find the driver at first, but he called right away.",
  },
  {
    name: "David P.",
    route: "Sarasota → Miami",
    rating: 5,
    quote:
      "Long drive but completely worth it. Comfortable, quiet ride — I slept most of the way. Much less stressful than driving myself through South Florida traffic.",
  },
  {
    name: "The Brennan Family",
    route: "Tampa Airport → Naples",
    rating: 5,
    quote:
      "Four adults, six bags, two car seats — no problem. Driver loaded everything with a smile and we were in Naples in comfort. Perfect for families traveling together.",
  },
];

const Reviews = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real passengers, real routes, real experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="luxury-card p-6 rounded-xl flex flex-col hover-lift">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < review.rating ? "text-primary fill-primary" : "text-border fill-border"}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/85 text-sm leading-relaxed mb-6 flex-1">
                "{review.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-border/50 pt-4">
                <div className="font-semibold text-foreground text-sm">{review.name}</div>
                <div className="text-xs text-primary mt-0.5">{review.route}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
