'use client';

import Link from 'next/link';
import { FaYoutube, FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaReddit, FaGithub, FaArrowUp, FaCertificate, FaHeart } from 'react-icons/fa';
import { HiMail, HiLocationMarker, HiExternalLink } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';
import { useEffect, useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const socialLinks = [
    { name: 'YouTube', icon: <FaYoutube size={20} />, url: personalInfo.socialLinks.find(link => link.name === 'YouTube')?.url || '#' },
    { name: 'Facebook', icon: <FaFacebook size={20} />, url: personalInfo.socialLinks.find(link => link.name === 'Facebook')?.url || '#' },
    { name: 'LinkedIn', icon: <FaLinkedin size={20} />, url: personalInfo.socialLinks.find(link => link.name === 'LinkedIn')?.url || '#' },
    { name: 'Instagram', icon: <FaInstagram size={20} />, url: personalInfo.socialLinks.find(link => link.name === 'Instagram')?.url || '#' },
    { name: 'Twitter', icon: <FaTwitter size={20} />, url: personalInfo.socialLinks.find(link => link.name === 'Twitter')?.url || '#' },
    { name: 'Reddit', icon: <FaReddit size={20} />, url: personalInfo.socialLinks.find(link => link.name === 'Reddit')?.url || '#' },
    { name: 'GitHub', icon: <FaGithub size={20} />, url: personalInfo.socialLinks.find(link => link.name === 'GitHub')?.url || '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto relative">
      {/* Back to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0.8,
          y: showScrollTop ? 0 : 10
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </motion.button>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Top section with logo and social links */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="mb-8 md:mb-0 text-center md:text-left"
            variants={itemVariants}
          >
            <Link href="/">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-500">
                {personalInfo.name}
              </h2>
            </Link>
            <p className="text-secondary dark:text-light mt-3 max-w-md">
              {personalInfo.title}
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white dark:bg-dark text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Middle section with quick links and contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-xl p-5 hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-4 text-dark dark:text-light flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block group-hover:scale-150 transition-transform"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block group-hover:scale-150 transition-transform"></span>
                  <span className="group-hover:translate-x-1 transition-transform">About</span>
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block group-hover:scale-150 transition-transform"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Projects</span>
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block group-hover:scale-150 transition-transform"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Skills</span>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl p-5 hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-4 text-dark dark:text-light flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-accent to-info rounded mr-2"></span>
              Learn More
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/education" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-info inline-block group-hover:scale-150 transition-transform"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Education</span>
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-info inline-block group-hover:scale-150 transition-transform"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Showcase</span>
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-info inline-block group-hover:scale-150 transition-transform"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Resume</span>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-xl p-5 hover:bg-white dark:hover:bg-gray-800/50 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-4 text-dark dark:text-light flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-info to-success rounded mr-2"></span>
              Get in Touch
            </h3>
            <div className="space-y-4">
              <motion.p 
                className="text-gray-600 dark:text-gray-400 flex items-center gap-3 group"
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
              >
                <span className="text-primary p-2 bg-primary/10 rounded-full transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <HiMail size={18} />
                </span>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="hover:text-primary transition-colors duration-300"
                >
                  {personalInfo.email}
                </a>
              </motion.p>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 flex items-center gap-3 group"
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
              >
                <span className="text-primary p-2 bg-primary/10 rounded-full transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <HiLocationMarker size={18} />
                </span>
                <span>{personalInfo.location}</span>
              </motion.p>
              <div className="pt-2">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:from-accent hover:to-primary transition-all duration-500 shadow-md hover:shadow-xl group"
                >
                  Contact Me
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 1.5 
                    }}
                  >
                    <HiExternalLink size={16} />
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom copyright section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          
          <p className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <motion.span 
              whileHover={{ scale: 1.2, rotate: 10 }}
              className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white"
            >
              <FaHeart size={12} />
            </motion.span>
            Made with passion using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
