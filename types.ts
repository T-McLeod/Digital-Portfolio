
export interface Skill {
  id: number;
  name: string;
  svgIcon: string;
  isFeatured?: boolean; // Only present when returned with a project
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription?: string; // Only on detail view
  tags: string[];
  imageUrl: string;
  galleryImages?: string[]; // Only on detail view
  isFeatured: boolean;
  isAiFeature?: boolean;
  links?: ProjectLink[]; // Only on detail view
  skills?: Skill[]; // Featured skills on list, all skills on detail
}

export interface ProjectLink {
  id: number;
  displayName: string;
  url: string;
  svgIcon?: string;
  order?: number;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
}
