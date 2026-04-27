import { Button } from "@/components/ui/button";
import { Plane, ArrowRight } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

const CharterBanner = () => {
  const { openBookingDialog } = useBooking();

  return (
    <section className="relative overflow-hidden h-[480px] md:h-[560px]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/c9.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-sm mb-6">
              <Plane className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Private & Charter Flights
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Flying{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Private?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              Arriving on a private or charter flight? Our drivers meet you directly at the FBO terminal — no commercial lines, no waiting. Seamless door-to-door service from the runway to your destination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="px-8 py-4 text-lg electric-glow hover-glow"
                onClick={() => openBookingDialog()}
              >
                Book Charter Transfer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="flex items-center gap-6 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  SRQ · TPA · PIE · RSW
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  24/7 Availability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharterBanner;
