'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowDown, FaYoutube, FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaGithub, FaReddit, FaCertificate, FaChevronRight } from 'react-icons/fa';
import { HiCode, HiAcademicCap, HiDocumentText } from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import { personalInfo } from '@/data/personalInfo';
import { skills } from '@/data/skills';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Function to scroll to the about section
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const socialIcons = {
    YouTube: <FaYoutube size={24} />,
    Facebook: <FaFacebook size={24} />,
    LinkedIn: <FaLinkedin size={24} />,
    Instagram: <FaInstagram size={24} />,
    Twitter: <FaTwitter size={24} />,
    GitHub: <FaGithub size={24} />,
    Reddit: <FaReddit size={24} />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a23] overflow-hidden"
      >
        {/* Background Elements for Dark Theme */}
        <div className="absolute inset-0 z-0 overflow-hidden dark:block hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            {/* Animated code-like background */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`code-line-${i}`}
                className="absolute text-[#4285f4] opacity-20 whitespace-nowrap font-mono text-xs md:text-sm"
                style={{
                  top: `${(i * 5) % 100}%`,
                  left: `${(i * 7) % 100}%`,
                }}
                animate={{
                  y: [`${-100}vh`, `${200}vh`],
                }}
                transition={{
                  duration: 30 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              >
                {Array.from({ length: 5 }).map((_, j) => {
                  const codeSnippets = [
                    'const data = {',
                    'let config = [',
                    'function init() {',
                    'const api = axios.create({',
                    'export default class {',
                  ];
                  return (
                    <div key={j} className="my-3">
                      {codeSnippets[(i + j) % codeSnippets.length]}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
          
          {/* Star-like dots for dark theme */}
          <div className="absolute inset-0">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: (i % 3) + 1,
                  height: (i % 3) + 1,
                  top: `${(i * 2.5) % 100}%`,
                  left: `${(i * 3.7) % 100}%`,
                  opacity: 0.2 + ((i % 5) * 0.06),
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
          
          {/* Gradient overlays for dark theme */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0a0a23] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a23] to-transparent"></div>
        </div>
        
        {/* Background Elements for Light Theme */}
        <div className="absolute inset-0 z-0 overflow-hidden dark:hidden block">
        <motion.div
            style={{ y: y1 }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute -bottom-40 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8">
            {/* Left Column - will appear first on mobile */}
            <motion.div 
              className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0 z-10 order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Profile Image for small devices - only shown on mobile */}
              <motion.div 
                className="relative w-40 h-40 mx-auto md:hidden mb-8 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              fill
              priority
                  className="object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent"
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    rotate: [0, 25]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
            />
          </motion.div>
          
              {/* Welcome Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-[#0c1330] border border-primary/30 dark:border-[#1e2c5f] text-primary dark:text-white text-sm mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary dark:bg-[#4285f4]"></div>
                Welcome to my universe
              </motion.div>
              
              {/* Name Heading */}
          <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 text-secondary dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Hi, I'm <span className="bg-gradient-to-r from-primary to-accent dark:from-[#4285f4] dark:via-[#a16eff] dark:to-[#64ffda] bg-clip-text text-transparent">{personalInfo.name}</span>
          </motion.h1>
          
              {/* Role Tags - showing each item separately */}
              <motion.div
                className="flex flex-wrap justify-center md:justify-start gap-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {personalInfo.title.split('|').map((item, index) => (
                  <motion.span 
                    key={index}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3, 
                      boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.3)"
                    }}
                    className={`px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-all duration-300 ${
                      index === 0 ? 'bg-primary/10 text-primary dark:bg-[#4285f4]/20 dark:text-[#a1b1f7] dark:border dark:border-[#4285f4]/30' : 
                      index === 1 ? 'bg-accent/10 text-accent dark:bg-[#ee5f80]/20 dark:text-[#f7a1ba] dark:border dark:border-[#ee5f80]/30' : 
                      index === 2 ? 'bg-info/10 text-info dark:bg-[#8c5cbd]/20 dark:text-[#c9a1f7] dark:border dark:border-[#8c5cbd]/30' : 
                      'bg-success/10 text-success dark:bg-[#64ffda]/20 dark:text-[#a1f7df] dark:border dark:border-[#64ffda]/30'
                    }`}
                  >
                    {item.trim()}
                  </motion.span>
                ))}
              </motion.div>
              
              {/* Brief Description */}
              <motion.p 
                className="text-lg text-secondary dark:text-[#9aa3bc] mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {personalInfo.about.split('.')[0] + '.'}
              </motion.p>
              
              {/* Social Icons */}
          <motion.div 
                className="flex flex-wrap justify-center md:justify-start space-x-5 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {personalInfo.socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                    className="text-secondary dark:text-[#9aa3bc] hover:text-primary dark:hover:text-white relative"
                    whileHover={{ 
                      scale: 1.2, 
                      y: -3,
                      color: link.name === 'YouTube' ? '#FF0000' : 
                             link.name === 'Facebook' ? '#1877F2' : 
                             link.name === 'LinkedIn' ? '#0A66C2' : 
                             link.name === 'Instagram' ? '#E4405F' : 
                             link.name === 'Twitter' ? '#1DA1F2' : 
                             link.name === 'Reddit' ? '#FF4500' : 
                             link.name === 'GitHub' ? '#FFFFFF' : '#FFFFFF'
                    }}
                    whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                {socialIcons[link.name as keyof typeof socialIcons]}
                    <motion.span 
                      className="absolute -inset-2 rounded-full bg-primary/10 dark:bg-white/10 blur-sm z-0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
              </motion.a>
            ))}
          </motion.div>
          
              {/* CTA Buttons */}
          <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/about">
              <motion.button
                    className="btn btn-primary dark:bg-[#4285f4] dark:hover:bg-[#2a6bde]"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Me
              </motion.button>
            </Link>
            
            <Link href="/contact">
              <motion.button
                    className="btn btn-outline dark:border-[#4285f4] dark:text-[#4285f4] dark:hover:bg-[#4285f4]/10"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>
            </motion.div>
            
            {/* Right Column - Code Editor - will appear second on mobile */}
            <motion.div 
              className="w-full md:w-1/2 flex justify-center md:justify-end z-10 order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="w-full max-w-lg relative">
                {/* Code Editor Window - responsive sizing */}
                <div className="rounded-lg overflow-hidden border border-primary/30 dark:border-[#1e2c5f] shadow-2xl max-w-full">
                  {/* Title Bar */}
                  <div className="bg-gray-100 dark:bg-[#1c233d] px-4 py-2 flex items-center">
                    <div className="flex space-x-2 mr-4">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <span className="text-gray-600 dark:text-[#9aa3bc] text-xs md:text-sm">developer.js</span>
                  </div>
                  
                  {/* Code Content */}
                  <div className="bg-white dark:bg-[#0d1117] p-3 md:p-6 font-mono text-xs md:text-sm text-gray-700 dark:text-[#9aa3bc] overflow-auto max-h-[350px] md:max-h-none">
                    <div className="whitespace-pre-wrap break-words">
                      <span className="text-purple-600 dark:text-[#c678dd]">const</span> <span className="text-yellow-600 dark:text-[#e5c07b]">profile</span> <span className="text-gray-800 dark:text-white">=</span> <span className="text-purple-600 dark:text-[#c678dd]">{"{"}</span>
                      <br />
                      <span className="ml-4 text-red-500 dark:text-[#e06c75]">name</span><span className="text-gray-800 dark:text-white">:</span> <span className="text-green-600 dark:text-[#98c379]">'{personalInfo.name}'</span><span className="text-gray-800 dark:text-white">,</span>
                      <br />
                      <span className="ml-4 text-red-500 dark:text-[#e06c75]">title</span><span className="text-gray-800 dark:text-white">:</span> <span className="text-green-600 dark:text-[#98c379]">'Student | Developer'</span><span className="text-gray-800 dark:text-white">,</span>
                      <br />
                      <span className="ml-4 text-red-500 dark:text-[#e06c75]">skills</span><span className="text-gray-800 dark:text-white">:</span> <span className="text-purple-600 dark:text-[#c678dd]">[</span>
                      <br />
                      <span className="ml-8 text-green-600 dark:text-[#98c379]">'HTML'</span><span className="text-gray-800 dark:text-white">,</span> <span className="text-green-600 dark:text-[#98c379]">'CSS'</span><span className="text-gray-800 dark:text-white">,</span> <span className="text-green-600 dark:text-[#98c379]">'Git'</span><span className="text-gray-800 dark:text-white">,</span>
                      <br className="hidden sm:block" />
                      <span className="ml-8 text-green-600 dark:text-[#98c379]">'React'</span><span className="text-gray-800 dark:text-white">,</span> <span className="text-green-600 dark:text-[#98c379]">'MongoDB'</span>
                      <br />
                      <span className="ml-4 text-purple-600 dark:text-[#c678dd]">]</span><span className="text-gray-800 dark:text-white">;</span>
                    </div>
                  </div>
                </div>
                
                {/* Profile Image positioned for larger screens */}
                <div className="absolute -bottom-12 -left-16 hidden md:block">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/30 dark:border-[#4285f4]/30">
                      <Image 
                        src={personalInfo.profileImage}
                        alt={personalInfo.name}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                    <motion.div 
                      className="absolute -inset-1 rounded-full border-2 border-primary dark:border-[#4285f4] opacity-70"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
                
                {/* Profile Image for tablet view */}
                <div className="absolute -bottom-12 left-0 hidden sm:block md:hidden">
                  <div className="relative w-28 h-28">
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/30 dark:border-[#4285f4]/30">
                      <Image 
                        src={personalInfo.profileImage}
                        alt={personalInfo.name}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                    <motion.div 
                      className="absolute -inset-1 rounded-full border-2 border-primary dark:border-[#4285f4] opacity-70"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
                
                {/* Clean Code Badge */}
                <motion.div 
                  className="absolute -right-4 top-1/4 hidden sm:block"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  <div className="bg-gray-100 dark:bg-[#1c233d] text-primary dark:text-white px-4 py-2 rounded-md border border-primary/30 dark:border-[#1e2c5f]">
                    Clean Code
                  </div>
                </motion.div>
                
                {/* Innovation Badge */}
                <motion.div 
                  className="absolute right-10 bottom-0 hidden sm:block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  <div className="bg-gray-100 dark:bg-[#1c233d] text-accent dark:text-[#febc2e] px-4 py-2 rounded-md border border-accent/30 dark:border-[#1e2c5f]">
                    Innovation
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Down Button */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            style={{ opacity }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.2 }}
              className="p-2 rounded-full bg-primary/10 dark:bg-[#1c233d]/80 border border-primary/30 dark:border-[#1e2c5f]"
            >
              <FaArrowDown className="text-primary dark:text-white" size={24} />
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Brief About Section */}
      <section 
        id="about"
        ref={aboutRef}
        className="py-20 bg-white dark:bg-dark"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">About Me</h2>
            
            <p className="text-lg mb-8 text-secondary dark:text-light leading-relaxed">
              {personalInfo.about}
            </p>
            
            <div className="flex flex-col items-center max-w-lg mx-auto mb-12">
              {personalInfo.details.map((detail, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 mb-3 text-left w-full"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-300">{detail}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Link href="/about">
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Full Profile
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Skills & <span className="text-primary">Technologies</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Technologies and tools I've been working with recently
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10 max-w-5xl mx-auto">
            {[
              { name: "HTML", icon: "/assets/icons/skills/html.svg", level: "75%" },
              { name: "CSS", icon: "/assets/icons/skills/css.svg", level: "60%" },
              { name: "JavaScript", icon: "/assets/icons/skills/javascript.svg", level: "45%" }, 
              { name: "Git", icon: "/assets/icons/skills/git.svg", level: "55%" },
              { name: "React", icon: "/assets/icons/skills/react.svg", level: "40%" },
              { name: "Kali Linux", icon: "/assets/icons/skills/kali.svg", level: "50%" },
              { name: "VS Code", icon: "/assets/icons/skills/vscode.svg", level: "75%" },
              { name: "Figma", icon: "/assets/icons/skills/figma.svg", level: "40%" }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex flex-col items-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="mb-4 p-3 bg-white dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center shadow-sm">
                    {/* If icon file exists, show it, otherwise use a text placeholder */}
                    <div className="w-10 h-10 relative">
                      {/* Text fallback that shows up only if image fails to load */}
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                        {skill.name.charAt(0)}
                      </div>
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-full h-full object-contain relative z-10"
                        onError={(e) => {
                          // Make the target's opacity 0 if the image fails to load
                          e.currentTarget.style.opacity = "0";
                        }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white mb-2">{skill.name}</h3>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      transition={{ duration: 1, delay: 0.3 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Technologies Section */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
              <div className="md:w-1/2">
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  What I Do
                </motion.h3>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Web Development",
                      description: "Building responsive websites using modern HTML, CSS, and JavaScript.",
                      icon: "💻"
                    },
                    {
                      title: "Ethical Hacking",
                      description: "Analyzing and testing Wi-Fi network security to identify vulnerabilities.",
                      icon: "🔒"
                    },
                    {
                      title: "Content Creation",
                      description: "Creating educational tech content focused on development and security.",
                      icon: "📹"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/2">
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Currently Learning
                </motion.h3>
                
                <motion.div 
                  className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ul className="space-y-3">
                    {skills.currentlyLearning.map((item, index) => (
                      <li key={index} className="flex items-baseline gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-1"></span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <Link href="/skills">
              <motion.button
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center gap-2 shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore All Skills
                <FaChevronRight size={14} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-white dark:bg-dark"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Explore My Portfolio
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <HiCode size={36} />, 
                title: "Projects", 
                description: "Check out my latest web development and pentesting projects.", 
                link: "/projects",
                color: "primary"
              },
              { 
                icon: <HiAcademicCap size={36} />, 
                title: "Education", 
                description: "Learn about my educational background and certifications.", 
                link: "/education",
                color: "info"
              },
              { 
                icon: <HiDocumentText size={36} />, 
                title: "Resume", 
                description: "View my resume and professional experience.", 
                link: "/resume",
                color: "accent"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full mb-4 ${
                    feature.color === "primary" ? "text-primary bg-primary/10" :
                    feature.color === "info" ? "text-info bg-info/10" :
                    feature.color === "accent" ? "text-accent bg-accent/10" :
                    "text-primary bg-primary/10"
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <Link href={feature.link}>
                    <motion.button
                      className={`px-4 py-2 rounded-md text-white ${
                        feature.color === "primary" ? "bg-primary hover:bg-primary/90" :
                        feature.color === "info" ? "bg-info hover:bg-info/90" :
                        feature.color === "accent" ? "bg-accent hover:bg-accent/90" :
                        "bg-primary hover:bg-primary/90"
                      } transition-all duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View {feature.title}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Projects Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Recent Projects
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
              A selection of my recent work and ongoing projects
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personal Portfolio Website",
                description: "A responsive portfolio website built with Next.js and Tailwind CSS",
                image: "/assets/projects/laptop-gradient.jpg",
                tags: ["React", "Next.js", "Tailwind"],
                link: "/projects/portfolio"
              },
              {
                title: "Wi-Fi Security Scanner",
                description: "Tool to analyze and test Wi-Fi network security vulnerabilities",
                image: "/assets/projects/satellite-dish.jpg", 
                tags: ["Kali Linux", "Python", "Networking"],
                link: "/projects/wifi-scanner"
              },
              {
                title: "Educational Content Platform",
                description: "Platform for sharing educational content and tutorials",
                image: "/assets/projects/macbook-desk.jpg",
                tags: ["YouTube", "Content Creation", "Education"],
                link: "/projects/education-platform"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-primary/80 text-white text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <Link href={project.link}>
                    <motion.button
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/projects">
              <motion.button
                className="btn btn-outline inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
                <FaChevronRight />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Certificates Section */}
      <section className="py-20 bg-white dark:bg-dark">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              My Showcase
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
              View my certifications and what people say about my work.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Internet Security Certification",
                issuer: "CyberSecurity Bangladesh",
                date: "August 2023",
                image: "/assets/certificates/certificate1.png"
              },
              {
                title: "Certificate of Participation",
                issuer: "Decode Knowledge Simplified",
                date: "June 26-29, 2022",
                image: "/assets/certificates/certificate2.jpg"
              },
              {
                title: "Digital Literacy Course",
                issuer: "Digital Literacy Center (ICT Division)",
                date: "August 08, 2022",
                image: "/assets/certificates/certificate3.jpg"
              }
            ].map((certificate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => window.location.href = '/showcase'}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Ribbon Badge */}
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                    <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-2 rotate-45 bg-primary text-white text-xs font-bold py-1 px-10 shadow-lg">
                      {certificate.date ? new Date(certificate.date.split("-")[0] || certificate.date).getFullYear() : ''}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="text-white mt-auto">
                      <h3 className="text-xl font-bold truncate">{certificate.title}</h3>
                      <p className="text-sm text-white/80">{certificate.issuer}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">{certificate.title}</h3>
                    <div className="flex items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-full p-1 shrink-0 ml-2">
                      <FaCertificate className="text-primary" size={16} />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {certificate.issuer} • {certificate.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/showcase">
              <motion.button
                className="btn btn-outline inline-flex items-center gap-2"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Showcase
                <FaChevronRight />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-primary rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              {/* Left Column - Text */}
              <div className="p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    Let's Work Together
                  </h2>
                  
                  <p className="text-white/90 mb-8 text-lg max-w-md">
                    Have a project in mind? I'm always open to discussing new projects, ideas, or opportunities.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <motion.button
                        className="px-6 py-3 bg-white text-primary font-medium rounded-lg shadow-sm hover:bg-gray-50 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Get In Touch
                      </motion.button>
                    </Link>
                    
                    <a href={`mailto:${personalInfo.email}`} className="inline-flex">
                      <motion.button
                        className="px-6 py-3 bg-transparent text-white border border-white/50 font-medium rounded-lg hover:bg-white/10 transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Email Me
                      </motion.button>
                    </a>
                  </div>
                </motion.div>
              </div>
              
              {/* Right column - Decoration */}
              <div className="hidden md:block p-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative text-white text-center">
                    <div className="text-7xl mb-4">👋</div>
                    <p className="text-xl font-semibold">Available for freelance</p>
                    <p className="text-white/80 mt-2">Projects starting from June 2024</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
