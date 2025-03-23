import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import olympic from '../assets/modals/olympic.jpg'
import changingroom from '../assets/modals/changingroom.webp'
import wellness from '../assets/modals/wellness.jpg'


const Facilities = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [activeTab, setActiveTab] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const facilities = [
    {
      title: "Olympic Pool",
      description: "Our crown jewel - a 25m Olympic-standard swimming pool with 10 lanes and adjustable depth technology. Maintained at a perfect 28°C year-round with state-of-the-art filtration systems for the ultimate swimming experience.",
      features: [
        "25m length with competition-grade starting blocks",
        "Advanced underwater lighting system",
        "Electronic timing equipment",
        "Spectator seating for 200 people"
      ],
      image: olympic,
      color: "sky",
      gradient: "from-sky-400 to-blue-600"
    },
    {
      title: "Wellness Spa",
      description: "Unwind in our luxurious wellness spa featuring heated relaxation pools, jacuzzis, and cold plunge pools. The perfect complement to your swimming regime or a standalone experience for total rejuvenation.",
      features: [
        "Hot therapeutic whirlpool (38°C)",
        "Cold plunge pool (15°C)",
        "Aromatherapy steam room",
        "Salt relaxation chamber"
      ],
      image: wellness,
      color: "teal",
      gradient: "from-teal-400 to-emerald-600"
    },
    {
      title: "Changing Suites",
      description: "Experience changing facilities reimagined. Our private changing suites offer hotel-like amenities with premium fixtures, rain showers, and complimentary luxury toiletries for a truly elevated experience.",
      features: [
        "Private changing cabanas",
        "Heated floors and towel racks",
        "Digital lockers with biometric security",
        "Dyson hairdryers and styling tools"
      ],
      image: changingroom,
      color: "indigo",
      gradient: "from-indigo-400 to-purple-600"
    },
    // {
    //   title: "Aqua Lounge",
    //   description: "Our exclusive member's lounge overlooks the Olympic pool through floor-to-ceiling windows. Enjoy premium refreshments, high-speed WiFi, and comfortable seating in a sophisticated atmosphere.",
    //   features: [
    //     "Premium coffee and refreshment bar",
    //     "Underwater pool viewing window",
    //     "Dedicated workspaces with charging stations",
    //     "Pool-side table service"
    //   ],
    //   image: "/api/placeholder/800/500",
    //   color: "amber",
    //   gradient: "from-amber-400 to-orange-600"
    // }
  ]

  const tabVariants = {
    inactive: { 
      opacity: 0.6,
      scale: 0.9,
      transition: { duration: 0.3 }
    },
    active: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  }

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section id="facilities" className="py-20 lg:py-32 bg-neutral-950 text-white relative overflow-hidden" ref={sectionRef}>
      {/* Mouse follow glow effect */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none z-0"
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
            background: `radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(56, 189, 248, 0) 70%)`
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic gradient backgrounds */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-sky-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
        
        {/* Animated light beams */}
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"
          animate={isInView ? {
            x: [0, 30, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute -bottom-40 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
          animate={isInView ? {
            x: [0, -20, 0],
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Bubbles effect */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 20 + 10;
          const xPos = Math.random() * 100;
          const yPos = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 15 + 10;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: size,
                height: size,
                left: `${xPos}%`,
                top: `${yPos}%`,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(2px)'
              }}
              animate={{
                y: [0, -100],
                x: [0, Math.random() * 50 - 25],
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
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-sm font-medium text-sky-300 bg-sky-900/30 backdrop-blur-sm px-4 py-1.5 rounded-full tracking-wide shadow-inner shadow-sky-900/50">
              WORLD-CLASS FACILITIES
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400"
          >
            Luxury Beyond Compare
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: 150 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mb-6 rounded-full"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto text-neutral-300 text-lg"
          >
            Our meticulously designed facilities combine cutting-edge technology with unparalleled comfort.
            Every aspect has been crafted to deliver a swimming experience that transcends the ordinary.
          </motion.p>
        </div>
        
        {/* Facilities Showcase */}
        <div className="max-w-6xl mx-auto">
          {/* Tab navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {facilities.map((facility, index) => (
              <motion.button
                key={index}
                variants={tabVariants}
                animate={activeTab === index ? "active" : "inactive"}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-full text-sm font-medium relative overflow-hidden ${
                  activeTab === index 
                    ? `bg-gradient-to-r ${facilities[activeTab].gradient} text-white shadow-lg` 
                    : "bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20"
                }`}
              >
                {facility.title}
                
                {/* Water ripple effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    background: [
                      "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 0%)",
                      "radial-gradient(circle at center, rgba(255,255,255,0.1) 50%, transparent 100%)",
                    ],
                    backgroundSize: "300% 300%",
                    backgroundPosition: ["50% 50%", "100% 100%"]
                  }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Active indicator */}
                {activeTab === index && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 rounded-full bg-white"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Facility display */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden p-1 shadow-xl shadow-sky-500/5">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="bg-neutral-900/80 rounded-2xl overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-80 md:h-full overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${facilities[activeTab].gradient} mix-blend-overlay opacity-40`}></div>
                    <motion.img 
                      src={facilities[activeTab].image} 
                      alt={facilities[activeTab].title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-l"></div>
                    
                    {/* Water shimmer */}
                    <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-30">
                      <motion.rect
                        width="200%"
                        height="100%"
                        fill="url(#shimmer)"
                        animate={{ x: ["-100%", "0%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      />
                      <defs>
                        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                          <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
                          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Floating bubbles */}
                    {[...Array(5)].map((_, i) => {
                      const size = Math.random() * 20 + 10;
                      const delay = Math.random() * 2;
                      const duration = Math.random() * 5 + 5;
                      
                      return (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-white/20"
                          style={{
                            width: size,
                            height: size,
                            left: `${Math.random() * 100}%`,
                            bottom: "-10%"
                          }}
                          animate={{
                            y: [0, -200],
                            opacity: [0, 0.5, 0]
                          }}
                          transition={{
                            duration: duration,
                            repeat: Infinity,
                            delay: delay,
                            ease: "easeOut"
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center relative">
                    <motion.h3 
                      className={`text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${facilities[activeTab].gradient}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {facilities[activeTab].title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-neutral-300 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {facilities[activeTab].description}
                    </motion.p>
                    
                    <div className="grid gap-3">
                      {facilities[activeTab].features.map((feature, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i + 0.3 }}
                          className="flex items-start"
                        >
                          <motion.div 
                            className={`w-5 h-5 rounded-full bg-gradient-to-r ${facilities[activeTab].gradient} flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center`}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                          >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </motion.div>
                          <span className="text-neutral-200">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-10 self-start overflow-hidden relative group rounded-lg"
                    >
                      <div className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 backdrop-blur-sm transition-all duration-300 flex items-center relative z-10">
                        Virtual Tour
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      {/* Button highlight animation */}
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${facilities[activeTab].gradient}`}
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { value: "2500m²", label: "Facility Area" },
              { value: "32°C", label: "Water Temperature" },
              { value: "24/7", label: "Climate Control" },
              { value: "100%", label: "UV Purification" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(56, 189, 248, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  animate={{ 
                    color: ['#ffffff', '#38bdf8', '#ffffff'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sky-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Facilities