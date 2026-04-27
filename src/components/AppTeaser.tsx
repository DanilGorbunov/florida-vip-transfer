import { Smartphone, Bell, MapPin, Star } from "lucide-react";

const features = [
  { icon: Bell,    text: "Booking confirmation in seconds" },
  { icon: MapPin,  text: "Live driver location" },
  { icon: Star,    text: "Rate your ride" },
];

const AppTeaser = () => (
  <section className="py-20 bg-background overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-background border border-primary/20 px-8 py-14 md:px-16 overflow-hidden">

          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/8 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 mb-6">
                <Smartphone className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-semibold uppercase tracking-wide">Coming Soon</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Florida VIP<br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  on your phone
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Book, track, and manage your rides from the app. iOS & Android — launching 2025.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {f.text}
                    </div>
                  );
                })}
              </div>

              {/* Waitlist buttons */}
              <div className="flex flex-wrap gap-3">
                {["App Store", "Google Play"].map(store => (
                  <div key={store}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-secondary/40 cursor-default select-none"
                  >
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-[9px] text-muted-foreground uppercase tracking-wide">Coming to</div>
                      <div className="text-sm font-semibold text-foreground leading-tight">{store}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — phone mockup */}
            <div className="flex justify-center">
              <div className="relative w-52">
                {/* Phone frame */}
                <div className="w-full aspect-[9/19] rounded-[2.5rem] border-4 border-border/60 bg-secondary/30 shadow-2xl overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="h-6 bg-background/80 flex items-center justify-center">
                    <div className="w-16 h-3 rounded-full bg-border/60" />
                  </div>
                  {/* Screen content mockup */}
                  <div className="flex-1 p-3 flex flex-col gap-2">
                    <div className="h-8 rounded-xl bg-primary/20 flex items-center px-3 gap-2">
                      <MapPin className="w-3 h-3 text-primary" />
                      <div className="h-2 w-24 rounded bg-primary/30" />
                    </div>
                    <div className="h-8 rounded-xl bg-secondary/60 flex items-center px-3 gap-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <div className="h-2 w-20 rounded bg-border/60" />
                    </div>
                    <div className="flex-1 rounded-xl bg-primary/5 border border-primary/10 mt-1 overflow-hidden flex items-end justify-center pb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">$160</div>
                        <div className="text-[9px] text-muted-foreground">SRQ → TPA · Fixed</div>
                      </div>
                    </div>
                    <div className="h-9 rounded-xl bg-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">Book via WhatsApp</span>
                    </div>
                  </div>
                </div>
                {/* Glow under phone */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary/20 blur-xl rounded-full" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AppTeaser;
