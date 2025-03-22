// projects.ts
import type { Project } from "./types"

export const projects: Project[] = [
  {
    id: "1",
    title: "Anthony White",
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
    title: "Professional Network Visualizer",
    description: "An easier way to map out your professional network",
    imageUrl: "",
    detailedDescription:
      "This tool was the result of a hackathon, where I was in the middle of going down a 5+ person referral chain and I was worrying about following up with one person while reporting back to another. I liked the ability to connect and reach out to a plethora of people through the internet but trying to keep track alongside school and my other responsibilities made me seek out a tool that I didn't find at the time, so I decided to start making one.",
    problem:
      "While Linkedin does a good job of allowing you to connect with many people, it's difficult to manage and remember all the different people that you're connected with. This becomes especially challenging when you start managing a referral chain - one person connects you to another, who connects you to another. Trying to keep up while making sure everyone is kept in the loop becomes a hassle.",
    solution:
      "By using React, Force Graph, and Flask we made a website demo that lets users track a clear referral chain. Starting from yourself you can add nodes to represent other people that you've talked to, represent their referrals, and continually do so in a clear way.",
    challenges:
      "As this project was built during a Hackathon timeframe, we had to focus on what was technically possible and core to the overall vision of the project. While stressful, it was a fun and very rewarding experience.",
    technologies: ["React", "Flask", "React-Force-Graph", "Git"],
    features: [
      "Network Graph Visualization",
      "Node Adding",
      "Email Suggestions (Thank You and Update Emails) - Planned for the Future",
      "Follow-up Reminders - Planned for the Future",
      "Linkedin integration (Using linkedin search to add information) - Planned for the Future",
      "Calendar Integration (Meeting Scheduling and Follow-up reminders) - Planned for the Future",
    ],
    githubUrl: "https://github.com/Anthony-W03/LVC_Hack_BAAL",
    galleryImages: [
    ],
  },
  {
    id: "3",
    title: "Push Ahead Website",
    description: "Laying the scaffolding for a non-profit's website",
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
  {
    id: "4",
    title: "Real Estate Application",
    description: "",
    imageUrl: "",
    path: "",
    detailedDescription: "",
    problem: "",
    solution: "",
    challenges: "",
    technologies: [],
    features: [],
    demoUrl: "",
    githubUrl: "",
    galleryImages: [],
  },
  {
    id: "5",
    title: "Spotify Door Decoration Script",
    description: "Automating the making of door decorations for my residents",
    imageUrl: "",
    path: "",
    detailedDescription: "",
    problem: "",
    solution: "",
    challenges: "",
    technologies: [],
    features: [],
    demoUrl: "",
    githubUrl: "",
    galleryImages: [],
  },
  {
    id: "6",
    title: "Personal Website",
    description: "The website you're viewing right now!",
    imageUrl: "",
    path: "",
    detailedDescription: "",
    problem: "",
    solution: "",
    challenges: "",
    technologies: [],
    features: [],
    demoUrl: "",
    githubUrl: "",
    galleryImages: [],
  },
  {
    id: "7",
    title: "Lincoln Center Editions",
    description: "Elevating Lincoln Center's Editions website",
    imageUrl: "",
    path: "",
    detailedDescription: "",
    problem: "",
    solution: "",
    challenges: "",
    technologies: [],
    features: [],
    demoUrl: "",
    githubUrl: "",
    galleryImages: [],
  }
]

/*
 *  id: "6",
    title: "Personal Website",
    description: "The website you're viewing right now!",
    imageUrl: "",
    path: "",
    detailedDescription: "",
    problem: "",
    solution: "",
    challenges: "",
    technologies: [],
    features: [],
    demoUrl: "",
    githubUrl: "",
    galleryImages: [],
 * 
 */
