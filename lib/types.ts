export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  punchline?: string;
  tools: string[];
  size: string;
  image?: string;
  images?: string[];
  videos?: string[]; // relative paths to mp4/webm
  texture?: string;
  theme: {
    surfaceColor1: string;
    surfaceColor2: string;
    atmosphereColor: string;
  };
  repoUrl?: string;
  liveUrl?: string;
  customLink?: {
    url: string;
    label: string;
  };
}

