// types.ts
export interface Project {
  id: string
  title: string
  description?: string
  imageUrl?: string
  path?: string
  detailedDescription?: string
  problem?: string
  solution?: string
  currentFocus?: string
  futurePlans?: string
  challenges?: string
  funfacts?: string
  technologies?: string[]
  features?: string[]
  sources?: string[]
  demoUrl?: string
  githubUrl?: string
  linkedinUrl?: string
  galleryImages?: string[] // Array of image URLs for the gallery
}
