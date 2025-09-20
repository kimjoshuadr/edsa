import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const TokenomicsSection = () => {
  const tokenomics = [
    { label: "Community & Rewards", percentage: 40, color: "bg-primary" },
    { label: "Development Fund", percentage: 25, color: "bg-muted-foreground" },
    { label: "Marketing & Partnerships", percentage: 20, color: "bg-accent" },
    { label: "Team & Advisors", percentage: 10, color: "bg-secondary" },
    { label: "Reserves", percentage: 5, color: "bg-border" }
  ];

  const stats = [
    { label: "Total Supply", value: "100,000,000 CNM" },
    { label: "Initial Price", value: "₱0.001" },
    { label: "Network", value: "Binance Smart Chain" },
    { label: "Contract", value: "Verified & Audited" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-protest text-primary mb-6">
            TOKENOMICS
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Fair distribution designed to empower the community and fuel the revolution against corruption.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Token Distribution */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-protest text-center">
                TOKEN DISTRIBUTION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {tokenomics.map((item, index) => (
                <div key={index} className="space-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">{item.label}</span>
                    <span className="font-protest text-primary">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Token Stats */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-protest text-center">
                TOKEN DETAILS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-4 border border-border hover:bg-muted/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="font-semibold text-foreground">{stat.value}</span>
                </div>
              ))}
              
              <div className="mt-8 p-6 bg-muted border-l-4 border-l-primary">
                <h4 className="font-protest text-primary mb-2">ANTI-CORRUPTION PLEDGE</h4>
                <p className="text-sm text-muted-foreground">
                  100% of proceeds will be transparently allocated. No hidden wallets, 
                  no rugpulls, no corruption—just like the Philippines we're fighting for.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;