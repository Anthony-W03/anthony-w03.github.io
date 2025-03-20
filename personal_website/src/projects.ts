// projects.ts
import type { Project } from "./types"

export const projects: Project[] = [
  {
    id: "1",
    title: "Project A",
    description: "A revolutionary project that showcases innovative technology",
    imageUrl: "/placeholder-image-1.jpg",
    path: "/project-alpha",
    detailedDescription:
      "This project was developed to solve a critical problem in the industry. It leverages cutting-edge technology to provide a seamless user experience while maintaining high performance and scalability.",
    problem:
      "Traditional solutions in this space were slow, inefficient, and difficult to use, leading to poor user adoption and wasted resources.",
    solution:
      "We designed a modern architecture using microservices and real-time data processing to create a responsive and intuitive platform that addresses all key pain points.",
    challenges:
      "The biggest challenge was optimizing performance while handling large datasets. We implemented advanced caching strategies and database optimizations to achieve sub-second response times.",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Docker",
      "AWS",
    ],
    features: [
      "Real-time data visualization",
      "Collaborative editing",
      "Advanced search capabilities",
      "Automated reporting",
      "Custom workflow automation",
    ],
    //demoUrl: "https://demo.example.com/project-a",
    githubUrl: "https://github.com/yourusername/project-a",
    galleryImages: [
      "/placeholder-image-1.jpg",
      "/placeholder-image-2.jpg",
      "/placeholder-image-3.jpg",
    ],
  },
  {
    id: "2",
    title: "Project B",
    description: "Exploring the boundaries of what's possible",
    imageUrl: "/placeholder-image-2.jpg",
    path: "/project-beta",
    detailedDescription:
      "Project B is an experimental platform that pushes the boundaries of web technology. It demonstrates how modern frameworks and innovative approaches can create unique user experiences.",
    problem:
      "Conventional web applications often follow the same patterns, leading to predictable and sometimes uninspiring user experiences.",
    solution:
      "By combining cutting-edge animation techniques, 3D rendering, and interactive elements, we've created an immersive digital experience that engages users in new ways.",
    challenges:
      "Balancing performance with visual complexity was a significant challenge. We implemented progressive enhancement techniques to ensure the experience scales well across different devices.",
    technologies: ["Three.js", "WebGL", "Svelte", "GSAP", "WebAssembly"],
    features: [
      "Interactive 3D visualizations",
      "Physics-based animations",
      "Gesture-controlled interface",
      "Audio-reactive elements",
      "Accessibility features for all users",
    ],
    //demoUrl: "https://demo.example.com/project-b",
    githubUrl: "https://github.com/yourusername/project-b",
    galleryImages: [
      "/placeholder-image-2.jpg",
      "/placeholder-image-1.jpg",
      "/placeholder-image-3.jpg",
    ],
  },
  {
    id: "3",
    title: "Project C",
    description: "Pushing the envelope of development",
    imageUrl: "/placeholder-image-3.jpg",
    path: "/project-gamma",
    detailedDescription:
      "Project C is a comprehensive solution for data analysis and visualization. It helps organizations make sense of complex datasets through intuitive interfaces and powerful processing capabilities.",
    problem:
      "Data analysis tools are often either too complex for non-technical users or too limited for advanced analysis needs.",
    solution:
      "We've created a platform that scales in complexity based on user expertise, providing both simple dashboards and advanced analysis tools in one cohesive system.",
    challenges:
      "Creating an interface that works for both beginners and experts required careful UX research and multiple iterations based on user feedback.",
    technologies: [
      "D3.js",
      "Python",
      "Flask",
      "PostgreSQL",
      "Redis",
      "TensorFlow",
    ],
    features: [
      "Customizable dashboards",
      "Machine learning insights",
      "Data transformation tools",
      "Export and sharing options",
      "Automated report generation",
    ],
    //demoUrl: "https://demo.example.com/project-c",
    githubUrl: "https://github.com/yourusername/project-c",
    galleryImages: [
      "/placeholder-image-3.jpg",
      "/placeholder-image-1.jpg",
      "/placeholder-image-2.jpg",
    ],
  },
]
