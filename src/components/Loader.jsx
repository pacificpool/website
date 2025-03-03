import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 150)
    
    return () => clearInterval(interval)
  }, [])
  
  // Animation variants
  const containerVariants = {
    initial: {
      opacity: 1
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        when: 'afterChildren'
      }
    }
  }
  
  const textVariants = {
    initial: {
      opacity: 1
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }
  
  const progressVariants = {
    initial: {
      scaleX: 0
    },
    animate: {
      scaleX: progress / 100,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    },
    exit: {
      scaleX: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut'
      }
    }
  }
  
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-950 z-[1000]"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <motion.div className="mb-8" variants={textVariants}>
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Build<span className="text-primary">Craft</span>
        </h1>
      </motion.div>
      
      <motion.div 
        className="w-64 h-[2px] bg-neutral-800 relative overflow-hidden"
        variants={textVariants}
      >
        <motion.div 
          className="absolute top-0 left-0 h-full w-full bg-primary origin-left"
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>
      
      <motion.div 
        className="mt-4 text-neutral-500 text-sm"
        variants={textVariants}
      >
        {Math.round(progress)}%
      </motion.div>
    </motion.div>
  )
}

export default Loader