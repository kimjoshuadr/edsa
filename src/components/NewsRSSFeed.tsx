import React, { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface NewsItem {
  id: number;
  title: string;
  url: string;
  created_at: string;
  content_text: string;
  image?: string;
}

const NewsRSSFeed = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [featuredNews, setFeaturedNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const moreNewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);

        // Check if supabase client is available
        if (!supabase) {
          console.log("Supabase client not available, using fallback news");
          loadFallbackNews();
          return;
        }

        console.log("Attempting to fetch news from Supabase X table...");
        console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);

        // Fetch from Supabase X table - only rows with URL
        const { data: newsData, error } = await supabase
          .from("X")
          .select("id, created_at, url, title, content_text")
          .not("url", "is", null)
          .neq("url", "")
          .order("created_at", { ascending: false })
          .limit(20);

        console.log("Supabase query response - data:", newsData);
        console.log("Supabase query response - error:", error);

        if (error) {
          console.error("Supabase error:", error);
          loadFallbackNews();
          return;
        }

        if (!newsData || newsData.length === 0) {
          console.log("No news data found in Supabase X table");
          loadFallbackNews();
          return;
        }

        console.log(
          "Successfully fetched",
          newsData.length,
          "news items from Supabase"
        );

        // Convert to our NewsItem format
        const allNews: NewsItem[] = newsData.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          created_at: item.created_at,
          content_text: item.content_text || "",
        }));

        // Set featured news (latest entry) and remaining news
        setFeaturedNews(allNews[0]); // Latest entry becomes featured
        setNewsItems(allNews.slice(1)); // Rest go to more news
      } catch (error) {
        console.error("Error fetching news from Supabase:", error);
        loadFallbackNews();
      } finally {
        setIsLoading(false);
      }
    };

    const loadFallbackNews = () => {
      console.log("Loading fallback news content");
      const newsContent: NewsItem[] = [
        {
          id: 1,
          title: "September 21 Protests vs Flood Control Corruption",
          url: "https://www.rappler.com/philippines/updates-flood-control-corruption-protests-september-21-2025/",
          created_at: "2025-09-21T00:00:00Z",
          content_text:
            "Bookmark and refresh this page for news updates, photos, and videos of the anti-corruption protests across the Philippines on Sunday, September 21",
          image:
            "https://www.rappler.com/tachyon/2025/09/sept-21-protests-TITLECARD.jpg",
        },
        {
          id: 2,
          title:
            "Cebu youth push alliance vs gov't negligence, flood control corruption",
          url: "https://www.rappler.com/philippines/visayas/cebu-youth-alliance-against-flood-control-corruption/",
          created_at: "2025-09-20T12:58:41Z",
          content_text:
            "'We will flood Colon Street this September 21,' says Grover Perez, convenor of the Kabataan Kontra Korapsyon",
          image: "https://www.rappler.com/tachyon/2025/09/IMG_4679-scaled.jpeg",
        },
        {
          id: 3,
          title: "Never Again, Yet It Keeps Happening",
          url: "https://youthforceph.rappler.com/?p=150",
          created_at: "2025-09-20T13:21:29Z",
          content_text:
            "On the 53rd anniversary of Martial Law, we remember the horrors of the past and confront how its shadows still haunt our present. From corruption and dynasties to privilege mocking the people's suffering.",
          image:
            "https://youthforceph.rappler.com/tachyon/sites/6/2025/09/Copy-of-SUNSHINE-POST-3-1.png",
        },
        {
          id: 4,
          title: "Anti-Corruption Drive Intensifies Nationwide",
          url: "#",
          created_at: "2025-09-19T00:00:00Z",
          content_text:
            "Citizens across the Philippines unite in demanding transparency and accountability from government officials.",
        },
        {
          id: 5,
          title: "EDSA Revolution Spirit Lives On",
          url: "#",
          created_at: "2025-09-18T00:00:00Z",
          content_text:
            "The spirit of People Power continues to inspire new generations in the fight against corruption and injustice.",
        },
        {
          id: 6,
          title: "Youth Movements Gain Momentum",
          url: "#",
          created_at: "2025-09-17T00:00:00Z",
          content_text:
            "Young Filipinos lead the charge in demanding systemic change and government accountability.",
        },
        {
          id: 7,
          title: "Transparency Initiatives Show Progress",
          url: "#",
          created_at: "2025-09-16T00:00:00Z",
          content_text:
            "New transparency measures implemented across various government agencies show promising results.",
        },
        {
          id: 8,
          title: "Community Leaders Unite Against Graft",
          url: "#",
          created_at: "2025-09-15T00:00:00Z",
          content_text:
            "Grassroots movements strengthen as communities across the Philippines join forces against corruption.",
        },
        {
          id: 9,
          title: "Digital Revolution in Public Service",
          url: "#",
          created_at: "2025-09-14T00:00:00Z",
          content_text:
            "Technology solutions proposed to eliminate corruption in public transactions and improve transparency.",
        },
        {
          id: 10,
          title: "People Power Movement Evolves",
          url: "#",
          created_at: "2025-09-13T00:00:00Z",
          content_text:
            "Modern approaches to fighting corruption build on the legacy of the EDSA Revolution.",
        },
      ];

      setFeaturedNews(newsContent[0]);
      setNewsItems(newsContent.slice(1));
    };

    // Start fetching news
    fetchNews();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (isLoading) return; // Wait for data to load

    // Set initial state
    gsap.set([titleRef.current, featuredRef.current, moreNewsRef.current], {
      opacity: 0,
      y: 60,
    });

    // Create scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }).to(
      [featuredRef.current, moreNewsRef.current],
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
      },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl">
        <h3 className="text-xl md:text-2xl font-protest mb-6 text-center text-muted-foreground stencil-text">
          LATEST REVOLUTION NEWS
        </h3>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Loading - Left Side */}
          <div>
            <h4 className="text-lg font-protest mb-4 text-primary stencil-text">
              FEATURED
            </h4>
            <div className="bg-card border-2 border-primary p-6 animate-pulse brush-stroke">
              <div className="w-full h-48 bg-muted rounded mb-4"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>

          {/* Other News Loading - Right Side */}
          <div>
            <h4 className="text-lg font-protest mb-4 text-primary stencil-text">
              MORE NEWS
            </h4>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card border border-border p-4 animate-pulse brush-stroke"
                >
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="w-full max-w-6xl">
      <h3
        ref={titleRef}
        className="text-xl md:text-2xl font-protest mb-6 text-center text-muted-foreground stencil-text"
      >
        LATEST REVOLUTION NEWS
      </h3>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Featured News - Left Side */}
        <div ref={featuredRef} className="flex flex-col h-full">
          {featuredNews && (
            <>
              <h4 className="text-lg font-protest mb-4 text-primary stencil-text">
                FEATURED
              </h4>
              <a
                href={featuredNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-card border-2 border-primary p-6 hover:bg-primary hover:text-primary-foreground transition-colors group brush-stroke ink-splatter flex-1"
              >
                <div className="flex flex-col gap-4 h-full">
                  {featuredNews.image && (
                    <div className="w-full h-48 overflow-hidden rounded">
                      <img
                        src={featuredNews.image}
                        alt={featuredNews.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-protest text-xl group-hover:text-primary-foreground mb-3 line-clamp-3 stencil-text">
                      {featuredNews.title}
                    </h4>
                    <p className="text-sm group-hover:text-primary-foreground/80 mb-4 line-clamp-4 flex-1">
                      {featuredNews.content_text}
                    </p>
                    <div className="flex justify-between items-center">
                      <time className="text-xs group-hover:text-primary-foreground/70">
                        {new Date(featuredNews.created_at).toLocaleDateString()}
                      </time>
                      <ExternalLink className="h-4 w-4 group-hover:text-primary-foreground flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </a>
            </>
          )}
        </div>

        {/* Other News - Right Side */}
        <div ref={moreNewsRef} className="flex flex-col">
          <h4 className="text-lg font-protest mb-4 text-primary stencil-text">
            MORE NEWS
          </h4>
          <div className="space-y-4 overflow-y-auto max-h-96">
            {newsItems.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-card border border-border p-4 hover:bg-primary hover:text-primary-foreground transition-colors group animate-fade-in brush-stroke"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold group-hover:text-primary-foreground mb-2 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 mb-2 line-clamp-2">
                      {item.content_text}
                    </p>
                    <time className="text-xs text-muted-foreground group-hover:text-primary-foreground/70">
                      {new Date(item.created_at).toLocaleDateString()}
                    </time>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsRSSFeed;
