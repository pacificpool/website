import { useEffect, useRef, useState, useCallback, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
// Import images
import service1Image from "../assets/service-1.jpg";
import service2Image from "../assets/service-2.jpg";
import service3Image from "../assets/service-3.jpg";
import service4Image from "../assets/service-4.avif";
import service5Image from "../assets/service-5.png";
import service6Image from "../assets/service-6.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Service data - moved outside component to prevent re-creation on renders
const services = [
  {
    id: 1,
    title: "Technical Services",
    description:
      "Comprehensive technical solutions for all your facility needs, delivered by expert technicians with attention to detail and industry-leading standards.",
    icon: "wrench",
    color: "#3498db",
    image: service1Image,
    features: ["24/7 Emergency Support", "Certified Technicians", "Quality Guaranteed"],
  },
  {
    id: 2,
    title: "Electromechanical Works",
    description:
      "Expert electrical and mechanical installation and maintenance for commercial and industrial facilities, ensuring safety, efficiency, and compliance.",
    icon: "bolt",
    color: "#f39c12",
    image: service2Image,
    features: ["Safety Certified", "Energy Efficient Solutions", "Modern Equipment"],
  },
  {
    id: 3,
    title: "Scaffolding & Formwork",
    description:
      "Secure, reliable scaffolding and formwork solutions for construction projects of all sizes, designed to meet the highest safety standards and project requirements.",
    icon: "construction",
    color: "#e74c3c",
    image: service3Image,
    features: ["Safety Compliant", "Custom Designed", "Fast Installation"],
  },
  {
    id: 4,
    title: "Air-Conditioning",
    description:
      "Installation, maintenance and repair of HVAC systems to ensure optimal climate control, energy efficiency, and air quality in any environment.",
    icon: "snowflake",
    color: "#1abc9c",
    image: service4Image,
    features: ["Energy Efficient", "Smart Controls", "Preventative Maintenance"],
  },
  {
    id: 5,
    title: "Plumbing Services",
    description:
      "Professional plumbing installation and maintenance services for all your water system needs, from minor repairs to complete system overhauls.",
    icon: "droplet",
    color: "#3498db",
    image: service5Image,
    features: ["Leak Detection", "Water Conservation", "Emergency Repairs"],
  },
  {
    id: 6,
    title: "Carpentry & Flooring",
    description:
      "High-quality carpentry and wood flooring services for residential and commercial projects, combining traditional craftsmanship with modern techniques.",
    icon: "clipboard",
    color: "#8e44ad",
    image: service6Image,
    features: ["Premium Materials", "Custom Solutions", "Expert Installation"],
  },
];

// Memoized Icon component for better performance
const IconComponent = memo(({ name, color, size = 8 }) => {
  const sizeClass = `w-${size} h-${size}`;
  
  switch (name) {
    case "wrench":
      return (
        <svg
          className={sizeClass}
          fill="none"
          stroke={color}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      );
    case "bolt":
      return (
        <svg
          className={sizeClass}
          fill="none"
          stroke={color}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      );
    case "snowflake":
      return (
        <svg
          className={sizeClass}
          fill="none"
          stroke={color}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 3v18m-9-9h18M8.4 8.4l7.2 7.2M8.4 15.6l7.2-7.2"
          ></path>
        </svg>
      );
    case "droplet":
      return (
        <svg
          className={sizeClass}
          fill="none"
          stroke={color}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          ></path>
        </svg>
      );
    case "construction":
      return (
        <svg
          className={sizeClass}
          fill="none"
          stroke={color}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
      );
    case "clipboard":
      return (
        <svg
          className={sizeClass}
          fill="none"
          stroke={color}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
      );
    default:
      return (
        <svg
          className={sizeClass}
          fill="none"
          stroke={color}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      );
  }
});

// Memoized ServiceCard component for better performance
const ServiceCard = memo(({
  service,
  isActive,
  isExpanded,
  isMobile,
  onHover,
  onLeave,
  onClick,
  addToRefs
}) => {
  // Desktop card
  if (!isMobile) {
    return (
      <motion.div
        ref={addToRefs}
        className={`service-card w-[45vw] h-[55vh] flex-shrink-0 rounded-xl p-1 relative overflow-hidden transition-all duration-300 ${
          isActive ? "scale-[1.02]" : "scale-[0.98]"
        }`}
        style={{
          background: isActive
            ? `linear-gradient(45deg, ${service.color}44, transparent)`
            : "linear-gradient(45deg, #ffffff11, #ffffff00)",
          boxShadow: isActive 
            ? `0 10px 30px -5px ${service.color}33` 
            : 'none',
        }}
        onMouseEnter={() => onHover(service.id)}
        onMouseLeave={onLeave}
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
        data-testid={`service-card-${service.id}`}
      >
        {/* Background image with parallax effect */}
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src={service.image}
            alt=""
            className="w-full h-full object-cover opacity-95" 
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 to-neutral-900/50 backdrop-blur-[1px]"></div>
        </motion.div>
        
        <div className="w-full h-full bg-gradient-to-t from-neutral-900/40 via-neutral-900/20 to-neutral-900/10 rounded-lg p-6 flex flex-col relative z-10 backdrop-blur-[2px]">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
            style={{ 
              backgroundColor: `${service.color}22`,
              boxShadow: `0 8px 24px -8px ${service.color}33`
            }}
          >
            <IconComponent name={service.icon} color={service.color} size={10} />
          </div>
          
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {service.title}
          </h3>
          
          <p className="text-white text-shadow-sm mb-8 text-lg leading-relaxed">
            {service.description}
          </p>
          
          {/* Feature tags */}
          <div className="flex flex-wrap gap-3 mb-10">
            {service.features.map((feature, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ 
                  backgroundColor: `${service.color}22`,
                  color: service.color
                }}
              >
                {feature}
              </span>
            ))}
          </div>
          
          <div className="mt-auto">
            <button
              className="group flex items-center"
              style={{ color: service.color }}
              aria-label={`Learn more about ${service.title}`}
            >
              {/* <span className="font-medium mr-3 relative overflow-hidden">
                Learn more
                <span className="block h-0.5 w-full bg-current opacity-30 mt-1 group-hover:w-0 transition-all duration-300"></span>
                <span className="block h-0.5 w-0 bg-current absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
              </span> */}
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Mobile card
  return (
    <motion.div
      ref={addToRefs}
      className="service-card rounded-xl p-1 relative overflow-hidden"
      style={{
        background: isExpanded
          ? `linear-gradient(45deg, ${service.color}44, transparent)`
          : "linear-gradient(45deg, #ffffff11, #ffffff00)",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(service.id)}
      data-testid={`service-card-mobile-${service.id}`}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={service.image}
          alt=""
          className="w-full h-full object-cover opacity-95" 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 to-neutral-900/40"></div>
      </div>
      
      {/* Content */}
      <div className="w-full h-full bg-neutral-900/30 backdrop-blur-[2px] rounded-lg p-6 flex flex-col relative z-10">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${service.color}22` }}
          >
            <IconComponent name={service.icon} color={service.color} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              {service.title}
            </h3>
            
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="expanded"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-shadow-sm mb-4">{service.description}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span 
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: service.color }}
                          aria-hidden="true"
                        ></span>
                        <span className="text-white text-shadow-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.p 
                  key="collapsed"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white text-shadow-sm line-clamp-2"
                >
                  {service.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div 
            className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center cursor-pointer transform transition-transform"
            style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            <svg
              className="w-4 h-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Memoized particles component
const BackgroundParticles = memo(() => (
  <div className="particles" aria-hidden="true">
    {[...Array(20)].map((_, i) => (
      <div 
        key={i}
        className="absolute w-1 h-1 rounded-full bg-white opacity-20"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${5 + Math.random() * 10}s linear infinite`,
        }}
      ></div>
    ))}
  </div>
));

