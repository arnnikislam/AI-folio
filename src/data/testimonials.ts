interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
  linkedin?: string;
  featured?: boolean;
  category: 'mentor' | 'colleague' | 'client';
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Web Developer",
    company: "TechForward",
    image: "/assets/testimonials/p1.jpg",
    testimonial: "Arnnik's passion for web development and ethical hacking is impressive. His attention to detail and problem-solving skills make him stand out. I was particularly impressed with his ability to quickly learn new technologies and apply them effectively.",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    featured: true,
    category: 'mentor',
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    role: "Project Manager",
    company: "CodeCraft Solutions",
    image: "/assets/testimonials/p2.jpg",
    testimonial: "Working with Arnnik was a pleasure. His enthusiasm for technology and willingness to go the extra mile made our project a success. He's not only skilled in technical areas but also communicates clearly and meets deadlines consistently.",
    linkedin: "https://linkedin.com/in/davidchen",
    featured: true,
    category: 'client',
    rating: 4.5
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Cybersecurity Specialist",
    company: "SecureNet",
    image: "/assets/testimonials/p3.jpg",
    testimonial: "I mentored Arnnik during a WiFi security workshop, and I was thoroughly impressed by his aptitude for ethical hacking. He grasps complex security concepts quickly and has the rare ability to explain them in simple terms to others.",
    linkedin: "https://linkedin.com/in/priyapatel",
    category: 'mentor',
    rating: 5
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "Course Instructor",
    company: "CodeAcademy",
    image: "/assets/testimonials/p4.jpg",
    testimonial: "As Arnnik's instructor, I noticed his exceptional dedication to learning. He consistently submitted high-quality work and often helped other students understand difficult concepts. His technical content creation skills are equally impressive.",
    linkedin: "https://linkedin.com/in/michaelrodriguez",
    category: 'mentor',
    rating: 4.5
  },
  {
    id: 5,
    name: "Aisha Khan",
    role: "UI/UX Designer",
    company: "VisualCraft",
    image: "/assets/testimonials/p3.jpg",
    testimonial: "I collaborated with Arnnik on a web project where he handled the front-end implementation of my designs. His attention to detail and commitment to pixel-perfect implementation was remarkable. He's also very receptive to feedback and iterations.",
    linkedin: "https://linkedin.com/in/aishakhan",
    category: 'colleague',
    rating: 5
  }
]; 