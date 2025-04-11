interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  githubLink?: string; // Optional GitHub link
  featured: boolean;
  date: string; // Date in format like "2023-05-15" or "2022-Q3"
}

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring dark mode, animations, and a clean UI.",
    image: "/assets/projects/laptop-gradient.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/my-portfolio",
    featured: true,
    date: "2023-04-10"
  },
  {
    title: "Wi-Fi Pentesting Framework",
    description: "A collection of custom scripts and tools for Wi-Fi security research and penetration testing, designed for educational purposes.",
    image: "/assets/projects/satellite-dish.jpg",
    tags: ["Python", "Bash", "Network Security", "Kali Linux"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/wifi-tools",
    featured: true,
    date: "2023-01-15"
  },
  {
    title: "Learn With Arnnik YouTube Channel",
    description: "Educational YouTube channel focused on tech tutorials, ethical hacking guides, and mobile tips in both Bangla and English.",
    image: "/assets/projects/earth-view.jpg",
    tags: ["Content Creation", "Education", "Tech Tutorials"],
    link: "https://youtube.com/@learnwitharnnik",
    featured: true,
    date: "2022-11-05"
  },
  {
    title: "Cybersecurity Blog",
    description: "A technical blog focused on cybersecurity topics, ethical hacking tutorials, and vulnerability research findings.",
    image: "/assets/projects/laptop-typing.jpg",
    tags: ["Next.js", "Markdown", "Cybersecurity", "Technical Writing"],
    link: "https://arnnik.vercel.app/",
    githubLink: "https://github.com/arnnikislam/tech-blog",
    featured: false,
    date: "2022-09-20"
  },
  {
    title: "Mobile Tech Assistant",
    description: "A mobile application that provides troubleshooting guides, optimization tips, and customization options for Android devices.",
    image: "/assets/projects/surface-laptop.jpg",
    tags: ["React Native", "Firebase", "Android", "Mobile Development"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/mobile-assistant",
    featured: false,
    date: "2022-07-08"
  },
  {
    title: "Network Scanner Tool",
    description: "A lightweight network scanning utility that helps identify devices, open ports, and potential vulnerabilities on a local network.",
    image: "/assets/projects/ai-robot.jpg",
    tags: ["Python", "Networking", "Security", "CLI Tool"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/network-scanner",
    featured: false,
    date: "2022-04-12"
  },
  {
    title: "Weather Dashboard",
    description: "A responsive weather dashboard that provides real-time weather data, forecasts, and visualizations using public weather APIs.",
    image: "/assets/projects/macbook-desk.jpg",
    tags: ["JavaScript", "APIs", "CSS", "Frontend"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/weather-dashboard",
    featured: false,
    date: "2021-12-03"
  },
  {
    title: "Task Management App",
    description: "A productivity-focused task management application with features like categories, priorities, reminders, and progress tracking.",
    image: "/assets/projects/pos-payment.jpg",
    tags: ["React", "Redux", "LocalStorage", "PWA"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/task-manager",
    featured: false,
    date: "2021-08-25"
  }
];
