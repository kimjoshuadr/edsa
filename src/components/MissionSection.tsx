import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Users, Gavel } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const missions = [
    {
      icon: Shield,
      title: "Transparency",
      description:
        "Expose corrupt practices through blockchain transparency and community oversight.",
    },
    {
      icon: Eye,
      title: "Accountability",
      description:
        "Hold officials accountable through decentralized governance and public records.",
    },
    {
      icon: Users,
      title: "Unity",
      description:
        "Unite Filipinos in the fight against corruption through collective action.",
    },
    {
      icon: Gavel,
      title: "Justice",
      description:
        "Demand justice for victims of corruption and systemic abuse of power.",
    },
  ];

  useEffect(() => {
    // Set initial state
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 50,
    });

    gsap.set(cardsRef.current?.children || [], {
      opacity: 0,
      y: 100,
      scale: 0.8,
    });

    // Create scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        cardsRef.current?.children || [],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.2"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30 painting-texture">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-protest text-primary mb-6 stencil-text ink-splatter"
          >
            OUR MISSION
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            $EDSA is a token representing the fight against corruption in the
            Philippines, powered by the people for the people.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <Card
                key={index}
                className="border-2 border-border bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 group animate-fade-in brush-stroke"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 border-2 border-primary group-hover:bg-primary-foreground group-hover:text-primary group-hover:border-primary-foreground transition-all duration-300 ink-splatter">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-protest group-hover:text-primary-foreground mb-3 uppercase stencil-text">
                    {mission.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-primary-foreground/80 leading-relaxed">
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
