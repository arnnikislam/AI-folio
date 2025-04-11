'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaTools, FaServer, FaShieldAlt, FaDesktop, FaBook, FaLaptopCode } from 'react-icons/fa';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Doughnut, Pie, PolarArea, Bar } from 'react-chartjs-2';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { skills } from '@/data/skills';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Skills() {
  // Define refs for chart animations
  const languagesChartRef = useRef(null);
  const toolsChartRef = useRef(null);
  const platformsChartRef = useRef(null);
  const hackingChartRef = useRef(null);
  const osChartRef = useRef(null);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [languagesRef, languagesInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [toolsRef, toolsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [platformsRef, platformsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [hackingRef, hackingInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [osRef, osInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [learningRef, learningInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

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
      transition: { duration: 0.5 },
    },
  };

  // Chart options
  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          display: false,
          stepSize: 20
        },
        pointLabels: {
          font: {
            size: 12,
            weight: 500
          }
        },
        grid: {
          circular: true
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    },
    cutout: '65%',
    maintainAspectRatio: false,
    responsive: true
  };

  const barOptions = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  const polarAreaOptions = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false
        },
        grid: {
          circular: true
        }
      }
    },
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  // Helper function to get data from skills with percentage converted to number
  const getChartData = (skillsArray: any[]) => {
    return {
      labels: skillsArray.map(skill => skill.name),
      datasets: [
        {
          label: 'Proficiency',
          data: skillsArray.map(skill => parseInt(skill.level || '0%')),
          backgroundColor: [
            'rgba(79, 70, 229, 0.6)', // primary (indigo)
            'rgba(168, 85, 247, 0.6)', // accent (purple)
            'rgba(59, 130, 246, 0.6)', // blue
            'rgba(16, 185, 129, 0.6)', // emerald
            'rgba(245, 158, 11, 0.6)', // amber
            'rgba(239, 68, 68, 0.6)', // red
            'rgba(236, 72, 153, 0.6)', // pink
          ],
          borderColor: [
            'rgba(79, 70, 229, 1)',
            'rgba(168, 85, 247, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(236, 72, 153, 1)',
          ],
          borderWidth: 2,
          pointBackgroundColor: 'rgba(79, 70, 229, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(79, 70, 229, 1)',
          pointRadius: 4,
          pointHoverRadius: 6,
          hoverBackgroundColor: [
            'rgba(79, 70, 229, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(236, 72, 153, 0.8)',
          ],
        },
      ],
    };
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <section className="section-container py-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">My Skills</h1>
          <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
            Here's an interactive visualization of my technical skills and the technologies I'm currently learning.
          </p>
        </motion.div>
        
        {/* Languages - Radar Chart */}
        <div className="mb-20">
          <motion.div
            ref={languagesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={languagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-primary/10 p-2 rounded-full">
              <FaCode className="text-primary text-xl" />
            </div>
            <h2 className="section-subtitle mb-0">Programming Languages</h2>
          </motion.div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden border border-gray-100 dark:border-gray-700">
            <motion.div
              ref={languagesChartRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={languagesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[350px] w-full max-w-2xl mx-auto"
            >
              <Radar 
                data={getChartData(skills.languages)} 
                options={radarOptions} 
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={languagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              <p>The radar chart shows my proficiency across different programming languages</p>
            </motion.div>
          </div>
        </div>
        
        {/* Tools - Bar Chart */}
        <div className="mb-20">
          <motion.div
            ref={toolsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-accent/10 p-2 rounded-full">
              <FaTools className="text-accent text-xl" />
            </div>
            <h2 className="section-subtitle mb-0">Tools & Software</h2>
          </motion.div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden border border-gray-100 dark:border-gray-700">
            <motion.div
              ref={toolsChartRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={toolsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[350px] w-full max-w-3xl mx-auto"
            >
              <Bar 
                data={getChartData(skills.tools)} 
                options={barOptions} 
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              <p>Horizontal bar chart showing my expertise with various development tools and software</p>
            </motion.div>
          </div>
        </div>
        
        {/* Grid layout for Platforms, Hacking, and OS side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Platforms - Doughnut Chart */}
          <div>
            <motion.div
              ref={platformsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="bg-info/10 p-2 rounded-full">
                <FaServer className="text-info text-xl" />
              </div>
              <h2 className="section-subtitle mb-0">Platforms & Services</h2>
            </motion.div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
              <motion.div
                ref={platformsChartRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={platformsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="h-[350px] w-full"
              >
                <Doughnut 
                  data={getChartData(skills.platforms)} 
                  options={doughnutOptions} 
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                <p>Doughnut chart visualizing my experience with different platforms and services</p>
              </motion.div>
            </div>
          </div>
          
          {/* Hacking - Pie Chart */}
          <div>
            <motion.div
              ref={hackingRef}
              initial={{ opacity: 0, y: 20 }}
              animate={hackingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="bg-red-500/10 p-2 rounded-full">
                <FaShieldAlt className="text-red-500 text-xl" />
              </div>
              <h2 className="section-subtitle mb-0">Security & Hacking Tools</h2>
            </motion.div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
              <motion.div
                ref={hackingChartRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={hackingInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="h-[350px] w-full"
              >
                <Pie 
                  data={getChartData(skills.hacking)} 
                  options={doughnutOptions} 
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={hackingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                <p>Pie chart showing my proficiency with security and hacking tools</p>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Operating Systems - PolarArea Chart */}
        <div className="mb-20">
          <motion.div
            ref={osRef}
            initial={{ opacity: 0, y: 20 }}
            animate={osInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-green-500/10 p-2 rounded-full">
              <FaDesktop className="text-green-500 text-xl" />
            </div>
            <h2 className="section-subtitle mb-0">Operating Systems</h2>
          </motion.div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden border border-gray-100 dark:border-gray-700">
            <motion.div
              ref={osChartRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={osInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[350px] w-full max-w-2xl mx-auto"
            >
              <PolarArea 
                data={getChartData(skills.os)} 
                options={polarAreaOptions} 
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={osInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              <p>Polar area chart showing my experience with different operating systems</p>
            </motion.div>
          </div>
        </div>
        
        {/* Currently Learning */}
        <div className="mb-16">
          <motion.div
            ref={learningRef}
            initial={{ opacity: 0, y: 20 }}
            animate={learningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-amber-500/10 p-2 rounded-full">
              <FaBook className="text-amber-500 text-xl" />
            </div>
            <h2 className="section-subtitle mb-0">Currently Learning</h2>
          </motion.div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-hidden border border-gray-100 dark:border-gray-700">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={learningInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skills.currentlyLearning.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-md">
                    <FaLaptopCode size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-secondary dark:text-light">{item}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={learningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-secondary dark:text-light mb-6">
            I'm always expanding my skills and looking to learn new technologies. Let's connect and talk tech!
          </p>
          <motion.a
            href="/contact"
            className="btn btn-primary inline-flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </section>
      
      <Footer />
    </main>
  );
}
