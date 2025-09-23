export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  tools: string[];
  size: string;
  image?: string;
  images?: string[];
  texture?: string;
  theme: {
    surfaceColor1: string;
    surfaceColor2: string;
    atmosphereColor: string;
  };
  repoUrl?: string;
  liveUrl?: string;
}

