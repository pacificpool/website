import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const Cursor = () => {
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const bubblesRef = useRef([])
  
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  
  // Maximum number of bubbles
  const maxBubbles = 5
  
  useEffect(() => {
    bubblesRef.current = []
    
    const addPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleMouseDown = () => {
      setClicked(true)
      
      // Create new bubble at cursor position
      createBubble()
      
      // Reset click state after animation
      setTimeout(() => {
        setClicked(false)
      }, 150)
    }
    
    const handleMouseUp = () => {
      setClicked(false)
    }
    
    const handleLinkHoverStart = () => {
      setLinkHovered(true)
    }
    
    const handleLinkHoverEnd = () => {
      setLinkHovered(false)
    }
    
    const handleMouseLeave = () => {
      setHidden(true)
    }
    
    const handleMouseEnter = () => {
      setHidden(false)
    }
    
    // Create a bubble element
    const createBubble = () => {
      // Remove oldest bubble if we reached the limit
      if (bubblesRef.current.length >= maxBubbles) {
        const oldestBubble = bubblesRef.current.shift()
        if (oldestBubble && oldestBubble.parentNode) {
          oldestBubble.parentNode.removeChild(oldestBubble)
        }
      }
      
      // Create new bubble
      const bubble = document.createElement('div')
      bubble.className = 'absolute rounded-full border border-sky-300 pointer-events-none'
      bubble.style.width = '30px'
      bubble.style.height = '30px'
      bubble.style.left = `${position.x}px`
      bubble.style.top = `${position.y}px`
      bubble.style.marginLeft = '-15px'
      bubble.style.marginTop = '-15px'
      bubble.style.animation = 'bubbleExpand 2s ease-out forwards'
      
      // Add bubble to DOM
      document.body.appendChild(bubble)
      
      // Add to our refs array
      bubblesRef.current.push(bubble)
      
      // Remove after animation completes
      setTimeout(() => {
        if (bubble.parentNode) {
          bubble.parentNode.removeChild(bubble)
          bubblesRef.current = bubblesRef.current.filter(b => b !== bubble)
        }
      }, 2000)
    }
    
    // Add necessary styles for bubble animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes bubbleExpand {
        0% {
          transform: scale(0);
          opacity: 0.7;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
    
    // Add event listeners
    document.addEventListener('mousemove', addPosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    // Add hover listeners to all links and buttons
    const hoveredElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]')
    hoveredElements.forEach((element) => {
      element.addEventListener('mouseenter', handleLinkHoverStart)
      element.addEventListener('mouseleave', handleLinkHoverEnd)
    })
    
    return () => {
      document.removeEventListener('mousemove', addPosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      
      hoveredElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleLinkHoverStart)
        element.removeEventListener('mouseleave', handleLinkHoverEnd)
      })
      
      // Clean up bubbles
      bubblesRef.current.forEach(bubble => {
        if (bubble.parentNode) {
          bubble.parentNode.removeChild(bubble)
        }
      })
      
      // Remove animation style
      document.head.removeChild(style)
    }
  }, [])
  
  // Update cursor positions with spring animation for smoother following
  const cursorVariants = {
    default: {
      x: position.x - 5,
      y: position.y - 5,
      opacity: hidden ? 0 : 1
    },
    clicked: {
      x: position.x - 5,
      y: position.y - 5,
      scale: 0.8,
      opacity: hidden ? 0 : 1
    }
  }
  
  const cursorRingVariants = {
    default: {
      x: position.x - 20,
      y: position.y - 20,
      opacity: hidden ? 0 : 1
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      width: 32,
      height: 32,
      opacity: hidden ? 0 : 1
    },
    hovered: {
      x: position.x - 32,
      y: position.y - 32,
      width: 64,
      height: 64,
      opacity: hidden ? 0 : 0.5,
      transition: {
        type: 'spring',
        mass: 0.3
      }
    }
  }
  
  return (
    <>
      <motion.div
        ref={cursorRef}
        className="cursor-dot z-50 fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none"
        variants={cursorVariants}
        animate={clicked ? "clicked" : "default"}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300
        }}
      />
      
      <motion.div
        ref={cursorRingRef}
        className="cursor-ring z-50 fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-sky-300 pointer-events-none"
        variants={cursorRingVariants}
        animate={linkHovered ? "hovered" : clicked ? "clicked" : "default"}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 300
        }}
      />
    </>
  )
}

export default Cursor