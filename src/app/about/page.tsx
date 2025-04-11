'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { personalInfo } from '@/data/personalInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | Arnnik Islam Payel',
  description: 'Learn more about Arnnik Islam Payel - Web Developer, Wi-Fi Pentester, and Tech Content Creator. Discover my journey, skills, and passion for technology.',
  openGraph: {
    title: 'About Me | Arnnik Islam Payel',
    description: 'Learn more about Arnnik Islam Payel - Web Developer, Wi-Fi Pentester, and Tech Content Creator. Discover my journey, skills, and passion for technology.',
    images: [
      {
        url: 'https://arnnikislam.vercel.app/assets/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Arnnik Islam Payel - About Me',
      },
    ],
  },
};

export default function About() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="section-container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title gradient-text">About Me</h1>
          <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
            Get to know more about me, my background, and what drives my passion for technology and learning.
          </p>
        </motion.div>
        
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative h-96 md:h-[450px] rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform hover:rotate-2 transition-all duration-500">
            <Image
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              fill
              priority
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div>
            <h2 className="section-subtitle mb-4">
              <span className="text-primary">Hello!</span> I'm {personalInfo.name}
            </h2>
            <p className="mb-6 text-secondary dark:text-light">
              {personalInfo.about}
            </p>
            
            <div className="space-y-3 mb-8">
              {personalInfo.details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="mr-2 mt-1 text-primary">•</div>
                  <p className="text-secondary dark:text-light">{detail}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Resume
              </motion.a>
              
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="btn btn-outline inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="section-subtitle text-center mb-8 gradient-text">My Journey</h2>
          <div className="bg-white dark:bg-secondary rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300">
            <p className="text-secondary dark:text-light mb-6">
              I'm a student from Bangladesh with a passion for technology and learning. My journey in the tech world started with a curiosity about how things work, which led me to explore various aspects of computing, from basic programming to ethical hacking.
            </p>
            <p className="text-secondary dark:text-light mb-6">
              Currently, I'm focused on building a strong foundation in web development, starting with HTML and CSS. I'm also exploring the world of ethical hacking, particularly WiFi security, to understand the importance of cybersecurity in our increasingly connected world.
            </p>
            <p className="text-secondary dark:text-light">
              Beyond technical skills, I'm passionate about sharing knowledge through my YouTube channel, where I create content on tech tutorials, ethical hacking guides, and mobile tips in both Bangla and English. I believe in learning by doing and teaching, which helps me solidify my understanding while helping others on their tech journey.
            </p>
          </div>
        </motion.div>
      </section>
      
      <Footer />
    </main>
  );
}
