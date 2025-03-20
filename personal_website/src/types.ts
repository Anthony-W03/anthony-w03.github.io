// types.ts
export interface Project {
    id: string
    title: string
    description: string
    imageUrl: string
    path: string
    detailedDescription?: string;
    problem?: string;
    solution?: string;
    challenges?: string;
    technologies?: string[];
    features?: string[];
    demoUrl?: string;
    githubUrl?: string;
    galleryImages?: string[]; // Array of image URLs for the gallery
  }