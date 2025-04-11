'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaSchool, FaCalendarAlt, FaBookOpen } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { education } from '@/data/education';

// Define Education interface for type safety
interface Education {
  degree: string;
  institution: string;
  focus: string;
  year: string;
  description: string;
}

export default function Education() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
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
          <h1 className="section-title gradient-text">Education</h1>
          <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
            My academic journey and educational background.
          </p>
        </motion.div>
        
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="timeline-container max-w-4xl mx-auto py-8 md:py-12"
        >
          {education.map((item: Education, index: number) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, y: 50 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`timeline-dot ${index % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}></div>
              
              <motion.div
                className={`timeline-content ${
                  index % 2 === 0 
                    ? 'bg-white dark:bg-dark border border-gray-200 dark:border-gray-800' 
                    : 'bg-gradient-to-r from-primary to-accent text-white border-none'
                } rounded-lg shadow-md transition-all duration-300`}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="p-5 md:p-6">
                  <div className="timeline-date">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      <span>{item.year}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2 mb-3">
                    <FaGraduationCap className={`mr-2 text-xl ${index % 2 === 0 ? 'text-primary' : 'text-white'}`} />
                    <h3 className="text-lg md:text-xl font-bold">{item.degree}</h3>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <FaSchool className="mr-2" />
                    <p className="font-medium text-sm md:text-base">
                      {item.institution}
                    </p>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <FaBookOpen className="mr-2" />
                    <p className="text-sm md:text-base">
                      Focus: {item.focus}
                    </p>
                  </div>
                  
                  <p className="mt-3 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Arrow indicator for timeline direction */}
                <div 
                  className={`absolute w-4 h-4 rotate-45 top-6 hidden md:block ${
                    index % 2 === 0 
                      ? 'right-[-8px] bg-white dark:bg-dark border-r border-t border-gray-200 dark:border-gray-800' 
                      : 'left-[-8px] bg-gradient-to-r from-primary to-accent'
                  }`}
                ></div>
                
                {/* Mobile arrow - always points left */}
                <div 
                  className={`absolute w-4 h-4 rotate-45 top-6 left-[-8px] md:hidden ${
                    index % 2 === 0 
                      ? 'bg-white dark:bg-dark border-l border-t border-gray-200 dark:border-gray-800' 
                      : 'bg-gradient-to-r from-primary to-accent'
                  }`}
                ></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <h2 className="section-subtitle mb-6 gradient-text">Educational Philosophy</h2>
          <motion.div 
            className="bg-white dark:bg-dark border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-6 md:p-8 transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)" }}
          >
            <p className="text-secondary dark:text-light mb-4 leading-relaxed">
              I believe in continuous learning and self-improvement. My educational journey reflects my passion for science and technology, and I'm committed to expanding my knowledge in these fields.
            </p>
            <p className="text-secondary dark:text-light leading-relaxed">
              Beyond formal education, I actively pursue self-learning through online resources, tutorials, and hands-on projects. I'm particularly interested in web development and ethical hacking, areas where I continue to develop my skills through practical application and experimentation.
            </p>
          </motion.div>
        </motion.div>
      </section>
      
      <Footer />
    </main>
  );
}
