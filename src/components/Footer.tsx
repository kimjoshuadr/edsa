import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "https://x.com/EDSA_0921" },
  ];

  useEffect(() => {
    // Set initial state
    gsap.set([contentRef.current, quoteRef.current], {
      opacity: 0,
      y: 50,
    });

    // Create scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }).to(
      quoteRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-primary text-primary-foreground py-16 painting-texture"
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div ref={contentRef} className="text-center mb-12">
          <h3 className="text-2xl font-protest mb-4 stencil-text ink-splatter">
            $EDSA
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            A meme coin for the revolution against corruption in the
            Philippines. Together, we fight for transparency and justice.
          </p>
          <div className="flex justify-center">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="border-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary-foreground transition-all duration-200 brush-stroke"
                  asChild
                >
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Revolutionary Message */}
        <div
          ref={quoteRef}
          className="text-center mt-8 p-6 border border-primary-foreground/30 bg-primary-foreground/10 brush-stroke"
        >
          <p className="font-protest text-lg mb-2 text-primary-foreground stencil-text">
            "THE ONLY ADVICE I CAN GIVE YOU: LIVE WITH HONOR AND FOLLOW YOUR
            CONSCIENCE."
          </p>
          <p className="text-primary-foreground/90 text-sm">- Ninoy Aquino</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
