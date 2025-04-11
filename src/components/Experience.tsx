import React from 'react';
import { experiences } from '@/data/experience';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Experience = () => {
  return (
    <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Experience
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="mb-10 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-12 bottom-0 w-1 bg-primary-500 dark:bg-primary-400" style={{ marginLeft: '0.5rem' }}></div>
              )}
              
              <div className="flex items-start">
                {/* Icon */}
                <div className="relative z-10">
                  <div className="rounded-full p-3 bg-primary-500 text-white shadow-lg">
                    {exp.icon ? <exp.icon size={24} /> : 
                      <div className="w-6 h-6 bg-primary-700 rounded-full"></div>
                    }
                  </div>
                </div>
                
                {/* Content */}
                <div className="ml-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full mt-2 md:mt-0 inline-flex items-center ${
                      exp.type === 'work' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      exp.type === 'education' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                    </span>
                  </div>
                  
                  <div className="text-gray-700 dark:text-gray-300 font-medium">{exp.company}</div>
                  
                  <div className="flex flex-col md:flex-row gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-600 dark:text-gray-300">{exp.description}</p>
                  
                  {exp.skills && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 