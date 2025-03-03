import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

// Import icons (assuming you're using a library like heroicons or lucide-react)
import { Lightbulb, Users, CheckCircle, ThumbsUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Process = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stepsRef = useRef([])
  const lineRef = useRef(null)
  const [activeStep, setActiveStep] = useState(null)
  
  // Enhanced process steps data with icons and more detailed descriptions
  const steps = [
    {
      id: 1,
      title: "Investigate",
      description: "Our professional investigator conducts a thorough on-site evaluation using advanced diagnostic tools to precisely identify the root cause of issues and determine the optimal repair strategy.",
      icon: Lightbulb,
      color: "#4F46E5", // Indigo
      highlight: "98% accurate diagnosis rate"
    },
    {
      id: 2,
      title: "Workforce Assignment",
      description: "Our AI-powered system matches your specific project with the most qualified specialists from our network of vetted professionals, ensuring the right expertise for your unique requirements.",
      icon: Users,
      color: "#0EA5E9", // Sky blue
      highlight: "Expertly matched teams"
    },
    {
      id: 3,
      title: "Execution & Quality",
      description: "Our certified technicians execute the work with precision and care, following industry best practices and our comprehensive quality assurance protocols at every step of the process.",
      icon: CheckCircle,
      color: "#10B981", // Emerald
      highlight: "Triple-checked quality"
    },
    {
      id: 4,
      title: "Client Approval",
      description: "We walk you through all completed work, address any questions or concerns, and ensure your complete satisfaction before finalizing the service and collecting feedback for continuous improvement.",
      icon: ThumbsUp,
      color: "#F59E0B", // Amber
      highlight: "95% client satisfaction"
    }
  ]

  useEffect(() => {
    // More dynamic animation for the heading
    gsap.fromTo(
      headingRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=150',
          toggleActions: 'play none none none'
        }
      }
    )
    
    // Enhanced animations for steps with staggered timing
    stepsRef.current.forEach((step, index) => {
      // Create timeline for more complex animation sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top bottom-=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
          onEnter: () => setActiveStep(index + 1),
          onLeave: () => setActiveStep(null),
          onEnterBack: () => setActiveStep(index + 1),
          onLeaveBack: () => setActiveStep(null)
        }
      })
      
      tl.fromTo(
        step,
        { 
          x: index % 2 === 0 ? -100 : 100, 
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: 'back.out(1.7)'
        }
      )
    })
    
    // Improved animated line with glow effect
    gsap.fromTo(
      lineRef.current,
      { height: 0 },
      {
        height: '100%',
        duration: 2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom bottom-=200',
          scrub: 1
        }
      }
    )
    
    // Clean up animations
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  const addToRefs = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el)
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-24 md:py-36 lg:py-48 bg-neutral-900 relative overflow-hidden"
    >
      {/* Enhanced background elements with parallax effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full inline-block mb-4">
              OUR PROCESS
            </span>
          </motion.div>
          
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl xl:text-6xl font-bold text-white mb-8 tracking-tight"
          >
            <span className="text-primary">Transforming</span> How We Work
          </h2>
          
          <p className="text-neutral-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            At BuildCraft, we believe that facilities management and technical services should be 
            as seamless and transparent as possible. Our data-driven approach ensures exceptional results.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Enhanced connecting line with glow effect */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-700/50 transform -translate-x-1/2">
            <div 
              ref={lineRef} 
              className="w-full bg-gradient-to-b from-primary via-blue-500 to-purple-500 origin-top shadow-glow"
            ></div>
          </div>
          
          {/* Process Steps with enhanced visuals */}
          <div className="relative space-y-32 md:space-y-40">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                ref={addToRefs}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'
                }`}
              >
                {/* Enhanced step number with glow effect */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-neutral-700 flex items-center justify-center text-white font-bold z-10 shadow-lg"
                  style={{ 
                    boxShadow: activeStep === step.id ? `0 0 20px ${step.color}80` : 'none',
                    borderColor: activeStep === step.id ? step.color : 'rgb(64, 64, 64)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <span className="text-2xl" style={{ color: step.color }}>{step.id}</span>
                </motion.div>
                
                {/* Step Content with icon and enhanced styling */}
                <motion.div 
                  className={`w-full md:w-5/12 bg-neutral-800/80 backdrop-blur-sm p-8 rounded-xl border border-neutral-700 shadow-xl ${
                    index % 2 === 0 ? 'mr-auto md:mr-0 md:pr-16' : 'ml-auto md:ml-0 md:pl-16'
                  }`}
                  style={{
                    borderColor: activeStep === step.id ? step.color : 'rgb(64, 64, 64)',
                    boxShadow: activeStep === step.id ? `0 10px 25px -5px ${step.color}40` : '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="p-3 rounded-lg" 
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <step.icon size={24} style={{ color: step.color }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">{step.title}</h3>
                  </div>
                  
                  <p className="text-neutral-300 mb-4 leading-relaxed">{step.description}</p>
                  
                  {/* Highlight tag */}
                  <div 
                    className="inline-block px-3 py-1 rounded-md text-sm font-medium"
                    style={{ backgroundColor: `${step.color}20`, color: step.color }}
                  >
                    {step.highlight}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div 
          className="max-w-xl mx-auto mt-32 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to experience our streamlined process?</h3>
          <p className="text-neutral-300 mb-8">Let our experts handle your next project with precision and care.</p>
          <button className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-primary/30">
            Get Started Today
          </button>
        </motion.div>
      </div>
      
      {/* Add CSS for custom elements */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgb(30, 30, 30) 1px, transparent 1px),
                            linear-gradient(to bottom, rgb(30, 30, 30) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .shadow-glow {
          box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);
        }
      `}</style>
    </section>
  )
}

export default Process