'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaSearch, FaExpand, FaTimes, FaChevronLeft, FaChevronRight, FaMedal, FaDownload, 
         FaQuoteLeft, FaQuoteRight, FaLinkedin, FaStar, FaStarHalfAlt, FaArrowRight, FaCertificate } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Slider from 'react-slick';
import { testimonials } from '@/data/testimonials';
import Link from 'next/link';

// Define certificate data
const certificates = [
  {
    id: 1,
    title: "Internet Security Certification",
    issuer: "CyberSecurity Bangladesh",
    date: "August 2023",
    description: "INTERNET CERTIFIED course completion for demonstrating proficiency in internet security fundamentals and safe online practices.",
    image: "/assets/certificates/certificate1.png"
  },
  {
    id: 2,
    title: "Certificate of Participation",
    issuer: "Decode Knowledge Simplified",
    date: "June 26-29, 2022",
    description: "Awarded for successfully participating in the Programming Contest Preparation Camp (Online) organized by Md. Al-Mamun Riyadh, Online Educator at Decode Knowledge Simplified.",
    image: "/assets/certificates/certificate2.jpg"
  },
  {
    id: 3,
    title: "Digital Literacy Course",
    issuer: "Digital Literacy Center (ICT Division)",
    date: "August 08, 2022",
    description: "Successfully completed the Digital literacy course for secondary level students, an online course offered by Digital Literacy Center under 'Digital Bangladesh' initiative.",
    image: "/assets/certificates/certificate3.jpg"
  }
];

