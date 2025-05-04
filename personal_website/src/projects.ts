// projects.ts
import type { Project } from "./types"

export const projects: Project[] = [
  {
    id: "1",
    title: "About Me",
    description: "Hello! I'm Anthony, a software engineer who enjoys hard problems and reducing stress for my team.",
    imageUrl: "/media/images/projectImages/MePic.jpg",
    path: "/project-alpha",
    detailedDescription:
      "I'm a Computer Science student at Lafayette College, born and raised in the Bronx. I've been programming since 4th grade in some form or another, so I'm confident in my problem solving skills and analytical thinking. Within teams I adapt to whatever role is needed, whether that be a project manager, designer, or developer. I believe I'm most effective when their's a environment of trust and open communication, and I aim to foster that in every team I'm a part of.",
    currentFocus:
      "I'm currently looking for a full-time position as a front-end software engineer, working on a real estate application, and am throwing myself into learning more about AI and its applications.",
    futurePlans:
      "I want to get my CAPM and PMP certifications within the next few years and transfer into a Project/Engineering Manager role.",
    funfacts:
      "I'm a big Pokemon fan, I've been playing since I was 10 and am looking to make my own fan game in the future. I also love to cook and eat, and I'm always looking for new recipes to try out and restaurants to visit. Huge NBA fan as well, so feel free to talk to me about the league anytime.",
    technologies: [
      "JavaScript",
      "Java",
      "React",
      "Python",
      "CSS",
    ],
    linkedinUrl: "https://www.linkedin.com/in/anthony-white03/",
    galleryImages: [
      "/media/images/projectImages/MyNameIs.png"
    ],
  },
  {
    id: "2",
    title: "Professional Network Visualizer",
    description: "An easier way to map out your professional network",
    imageUrl: "/media/images/projectImages/forceGraph.webp",
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
    galleryImages: [],
  },
  {
    id: "3",
    title: "Push Ahead Website",
    description: "Laying the scaffolding for a non-profit's website",
    imageUrl: "/media/images/projectImages/push_ahead_1.png",
    path: "/project-gamma",
    detailedDescription:
      "This project was heavily client focused, where we worked alongside the creator of Push Ahead, a non-profit focused on promoting mindfulness through skateboarding towards kids. We completed this project in multiple phases, including speaking with potential users, completing usability testing, and going through multiple design iterations to nail down the idea. During this project I held the project manager role as well as taking a sizable amount of the design and implementation duties.",
    problem:
      "Our client needed a website to showcase to investors and schools to support the image of his non-profit.",
    solution:
      "After going through multiple development phases we were able to come up with a demo that our client could use as a reference point and leverage in order to fuel the final design of the website.",
    challenges:
      "This project required a lot of coordination with other parties to get interviews, hold testing, and gather feedback. Keeping these organized and turning all of it into actionable tasks was a large but very rewarding challenge, and the client was very happy with the outcome at the end of the process.",
    technologies: ["React", "Vite", "TailwindCSS", "React Router"],
    features: [
      "Responsive Design",
      "Clear Navigation Structure",
      "Accessible UI Components",
    ],
    githubUrl: "https://github.com/Anthony-W03/HCI-ACA",
    galleryImages: [
      "/media/images/projectImages/push_ahead_1.png",
      "/media/images/projectImages/push_ahead_2.png",
    ],
  },
  // {
  //   id: "4",
  //   title: "Real Estate Application",
  //   description: "Making real estate evaluations more accessible - In Progress",
  //   imageUrl: "",
  //   detailedDescription: "",
  //   problem: "",
  //   solution: "",
  //   challenges: "",
  //   technologies: [],
  //   features: [],
  //   //demoUrl: "",
  //   githubUrl: "https://github.com/JB4178/TeamSharksRealEstate",
  //   galleryImages: [],
  // },
  {
    id: "4",
    title: "Spotify Door Decoration Script",
    description: "Automating the making of door decorations for my residents",
    imageUrl: "/media/images/projectImages/Spotify_main.png",
    detailedDescription:
      "As an RA we have to make new door decorations for every semester, and I wanted mine to be my residents' favorite albums. Since I had 20+ decorations to make, I ended up automating the process using the Spotify API and a few other libraries in order to generate these images.",
    problem:
      "I wanted to make door decorations for my residents with standardized formatting, without having to fiddle with Canva or other photo editing software.",
    solution:
      "I came up with a simple script that took in my resident's favorite album links, pulled down album titles, covers, and spotify codes using the Spotify API, and then combined them into one image",
    challenges:
      "It was a fun challenge learning how to interact with the Spotify API and make a little script that I'm reminded of whenever I walk around my floor",
    technologies: ["Python", "Spotipy", "Pillow (Image Processing)"],
    githubUrl: "https://github.com/Anthony-W03/SpotifyCodeGen",
    galleryImages: [
      "/media/images/projectImages/Spotify_main.png",
      "media/images/projectImages/Anthony_composite.png",
      "media/images/projectImages/Pedro_composite.png",
    ],
  },
  {
    id: "5",
    title: "Personal Website",
    imageUrl: "/media/images/projectImages/PersonalWebsite.png",
    description: "The website you're viewing right now!",
    detailedDescription:
      "I wanted to make a website to display my different projects and to test my WebDev skills. I specifically chose to use Svelte for this project as I had only had experience with React before and I wanted to understand another web framework.",
    problem:
      "I didn't have a clean place that linked to all of my projects, with role attribution and my thoughts.",
    solution:
      "I built a website using Svelte, Tailwind, and TypeScript to act as a hub for my various projects",
    challenges:
      "Making sure all the animations worked was an interesting challenge that I'm glad experienced.",
    technologies: ["Svelte 5", "Tailwind CSS", "TypeScript", "Vite"],
    features: [
      "Background and Effect Music",
      "Animated Information Boxes",
      "Informative Content",
    ],
    githubUrl: "https://github.com/Anthony-W03/anthony-w03.github.io",
    galleryImages: [],
    sources: [
      "Background Music: https://soundcloud.com/superiorsnivys/castelia-city-lo-fi-remix-anecdoche?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    ],
  },
  {
    id: "6",
    title: "Lincoln Center Editions",
    description: "Elevating Lincoln Center's Editions website",
    imageUrl: "/media/images/projectImages/LincolnCenterNew.png",
    detailedDescription:
      "During my internship at Lincoln Center, one of my big tasks was facilitating the complete revamp of the Lincoln Center Editions website. Due to it's outdated look and confusing documentation, it had fallen out of repair and gave the team behind it headaches. I worked alongside 2 other interns to update the website, create documentation behind the different internal processes, and clear up confusion for the team that uses the website.",
    problem:
      "The Lincoln Center Editions website had fallen out of repair and was confusing to operate for the team (second image in gallery was the old website)",
    solution:
      "We completely reworked the UI of the website, making it easier to navigate for users interested in viewing the artwork on the website, as well as improving the experience for internal clients by making documentation for key processes.",
    challenges:
      "Learning Shopify well enough to create meaningful documentation was a good challenge that helped my learn alot. Thankfully our clients ended up very satisfied with our work.",
    technologies: ["Shopify", "CSS"],
    demoUrl: "https://art.lincolncenter.org/",
    galleryImages: [
      "/media/images/projectImages/LincolnCenterNew.png",
      "/media/images/projectImages/LincolnCenterOld.png",
    ],
  },
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