// Main component
const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const pinRef = useRef(null);
  const serviceRefs = useRef([]);
  
  // Clear refs on re-render
  useEffect(() => {
    serviceRefs.current = [];
    return () => {
      // Clean up GSAP animations on unmount
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Update mobile state on resize with debounce
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    if (!headingRef.current) return;
    
    // Animate heading elements
    const headingBadge = headingRef.current.querySelector("[data-element='heading-badge']");
    const headingText = headingRef.current.querySelector("[data-element='heading-text']");
    const headingUnderline = headingRef.current.querySelector("[data-element='heading-underline']");
    const headingSubtext = headingRef.current.querySelector("[data-element='heading-subtext']");
    
    if (!headingBadge || !headingText || !headingUnderline || !headingSubtext) return;
    
    const headingTl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none",
      },
    });
    
    headingTl
      .fromTo(
        headingBadge,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(
        headingText,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        headingUnderline,
        { width: 0 },
        { width: "100%", duration: 0.6, ease: "power3.inOut" },
        "-=0.4"
      )
      .fromTo(
        headingSubtext,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
      
    // Skip the rest if elements aren't ready
    if (!pinRef.current || !cardsRef.current) return;
      
    // Set up horizontal scroll for desktop
    if (!isMobile) {
      const serviceCards = gsap.utils.toArray(".service-card");
      if (serviceCards.length === 0) return;
      
      // Calculate responsive layout dimensions
      const cardWidth = window.innerWidth * 0.45; // 45vw
      const cardMargin = window.innerWidth * 0.05; // 5% of viewport
      const totalWidth = (serviceCards.length * (cardWidth + cardMargin)) - window.innerWidth;
      
      if (totalWidth <= 0) return;
      
      gsap.to(cardsRef.current, {
        x: `-${totalWidth}px`,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${totalWidth + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Determine which card is most in view
            const progress = self.progress;
            const activeIndex = Math.min(
              Math.floor(progress * serviceCards.length),
              serviceCards.length - 1
            );
            
            // Update active service for visual highlighting
            if (activeIndex >= 0 && activeIndex < serviceCards.length) {
              setActiveService(activeIndex + 1);
            }
          },
        },
      });

      // Dynamic card scale and opacity based on visibility
      serviceCards.forEach((card, i) => {
        const index = i + 1;
        
        gsap.fromTo(
          card,
          { 
            scale: 0.85, 
            opacity: 0.5,
            filter: "blur(2px)" 
          },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: pinRef.current,
              start: `top top+=${i * 10}%`,
              end: `top top+=${(i + 1) * 25}%`,
              scrub: true,
              onEnter: () => setActiveService(index),
              onEnterBack: () => setActiveService(index),
            },
          }
        );
      });
    } else if (serviceRefs.current.length > 0) {
      // Mobile animations with improved performance
      serviceRefs.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }
  }, [isMobile]);

  // Event handlers with useCallback for better performance
  const handleServiceHover = useCallback((id) => {
    if (!isMobile) {
      setActiveService(id);
    }
  }, [isMobile]);

  const handleServiceLeave = useCallback(() => {
    // Don't reset on leave to maintain scroll-based active state
  }, []);

  const handleServiceClick = useCallback((id) => {
    setExpandedService(expandedService === id ? null : id);
  }, [expandedService]);

  // Helper to add elements to refs
  const addToServiceRefs = (el) => {
    if (el && !serviceRefs.current.includes(el)) {
      serviceRefs.current.push(el);
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-neutral-950 relative overflow-hidden"
      aria-label="Our Services"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl opacity-30 transform -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent opacity-20"></div>
        
        {/* Animated particles */}
        <BackgroundParticles />
      </div>

      <div 
        ref={pinRef} 
        className={`${isMobile ? '' : 'min-h-screen'} relative flex flex-col`}
      >
        <div className="container mx-auto px-6 pt-24 pb-12">
          <div 
            ref={headingRef}
            className="max-w-3xl"
          >
            <span 
              data-element="heading-badge"
              className="heading-badge inline-block px-4 py-1 bg-white/10 text-primary text-sm font-medium rounded-full mb-6 block"
            >
              WHAT WE OFFER
            </span>
            <div className="mb-2">
              <h2 
                data-element="heading-text"
                className="heading-text text-3xl md:text-5xl xl:text-6xl font-bold text-white relative inline-block"
              >
                Our Services
                <div 
                  data-element="heading-underline"
                  className="heading-underline absolute -bottom-3 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-primary/30"
                ></div>
              </h2>
            </div>
            <p 
              data-element="heading-subtext"
              className="heading-subtext text-lg text-neutral-400 mt-8 max-w-2xl"
            >
              We deliver comprehensive technical solutions and maintenance services, 
              ensuring your facilities operate at peak performance with minimal downtime.
            </p>
          </div>
        </div>

        {isMobile ? (
          // Mobile layout - vertical cards
          <div className="container mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isActive={activeService === service.id}
                  isExpanded={expandedService === service.id}
                  isMobile={true}
                  onHover={handleServiceHover}
                  onLeave={handleServiceLeave}
                  onClick={handleServiceClick}
                  addToRefs={addToServiceRefs}
                />
              ))}
            </div>
          </div>
        ) : (
          // Desktop layout - horizontal scroll
          <div className="flex-1 flex items-center relative">
            <div 
              ref={cardsRef} 
              className="px-[5vw] flex space-x-5 items-center"
            >
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isActive={activeService === service.id}
                  isExpanded={expandedService === service.id}
                  isMobile={false}
                  onHover={handleServiceHover}
                  onLeave={handleServiceLeave}
                  onClick={handleServiceClick}
                  addToRefs={addToServiceRefs}
                />
              ))}
            </div>
            
            {/* Enhanced scroll indicator with improved accessibility */}
            <div className="absolute bottom-8 right-8 flex items-center" aria-hidden="true">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center bg-neutral-900/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl"
              >
                <span className="mr-3 text-sm text-neutral-300">Scroll to explore</span>
                <div className="flex space-x-1">
                  <motion.svg
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </motion.svg>
                </div>
              </motion.div>
            </div>
            
            {/* Service indicator dots */}
            <div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
              role="tablist"
              aria-label="Service navigation"
            >
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  className="w-2 h-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
                  animate={{
                    backgroundColor: activeService === service.id ? service.color : "#4b5563",
                    scale: activeService === service.id ? 1.5 : 1
                  }}
                  whileHover={{ scale: 1.5 }}
                  onClick={() => {
                    setActiveService(service.id);
                    // Could add scroll to specific service functionality here
                  }}
                  role="tab"
                  aria-selected={activeService === service.id}
                  aria-label={`View ${service.title}`}
                ></motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add floating CTA */}
      <motion.div
        className="fixed bottom-10 right-10 z-50 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.button
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Request Service"
        >
          {/* <span>Request Service</span> */}
          {/* <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg> */}
        </motion.button>
      </motion.div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-30px) translateX(-10px);
          }
        }
        
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Services;