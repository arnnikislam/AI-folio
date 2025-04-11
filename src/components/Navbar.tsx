'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiHome, FiUser, FiCode, FiAward, FiBook, FiFileText, FiMessageSquare } from 'react-icons/fi';
import { personalInfo } from '@/data/personalInfo';

const navLinks = [
  { name: 'Home', path: '/', icon: <FiHome size={16} /> },
  { name: 'About', path: '/about', icon: <FiUser size={16} /> },
  { name: 'Skills', path: '/skills', icon: <FiCode size={16} /> },
  { name: 'Projects', path: '/projects', icon: <FiCode size={16} /> },
  { name: 'Edu', path: '/education', icon: <FiBook size={16} /> },
  { name: 'Showcase', path: '/showcase', icon: <FiAward size={16} /> },
  { name: 'Resume', path: '/resume', icon: <FiFileText size={16} /> },
  { name: 'Contact', path: '/contact', icon: <FiMessageSquare size={16} /> },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) {
    return null;
  }
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  // Check if we're on a showcase page (certificates or testimonials)
  const isShowcasePage = pathname === '/certificates' || pathname === '/testimonials' || pathname === '/showcase';

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-lg shadow-lg' 
        : 'bg-light dark:bg-dark'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-primary/30 shadow-sm">
                <Image 
                  src={personalInfo.profileImage} 
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-500">
                Arnnik Islam
              </h1>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex md:items-center md:ml-6">
            <div className="flex items-center space-x-0.5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className={`relative nav-link group px-2 py-2 rounded-lg flex items-center gap-1 text-sm transition-all duration-300 ${
                      (link.path === '/showcase' && isShowcasePage) || (link.path !== '/showcase' && isActive(link.path))
                        ? 'text-primary font-semibold bg-primary/5 dark:bg-primary/10'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className={`transition-all duration-300 ${
                      (link.path === '/showcase' && isShowcasePage) || (link.path !== '/showcase' && isActive(link.path)) 
                        ? 'text-primary' 
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-primary'
                    }`}>
                      {link.icon}
                    </span>
                    {link.name}
                    {((link.path === '/showcase' && isShowcasePage) || (link.path !== '/showcase' && isActive(link.path))) && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-full relative overflow-hidden transition-all duration-300 ml-1 shadow-md ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-amber-300 to-yellow-500 text-gray-900' 
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                }`}
                aria-label="Toggle theme"
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={false}
                  animate={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                  key={theme} // This forces the animation to run each time theme changes
                />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -30, opacity: 0, rotate: -30 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 30, opacity: 0, rotate: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 mr-2 rounded-full relative overflow-hidden transition-all duration-300 shadow-md ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-amber-300 to-yellow-500 text-gray-900' 
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
              }`}
              aria-label="Toggle theme"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={false}
                animate={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                  scale: [1, 1.5, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                key={theme} // This forces the animation to run each time theme changes
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -30, opacity: 0, rotate: -30 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 30, opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isOpen 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-secondary dark:text-light hover:bg-gray-200 dark:hover:bg-secondary'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 overflow-hidden shadow-lg z-50 rounded-b-xl mx-4 mt-2"
          >
            <div className="grid grid-cols-2 gap-1 p-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      (link.path === '/showcase' && isShowcasePage) || (link.path !== '/showcase' && isActive(link.path))
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={
                      (link.path === '/showcase' && isShowcasePage) || (link.path !== '/showcase' && isActive(link.path))
                        ? 'text-primary' 
                        : 'text-gray-400 dark:text-gray-500'
                    }>
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
