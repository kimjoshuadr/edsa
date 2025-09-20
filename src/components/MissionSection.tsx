import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Users, Gavel } from 'lucide-react';

const MissionSection = () => {
  const missions = [
    {
      icon: Shield,
      title: "Transparency",
      description: "Expose corrupt practices through blockchain transparency and community oversight."
    },
    {
      icon: Eye,
      title: "Accountability", 
      description: "Hold officials accountable through decentralized governance and public records."
    },
    {
      icon: Users,
      title: "Unity",
      description: "Unite Filipinos in the fight against corruption through collective action."
    },
    {
      icon: Gavel,
      title: "Justice",
      description: "Demand justice for victims of corruption and systemic abuse of power."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-protest text-primary mb-6">
            OUR MISSION
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Corrupt No More is more than a token—it's a movement for systemic change 
            in the Philippines, powered by the people for the people.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <Card 
                key={index} 
                className="border-2 border-border bg-card hover:bg-accent transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 border-2 border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-protest text-primary mb-3 uppercase">
                    {mission.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {mission.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;