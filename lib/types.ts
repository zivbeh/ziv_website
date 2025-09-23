export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  tools: string[];
  size: string;
  image?: string;
  images?: string[];
  // Optional mapping from image path (endsWith match) or index to span classes
  // Example: { "websitelook.png": "col-span-3 row-span-3", 0: "col-span-2 row-span-2" }
  imageSpans?: Record<string | number, string>;
  texture?: string;
  theme: {
    surfaceColor1: string;
    surfaceColor2: string;
    atmosphereColor: string;
  };
  repoUrl?: string;
  liveUrl?: string;
}

