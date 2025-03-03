import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Process from './sections/Process'
import Vision from './sections/Vision'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Lenis from '@studio-freight/lenis'
import { AnimatePresence } from 'framer-motion'
import Cursor from './components/Cursor'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)
  const appRef = useRef(null)
  
  // Smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureOrientation: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    
    // After assets are loaded, remove the loading screen
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader />}
      </AnimatePresence>
      
      <div ref={appRef} className="bg-neutral-950 text-neutral-200 overflow-hidden">
        <Cursor />
        <Navbar />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="services">
            <Services />
          </section>
          <section id="process">
            <Process />
          </section>
          <section id="vision">
            <Vision />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
      </div>
    </>
  )
}

export default App