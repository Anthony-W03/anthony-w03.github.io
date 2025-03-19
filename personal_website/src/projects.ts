// projects.ts
import type { Project } from './types';

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React and Node.js",
    imageUrl: "/images/ecommerce.jpg",
    path: "/projects/ecommerce",
    detailedDescription: "This full-stack e-commerce platform features user authentication, product catalog, shopping cart, and payment processing with Stripe. The admin dashboard allows for product and order management.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux"],
    demoUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    features: [
      "User authentication and profiles",
      "Product search and filtering",
      "Shopping cart and wishlist",
      "Secure checkout with Stripe",
      "Order tracking",
      "Admin dashboard"
    ]
  },
  {
    id: "project-2",
    title: "Weather Dashboard",
    description: "Real-time weather application with forecast data",
    imageUrl: "/images/weather.jpg",
    path: "/projects/weather",
    detailedDescription: "This weather dashboard provides real-time weather information and forecasts for any location. It uses the OpenWeatherMap API to fetch data and displays it in an intuitive interface with interactive charts.",
    technologies: ["Svelte", "TypeScript", "Chart.js", "OpenWeatherMap API", "Tailwind CSS"],
    demoUrl: "https://weather-app.example.com",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    features: [
      "Current weather conditions",
      "5-day forecast",
      "Location search",
      "Interactive temperature charts",
      "UV index and air quality data",
      "Responsive design for all devices"
    ]
  },
  // Add more projects as needed
];
