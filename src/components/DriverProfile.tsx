import { Star, MapPin, Shield, Clock } from "lucide-react";

const DriverProfile = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Driver
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            You're not booking a random app driver — you know who picks you up
          </p>
        </div>

        <div className="max-w-3xl mx-auto luxury-card rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Photo */}
            <div className="md:w-64 flex-shrink-0 bg-secondary/40 flex items-center justify-center min-h-[260px]">
              <div className="w-32 h-32 rounded-full bg-primary/20 border-4 border-primary/40 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary">D</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Danil</h3>
                  <p className="text-primary text-sm font-medium">
                    Professional Driver · Florida VIP Transfer
                  </p>
                </div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Local Florida driver with years of experience navigating the routes between Parrish, Sarasota, Tampa, Naples, Orlando, and Miami. Every ride is personal — not outsourced, not random.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Based in Parrish, FL</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Licensed & insured</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          * Add your photo to <code className="text-primary">public/images/driver.jpg</code> to replace the placeholder
        </p>
      </div>
    </section>
  );
};

export default DriverProfile;
