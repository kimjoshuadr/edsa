import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from './CountdownTimer';
import NewsRSSFeed from './NewsRSSFeed';
import { Users, Shield, Target } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 text-xs md:text-sm uppercase tracking-wider">
            Fight Against Corruption • Philippines
          </Badge>
          
          {/* Main title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-protest text-primary mb-6 animate-glitch">
            CORRUPT
            <span className="block text-muted-foreground">NO MORE</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Join the revolution against corruption in the Philippines. 
            Together, we fight for transparency, accountability, and justice.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg font-semibold px-8 py-6">
              <Target className="mr-2 h-5 w-5" />
              JOIN THE REVOLUTION
            </Button>
            <Button variant="outline" size="lg" className="text-lg font-semibold px-8 py-6">
              <Shield className="mr-2 h-5 w-5" />
              LEARN MORE
            </Button>
          </div>
        </div>

        {/* Countdown and RSS Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Countdown Timer */}
          <div className="order-2 lg:order-1">
            <CountdownTimer targetDate="2025-09-21T00:00:00" />
          </div>
          
          {/* RSS Feed */}
          <div className="order-1 lg:order-2">
            <NewsRSSFeed />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-protest text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground uppercase tracking-wide">Supporters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-protest text-primary mb-2">₱0.001</div>
            <div className="text-muted-foreground uppercase tracking-wide">Token Price</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-protest text-primary mb-2">100M</div>
            <div className="text-muted-foreground uppercase tracking-wide">Total Supply</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;