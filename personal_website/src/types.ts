// types.ts
export interface Project {
    id: string
    title: string
    description: string
    imageUrl: string
    path: string
    detailedDescription?: string;
    technologies?: string[];
    demoUrl?: string;
    githubUrl?: string;
    features?: string[];
  }