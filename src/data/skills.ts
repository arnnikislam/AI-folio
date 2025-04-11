interface Skill {
  name: string;
  icon?: string;
  level?: string;
}

interface SkillsData {
  languages: Skill[];
  tools: Skill[];
  platforms: Skill[];
  hacking: Skill[];
  os: Skill[];
  currentlyLearning: string[];
}

export const skills: SkillsData = {
  languages: [
    { name: "HTML", icon: "html5", level: "75%" },
    { name: "CSS", icon: "css3", level: "60%" },
    { name: "JavaScript", icon: "javascript", level: "45%" },
    { name: "C", icon: "c", level: "40%" },
    { name: "Markdown", icon: "markdown", level: "70%" }
  ],
  tools: [
    { name: "Git", icon: "git", level: "55%" },
    { name: "VS Code", icon: "vscode", level: "75%" },
    { name: "Kali Linux", icon: "linux", level: "50%" },
    { name: "Figma", icon: "figma", level: "40%" },
    { name: "Canva", icon: "canva", level: "70%" }
  ],
  platforms: [
    { name: "GitHub", icon: "github", level: "60%" },
    { name: "Vercel", icon: "vercel", level: "45%" },
    { name: "Firebase", icon: "firebase", level: "40%" },
    { name: "Netlify", icon: "netlify", level: "45%" }
  ],
  hacking: [
    { name: "Fluxion", level: "55%" },
    { name: "Airgeddon", level: "50%" },
    { name: "Wifite", level: "60%" },
    { name: "Wifiphisher", level: "45%" },
    { name: "Aircrack-ng", level: "65%" }
  ],
  os: [
    { name: "Windows", icon: "windows", level: "90%" },
    { name: "Linux", icon: "linux", level: "75%" },
    { name: "Ubuntu", icon: "ubuntu", level: "50%" },
    { name: "Zorin OS", icon: "linux", level: "45%" },
    { name: "Android", icon: "android", level: "85%" }
  ],
  currentlyLearning: [
    "Deep dive into HTML & CSS",
    "Git & GitHub for collaborative workflows",
    "Basics of Kali Linux for ethical hacking",
    "WiFi penetration testing tools"
  ]
};