export default function ShowcasePage() {
  // Shared state
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'certificates' | 'testimonials'>('certificates');
  
  // Certificates state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  
  // Testimonials state
  const [activeFilter, setActiveFilter] = useState('all');
  const sliderRef = useRef<Slider>(null);

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials
    : testimonials.filter(t => t.category === activeFilter);
  
  // Intersection observers
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      document.body.style.overflow = ''; // Ensure scrolling is enabled when component unmounts
    };
  }, []);

  // Certificate lightbox functions
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen]);

  // Render star ratings
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
    }
    
    // Add empty stars to make it always 5 stars total
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-300 dark:text-gray-600" />);
    }
    
    return stars;
  };

  // Slick carousel settings
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    adaptiveHeight: true,
    customPaging: (i: number) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-primary dark:hover:bg-primary transition-colors duration-200"></div>
    )
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const tabVariants = {
    active: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    inactive: { 
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Showcase
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
            View my certifications and what people say about my work and collaborations.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('certificates')}
            className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
              activeTab === 'certificates' 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <FaCertificate className={activeTab === 'certificates' ? 'text-white' : 'text-primary'} />
            Certificates
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('testimonials')}
            className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
              activeTab === 'testimonials' 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <FaQuoteLeft className={activeTab === 'testimonials' ? 'text-white' : 'text-primary'} />
            Testimonials
          </motion.button>
        </div>
        
        {/* Content Area */}
        <div ref={contentRef} className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <motion.div
                key="certificates"
                initial="inactive"
                animate="active"
                exit="inactive"
                variants={tabVariants}
                className="w-full"
              >
                {/* View Mode Controls */}
                <div className="flex justify-center gap-4 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      viewMode === 'grid' 
                        ? 'bg-primary text-white' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Grid View
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('masonry')}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      viewMode === 'masonry' 
                        ? 'bg-primary text-white' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Masonry View
                  </motion.button>
                </div>
                
                {/* Certificates Gallery */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                  }
                >
                  {certificates.map((certificate, index) => (
                    <motion.div 
                      key={certificate.id}
                      variants={fadeInUp}
                      className={`relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg ${
                        viewMode === 'masonry' ? 'mb-6 break-inside-avoid' : ''
                      }`}
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
                            {new Date(certificate.date.split("-")[0]).getFullYear()}
                          </div>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                          <div className="flex justify-end">
                            <motion.button
                              onClick={() => openLightbox(index)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white"
                            >
                              <FaExpand size={16} />
                            </motion.button>
                          </div>
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
                            <FaMedal className="text-primary" size={16} />
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          {certificate.issuer} • {certificate.date}
                        </p>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                          {certificate.description}
                        </p>
                        
                        <motion.button
                          onClick={() => openLightbox(index)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-medium transition-colors duration-300 hover:bg-primary hover:text-white flex items-center justify-center gap-2"
                        >
                          <FaExpand size={14} />
                          View Certificate
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
            
            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial="inactive"
                animate="active"
                exit="inactive"
                variants={tabVariants}
                className="w-full"
              >
                {/* Testimonials background effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: isLoaded ? 0.05 : 0, scale: 1, x: [0, 20, 0], y: [0, -20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute -top-20 -right-20 w-96 h-96 bg-primary rounded-full blur-3xl"
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: isLoaded ? 0.05 : 0, scale: 1, x: [0, -30, 0], y: [0, 30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", delay: 2 }}
                    className="absolute -bottom-40 -left-20 w-72 h-72 bg-accent rounded-full blur-3xl"
                  />
                </div>
                
                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  {['all', 'mentor', 'colleague', 'client'].map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeFilter === category 
                          ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </motion.button>
                  ))}
                </div>
                
                {/* Interactive testimonial carousel */}
                {filteredTestimonials.length > 0 && (
                  <div className="max-w-5xl mx-auto mb-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-3xl transform rotate-1 scale-105 blur-sm -z-10"></div>
                    
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10 overflow-hidden">
                      {/* Custom navigation arrows */}
                      <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2">
                        <button 
                          onClick={() => sliderRef.current?.slickPrev()}
                          className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 text-primary shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                          aria-label="Previous testimonial"
                        >
                          <FaChevronLeft />
                        </button>
                      </div>
                      
                      <div className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2">
                        <button 
                          onClick={() => sliderRef.current?.slickNext()}
                          className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 text-primary shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                          aria-label="Next testimonial"
                        >
                          <FaChevronRight />
                        </button>
                      </div>
                      
                      {/* Slick carousel */}
                      <Slider ref={sliderRef} {...sliderSettings} className="testimonial-slider">
                        {filteredTestimonials.map((item) => (
                          <div key={item.id} className="outline-none focus:outline-none px-4">
                            <div className="flex flex-col md:flex-row items-center gap-8 p-4">
                              {/* Image and profile section */}
                              <div className="relative min-w-[200px] text-center md:text-left">
                                <div className="relative h-28 w-28 md:h-40 md:w-40 rounded-full overflow-hidden mx-auto md:mx-0 mb-4 border-4 border-primary/20 shadow-xl">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-500"
                                  />
                                </div>
                                
                                <h4 className="font-bold text-xl text-secondary dark:text-light">
                                  {item.name}
                                </h4>
                                
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                  {item.role}, {item.company}
                                </p>
                                
                                <div className="flex justify-center md:justify-start items-center gap-2 mt-1 mb-2">
                                  <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full capitalize">
                                    {item.category}
                                  </span>
                                  
                                  {item.linkedin && (
                                    <a 
                                      href={item.linkedin} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-primary hover:underline"
                                      aria-label={`${item.name}'s LinkedIn profile`}
                                    >
                                      <FaLinkedin />
                                    </a>
                                  )}
                                </div>
                                
                                <div className="flex justify-center md:justify-start mt-2">
                                  {renderRating(item.rating)}
                                </div>
                              </div>
                              
                              {/* Testimonial text */}
                              <div className="flex-1 relative">
                                <FaQuoteLeft className="absolute top-0 left-0 text-4xl text-primary/10 -mt-2 -ml-2" />
                                
                                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl italic px-10 py-6 leading-relaxed">
                                  {item.testimonial}
                                </p>
                                
                                <FaQuoteRight className="absolute bottom-0 right-0 text-4xl text-primary/10 -mb-2 -mr-2" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Lightbox Modal for Certificates */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <FaTimes size={24} />
            </button>
            
            {/* Navigation buttons */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <FaChevronLeft size={20} />
            </button>
            
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <FaChevronRight size={20} />
            </button>
            
            {/* Main image */}
            <div 
              className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={certificates[currentImageIndex].image}
                  alt={certificates[currentImageIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {certificates[currentImageIndex].title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {certificates[currentImageIndex].issuer} • {certificates[currentImageIndex].date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {certificates[currentImageIndex].description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {Array.from({ length: certificates.length }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex
                            ? 'bg-primary w-5'
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        aria-label={`View certificate ${idx + 1}`}
                      />
                    ))}
                  </div>
                  
                  <a 
                    href={certificates[currentImageIndex].image}
                    download={`${certificates[currentImageIndex].title.replace(/\s+/g, '_')}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-full flex items-center gap-2 transition-colors"
                  >
                    <FaDownload size={16} />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </main>
  );
} 