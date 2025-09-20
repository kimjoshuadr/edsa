import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CountdownTimer from "./CountdownTimer";
import NewsRSSFeed from "./NewsRSSFeed";
import { Users, Shield, Target, ExternalLink, Copy } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ContractData {
  id: number;
  created_at: string;
  ca: string;
  url: string;
}

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [isLaunched, setIsLaunched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;

      const scrolled = window.pageYOffset;
      const viewportHeight = window.innerHeight;

      // Calculate zoom based on scroll position
      // Start heavily zoomed in (2.5x) and zoom out to normal (1x) as user scrolls
      const maxZoom = 1.5;
      const minZoom = 1.0;
      const zoomRange = maxZoom - minZoom;

      // Calculate scroll progress (0 to 1) - slower zoom by using 2x viewport height
      const scrollProgress = Math.min(scrolled / (viewportHeight * 2), 1);

      // Calculate current zoom level (starts at maxZoom, goes to minZoom)
      const currentZoom = maxZoom - scrollProgress * zoomRange;

      parallaxRef.current.style.transform = `scale(${currentZoom})`;
    };

    // Set initial zoom
    if (parallaxRef.current) {
      parallaxRef.current.style.transform = "scale(2.5)";
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for contract address on component mount
  useEffect(() => {
    const checkContractAddress = async () => {
      try {
        setLoading(true);

        // Check if supabase client is available
        if (!supabase) {
          console.log("Supabase client not available for contract check");
          setLoading(false);
          return;
        }

        console.log("Checking for contract address in ca table...");

        // Check if any row exists in ca table
        const { data, error } = await supabase
          .from("ca")
          .select("id, created_at, ca, url")
          .limit(1)
          .single();

        console.log("Contract check response - data:", data);
        console.log("Contract check response - error:", error);

        if (error) {
          if (error.code === "PGRST116") {
            console.log("No contract address found - countdown mode");
            setIsLaunched(false);
          } else {
            console.error("Error checking contract address:", error);
            setIsLaunched(false);
          }
        } else if (data) {
          console.log("Contract address found - launched mode");
          setContractData(data);
          setIsLaunched(true);
        }
      } catch (error) {
        console.error("Error in contract check:", error);
        setIsLaunched(false);
      } finally {
        setLoading(false);
      }
    };

    checkContractAddress();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loading) return; // Wait for data to load

    const tl = gsap.timeline();

    // Initial state - everything hidden
    gsap.set(
      [
        badgeRef.current,
        titleRef.current,
        subtitleRef.current,
        buttonsRef.current,
        contentRef.current,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    // Animate elements in sequence
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

    // Parallax background animation with ScrollTrigger
    gsap.to(parallaxRef.current, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading]);
  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center opacity-60 parallax-scroll-zoom"
        style={{ backgroundImage: "url(/paralax.png)" }}
      ></div>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/60 to-background/70 painting-texture brush-stroke"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          {/* Badge */}
          <div ref={badgeRef}>
            <Badge
              variant="secondary"
              className="mb-6 text-xs md:text-sm uppercase tracking-wider"
            >
              Fight Against Corruption • Philippines
            </Badge>
          </div>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-protest text-primary mb-6 animate-glitch protest-title stencil-text ink-splatter"
          >
            CORRUPT
            <span className="block text-muted-foreground">NO MORE</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Join the revolution against corruption in the Philippines. Together,
            we fight for transparency, accountability, and justice.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className="text-lg font-semibold px-8 py-6 stencil-text brush-stroke"
              asChild
            >
              <a
                href="https://x.com/EDSA_0921"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Target className="mr-2 h-5 w-5" />
                JOIN THE REVOLUTION
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg font-semibold px-8 py-6 stencil-text brush-stroke border-2 hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a
                href="https://x.com/EDSA_0921"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Shield className="mr-2 h-5 w-5" />
                LEARN MORE
              </a>
            </Button>
          </div>
        </div>

        {/* Conditional Content - Countdown or Contract */}
        <div ref={contentRef} className="flex justify-center mb-16">
          {loading ? (
            <div className="w-full max-w-4xl mx-auto text-center">
              <div className="text-2xl font-protest text-primary animate-pulse stencil-text">
                LOADING...
              </div>
            </div>
          ) : isLaunched && contractData ? (
            <div className="w-full max-w-4xl mx-auto text-center">
              <h3 className="text-xl md:text-2xl font-protest mb-6 text-primary stencil-text">
                $EDSA IS LIVE!
              </h3>
              <div className="bg-card border-2 border-primary p-6 brush-stroke ink-splatter">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Contract Address:
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <code className="bg-muted px-3 py-2 rounded font-mono text-sm break-all">
                      {contractData.ca}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigator.clipboard.writeText(contractData.ca)
                      }
                      className="hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="text-lg font-semibold px-8 py-6 stencil-text brush-stroke"
                    asChild
                  >
                    <a
                      href={contractData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Target className="mr-2 h-5 w-5" />
                      BUY ON PUMP.FUN
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg font-semibold px-8 py-6 stencil-text brush-stroke border-2 hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a
                      href={`https://solscan.io/account/${contractData.ca}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      VIEW ON SOLSCAN
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <CountdownTimer />
          )}
        </div>

        {/* RSS Feed */}
        <div className="flex justify-center">
          <NewsRSSFeed />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
