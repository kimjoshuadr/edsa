import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

const NewsRSSFeed = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock news data for demo - in real app, this would fetch from RSS
  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        title: "Philippines Anti-Corruption Drive Intensifies",
        link: "#",
        pubDate: "2024-01-15",
        description: "New measures announced to combat systemic corruption across government agencies."
      },
      {
        title: "Transparency Initiative Gains Momentum",
        link: "#",
        pubDate: "2024-01-14", 
        description: "Citizens rally for increased government transparency and accountability."
      },
      {
        title: "Digital Revolution in Public Service",
        link: "#",
        pubDate: "2024-01-13",
        description: "Technology solutions proposed to eliminate corruption in public transactions."
      },
      {
        title: "Community Leaders Unite Against Graft",
        link: "#",
        pubDate: "2024-01-12",
        description: "Grassroots movement strengthens as more communities join the fight."
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setNewsItems(mockNews);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl">
        <h3 className="text-xl md:text-2xl font-protest mb-6 text-center text-muted-foreground">
          LATEST REVOLUTION NEWS
        </h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card border border-border p-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl md:text-2xl font-protest mb-6 text-center text-muted-foreground">
        LATEST REVOLUTION NEWS
      </h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {newsItems.map((item, index) => (
          <div 
            key={index}
            className="bg-card border border-border p-4 hover:bg-accent transition-colors group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground group-hover:text-accent-foreground mb-2 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {item.description}
                </p>
                <time className="text-xs text-muted-foreground">
                  {new Date(item.pubDate).toLocaleDateString()}
                </time>
              </div>
              <ExternalLink 
                className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground flex-shrink-0" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsRSSFeed;