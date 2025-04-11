interface SocialLink {
  name: string;
  url: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  about: string;
  details: string[];
  socialLinks: SocialLink[];
  resumeUrl: string;
  profileImage: string;
}

export const personalInfo: PersonalInfo = {
  name: "Arnnik Islam Payel",
  title: "Student | Aspiring Web Developer | Wi-Fi Pentester | Tech Content Creator",
  email: "arnnikislam.socials@gmail.com",
  location: "Bangladesh",
  about: "Hey! I'm Payel, a student from Bangladesh who's passionate about tech, building cool stuff with code, and ethical hacking. Currently, I'm learning web development, creating content on YouTube, and exploring WiFi security.",
  details: [
    "🌱 Focused on HTML, CSS, Git, and real-life hacking tools.",
    "🎯 Dream: Get into a top public university as an engineer.",
    "✍️ Love building projects, documenting learning, and teaching through content."
  ],
  socialLinks: [
    { name: "YouTube", url: "https://youtube.com/@learnwitharnnik" },
    { name: "Facebook", url: "https://m.facebook.com/@LearnWithArnnik.fb/" },
    { name: "LinkedIn", url: "https://linkedin.com/in/arnnikislam" },
    { name: "Instagram", url: "https://www.instagram.com/arnnikislam" },
    { name: "Twitter", url: "https://twitter.com/arnnikislam" },
    { name: "Reddit", url: "https://www.reddit.com/u/arnnikislam" },
    { name: "GitHub", url: "https://github.com/arnnikislam" }
  ],
  resumeUrl: "/assets/resume.pdf",
  profileImage: "/assets/profile.jpg"
};
