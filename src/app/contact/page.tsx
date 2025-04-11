'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaYoutube, FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaGithub, FaReddit } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { personalInfo } from '@/data/personalInfo';

// EmailJS configuration
// These are the updated fields with fixed template structure
const EMAILJS_SERVICE_ID = 'service_gcwqs3n';
const EMAILJS_TEMPLATE_ID = 'template_t2ojkfj';
const EMAILJS_PUBLIC_KEY = 'l8oAbf6P34x8NMych';

// Auto-reply configuration
const EMAILJS_AUTOREPLY_TEMPLATE_ID = 'template_jnch725';

// Initialize EmailJS outside of component
try {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log('EmailJS initialized');
} catch (error) {
  console.error('EmailJS initialization failed:', error);
}

// Disable test mode since we have valid credentials
const TEST_MODE = false;

// This function checks the console.log for the error details
function handleAutoReplyError(error: any) {
  console.error('Auto-reply failed:', error);
  
  // Check what went wrong
  if (error && error.text) {
    console.error('Error details:', error.text);
  }
  
  return {
    errorMessage: error && error.text ? error.text : 'Unknown error',
    status: error && error.status ? error.status : 'unknown'
  };
}

export default function Contact() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formViewRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    error: '',
  });

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  const [emailJSReady, setEmailJSReady] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Check if document is available (client-side)
    if (typeof document !== 'undefined') {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormStatus({
      submitting: true,
      submitted: false,
      success: false,
      error: '',
    });

    try {
      // Use test mode if explicit or if EmailJS isn't ready
      if (TEST_MODE || !emailJSReady) {
        // Simulate sending in test mode
        console.log('Form data (TEST MODE):', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate auto-reply in test mode
        console.log('Auto-reply (TEST MODE) would be sent to:', formData.reply_to);
      } else if (formRef.current) {
        // Prepare template parameters
        const templateParams = {
          from_name: formData.from_name,
          reply_to: formData.reply_to,
          subject: formData.subject,
          message: formData.message,
          to_name: personalInfo.name,
          recipient: personalInfo.email
        };
        
        // Log form data for debugging
        console.log('Sending email with data:', {
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          template_params: templateParams
        });
        
        // Use EmailJS to send the form data
        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams
        );
        
        console.log('EmailJS success:', result.text);
        
        // Send auto-reply email to the user
        try {
          console.log('Attempting to send auto-reply to:', formData.reply_to);
          
          // APPROACH 1: Using template params directly
          // Create a template parameters object that matches exactly what the template expects
          const autoReplyParams = {
            to_name: formData.from_name,
            reply_to: formData.reply_to,
            from_name: personalInfo.name,
            subject: `Thank you for your message, ${formData.from_name}`,
            message: `Thank you for contacting me! I've received your message and will get back to you as soon as possible.

Your message details:
Subject: ${formData.subject}
Message: ${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}

Best regards,
${personalInfo.name}`
          };
          
          console.log('Sending auto-reply with data:', {
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_AUTOREPLY_TEMPLATE_ID,
            template_params: autoReplyParams
          });
          
          // Send the auto-reply with detailed parameters
          const autoReplyResult = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_AUTOREPLY_TEMPLATE_ID,
            autoReplyParams,
            EMAILJS_PUBLIC_KEY  // Add public key explicitly
          );
          
          console.log('Auto-reply sent successfully. Result:', autoReplyResult);
        } catch (autoReplyError) {
          // Get detailed error info but don't fail the form submission
          const errorDetails = handleAutoReplyError(autoReplyError);
          console.error('Auto-reply failed with status:', errorDetails.status);
          console.error('Error message:', errorDetails.errorMessage);
          
          // Try an alternative approach if the first one failed
          try {
            console.log('Trying alternative approach for auto-reply...');
            // Create a simple template with just the required fields
            const simpleParams = {
              to: formData.reply_to,
              from_name: personalInfo.name,
              to_name: formData.from_name,
              message: `Thank you for contacting me! I'll get back to you soon.`
            };
            
            const result = await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_AUTOREPLY_TEMPLATE_ID,
              simpleParams,
              EMAILJS_PUBLIC_KEY
            );
            
            console.log('Alternative auto-reply approach succeeded:', result);
          } catch (altError) {
            console.error('Alternative auto-reply also failed:', altError);
          }
        }
      }

      setFormStatus({
        submitting: false,
        submitted: true,
        success: true,
        error: '',
      });

      // Reset form after successful submission
      setFormData({
        from_name: '',
        reply_to: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      
      // Provide a more detailed error message
      let errorMessage = 'Failed to send message. Please try again later.';
      if (error.text) {
        errorMessage = `Error: ${error.text}`;
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setFormStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: errorMessage,
      });
    }
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

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark">
      <Navbar />
      
      <section className="section-container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Get In Touch</h1>
          <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              ref={infoRef}
              initial={{ opacity: 0, x: -30 }}
              animate={infoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 bg-white dark:bg-secondary rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="mb-6 opacity-90">Feel free to reach out through any of these channels</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">Email</h3>
                    <a 
                      href={`mailto:${personalInfo.email}`} 
                      className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full text-accent">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">{personalInfo.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-info/10 p-3 rounded-full text-info">
                    <FaPhoneAlt size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">Contact Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">10:00 AM - 8:00 PM (GMT+6)</p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
                  <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Connect with me</h3>
                  <div className="flex gap-3 flex-wrap">
                    {personalInfo.socialLinks.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 dark:bg-dark hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white p-3 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={link.name}
                      >
                        {socialIcons[link.name as keyof typeof socialIcons]}
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                {/* Location map placeholder */}
                <div className="mt-8 bg-gray-100 dark:bg-dark/50 rounded-lg overflow-hidden shadow-inner">
                  <div className="relative w-full h-48 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 flex items-center justify-center">
                    <div className="relative z-10 text-center">
                      <FaMapMarkerAlt size={32} className="text-primary/70 mx-auto mb-2" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {personalInfo.location}
                      </span>
                    </div>
                    <div className="absolute inset-0 opacity-20 bg-[url('/assets/map-bg.png')] bg-cover bg-center"></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              ref={formViewRef}
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 bg-white dark:bg-secondary rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Send a Message</h2>
                
                {formStatus.submitted && formStatus.success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-500/50 text-green-700 dark:text-green-400 px-6 py-5 rounded-lg relative mb-8"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-green-800 dark:text-green-300">Message Sent Successfully!</h3>
                        <p>Thank you for your message! I'll get back to you as soon as possible.</p>
                        <p className="mt-1 text-sm">A confirmation email has been sent to your inbox.</p>
                      </div>
                    </div>
                  </motion.div>
                ) : formStatus.submitted && !formStatus.success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-400 px-6 py-5 rounded-lg relative mb-8"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-red-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-red-800 dark:text-red-300">Error</h3>
                        <p>{formStatus.error}</p>
                        {formStatus.error.includes('Account not found') && (
                          <div className="mt-2 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                            <strong>Developer Note:</strong> You need to set up a valid EmailJS account. Please update the EmailJS 
                            credentials in the contact page file.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
                
                {/* Test mode indicator */}
                {TEST_MODE && (
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-500/50 text-yellow-800 dark:text-yellow-200 p-4 rounded-md text-sm mb-6">
                    <div className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium mb-1">Form is in test mode</p>
                        <p className="opacity-90">Messages won't be sent to the recipient, but form submission will be simulated.</p>
                        <div className="mt-2 p-2 bg-white/50 dark:bg-dark/50 rounded text-xs">
                          <strong>Developer Setup:</strong>
                          <ol className="list-decimal ml-4 mt-1 space-y-1">
                            <li>Create an account at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">EmailJS.com</a></li>
                            <li>Create an Email Service and connect your email provider</li>
                            <li>Create an Email Template with variables: from_name, reply_to, subject, message</li>
                            <li>Update the credentials in the contact page file and set TEST_MODE to false</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden fields for EmailJS - Using correct parameters for template */}
                  <input 
                    type="hidden" 
                    name="from_name"
                    value={formData.from_name}
                  />
                  <input 
                    type="hidden" 
                    name="reply_to" 
                    value={formData.reply_to}
                  />
                  <input 
                    type="hidden" 
                    name="to_name" 
                    value={personalInfo.name} 
                  />
                  <input 
                    type="hidden" 
                    name="recipient" 
                    value={personalInfo.email} 
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="from_name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        className={`form-input ${
                          mounted && theme === 'dark' ? 'form-input-dark' : 'form-input-light'
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="reply_to" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="reply_to"
                        name="reply_to"
                        value={formData.reply_to}
                        onChange={handleChange}
                        required
                        className={`form-input ${
                          mounted && theme === 'dark' ? 'form-input-dark' : 'form-input-light'
                        }`}
                        placeholder="Your email"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                        You'll receive a confirmation email when you submit this form.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`form-input ${
                        mounted && theme === 'dark' ? 'form-input-dark' : 'form-input-light'
                      }`}
                      placeholder="Message subject"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`form-input ${
                        mounted && theme === 'dark' ? 'form-input-dark' : 'form-input-light'
                      }`}
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="btn btn-primary w-full sm:w-auto shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPaperPlane className={formStatus.submitting ? 'animate-bounce-slow' : ''} />
                    <span>{formStatus.submitting ? 'Sending...' : 'Send Message'}</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
