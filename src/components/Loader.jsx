import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const Loader = () => {
  const poolRef = useRef(null)
  const bubblesRef = useRef([])
  
  useEffect(() => {
    // Create ripple effect
    const pool = poolRef.current
    
    // Set up GSAP animation for water ripples
    gsap.to(pool, {
      scaleX: 1.05,
      scaleY: 0.95,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
    
    // Animate bubbles
    bubblesRef.current.forEach((bubble, index) => {
      // Random starting positions
      gsap.set(bubble, { 
        x: -20 + Math.random() * 40,
        y: 30 + Math.random() * 30,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0
      })
      
      // Create rising animation
      gsap.to(bubble, {
        y: -60 - Math.random() * 50,
        x: "+=20" + (Math.random() * 40 - 20),
        rotation: Math.random() * 360,
        opacity: [0, 0.8, 0],
        scale: 0.2 + Math.random() * 0.8,
        duration: 2 + Math.random() * 2,
        delay: index * 0.2,
        repeat: -1,
        ease: "power1.out"
      })
    })
    
    return () => {
      gsap.killTweensOf(pool)
      bubblesRef.current.forEach(bubble => {
        gsap.killTweensOf(bubble)
      })
    }
  }, [])
  
  // Store bubble refs
  const addBubbleRef = (el) => {
    if (el && !bubblesRef.current.includes(el)) {
      bubblesRef.current.push(el)
    }
  }
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
    >
      {/* Logo animation container */}
      <div className="relative w-32 h-32">
        {/* Water pool */}
        <div 
          ref={poolRef}
          className="absolute inset-x-0 bottom-0 h-16 bg-sky-400 rounded-full origin-center"
          style={{ transformOrigin: "center bottom" }}
        ></div>
        
        {/* Pacific Pool text */}
        <motion.div 
          className="text-center absolute top-0 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="text-2xl font-bold text-white">PACIFIC</div>
          <div className="text-lg font-semibold text-sky-400">POOL</div>
        </motion.div>
        
        {/* Swimming figure animation */}
        <motion.div
          className="absolute left-0 top-12 z-10 w-10 h-6"
          animate={{
            x: [0, 80, 0],
            rotate: [0, 0, 180, 180, 0]
          }}
          transition={{
            duration: 4,
            times: [0, 0.4, 0.5, 0.9, 1],
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Proper human swimmer figure */}
            {/* Body */}
            <rect x="10" y="9" width="22" height="6" rx="3" fill="white" />
            {/* Head */}
            <circle cx="7" cy="12" r="4" fill="white" />
            {/* Arms */}
            <path d="M15,6 C20,4 25,4 30,6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            {/* Legs */}
            <path d="M32,9 L36,6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M32,15 L36,18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
        
        {/* Bubbles */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            ref={addBubbleRef}
            className="absolute left-1/2 bottom-12 w-3 h-3 rounded-full bg-white opacity-80"
          ></div>
        ))}
        
        {/* Loading text */}
        <motion.div 
          className="absolute -bottom-12 left-0 right-0 text-center text-white text-sm opacity-80"
          animate={{
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Diving in...
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Loader