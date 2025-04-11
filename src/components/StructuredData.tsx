import { personalInfo } from '@/data/personalInfo';

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "url": "https://arnnikislam.vercel.app",
    "sameAs": [
      personalInfo.socialLinks.github,
      personalInfo.socialLinks.linkedin,
      personalInfo.socialLinks.twitter,
      personalInfo.socialLinks.youtube
    ],
    "jobTitle": personalInfo.title.split('|').map(title => title.trim()),
    "description": "Web Developer, Wi-Fi Pentester, and Tech Content Creator",
    "image": personalInfo.profileImage,
    "knowsAbout": [
      "Web Development",
      "Wi-Fi Security",
      "Cybersecurity",
      "React",
      "Next.js",
      "TypeScript"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 