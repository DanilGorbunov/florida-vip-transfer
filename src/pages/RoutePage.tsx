import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, DollarSign, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { getRoute } from "@/data/routes";

const RoutePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const route = getRoute(slug ?? "");

  if (!route) return <Navigate to="/" replace />;

  const schemaService = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${route.from} to ${route.to} Private Transfer`,
    "description": route.metaDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "TrueRide",
      "url": "https://trueride.org",
      "telephone": "+14153172089"
    },
    "areaServed": [
      { "@type": "Place", "name": route.from },
      { "@type": "Place", "name": route.to }
    ],
    "offers": {
      "@type": "Offer",
      "price": route.priceNum,
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": route.priceNum,
        "priceCurrency": "USD",
        "description": "Fixed flat rate, no surge pricing"
      }
    }
  });

  const schemaFaq = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": route.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={route.metaTitle.replace(" | TrueRide", "")}
        description={route.metaDescription}
        canonical={`/routes/${route.slug}`}
        image={route.image}
      />

      {/* Inline route-specific schemas — bypasses Helmet for reliability */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaService }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaFaq }}
      />

      <Navigation />

      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Hero image */}
        <div className="overflow-hidden rounded-2xl mb-8">
          <img
            src={route.image}
            alt={`${route.from} to ${route.to} private car transfer`}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
          {route.headline}
        </h1>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="font-bold text-foreground">{route.price} fixed</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{route.duration}</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{route.distance}</span>
          </div>
        </div>

        {/* Intro */}
        <p className="text-foreground/80 leading-relaxed text-lg mb-10">
          {route.intro}
        </p>

        {/* Highlights */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4">What's included</h2>
          <ul className="space-y-3">
            {route.highlights.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-foreground rounded-2xl p-8 text-center mb-12">
          <p className="text-background/70 text-sm mb-1">Fixed price, no account needed</p>
          <p className="text-background font-bold text-2xl mb-6">
            {route.from} → {route.to.split(" (")[0]}
            <span className="text-primary ml-3">{route.price}</span>
          </p>
          <a
            href="https://wa.me/14153172089"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-12 px-8 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Book via WhatsApp
          </a>
        </div>

        {/* FAQ */}
        {route.faqs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-5">
              {route.faqs.map((faq, i) => (
                <div key={i} className="border-b border-border pb-5 last:border-0">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer link */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm mb-3">
            Don't see your route?{" "}
            <a
              href="https://wa.me/14153172089"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Message us on WhatsApp
            </a>{" "}
            — we cover all of Southwest and Central Florida.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoutePage;
