
export interface Skill {
  id: number;
  name: string;
  svg_icon: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  isAiFeature?: boolean;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
}
