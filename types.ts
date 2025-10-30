
import React from 'react';

export interface Skill {
  name: string;
  icon: React.ReactNode;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  isAiFeature?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}
