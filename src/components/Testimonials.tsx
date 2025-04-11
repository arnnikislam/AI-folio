'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaLinkedin, FaStar, FaStarHalfAlt, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { testimonials } from '@/data/testimonials';
import Link from 'next/link';
import Slider from 'react-slick';

// Import slick styles - add these to the _app.js with proper CSS imports
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const sliderRef = useRef<Slider>(null);

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials
    : testimonials.filter(t => t.category === activeFilter);
  
  const featuredTestimonials = filteredTestimonials.filter(t => t.featured);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
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
    beforeChange: (current: number, next: number) => {
      // Add any logic here if needed when slides change
    },
    customPaging: (i: number) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-primary dark:hover:bg-primary transition-colors duration-200"></div>
    )
  };
  
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-dark relative overflow-hidden">
      {/* Animated background elements */}
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What People Say
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
            Don't just take my word for it - here's what others have to say about working with me.
          </p>
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
                {filteredTestimonials.map((item, index) => (
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
        
        {/* Featured testimonials (cards in grid) */}
        {featuredTestimonials.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Featured Testimonials
              </h3>
              
              <Link href="/testimonials">
                <motion.div 
                  className="flex items-center text-primary hover:underline"
                  whileHover={{ x: 5 }}
                >
                  View All <FaArrowRight className="ml-2" />
                </motion.div>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredTestimonials.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 relative overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute top-6 left-6 text-primary/20 dark:text-primary/10">
                    <FaQuoteLeft size={40} />
                  </div>
                  
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-tr from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex mb-4">
                      {renderRating(item.rating)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg italic leading-relaxed">
                      "{item.testimonial}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-primary shadow-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary dark:text-light text-xl">{item.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.role}, {item.company}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full mr-2 capitalize">
                            {item.category}
                          </span>
                          {item.linkedin && (
                            <a 
                              href={item.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary text-sm hover:underline"
                              aria-label={`${item.name}'s LinkedIn profile`}
                            >
                              <FaLinkedin className="mr-1" /> LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA for more testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want to share your experience working with me?
          </p>
          <Link href="/contact">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 