import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import RouteMapCalculator from "@/components/RouteMapCalculator";
import UberComparison from "@/components/UberComparison";
import Reviews from "@/components/Reviews";
import AppTeaser from "@/components/AppTeaser";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <HowItWorks />
      <RouteMapCalculator />
      <UberComparison />
      <Reviews />
      <AppTeaser />
    </div>
  );
};

export default Index;
