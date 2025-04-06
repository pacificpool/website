import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import poolaerial from "../assets/modals/pool-aerial.mp4";
import BookingModal from "../components/BookingModal";
import pacificPoolLogo from "../assets/modals/pp.png";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePhoneNumber, setActivePhoneNumber] = useState(0);
  const phoneNumbers = ["9008838001", "9008894001"];

  // Cycle through phone numbers with animation - 5 second interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoneNumber((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = () => {
    // Replace with your WhatsApp number
    window.open("https://wa.me/919008838001", "_blank");
  };

  const callPhone = () => {
    window.open(`tel:+91${phoneNumbers[activePhoneNumber]}`, "_blank");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const ghostVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      x: [0, -10, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(3, 150, 200, 0.5)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  const numberSwitchVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div ref={parallaxRef} className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            filter: "brightness(0.6)",
          }}
        >
          <source src={poolaerial} type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img
            src="/images/pool-fallback.jpg"
            alt="Luxury swimming pool"
            className="object-cover w-full h-full"
          />
        </video>
      </div>

      {/* Animated water overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(3, 150, 200, 0.15), transparent)",
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating bubbles effect */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 40 + 20;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const duration = Math.random() * 10 + 20;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-400/10"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
                filter: "blur(2px)",
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Main overlay gradient */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* WhatsApp floating button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={openWhatsApp}
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.41" />
        </svg>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ zIndex: -1 }}
        />
      </motion.button>

      {/* Call floating button */}
      <motion.button
        className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={callPhone}
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ zIndex: -1 }}
        />
      </motion.button>

      {/* Hero content */}
      <div className="relative z-20 h-full w-full flex items-center">
        <div className="container mx-auto px-4 md:px-10 lg:px-20">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-3xl"
          >
            {/* Logo display in hero section */}
            <motion.div
              variants={fadeInUp}
              className="mb-6"
            >
              <img 
                src={pacificPoolLogo} 
                alt="Pacific Pool" 
                className="h-16 md:h-20 mb-4" 
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="inline-block bg-blue-500/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4 border border-blue-400/30"
            >
              <span className="text-sky-300 font-medium text-lg">
                Premium Pool Experience
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 text-white flex flex-wrap items-center gap-2"
            >
              Swim.
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
               Chill. Repeat.
              </span>
            </motion.h1>

            {/* Animated Phone Number Display */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 mt-2 bg-gradient-to-r from-blue-600/40 to-blue-400/40 backdrop-blur-sm px-6 py-3 rounded-xl border border-blue-400/30 inline-flex items-center cursor-pointer hover:bg-blue-500/30 transition-colors"
              onClick={() => window.open(`tel:+91${phoneNumbers[activePhoneNumber]}`, "_blank")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mr-3 bg-blue-500 text-white p-2 rounded-full">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm">Call us now</span>
                <div className="h-8 overflow-hidden w-48">
                  <motion.div
                    animate={{
                      y: activePhoneNumber === 0 ? 0 : -32,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                    className="flex flex-col"
                  >
                    <div className="h-8 flex items-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                        +91 90088 38001
                      </span>
                    </div>
                    <div className="h-8 flex items-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                        +91 90088 94001
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative mb-8 pl-4 border-l-4 border-blue-400/50"
              variants={fadeInUp}
            >
              <motion.p
                className="text-lg md:text-xl text-gray-200 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Experience the ultimate in aquatic luxury with our meticulously
                designed pools, expert swimming programs, and world-class
                facilities.
              </motion.p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-full shadow-lg flex items-center"
              >
                <span className="mr-2">Enroll</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={callPhone}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-full shadow-lg flex items-center"
              >
                <span className="mr-2">Call Us</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={openWhatsApp}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-full shadow-lg flex items-center"
              >
                <span className="mr-2">Chat on WhatsApp</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                </svg>
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  document
                    .getElementById("facilities")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full flex items-center"
              >
                <span className="mr-2">Explore Facilities</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 mt-12"
            >
              {[
                { label: "Professional Trainers", value: "10+" },
                { label: "Satisfied Swimmers", value: "2000+" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-3xl font-bold text-sky-400">{stat.value}</span>
                  <span className="text-sm text-gray-300">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll to discover</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => console.log("Form submitted:", data)}
      />
    </div>
  );
};

export default Hero;