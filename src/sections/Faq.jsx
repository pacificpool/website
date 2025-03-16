import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const Faq = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(null)
  
  const faqs = [
    {
      question: "What is special about Pacific Pool's temperature-controlled facility?",
      answer: "Our state-of-the-art climate control system maintains our pool at a perfect 32°C year-round, creating ideal swimming conditions regardless of outside weather. This allows for comfortable swimming during all seasons, reduced muscle tension, and enhanced performance for athletes and recreational swimmers alike."
    },
    {
      question: "Are there programs for children and beginners?",
      answer: "Absolutely! We offer specialized programs for all age groups and skill levels. Our children's programs start from as young as 3 years old with our 'Little Swimmers' classes. For beginners of any age, our 'Learn to Swim' program focuses on water confidence, basic technique, and safety skills in a supportive environment with low student-to-instructor ratios."
    },
    {
      question: "What qualifications do your swimming coaches have?",
      answer: "Our coaching team consists of highly qualified professionals with national and international certifications. Many are former competitive swimmers with extensive coaching experience. All coaches are certified in lifeguarding, CPR, and first aid. Our head coaches hold advanced certifications from swimming federations and undergo regular training to stay updated with the latest techniques and teaching methodologies."
    },
    {
      question: "How is the water quality maintained?",
      answer: "We employ a cutting-edge multi-stage purification system that combines UV sterilization, ozone treatment, and advanced filtration. Our water quality exceeds international standards and is tested hourly by automated systems and multiple times daily by our maintenance team. Our system uses significantly reduced chlorine levels compared to traditional pools, resulting in gentler water that's kinder to skin, eyes, and swimwear."
    },
    {
      question: "Do you offer private swimming lessons?",
      answer: "Yes, we provide personalized private lessons tailored to individual goals and abilities. These one-on-one sessions offer focused attention from our expert coaches and can be scheduled at flexible times to accommodate your busy lifestyle. Private lessons are available for all ages and skill levels, from beginners to advanced swimmers looking to refine specific techniques."
    },
    {
      question: "What amenities are included with pool access?",
      answer: "Pacific Pool offers premium amenities including luxury changing suites with private showers, complimentary toiletries, digital lockers secured with biometric technology, plush towel service, hair dryers and styling tools, a members' lounge overlooking the pool with refreshment services, free high-speed Wi-Fi throughout the facility, and access to our wellness area featuring spa facilities."
    },
    {
      question: "Are there any trial options before committing to membership?",
      answer: "We offer a comprehensive 'Experience Pacific' trial that includes access to our premium facilities, a personalized swimming assessment, and a guided tour of our complex. This allows you to experience our temperature-controlled water, premium amenities, and expert coaching before making a commitment. Contact our concierge team to schedule your trial experience."
    },
    {
      question: "What safety measures are in place at Pacific Pool?",
      answer: "Safety is our top priority. We maintain certified lifeguards on duty at all times, comprehensive CCTV coverage, regular emergency drills for staff, automated water quality monitoring systems, slip-resistant surfaces throughout the facility, clear depth markings and safety signage, first aid stations and AED devices, and strict capacity limits to ensure comfortable swimming space for everyone."
    }
  ]
  
  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }
  
  return (
    <section id="faq" className="py-20 lg:py-32 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 right-0 w-1/3 text-sky-100 opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M47.1,-57.1C59.5,-45.2,67.4,-28.5,71.2,-10.6C75,7.3,74.8,26.5,65.6,39.9C56.3,53.3,38.1,60.9,19.2,67.2C0.4,73.5,-19.2,78.5,-35.9,72.5C-52.5,66.5,-66.1,49.5,-72.8,30.4C-79.5,11.3,-79.3,-9.9,-71.8,-27.7C-64.2,-45.6,-49.3,-60.1,-33.2,-70.7C-17,-81.2,0.4,-87.9,16.3,-83.4C32.2,-78.9,46.5,-63.3,47.1,-57.1Z" transform="translate(100 100)" />
        </svg>
        
        <svg className="absolute bottom-0 left-0 w-1/4 text-blue-100 opacity-30" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M50.8,-65.3C62.9,-55.2,68.2,-36.3,72.1,-17.5C76.1,1.3,78.7,20.1,71.5,33.8C64.2,47.6,47.1,56.3,30.2,61.8C13.3,67.3,-3.3,69.5,-18.7,65.8C-34.1,62.1,-48.3,52.4,-58.3,38.9C-68.3,25.4,-74.1,8.1,-72.1,-8.3C-70.1,-24.8,-60.2,-40.5,-46.9,-50.5C-33.6,-60.5,-16.8,-64.9,1.2,-66.5C19.3,-68.1,38.6,-75.5,50.8,-65.3Z" transform="translate(100 100)" />
        </svg>
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
            <span className="text-sm font-medium text-sky-600 bg-sky-50 px-4 py-1.5 rounded-full tracking-wide">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-neutral-900"
          >
            Everything You Need to Know
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: 120 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mb-6 rounded-full"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto text-neutral-600 text-lg"
          >
            Find answers to commonly asked questions about our premium facilities, programs, and services. 
            Can't find what you're looking for? Feel free to contact us directly.
          </motion.p>
        </div>
        
        {/* Creative FAQ visualization */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Water level indicator */}
            <div className="absolute left-4 top-4 bottom-4 w-1 bg-gradient-to-b from-sky-100 to-blue-400 rounded-full overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-sky-600"
                initial={{ height: "0%" }}
                animate={{ 
                  height: activeIndex !== null ? `${(activeIndex + 1) / faqs.length * 100}%` : "0%" 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* FAQ items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="pl-12"
            >
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className={`mb-4 transform transition-all duration-300 ${
                    activeIndex === index ? 'scale-102' : ''
                  }`}
                >
                  <div 
                    className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                      activeIndex === index ? 'ring-2 ring-sky-400' : ''
                    }`}
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <span className="font-bold text-neutral-900">{faq.question}</span>
                      <span className={`ml-4 flex-shrink-0 p-2 rounded-full ${
                        activeIndex === index ? 'bg-sky-500 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        <svg 
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            activeIndex === index ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-neutral-600 border-t border-neutral-100 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Call to action */}


      </div>
    </section>
  )
}

export default Faq