import React from "react";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MissionSection />
      <Footer />
    </div>
  );
};

export default Index;
