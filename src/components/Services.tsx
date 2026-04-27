import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceImages = [
  "/images/c2.jpeg",
  "/images/c3.jpeg",
  "/images/c4.jpeg",
  "/images/c5.jpeg",
  "/images/c6.jpeg",
];

const Services = () => {
  const { openBookingDialog } = useBooking();
  const { t } = useLanguage();

  const serviceKeys = ["airport", "viennaBratislava", "dayTours", "business", "ecoLuxury"] as const;

  const getServiceId = (key: string): string => {
    const mapping: Record<string, string> = {
      airport: "airport",
      viennaBratislava: "vienna-bratislava",
      dayTours: "day-tours",
      business: "business",
      ecoLuxury: "eco-luxury",
    };
    return mapping[key] || "";
  };

  const services = serviceKeys.map((key, i) => ({
    image: serviceImages[i],
    serviceId: getServiceId(key),
    ...t.services[key],
  }));

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.services.title}
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.services.titleHighlight}
            </span>
          </h2>
          <p className="hidden md:block text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.services.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="luxury-card hover-lift group flex flex-col overflow-hidden cursor-pointer"
              onClick={() => service.serviceId && openBookingDialog(service.serviceId)}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {service.headline}
                  </p>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
                  {service.description}
                </p>

                <div className="mb-4 flex-1">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-foreground">
                        <Check className="w-3 h-3 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 p-3 bg-background/50 rounded-lg border border-primary/20">
                  {service.pricing.map((price, idx) => (
                    <div key={idx} className="flex items-center justify-between py-0.5">
                      <span className="text-xs text-muted-foreground">{price.route}</span>
                      <span className="text-sm font-bold text-primary">{price.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
