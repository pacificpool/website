import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MembershipPlans from './MembershipPlans';
import TrainingPrograms from './TrainingPrograms';
import ScheduleSection from './ScheduleSection';
import SpecialPrograms from './SpecialPrograms';
import BookingModal from '../../components/BookingModal';

const Membership = () => {
  const [activeTab, setActiveTab] = useState('membership');
  const [isVisible, setIsVisible] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Function to open booking modal with selected program
  const openBookingModal = (program, option = "") => {
    setSelectedProgram(program);
    setSelectedOption(option);
    setIsBookingModalOpen(true);
  };
  
  // Handle form submission from booking modal
  const handleFormSubmit = (formData) => {
    // Close the modal
    setIsBookingModalOpen(false);
    
    // WhatsApp business number - replace with your actual number (no + sign)
    const whatsappNumber = "919008838001"; // Your WhatsApp number
    
    // Construct the message with form data
    const message = `
*New Swimming Consultation Request*
-----------------------------------
*Program:* ${formData.sport || selectedProgram} ${selectedOption ? `(${selectedOption})` : ''}
*Age Group:* ${formData.ageGroup}
*Name:* ${formData.parentName}
*Phone:* ${formData.parentPhone}
*Email:* ${formData.parentEmail}
${formData.kidName ? `*Child Name:* ${formData.kidName}` : ''}
${formData.kidName ? `*Gender:* ${formData.kidGender}` : ''}
${formData.message ? `*Message:* ${formData.message}` : ''}
    `.trim();
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // Tab data
  const tabs = [
    { id: 'membership', label: 'Membership Plans', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )},
    { id: 'training', label: 'Training Programs', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'schedule', label: 'Schedule', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'special', label: 'Special Programs', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 01.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )}
  ];

  // Water animation for background
  const waterAnimation = {
    hidden: { y: 0 },
    visible: { 
      y: 10,
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-sky-50 to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-sky-100/40 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-tr-full"></div>
        
        <motion.div 
          className="absolute top-1/3 left-10 w-20 h-20 rounded-full border border-sky-200 opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-20 w-32 h-32 rounded-full border border-blue-200 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Animated water waves */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden opacity-50">
          <motion.svg 
            viewBox="0 0 1440 120" 
            className="absolute bottom-0 left-0 w-full"
            variants={waterAnimation}
            initial="hidden"
            animate="visible"
          >
            <motion.path 
              d="M0,32L48,37.3C96,43,192,53,288,64C384,75,480,85,576,80C672,75,768,53,864,53.3C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
              fill="rgba(56, 189, 248, 0.05)"
            />
          </motion.svg>
          
          <motion.svg 
            viewBox="0 0 1440 120" 
            className="absolute bottom-0 left-0 w-full"
            variants={waterAnimation}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <motion.path 
              d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,69.3C672,64,768,32,864,26.7C960,21,1056,43,1152,53.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
              fill="rgba(56, 189, 248, 0.03)"
            />
          </motion.svg>
        </div>
        
        {/* Floating bubbles */}
        {[...Array(8)].map((_, i) => {
          const size = Math.random() * 20 + 10;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const duration = Math.random() * 15 + 10;
          const delay = Math.random() * 5;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-sky-100/40"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`
              }}
              animate={{
                y: [0, -30],
                x: [0, Math.random() * 20 - 10],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-block bg-blue-50 text-sky-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-sm">
              SUMMER CAMP 2025
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700 mb-4"
          >
            PACIFIC POOL
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: 120 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mb-6 rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Located near Iskcon Temple, Kanakapura Road. Join our premium swimming facility
            with world-class amenities and professional training.
          </motion.p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1.5 shadow-lg flex flex-wrap md:flex-nowrap">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-2.5 px-4 md:px-6 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                  activeTab === tab.id 
                    ? 'text-white z-10' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                whileHover={activeTab !== tab.id ? { scale: 1.03 } : {}}
                whileTap={activeTab !== tab.id ? { scale: 0.98 } : {}}
              >
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 600, damping: 30 }}
                  />
                )}
                <span className="relative z-10 mr-2">
                  {tab.icon}
                </span>
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="relative min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'membership' && <MembershipPlans fadeIn={fadeIn} openBookingModal={openBookingModal} />}
              {activeTab === 'training' && <TrainingPrograms fadeIn={fadeIn} openBookingModal={openBookingModal} />}
              {activeTab === 'schedule' && <ScheduleSection fadeIn={fadeIn} />}
              {activeTab === 'special' && <SpecialPrograms fadeIn={fadeIn} openBookingModal={openBookingModal} />}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl p-8 relative overflow-hidden shadow-lg border border-sky-200/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full translate-y-1/3 -translate-x-1/3"></div>
            
            {/* Animated water effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
              <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <motion.path
                  d="M0,0 C600,80 1000,0 1200,80 L1200,120 L0,120 Z"
                  fill="rgba(56, 189, 248, 0.1)"
                  animate={{
                    d: [
                      "M0,0 C600,80 1000,0 1200,80 L1200,120 L0,120 Z",
                      "M0,0 C400,30 800,90 1200,30 L1200,120 L0,120 Z",
                      "M0,0 C600,80 1000,0 1200,80 L1200,120 L0,120 Z"
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to make a splash?</h3>
                  <p className="text-gray-600 mb-8">
                    Join Pacific Pool's Summer Camp 2025 and experience the best swimming facilities in Bangalore.
                    Our professional trainers and world-class amenities await you and your family.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <motion.a 
                      href="tel:9008838001" 
                      className="flex items-center justify-center gap-2 bg-white text-sky-600 hover:text-sky-700 font-medium py-3 px-5 rounded-lg border border-sky-200 shadow-sm transition-colors duration-300"
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      9008838001
                    </motion.a>
                    <motion.a 
                      href="tel:9008894001" 
                      className="flex items-center justify-center gap-2 bg-white text-sky-600 hover:text-sky-700 font-medium py-3 px-5 rounded-lg border border-sky-200 shadow-sm transition-colors duration-300"
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      9008894001
                    </motion.a>
                  </div>
                </div>
                
                <div className="text-center">
                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-md inline-block"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="inline-block bg-sky-100 text-sky-600 px-4 py-2 rounded-lg font-medium mb-4">
                      Visit Us
                    </div>
                    <div className="text-gray-700 mb-4 space-y-1">
                      <p className="font-medium text-lg">Pacific Pool</p>
                      <p>Near Iskcon temple, Kanakapura Rd</p>
                      <p>Bangalore</p>
                    </div>
                    <motion.a 
                      href="https://instagram.com/pacific_pool_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      Follow Us
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
        onSubmit={handleFormSubmit}
        preselectedProgram={selectedProgram}
      />
    </section>
  );
};

export default Membership;