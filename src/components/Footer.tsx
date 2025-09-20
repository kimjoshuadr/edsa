import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, MessageCircle, Github, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: MessageCircle, label: "Telegram", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Mail, label: "Email", href: "mailto:revolution@corruptnomore.ph" }
  ];

  const footerLinks = [
    {
      title: "Revolution",
      links: [
        { label: "Whitepaper", href: "#" },
        { label: "Tokenomics", href: "#" },
        { label: "Roadmap", href: "#" },
        { label: "Community", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Brand Kit", href: "#" },
        { label: "Media Kit", href: "#" },
        { label: "API", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Disclaimer", href: "#" },
        { label: "Audit Report", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-protest mb-4">
              CORRUPT NO MORE
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Join the revolution against corruption in the Philippines. 
              Together, we fight for transparency and justice.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="border-primary-foreground/20 hover:bg-primary-foreground hover:text-primary"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="font-protest text-lg mb-4 uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-primary-foreground/80 text-sm">
              © 2024 Corrupt No More. All rights reserved. Fighting corruption since day one.
            </div>
            <div className="text-primary-foreground/80 text-sm">
              Contract: <span className="font-mono">0x...TBD</span>
            </div>
          </div>
        </div>

        {/* Revolutionary Message */}
        <div className="text-center mt-8 p-6 border border-primary-foreground/20 bg-primary-foreground/5">
          <p className="font-protest text-lg mb-2">
            "THE ONLY THING NECESSARY FOR THE TRIUMPH OF EVIL IS FOR GOOD MEN TO DO NOTHING."
          </p>
          <p className="text-primary-foreground/80 text-sm">
            - Edmund Burke
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;