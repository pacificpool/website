import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const cursorRef = useRef(null)
  
  useEffect(() => {
    // Show cursor when mouse moves
    const handleMouseEnter = () => {
      setIsVisible(true)
    }
    
    // Hide cursor when mouse leaves window
    const handleMouseLeave = () => {
      setIsVisible(false)
    }
    
    // Track mouse movement
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Check if hovering over clickable elements
      const target = e.target
      
      const isLink = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      
      setIsPointer(isLink)
    }
    
    // Track mouse down
    const handleMouseDown = () => {
      setIsActive(true)
    }
    
    // Track mouse up
    const handleMouseUp = () => {
      setIsActive(false)
    }
    
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  
  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none'
    
    const links = document.querySelectorAll('a, button, .cursor-pointer')
    links.forEach(link => {
      link.style.cursor = 'none'
    })
    
    return () => {
      document.body.style.cursor = ''
      links.forEach(link => {
        link.style.cursor = ''
      })
    }
  }, [])
  
  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 1.5 : isActive ? 0.8 : 1,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: 'spring',
        mass: 0.3,
        stiffness: 800,
        damping: 40,
        scale: {
          type: 'spring',
          mass: 0.1,
          stiffness: 800,
          damping: 20
        }
      }}
    >
      <div className={`w-8 h-8 rounded-full bg-white ${isPointer ? 'mix-blend-exclusion' : ''}`} />
    </motion.div>
  )
}

export default Cursor