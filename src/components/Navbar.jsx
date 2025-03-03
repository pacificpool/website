import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Navigation links
  const navLinks = [
    { title: 'Home', link: '#home' },
    { title: 'About', link: '#about' },
    { title: 'Services', link: '#services' },
    { title: 'Process', link: '#process' },
    { title: 'Vision', link: '#vision' },
    { title: 'Projects', link: '#projects' },
    { title: 'Contact', link: '#contact' }
  ]
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  // Handle smooth scrolling to sections
  const handleNavClick = (e, target) => {
    e.preventDefault()
    
    // Close menu if open
    setIsMenuOpen(false)
    
    // Get the target element
    const element = document.querySelector(target)
    
    if (element) {
      // Use Lenis for smooth scrolling if available
      if (window.lenis) {
        window.lenis.scrollTo(element, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        // Fallback to native smooth scrolling
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
  
  // Navbar animation variants
  const navbarVariants = {
    initial: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      borderBottom: '1px solid rgba(255, 255, 255, 0)'
    },
    scrolled: {
      backgroundColor: 'rgba(10, 10, 10, 0.9)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)'
    }
  }
  
  // Mobile menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }
  
  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 w-full z-50 py-4 px-6"
        initial="initial"
        animate={isScrolled ? 'scrolled' : 'initial'}
        variants={navbarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="text-white font-bold text-2xl" onClick={(e) => handleNavClick(e, '#home')}>
            Build<span className="text-primary">Craft</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.link}
                    onClick={(e) => handleNavClick(e, link.link)}
                    className="text-white/80 hover:text-primary transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden bg-black/90 backdrop-blur-md"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end p-6">
                <button 
                  className="text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center">
                <nav>
                  <ul className="space-y-6 text-center">
                    {navLinks.map((link, index) => (
                      <li key={index}>
                        <a 
                          href={link.link}
                          onClick={(e) => handleNavClick(e, link.link)}
                          className="text-3xl text-white hover:text-primary transition-colors duration-300"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              <div className="p-10 text-center">
                <p className="text-white/60 text-sm">© {new Date().getFullYear()} BuildCraft</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar