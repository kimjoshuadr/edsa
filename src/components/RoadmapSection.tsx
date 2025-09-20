import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Target } from 'lucide-react';

const RoadmapSection = () => {
  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "FOUNDATION",
      status: "completed",
      items: [
        "Token Creation & Contract Deployment",
        "Community Building & Social Media",
        "Initial Marketing Campaign",
        "Website & Documentation Launch"
      ]
    },
    {
      phase: "Phase 2", 
      title: "MOBILIZATION",
      status: "current",
      items: [
        "Exchange Listings (DEX)",
        "Partnership with Anti-Corruption NGOs", 
        "Community Governance Implementation",
        "Transparency Dashboard Development"
      ]
    },
    {
      phase: "Phase 3",
      title: "EXPANSION", 
      status: "upcoming",
      items: [
        "Major Exchange Listings (CEX)",
        "Mobile App for Corruption Reporting",
        "Blockchain-based Voting System",
        "International Anti-Corruption Network"
      ]
    },
    {
      phase: "Phase 4",
      title: "REVOLUTION",
      status: "future",
      items: [
        "Government Partnership Programs",
        "Educational Scholarship Fund",
        "Whistleblower Protection Platform",
        "Systemic Change Implementation"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "current":
        return <Target className="h-5 w-5 text-primary animate-pulse-revolution" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary text-primary-foreground">Completed</Badge>;
      case "current":
        return <Badge variant="secondary" className="animate-pulse-revolution">In Progress</Badge>;
      case "upcoming":
        return <Badge variant="outline">Coming Soon</Badge>;
      default:
        return <Badge variant="secondary">Future</Badge>;
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-protest text-primary mb-6">
            ROADMAP
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our strategic plan to systematically dismantle corruption and build 
            a transparent, accountable Philippines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmapPhases.map((phase, index) => (
            <Card 
              key={index}
              className={`border-2 transition-all duration-300 hover:scale-105 animate-fade-in ${
                phase.status === 'current' 
                  ? 'border-primary bg-card' 
                  : 'border-border bg-card hover:bg-accent'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(phase.status)}
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      {phase.phase}
                    </span>
                  </div>
                  {getStatusBadge(phase.status)}
                </div>
                
                <h3 className="text-xl font-protest text-primary mb-6 uppercase">
                  {phase.title}
                </h3>
                
                <ul className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 p-6 bg-card border-2 border-primary">
            <Target className="h-6 w-6 text-primary" />
            <span className="font-protest text-primary text-lg">
              TARGET: SEPTEMBER 21, 2025 - REVOLUTION DAY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;