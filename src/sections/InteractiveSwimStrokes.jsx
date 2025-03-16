import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InteractiveSwimStrokes = () => {
  const [activeStroke, setActiveStroke] = useState(null);
  const [viewMode, setViewMode] = useState("3d"); // "3d", "firstPerson", "underwater"
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showTips, setShowTips] = useState(true);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const strokes = [
    {
      id: "freestyle",
      name: "Freestyle",
      description: "The fastest swimming stroke, also known as front crawl. Arms move alternatively while legs perform a flutter kick.",
      color: "#3B82F6", // blue-500
      video: "/videos/freestyle.mp4", // You would need actual videos
      tips: [
        { time: 1, text: "Keep your body horizontal with face down" },
        { time: 3, text: "Pull with cupped hand, fingers together" },
        { time: 6, text: "Rotate to breathe, one goggle in water" },
        { time: 9, text: "Strong flutter kick from hips, not knees" }
      ],
      muscles: {
        primary: ["Shoulders", "Latissimus dorsi", "Triceps"],
        secondary: ["Core", "Hamstrings", "Quadriceps"]
      },
      difficulty: 2,
      benefits: ["Speed", "Endurance", "Full body workout"]
    },
    {
      id: "backstroke",
      name: "Backstroke",
      description: "Swimming on your back with alternating arm movements and a flutter kick similar to freestyle.",
      color: "#10B981", // emerald-500
      video: "/videos/backstroke.mp4",
      tips: [
        { time: 1, text: "Keep head still, ears partially submerged" },
        { time: 4, text: "Body should rotate along long axis" },
        { time: 7, text: "Arms enter water little finger first" },
        { time: 10, text: "Maintain steady flutter kick from hips" }
      ],
      muscles: {
        primary: ["Shoulders", "Latissimus dorsi", "Triceps"],
        secondary: ["Core", "Upper back", "Hamstrings"]
      },
      difficulty: 3,
      benefits: ["Improved posture", "Shoulder mobility", "Low-impact exercise"]
    },
    {
      id: "breaststroke",
      name: "Breaststroke",
      description: "A slower but efficient stroke with the body in a prone position and a distinctive frog kick.",
      color: "#EC4899", // pink-500
      video: "/videos/breaststroke.mp4",
      tips: [
        { time: 1, text: "Start with arms extended forward" },
        { time: 3, text: "Pull arms in circular motion, elbows high" },
        { time: 6, text: "Breathe when hands come together" },
        { time: 9, text: "Powerful whip kick, feet turned outward" }
      ],
      muscles: {
        primary: ["Pectorals", "Upper back", "Inner thighs"],
        secondary: ["Hamstrings", "Quads", "Glutes"]
      },
      difficulty: 3,
      benefits: ["Joint-friendly", "Core strength", "Coordination"]
    },
    {
      id: "butterfly",
      name: "Butterfly",
      description: "An advanced stroke with simultaneous arm movements and a dolphin kick, requiring significant strength and coordination.",
      color: "#F59E0B", // amber-500
      video: "/videos/butterfly.mp4",
      tips: [
        { time: 1, text: "Powerful undulating motion through core" },
        { time: 3, text: "Arms move together in keyhole pattern" },
        { time: 5, text: "Two dolphin kicks per arm cycle" },
        { time: 8, text: "Press chest down to help hips rise" }
      ],
      muscles: {
        primary: ["Shoulders", "Chest", "Core"],
        secondary: ["Upper back", "Triceps", "Quads"]
      },
      difficulty: 5,
      benefits: ["Core strength", "Upper body power", "Calorie burning"]
    }
  ];

  // Simulates loading a video and setting active tip based on current time
  useEffect(() => {
    if (!activeStroke) return;
    
    const interval = setInterval(() => {
      if (videoRef.current) {
        const currentTime = (videoRef.current.currentTime || 0) % 12;
        const activeTips = activeStroke.tips.filter(tip => 
          currentTime >= tip.time && currentTime < tip.time + 2.5
        );
        
        // Update active tips in DOM
        const tipElements = document.querySelectorAll('.stroke-tip');
        tipElements.forEach(tip => tip.classList.remove('active-tip'));
        
        activeTips.forEach(tip => {
          const tipIndex = activeStroke.tips.findIndex(t => t.text === tip.text);
          const tipElement = document.querySelector(`.tip-${tipIndex}`);
          if (tipElement) tipElement.classList.add('active-tip');
        });
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [activeStroke]);

  const handleStrokeClick = (stroke) => {
    setActiveStroke(stroke);
  };

  const handleCloseDetail = () => {
    setActiveStroke(null);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSpeedChange = (speed) => {
    setAnimationSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // 3D swim stroke viewer (placeholder for actual 3D implementation)
  const Stroke3DViewer = ({ stroke }) => {
    // This would be replaced with a proper 3D implementation
    return (
      <div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-900">
        {/* Simulated 3D view using video for prototype */}
        <video
          ref={videoRef}
          src={stroke.video}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {/* Interactive hotspots on the swimmer */}
        <div className="absolute inset-0">
          {viewMode === "3d" && (
            <>
              <motion.div 
                className="absolute w-8 h-8 rounded-full bg-blue-500/70 flex items-center justify-center cursor-pointer"
                style={{ top: '30%', left: '40%' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.5, backgroundColor: "rgba(59, 130, 246, 0.9)" }}
              >
                <span className="text-white font-bold">1</span>
                {/* Tooltip */}
                <motion.div 
                  className="absolute top-full mt-2 bg-blue-500 text-white text-xs rounded px-2 py-1 w-48"
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  Focus on shoulder rotation to maximize power
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="absolute w-8 h-8 rounded-full bg-green-500/70 flex items-center justify-center cursor-pointer"
                style={{ top: '50%', left: '60%' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                whileHover={{ scale: 1.5, backgroundColor: "rgba(16, 185, 129, 0.9)" }}
              >
                <span className="text-white font-bold">2</span>
                {/* Tooltip */}
                <motion.div 
                  className="absolute top-full mt-2 bg-green-500 text-white text-xs rounded px-2 py-1 w-48"
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  Hand entry should be clean with fingers together
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="absolute w-8 h-8 rounded-full bg-amber-500/70 flex items-center justify-center cursor-pointer"
                style={{ bottom: '30%', right: '30%' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.5, backgroundColor: "rgba(245, 158, 11, 0.9)" }}
              >
                <span className="text-white font-bold">3</span>
                {/* Tooltip */}
                <motion.div 
                  className="absolute bottom-full mb-2 bg-amber-500 text-white text-xs rounded px-2 py-1 w-48"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  Kick from the hips, keeping legs relatively straight
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
        
        {/* First-person overlay */}
        {viewMode === "firstPerson" && (
          <div className="absolute inset-0 bg-blue-900/30 flex items-center justify-center">
            <div className="relative w-full h-full overflow-hidden rounded-full">
              <div className="absolute inset-0 border-[40px] sm:border-[60px] md:border-[80px] border-black rounded-full"></div>
              
              {/* Simulated water splashes */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`splash-${i}`}
                  className="absolute bg-white/30 rounded-full"
                  style={{
                    width: Math.random() * 20 + 10,
                    height: Math.random() * 20 + 10,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0],
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                />
              ))}
              
              {/* Movement guide arrows */}
              <motion.div
                className="absolute top-1/2 left-0 right-0 flex justify-center items-center pointer-events-none"
                animate={{
                  y: [-20, 0, -20]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg width="80" height="80" viewBox="0 0 24 24" className="text-white/70">
                  <path
                    fill="currentColor"
                    d="M12,4C14.21,4 16,5.79 16,8C16,10.21 14.21,12 12,12C9.79,12 8,10.21 8,8C8,5.79 9.79,4 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        )}
        
        {/* Underwater view overlay */}
        {viewMode === "underwater" && (
          <div className="absolute inset-0">
            {/* Blue tint */}
            <div className="absolute inset-0 bg-blue-500/20"></div>
            
            {/* Bubbles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute rounded-full border border-white/60 bg-white/20"
                style={{
                  width: Math.random() * 15 + 5,
                  height: Math.random() * 15 + 5,
                  left: `${Math.random() * 100}%`,
                  bottom: '-20px'
                }}
                animate={{
                  y: -300 - Math.random() * 300,
                  x: Math.random() * 50 - 25,
                  opacity: [0.7, 0.2]
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 5
                }}
              />
            ))}
            
            {/* Underwater light rays */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`ray-${i}`}
                className="absolute bg-gradient-to-b from-white/40 to-transparent"
                style={{
                  width: Math.random() * 100 + 50,
                  height: '100%',
                  left: `${i * 20 + Math.random() * 10}%`,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  transformOrigin: 'top',
                  opacity: 0.2 + Math.random() * 0.3
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  width: [100, 150, 100]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 1.5
                }}
              />
            ))}
          </div>
        )}
        
        {/* Camera controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${viewMode === "3d" ? 'bg-white text-blue-900' : 'bg-black/30 text-white'}`}
            onClick={() => handleViewModeChange("3d")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 9.5V5C21 4.4 20.6 4 20 4H16.5M21 14.5V19C21 19.6 20.6 20 20 20H15.5M10 4H4C3.4 4 3 4.4 3 5V9M3 14V19C3 19.6 3.4 20 4 20H9" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${viewMode === "firstPerson" ? 'bg-white text-blue-900' : 'bg-black/30 text-white'}`}
            onClick={() => handleViewModeChange("firstPerson")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M20 4h-3.5M20 4v3.5M4 20h3.5M4 20v-3.5M19.5 9.5l-2.8-2.8M4.5 14.5l2.8 2.8" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${viewMode === "underwater" ? 'bg-white text-blue-900' : 'bg-black/30 text-white'}`}
            onClick={() => handleViewModeChange("underwater")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12c0 6-9 6-9 6s-9 0-9-6c0-6 9-6 9-6s9 0 9 6z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </motion.button>
        </div>
        
        {/* Playback speed controls */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
          <span className="text-white text-xs">Speed:</span>
          {[0.5, 1, 1.5, 2].map(speed => (
            <motion.button
              key={speed}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                animationSpeed === speed ? 'bg-white text-blue-900' : 'text-white'
              }`}
              onClick={() => handleSpeedChange(speed)}
            >
              {speed}x
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div id="swimming-strokes" className="relative bg-gradient-to-b from-sky-900 to-blue-900 min-h-screen py-20 overflow-hidden">
      {/* Water background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wave patterns */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute left-0 right-0 h-24 opacity-10"
            style={{
              top: `${i * 20}%`,
              background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)'
            }}
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              repeat: Infinity,
              duration: 15 + i * 5,
              ease: 'linear'
            }}
          />
        ))}
        
        {/* Bubbles */}
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 30 + 10;
          return (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-white/10"
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                bottom: `-${size}px`
              }}
              animate={{
                y: [0, -1000],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.7, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                delay: Math.random() * 20
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">Swimming Techniques</span>
          </motion.h2>
          <motion.p 
            className="text-blue-100 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore our interactive 3D swimming stroke guide and perfect your technique through multiple viewing angles and expert tips
          </motion.p>
        </div>

        <div ref={containerRef} className="relative">
          <AnimatePresence>
            {activeStroke ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-neutral-900/90 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left: 3D Viewer */}
                  <div className="md:w-2/3 h-[400px] md:h-[600px]">
                    <Stroke3DViewer stroke={activeStroke} />
                  </div>
                  
                  {/* Right: Information & Controls */}
                  <div className="md:w-1/3 p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-white flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: activeStroke.color }}
                        ></span>
                        {activeStroke.name}
                      </h3>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                          onClick={() => setShowTips(!showTips)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="17" x2="12" y2="17"></line>
                          </svg>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                          onClick={handleCloseDetail}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{activeStroke.description}</p>
                    
                    {/* Stroke stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-sm text-gray-400">Difficulty</div>
                        <div className="mt-1 flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill={i < activeStroke.difficulty ? activeStroke.color : "none"}
                              stroke={activeStroke.color}
                              strokeWidth="2"
                              className="mx-0.5"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-sm text-gray-400">Calories</div>
                        <div className="font-bold text-white mt-1">
                          {activeStroke.id === "butterfly" ? "High" : 
                           activeStroke.id === "freestyle" ? "Medium" : "Moderate"}
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-sm text-gray-400">Olympic</div>
                        <div className="font-bold text-white mt-1">
                          {activeStroke.id === "freestyle" ? "50-1500m" : 
                           activeStroke.id === "butterfly" ? "100-200m" : "100-200m"}
                        </div>
                      </div>
                    </div>
                    
                    {/* Technique tips */}
                    <div className="flex-grow overflow-y-auto">
                      <h4 className="text-blue-300 font-medium mb-3 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        Key Technique Points
                      </h4>
                      
                      <div className="space-y-3">
                        {activeStroke.tips.map((tip, index) => (
                          <motion.div 
                            key={index}
                            className={`p-3 rounded-lg bg-white/5 border-l-4 stroke-tip tip-${index}`}
                            style={{ borderLeftColor: activeStroke.color }}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <p className="text-gray-200 text-sm">{tip.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Muscle activation */}
                    <div className="mt-6">
                      <h4 className="text-blue-300 font-medium mb-3 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                          <path d="M7 10v12"></path>
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                        </svg>
                        Muscle Activation
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <h5 className="text-white text-xs mb-1">Primary</h5>
                          <div className="flex flex-wrap gap-1">
                            {activeStroke.muscles.primary.map((muscle, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-white/10 rounded text-xs text-white"
                              >
                                {muscle}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-white text-xs mb-1">Secondary</h5>
                          <div className="flex flex-wrap gap-1">
                            {activeStroke.muscles.secondary.map((muscle, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300"
                              >
                                {muscle}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Benefits */}
                    <div className="mt-4">
                      <h4 className="text-blue-300 font-medium mb-3 flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                          <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0v8.5m-3 0h3"></path>
                          <path d="M11 9.5a1.5 1.5 0 0 1 3 0V13h-3"></path>
                          <path d="M16 16v-3a1.5 1.5 0 0 1 3 0v3m-3 0h3"></path>
                          <path d="M2 16h6"></path>
                          <path d="M5 16v4"></path>
                          <path d="M19 20l-4-4"></path>
                          <path d="M19 16l-4 4"></path>
                        </svg>
                        Key Benefits
                      </h4>
                      
                      <div className="flex flex-wrap gap-2">
                        {activeStroke.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${activeStroke.color}20`, 
                              color: activeStroke.color 
                            }}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {strokes.map((stroke) => (
                  <motion.div
                    key={stroke.id}
                    whileHover={{ y: -10, boxShadow: `0 20px 25px -5px ${stroke.color}20, 0 10px 10px -5px ${stroke.color}10` }}
                    className="rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/5"
                    onClick={() => handleStrokeClick(stroke)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      {/* Stroke preview image/animation */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900"
                        style={{ backgroundImage: `radial-gradient(circle at center, ${stroke.color}30 0%, transparent 70%)` }}
                      ></div>
                      
                      {/* Swimmer icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-24 h-24 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${stroke.color}20` }}
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: stroke.id === "butterfly" ? [0, 5, 0, -5, 0] : 
                                    stroke.id === "backstroke" ? [0, -3, 0, 3, 0] : [0, 2, 0, -2, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <svg 
                            width="60" 
                            height="60" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke={stroke.color} 
                            strokeWidth="1.5"
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            {stroke.id === "freestyle" && (
                              <>
                                <circle cx="12" cy="9" r="3" />
                                <path d="M12 12v8" />
                                <path d="M8 17h8" />
                                <path d="M5 14c3-2 4-2 9-6" />
                                <path d="M19 14c-3-2-4-2-9-6" />
                              </>
                            )}
                            
                            {stroke.id === "backstroke" && (
                              <>
                                <circle cx="12" cy="9" r="3" />
                                <path d="M12 12v8" />
                                <path d="M8 17h8" />
                                <path d="M5 14c3 2 4 2 9 -2" />
                                <path d="M19 14c-3 2-4 2-9 -2" />
                              </>
                            )}
                            
                            {stroke.id === "breaststroke" && (
                              <>
                                <circle cx="12" cy="9" r="3" />
                                <path d="M12 12v5" />
                                <path d="M6 15c2 2 8 2 10 0" />
                                <path d="M9 18c2 2 4 2 6 0" />
                                <path d="M5 12c1-2 6-4 14 0" />
                              </>
                            )}
                            
                            {stroke.id === "butterfly" && (
                              <>
                                <circle cx="12" cy="9" r="3" />
                                <path d="M12 12v5" />
                                <path d="M7 16c4 3 6 3 10 0" />
                                <path d="M5 12c2-3 4-4 7-2" />
                                <path d="M19 12c-2-3-4-4-7-2" />
                              </>
                            )}
                          </svg>
                        </motion.div>
                      </div>
                      
                      {/* Preview label */}
                      <div className="absolute top-4 left-4">
                        <span 
                          className="px-3 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: `${stroke.color}20`, 
                            color: stroke.color 
                          }}
                        >
                          {stroke.id === "freestyle" ? "Beginner Friendly" :
                           stroke.id === "backstroke" ? "Improves Posture" :
                           stroke.id === "breaststroke" ? "Joint Friendly" :
                           "Advanced Technique"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-1">{stroke.name}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{stroke.description}</p>
                      
                      {/* Difficulty indicator */}
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill={i < stroke.difficulty ? stroke.color : "none"}
                              stroke={stroke.color}
                              strokeWidth="1.5"
                              className="mr-0.5"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                        
                        <span className="text-white/70 text-xs flex items-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                          Click to explore
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Info Cards */}
        {!activeStroke && (
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Multiple Viewpoints</h3>
              <p className="text-gray-300">
                Study each stroke from different angles including 3D view, first person, and underwater perspective to understand every movement detail.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Timed Tips</h3>
              <p className="text-gray-300">
                Our interactive system highlights key technique points at precisely the right moment in the stroke cycle to improve your understanding.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                  <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive Learning</h3>
              <p className="text-gray-300">
                Control the speed, angle, and focus areas to customize your learning experience and master each technique at your own pace.
              </p>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Add some custom CSS for the tips animation */}
      <style jsx global>{`
        .stroke-tip {
          transition: all 0.3s ease;
        }
        
        .active-tip {
          transform: translateX(5px);
          border-left-width: 6px;
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default InteractiveSwimStrokes;