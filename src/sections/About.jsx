import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import OlympicPool from "../assets/modals/olympicpool.jpg";
import Luxury from "../assets/modals/luxuryameneties.jpg";
import Coaching from "../assets/modals/coach.jpg";
import Wellness from "../assets/modals/spa.jpg";

const About = () => {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const statsRef = useRef(null);
  const imageRefs = useRef([]);
  const bubblesContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Track mouse position for water ripple effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Add bubbles animation with GSAP
  useEffect(() => {
    if (!isInView || !bubblesContainerRef.current) return;

    // Create bubbles
    const bubblesContainer = bubblesContainerRef.current;
    const bubbles = [];

    const createBubble = () => {
      const bubble = document.createElement("div");
      bubble.className =
        "absolute rounded-full bg-gradient-to-t from-white/10 to-white/40";

      // Random size
      const size = Math.random() * 30 + 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      // Random position
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.bottom = "0";

      bubblesContainer.appendChild(bubble);
      bubbles.push(bubble);

      // Add shine to bubble
      const shine = document.createElement("div");
      shine.className =
        "absolute w-1/3 h-1/3 rounded-full bg-white/60 top-1 left-1";
      bubble.appendChild(shine);

      // Animate with GSAP
      gsap.to(bubble, {
        y: -(Math.random() * 400 + 200),
        x: Math.random() * 100 - 50,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 10 + 5,
        ease: "power1.out",
        delay: Math.random() * 5,
        onComplete: () => {
          if (bubble.parentNode === bubblesContainer) {
            bubblesContainer.removeChild(bubble);
          }
        },
      });
    };

    // Create initial bubbles
    for (let i = 0; i < 30; i++) {
      createBubble();
    }

    // Continue creating bubbles
    const bubbleInterval = setInterval(createBubble, 1000);

    // Stats count-up animation
    const statElements = statsRef.current.querySelectorAll(".stat-value");
    statElements.forEach((el) => {
      const value = parseInt(el.getAttribute("data-value"), 10);
      const suffix = el.getAttribute("data-suffix") || "";

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: value,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: () => {
            el.innerText =
              Math.ceil(gsap.getProperty(el, "innerText")) + suffix;
          },
        }
      );
    });

    // Images staggered reveal
    gsap.fromTo(
      imageRefs.current,
      { y: 100, opacity: 0, rotationY: 15 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    return () => {
      clearInterval(bubbleInterval);
      bubbles.forEach((bubble) => {
        if (bubble.parentNode === bubblesContainer) {
          bubblesContainer.removeChild(bubble);
        }
      });
    };
  }, [isInView]);

  // Add image to refs
  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const stats = [
    {
      value: 2500,
      suffix: "m²",
      label: "Facility Area",
      icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    },
    {
      value: 50,
      suffix: "m",
      label: "Olympic Length",
      icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14",
    },
    {
      value: 32,
      suffix: "°C",
      label: "Water Temperature",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      value: 8,
      suffix: "",
      label: "Competition Lanes",
      icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
    },
  ];

  const features = [
    {
      title: "Temperature-Controlled Water",
      description:
        "Our state-of-the-art climate control systems maintain perfect 32°C water year-round for optimal swimming comfort.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: "from-amber-400 to-red-500",
      ripple: "#fbbf24",
    },
    {
      title: "Premium Filtration System",
      description:
        "Multi-stage purification with UV and ozone for crystal clear water and enhanced comfort for your skin.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
      ),
      color: "from-blue-400 to-indigo-500",
      ripple: "#60a5fa",
    },
    {
      title: "Luxurious Changing Suites",
      description:
        "Private changing cabanas with premium amenities and complimentary luxury toiletries for total comfort.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      color: "from-emerald-400 to-teal-500",
      ripple: "#10b981",
    },
    {
      title: "Professional Coaching",
      description:
        "Expert instructors trained in international swimming techniques for all skill levels from beginners to professionals.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      color: "from-purple-400 to-fuchsia-500",
      ripple: "#c084fc",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-white" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-sky-50 to-blue-100"
          animate={
            isInView
              ? {
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }
              : {}
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-50 to-sky-100"
          animate={
            isInView
              ? {
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4],
                }
              : {}
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div
          ref={bubblesContainerRef}
          className="bubbles-container absolute inset-0"
        />
      </div>

      {/* Water ripple effect following mouse */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 mix-blend-screen pointer-events-none"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
          }}
          transition={{ type: "spring", damping: 15 }}
          style={{
            background: `radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(56, 189, 248, 0) 70%)`,
          }}
        />
      </div>

      {/* Interactive feature ripple */}
      <AnimatePresence>
        {hoveredFeature !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none mix-blend-screen"
            style={{
              x: mousePosition.x - 200,
              y: mousePosition.y - 200,
              background: `radial-gradient(circle, ${
                features[hoveredFeature]?.ripple || "rgba(56, 189, 248, 0.6)"
              } 0%, rgba(56, 189, 248, 0) 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Header section with simplified design */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {/* Simplified background with sky blue color scheme */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-700 to-blue-500">
          {/* Background image with reduced opacity */}
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-40" />

          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>

          {/* Simplified floating particles - reduced count */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => {
              const size = Math.random() * 6 + 3;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: size,
                    height: size,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: "blur(1px)",
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Content section */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center px-6 md:px-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
                Pacific Pool
              </span>
            </h2>

            <div className="h-1 bg-gradient-to-r from-sky-400 to-blue-500 mx-auto mb-8 rounded-full w-1/4 sm:w-1/3 md:w-1/4" />

            <p className="text-white/90 max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl">
              Bangalore's premier indoor swimming destination offering a
              luxurious aquatic experience in a temperature-controlled
              environment.
            </p>
          </div>
        </div>

        {/* Simplified wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute w-full h-full"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C78.44,38.92,159.85,47.67,234.56,55.93A782.38,782.38,0,0,0,321.39,56.44Z"
              fill="rgba(255, 255, 255, 0.1)"
            />
          </svg>
        </div>
      </div>

      {/* Stats section */}
      <div className="relative z-10 -mt-20 mb-20" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-1">
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-6 md:p-8 text-center ${
                      index < stats.length - 1 ? "border-r border-sky-100" : ""
                    }`}
                  >
                    <motion.div
                      className="mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-md"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={stat.icon}
                        />
                      </svg>
                    </motion.div>

                    <div
                      className="stat-value text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 mb-2"
                      data-value={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </div>
                    <div className="text-neutral-600">{stat.label}</div>

                    {/* Animated underline */}
                    <motion.div
                      className="h-0.5 w-12 bg-sky-200 rounded-full mx-auto mt-3"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 48 } : { width: 0 }}
                      transition={{ delay: 0.2 * index + 1, duration: 0.8 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-900 to-blue-700 mb-6"
            >
              Luxury Swimming Experience in the Heart of Bangalore
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-neutral-600 mb-6"
            >
              Pacific Pool was born from a vision to create Bangalore's most
              exceptional swimming experience. Our state-of-the-art facility
              combines cutting-edge technology with unparalleled luxury to
              deliver a swimming environment that exceeds all expectations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-600 mb-8"
            >
              Our temperature-controlled Olympic-sized pool maintains a perfect
              32°C year-round, ensuring ideal swimming conditions regardless of
              weather. With advanced water purification systems, premium
              changing facilities, and expert coaching, we offer a comprehensive
              aquatic experience for swimmers of all levels.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              {/* Water drop animation */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none w-full">
                <svg
                  width="100"
                  height="30"
                  viewBox="0 0 100 30"
                  className="mx-auto"
                >
                  <motion.path
                    d="M50 0C55.523 0 60 4.477 60 10V25C60 27.761 57.761 30 55 30H45C42.239 30 40 27.761 40 25V10C40 4.477 44.477 0 50 0Z"
                    fill="rgba(56, 189, 248, 0.2)"
                    animate={{
                      y: [0, 10, 0],
                      scaleX: [1, 0.8, 1],
                      scaleY: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative perspective-1000">
            <motion.div
              ref={addToRefs}
              className="relative rounded-xl overflow-hidden h-56 md:h-72 shadow-lg transform rotate-2 perspective-card"
              whileHover={{ scale: 1.05, rotateY: 5, z: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={OlympicPool}
                alt="Pacific Pool Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-sm font-bold bg-sky-500/70 backdrop-blur-sm px-2 py-1 rounded">
                  Olympic Pool
                </span>
              </div>

              {/* Water ripple overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-blue-500/10"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.div
              ref={addToRefs}
              className="relative rounded-xl overflow-hidden h-56 md:h-72 shadow-lg transform -rotate-1 translate-y-6 perspective-card"
              whileHover={{ scale: 1.05, rotateY: -5, z: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={Luxury}
                alt="Luxury Facilities"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-sm font-bold bg-blue-500/70 backdrop-blur-sm px-2 py-1 rounded">
                  Luxury Amenities
                </span>
              </div>

              {/* Water shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-500/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  backgroundPosition: ["100% 0%", "0% 100%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>

            <motion.div
              ref={addToRefs}
              className="relative rounded-xl overflow-hidden h-56 md:h-72 shadow-lg transform -rotate-2 -translate-y-4 perspective-card"
              whileHover={{ scale: 1.05, rotateY: 5, z: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={Coaching}
                alt="Professional Coaching"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-sm font-bold bg-sky-500/70 backdrop-blur-sm px-2 py-1 rounded">
                  Expert Coaching
                </span>
              </div>

              {/* Water shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-sky-400/10 to-blue-500/10"
                animate={{
                  opacity: [0.1, 0.25, 0.1],
                  backgroundPosition: ["0% 100%", "100% 0%"],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>

            <motion.div
              ref={addToRefs}
              className="relative rounded-xl overflow-hidden h-56 md:h-72 shadow-lg transform rotate-1 translate-y-2 perspective-card"
              whileHover={{ scale: 1.05, rotateY: -5, z: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={Wellness}
                alt="Wellness Area"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-sm font-bold bg-blue-500/70 backdrop-blur-sm px-2 py-1 rounded">
                  Wellness Spa
                </span>
              </div>

              {/* Water shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tl from-indigo-400/10 to-blue-500/10"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  backgroundPosition: ["100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-sky-100 blur-xl"
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-blue-100 blur-xl"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Water droplets falling animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => {
                const delay = Math.random() * 5;
                const duration = Math.random() * 2 + 2;
                const size = Math.random() * 8 + 4;
                const leftPosition = Math.random() * 100;

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/40"
                    style={{
                      width: size,
                      height: size * 1.5,
                      left: `${leftPosition}%`,
                      top: "-10%",
                    }}
                    animate={{
                      y: ["0%", "120%"],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      delay: delay,
                      ease: "easeIn",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Features section */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-800 to-blue-600 text-center mb-12"
          >
            Premium Features & Amenities
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border border-neutral-100 hover:border-sky-100 p-6 transition-all duration-300 relative overflow-hidden"
                whileHover={{ translateY: -10 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                {/* Background water effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-50" />
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
                    style={{ opacity: 0.05 }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </div>

                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                  whileHover={{ rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.icon}

                  {/* Icon glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        `0 0 0px ${feature.ripple}`,
                        `0 0 20px ${feature.ripple}`,
                        `0 0 0px ${feature.ripple}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <h4 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-sky-600 transition-colors duration-300">
                  {feature.title}
                </h4>

                <p className="text-neutral-600 group-hover:text-neutral-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Animated underline */}
                <motion.div
                  className={`h-0.5 w-0 bg-gradient-to-r ${feature.color} rounded-full mt-4`}
                  animate={{ width: hoveredFeature === index ? 100 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial section */}
        <div className="mt-24 relative">
          {/* Wavy background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-sky-50 to-blue-50"
              style={{ transform: "skewY(-2deg)", transformOrigin: "top left" }}
            />

            <svg
              className="absolute top-0 left-0 w-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C78.44,38.92,159.85,47.67,234.56,55.93A782.38,782.38,0,0,0,321.39,56.44Z"
                fill="rgba(14, 165, 233, 0.07)"
                animate={{
                  d: [
                    "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C78.44,38.92,159.85,47.67,234.56,55.93A782.38,782.38,0,0,0,321.39,56.44Z",
                    "M321.39,80c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,55,906.67,95,985.66,95c70.05,0,146.53,0,214.34,0V120H0V0C78.44,0,159.85,20,234.56,50A782.38,782.38,0,0,0,321.39,80Z",
                    "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C78.44,38.92,159.85,47.67,234.56,55.93A782.38,782.38,0,0,0,321.39,56.44Z",
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>

            <svg
              className="absolute bottom-0 left-0 w-full rotate-180"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C78.44,38.92,159.85,47.67,234.56,55.93A782.38,782.38,0,0,0,321.39,56.44Z"
                fill="rgba(14, 165, 233, 0.05)"
                animate={{
                  d: [
                    "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C78.44,38.92,159.85,47.67,234.56,55.93A782.38,782.38,0,0,0,321.39,56.44Z",
                    "M321.39,80c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,55,906.67,95,985.66,95c70.05,0,146.53,0,214.34,0V120H0V0C78.44,0,159.85,20,234.56,50A782.38,782.38,0,0,0,321.39,80Z",
                    "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C78.44,38.92,159.85,47.67,234.56,55.93A782.38,782.38,0,0,0,321.39,56.44Z",
                  ],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative py-16 px-4"
          >
            <div className="max-w-3xl mx-auto text-center relative">
              {/* Decorative quote marks */}
              <motion.div
                className="absolute -top-10 -left-4 md:-left-12 text-7xl text-sky-200 opacity-70"
                animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                "
              </motion.div>

              <motion.div
                className="absolute -bottom-10 -right-4 md:-right-12 text-7xl text-sky-200 opacity-70"
                animate={{ y: [0, -10, 0], rotate: [5, -5, 5] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                "
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-neutral-700 italic mb-8"
                animate={{ opacity: [0.9, 1, 0.9], y: [0, -5, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Pacific Pool has transformed my swimming routine. The
                temperature-controlled water is perfect year-round, and the
                facilities are truly world-class. It's like swimming in a luxury
                resort every day.
              </motion.p>

              <div className="flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-sky-100"
                  whileHover={{ scale: 1.1, borderColor: "#38bdf8" }}
                >
                  <img
                    src="/api/placeholder/100/100"
                    alt="Testimonial"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="text-left">
                  <motion.div
                    className="font-bold text-neutral-900"
                    animate={{ color: ["#0c4a6e", "#0369a1", "#0c4a6e"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Priya Sharma
                  </motion.div>
                  <div className="text-neutral-600 text-sm">
                    Competitive Swimmer
                  </div>
                </div>
              </div>

              {/* Floating bubbles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => {
                  const size = Math.random() * 20 + 10;
                  const delay = Math.random() * 5;
                  const duration = Math.random() * 15 + 10;
                  const xPosition = Math.random() * 100 - 50;
                  const yPosition = Math.random() * 100 - 50;

                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-sky-100"
                      style={{
                        width: size,
                        height: size,
                        left: "50%",
                        top: "50%",
                      }}
                      animate={{
                        x: [0, xPosition],
                        y: [0, yPosition],
                        opacity: [0, 0.3, 0],
                        scale: [0, 1, 0.5],
                      }}
                      transition={{
                        duration: duration,
                        repeat: Infinity,
                        delay: delay,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx global>{`
        .perspective-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default About;
