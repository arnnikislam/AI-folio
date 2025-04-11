import { StaticImageData } from "next/image";
import { FaUniversity, FaLaptopCode, FaNetworkWired, FaHackerrank } from "react-icons/fa";
import { IconType } from "react-icons";

export interface Experience {
  title: string;
  company: string;
  location: string;
  description: string;
  icon?: IconType;
  startDate: string;
  endDate: string | "Present";
  type: "work" | "volunteer" | "education" | "certification";
  skills?: string[];
}

export const experiences: Experience[] = [
  {
    title: "Computer Science Student",
    company: "Debidwar Govt. College",
    location: "Cumilla, Bangladesh",
    description: "Pursuing higher secondary education with a focus on computer science fundamentals, mathematics, and physics.",
    icon: FaUniversity,
    startDate: "2022",
    endDate: "Present",
    type: "education",
    skills: ["Problem Solving", "Algorithms", "Mathematics"]
  },
  {
    title: "Wi-Fi Penetration Tester",
    company: "Self-employed",
    location: "Remote",
    description: "Conducting ethical Wi-Fi network security assessments to identify vulnerabilities and improve security posture.",
    icon: FaNetworkWired,
    startDate: "2021",
    endDate: "Present",
    type: "work",
    skills: ["Network Security", "Kali Linux", "Vulnerability Assessment"]
  },
  {
    title: "Tech Content Creator",
    company: "YouTube",
    location: "Online",
    description: "Creating educational content focused on web development, ethical hacking, and technology tutorials to share knowledge with the community.",
    icon: FaLaptopCode,
    startDate: "2020",
    endDate: "Present",
    type: "volunteer",
    skills: ["Content Creation", "Teaching", "Technology Communication"]
  },
  {
    title: "Hackathon Participant",
    company: "Various Events",
    location: "Bangladesh",
    description: "Participated in local hackathons, focusing on developing solutions to real-world problems using web technologies.",
    icon: FaHackerrank,
    startDate: "2019",
    endDate: "Present",
    type: "volunteer",
    skills: ["Team Collaboration", "Rapid Prototyping", "Problem Solving"]
  }
]; 