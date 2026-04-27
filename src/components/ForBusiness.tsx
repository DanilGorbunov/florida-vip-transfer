import { Building2, FileText, RefreshCw, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  { icon: Building2,  title: "Corporate accounts",   desc: "Recurring rides billed monthly. Ideal for teams flying in and out of TPA, SRQ, MCO." },
  { icon: FileText,   title: "Invoicing & receipts",  desc: "Every ride documented. Clean invoices for your accounting team, no questions asked." },
  { icon: RefreshCw,  title: "Recurring routes",      desc: "Set up weekly or daily transfers — we remember your schedule so you don't have to." },
  { icon: Phone,      title: "Dedicated contact",     desc: "One WhatsApp number. No app, no login, no queue. Your ride confirmed in minutes." },
];

const ForBusiness = () => (
  <section className="py-20 bg-secondary/10">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium uppercase tracking-wide">For Business</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Corporate{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              transfers
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Reliable ground transportation for your team — airports, client meetings, recurring routes. Fixed rates, zero surprises on the invoice.
          </p>
          <Button size="lg" className="electric-glow hover-glow"
            onClick={() => window.open(`https://wa.me/14153172089?text=${encodeURIComponent("Hi! I'm interested in a corporate account for Florida VIP Transfer.")}`, "_blank")}>
            Get corporate pricing
          </Button>
        </div>

        {/* Right — perk cards */}
        <div className="grid grid-cols-1 gap-4">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="luxury-card rounded-xl p-5 flex gap-4 items-start hover-lift">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm mb-1">{p.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{p.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  </section>
);

export default ForBusiness;
