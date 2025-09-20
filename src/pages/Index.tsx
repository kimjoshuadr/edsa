import React from 'react';
import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import RoadmapSection from '@/components/RoadmapSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MissionSection />
      <TokenomicsSection />
      <RoadmapSection />
      <Footer />
    </div>
  );
};

export default Index;
