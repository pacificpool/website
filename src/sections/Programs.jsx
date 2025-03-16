import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import BookingModal from '../components/BookingModal'

const Programs = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 }) // Reduced threshold for better mobile triggering
  const [hoveredProgram, setHoveredProgram] = useState(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Track mouse position for water ripple effects (only on desktop)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    if (isMobile) return // Skip mouse tracking on mobile
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Open booking modal with the selected program
  const handleBookProgram = (programTitle) => {
    setSelectedProgram(programTitle)
    setIsBookingModalOpen(true)
  }
  
  // Handle form submission and WhatsApp redirect
  const handleFormSubmit = (formData) => {
    // Close the modal
    setIsBookingModalOpen(false)
    
    // WhatsApp business number - replace with your actual number (no + sign)
    const whatsappNumber = "911234567890" // Replace with your WhatsApp number
    
    // Construct the message with form data
    const message = `
*New Swimming Consultation Request*
-----------------------------------
*Program:* ${formData.sport || selectedProgram}
*Age Group:* ${formData.ageGroup}
*Parent Name:* ${formData.parentName}
*Phone:* ${formData.parentPhone}
*Email:* ${formData.parentEmail}
*Child Name:* ${formData.kidName}
*Gender:* ${formData.kidGender}
    `.trim()
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank')
  }
  
  const programs = [
    {
      title: "Elite Training",
      description: "Professional coaching with Olympic standard techniques for competitive swimmers.",
      icon: "🏆",
      color: "from-amber-400 to-orange-600",
      accentColor: "rgba(245, 158, 11, 0.3)",
      features: ["Personalized Training Plans", "Competition Preparation", "Video Analysis"],
      image: "/api/placeholder/600/400"
    },
    {
      title: "Aqua Fitness",
      description: "Low-impact, high-resistance workouts in our temperature-controlled water.",
      icon: "💪",
      color: "from-sky-400 to-cyan-600",
      accentColor: "rgba(14, 165, 233, 0.3)",
      features: ["Cardio Conditioning", "Muscle Toning", "Joint Protection"],
      image: "/api/placeholder/600/400"
    },
    {
      title: "Learn to Swim",
      description: "From beginners to advanced techniques in a safe, supportive environment.",
      icon: "🏊",
      color: "from-blue-400 to-indigo-600",
      accentColor: "rgba(59, 130, 246, 0.3)",
      features: ["All Age Groups", "Certified Instructors", "Small Class Sizes"],
      image: "/api/placeholder/600/400"
    },
    {
      title: "Therapeutic",
      description: "Rehabilitation programs designed by physiotherapists in luxurious surroundings.",
      icon: "✨",
      color: "from-emerald-400 to-teal-600",
      accentColor: "rgba(16, 185, 129, 0.3)",
      features: ["Joint Mobility", "Pain Management", "Post-Surgery Recovery"],
      image: "/api/placeholder/600/400"
    }
  ]
  
  // Simplified animation variants for better mobile performance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: isMobile ? 0 : -10, // Disable y movement on mobile
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }
  
  return (
    <section id="programs" className="py-12 lg:py-24 bg-white relative overflow-x-hidden" ref={sectionRef}>
      {/* Mouse-follow water ripple effect - DISABLED FOR MOBILE */}
      {!isMobile && hoveredProgram !== null && (
        <motion.div
          className="fixed pointer-events-none z-0"
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
            background: `radial-gradient(circle, ${programs[hoveredProgram]?.accentColor} 0%, rgba(56, 189, 248, 0) 70%)`
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.7, 0.5, 0.7]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Simplified background for mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Simplified gradients */}
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-sky-50 to-transparent rounded-bl-full opacity-50"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-50 to-transparent rounded-tr-full opacity-40"></div>
        
        {/* Reduced floating bubbles for mobile */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(isMobile ? 5 : 15)].map((_, i) => {
              const size = Math.random() * 10 + 5;
              const startX = Math.random() * 100;
              const startY = Math.random() * 100;
              const duration = Math.random() * 15 + 10;
              const delay = Math.random() * 5;
              
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-sky-200/20"
                  style={{
                    width: size,
                    height: size,
                    left: `${startX}%`,
                    top: `${startY}%`,
                    filter: "blur(0.5px)"
                  }}
                  animate={{
                    y: [0, -30],
                    x: [0, Math.random() * 20 - 10],
                    opacity: [0, 0.5, 0],
                    scale: [0, 1, 0.5]
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
        )}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Simplified for mobile */}
        <div className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="text-sm font-medium text-sky-600 bg-sky-50 px-4 py-1.5 rounded-full tracking-wide shadow-sm">
              PREMIUM PROGRAMS
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-800 to-blue-700"
          >
            Luxurious Swimming Experiences
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: "150px" } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mb-6 rounded-full max-w-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl mx-auto text-neutral-600 text-base md:text-lg px-2"
          >
            Our temperature-controlled pool provides the perfect environment for swimmers of all levels 
            to excel, relax, and transform.
          </motion.p>
        </div>
        
        {/* Program Cards with improved mobile layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-sky-100 relative z-10"
              onHoverStart={() => !isMobile && setHoveredProgram(index)}
              onHoverEnd={() => !isMobile && setHoveredProgram(null)}
              onTouchStart={() => isMobile && setHoveredProgram(index)}
              onTouchEnd={() => isMobile && setHoveredProgram(null)}
            >
              {/* Card image */}
              <div className="h-36 md:h-40 relative overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 opacity-80 bg-gradient-to-b ${program.color}`}></div>
                
                {/* Program icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl md:text-5xl">
                    {program.icon}
                  </div>
                </div>
              </div>
              
              <div className="p-4 md:p-6 relative">                
                <h3 className="text-lg md:text-xl font-bold mb-2 text-neutral-900 group-hover:text-sky-600 transition-colors duration-300 relative">
                  {program.title}
                </h3>
                
                <p className="text-neutral-600 mb-4 text-sm">
                  {program.description}
                </p>
                
                <ul className="space-y-1 mb-6">
                  {program.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center text-sm text-neutral-700"
                      initial={{ opacity: 0, x: -5 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                      transition={{ delay: 0.1 * index + 0.05 * i + 0.4, duration: 0.3 }}
                    >
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color} mr-2 flex-shrink-0`} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
                
                <div className="pt-3 border-t border-neutral-100 group-hover:border-sky-100 transition-colors duration-300">
                  <button 
                    onClick={() => handleBookProgram(program.title)}
                    className="text-sm font-semibold text-sky-600 inline-flex items-center group-hover:text-sky-700 transition-colors duration-300"
                  >
                    Book Consultation
                    <svg 
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Box - simplified for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-1 shadow-lg"
        >
          <div className="bg-white rounded-lg p-6 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            <div className="md:max-w-xl mb-6 md:mb-0 relative text-center md:text-left">
              <h3 className="text-xl md:text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-blue-700">
                Ready to Start Your Premium Swimming Journey?
              </h3>
              <p className="text-sm md:text-base text-neutral-600">
                Our expert instructors are ready to guide you through a personalized program in our temperature-controlled luxury pool.
              </p>
            </div>
            
            <motion.button 
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full md:w-auto bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Consultation
            </motion.button>
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
  )
}

export default Programs