import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const Vision = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const visionRef = useRef(null)
  const missionRef = useRef(null)
  const quoteRef = useRef(null)
  
  useEffect(() => {
    // Parallax effect for the background
    gsap.to(sectionRef.current, {
      backgroundPositionY: '30%',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
    
    // Animation for the heading
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    )
    
    // Animation for vision card
    gsap.fromTo(
      visionRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: visionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    )
    
    // Animation for mission card
    gsap.fromTo(
      missionRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    )
    
    // Animation for quote
    gsap.fromTo(
      quoteRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    )
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 relative bg-cover bg-center"
      style={{ 
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(/placeholder-bg.jpg)',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6"
          >
            Our Vision & Mission
          </h2>
          <p className="text-neutral-300">
            We're driven by a clear vision and mission to transform the built environment 
            through innovation, quality, and sustainability.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <motion.div 
            ref={visionRef}
            className="group relative overflow-hidden rounded-lg p-0.5"
            style={{
              background: 'linear-gradient(45deg, rgba(52, 152, 219, 0.3), rgba(52, 152, 219, 0))'
            }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="bg-neutral-900/95 backdrop-blur-sm p-8 rounded-lg relative z-10 h-full">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              
              <p className="text-neutral-300 mb-4">
                To be the leading provider of innovative and sustainable facilities
                management solutions, enhancing operational efficiency, safety,
                and comfort for our clients.
              </p>
              
              <p className="text-neutral-300">
                We aim to transform the built environment through cutting-edge technology, 
                exceptional service, and a commitment to sustainability, fostering lasting
                partnerships and creating spaces that inspire productivity and growth.
              </p>
            </div>
          </motion.div>
          
          {/* Mission Card */}
          <motion.div 
            ref={missionRef}
            className="group relative overflow-hidden rounded-lg p-0.5"
            style={{
              background: 'linear-gradient(45deg, rgba(231, 76, 60, 0.3), rgba(231, 76, 60, 0))'
            }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="bg-neutral-900/95 backdrop-blur-sm p-8 rounded-lg relative z-10 h-full">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              
              <p className="text-neutral-300 mb-4">
                We aim to be your trusted, all-in-one partner for facilities
                management and technical services. Our commitment lies in
                building, maintaining, and enhancing spaces that promote
                productivity and comfort while ensuring long-term value.
              </p>
              
              <p className="text-neutral-300">
                With a focus on innovation, expert craftsmanship, and excellence,
                we deliver functional, sustainable, and high-performing
                environments designed to inspire success.
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Quote */}
        <div 
          ref={quoteRef}
          className="max-w-3xl mx-auto text-center mt-20"
        >
          <blockquote className="text-2xl md:text-3xl italic text-white font-light">
            "One man alone may strive in vain, but a united team can conquer all terrain."
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export default Vision