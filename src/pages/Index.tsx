import { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import UberComparison from "@/components/UberComparison";
import Reviews from "@/components/Reviews";
import AppTeaser from "@/components/AppTeaser";

const RouteMapCalculator = lazy(() => import("@/components/RouteMapCalculator"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Suspense fallback={<div className="bg-background" style={{ height: "88vh" }} />}>
        <RouteMapCalculator />
      </Suspense>
      <UberComparison />
      <Reviews />
      <AppTeaser />
    </div>
  );
};

export default Index;
