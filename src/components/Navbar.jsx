import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Navigation links
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ]
  
  // Handle scroll events to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-neutral-950/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 2.6 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <div className="relative">
            <div className="text-white font-bold text-xl">
              PACIFIC <span className="text-sky-400">POOL</span>
            </div>
            
            {/* Water-like underline animation */}
            <motion.div 
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-400"
              animate={{
                scaleX: [1, 1.05, 0.95, 1],
                translateY: [0, -1, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <a 
              key={link.name}
              href={link.href}
              className={`text-sm font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-sky-400 after:transition-all after:duration-300 ${
                isScrolled ? 'text-white hover:text-sky-300 after:w-0 hover:after:w-full' : 'text-white/80 hover:text-white after:w-0 hover:after:w-full'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        {/* CTA Button */}
        <div className="hidden md:block">
          <button className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
            isScrolled 
              ? 'bg-sky-400 text-neutral-900 hover:bg-sky-300' 
              : 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20'
          }`}>
            Book a Session
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white flex flex-col space-y-1.5 items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <motion.span 
            className="w-6 h-0.5 bg-current rounded-full block"
            animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-current rounded-full block"
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
          />
          <motion.span 
            className="w-6 h-0.5 bg-current rounded-full block"
            animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
          />
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-neutral-950/95 backdrop-blur-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-4 px-4 flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  className="text-white py-2 border-b border-neutral-800 text-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.button 
                className="mt-4 bg-sky-400 text-neutral-900 px-4 py-3 rounded-lg text-sm font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                Book a Session
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating bubbles near the navbar - only visible when scrolled */}
      {isScrolled && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="hidden md:block absolute rounded-full bg-sky-400/20 blur-sm"
              style={{
                width: Math.random() * 30 + 10,
                height: Math.random() * 30 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [0, -100],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </>
      )}
    </motion.header>
  )
}

export default Navbar