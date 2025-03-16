import { motion } from 'framer-motion';

const SpecialPrograms = ({ fadeIn, openBookingModal }) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Personal training plans
  const personalTrainingPlans = [
    { classes: "10 CLASS", duration: "15 DAYS" },
    { classes: "20 CLASS", duration: "30 DAYS" },
    { classes: "40 CLASS", duration: "60 DAYS" },
    { classes: "50 CLASS", duration: "100 DAYS" }
  ];

  // Infants training plans
  const infantsTrainingPlans = [
    { classes: "16 CLASS", duration: "60 DAYS" },
    { classes: "32 CLASS", duration: "120 DAYS" },
    { classes: "48 CLASS", duration: "180 DAYS" }
  ];

  // Infants program benefits
  const infantsBenefits = [
    "Early water confidence building",
    "Parent-child bonding sessions",
    "Developmentally appropriate activities",
    "Professional supervision with certified instructors"
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-12"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Training */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-100/30 group"
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 relative overflow-hidden">
            <motion.div 
              className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white relative">Personal Training</h3>
              </div>
              
              <motion.div 
                className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white cursor-pointer"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
            
            <div className="ml-14 mt-2 text-blue-100 text-sm">One-on-one specialized coaching</div>
          </div>
          
          <div className="p-6">
            <motion.div 
              className="grid gap-4 mb-8"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {personalTrainingPlans.map((plan, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center justify-between bg-sky-50 rounded-lg p-4 hover:bg-sky-100 transition-colors duration-200 border border-sky-100/50"
                  variants={item}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-lg flex items-center justify-center text-sm mr-4">
                      {i+1}
                    </div>
                    <span className="font-medium text-gray-800">{plan.classes}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-white text-sky-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm mr-3 border border-sky-200">
                      {plan.duration}
                    </span>
                    {/* <motion.button 
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openBookingModal("Personal Training", plan.classes)}
                    >
                      Details
                    </motion.button> */}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-center">
              <motion.button 
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors duration-300 group-hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openBookingModal("Personal Training")}
              >
                <div className="flex items-center">
                  <span>Book Personal Training</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Infants Training */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-100/30 group"
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 relative overflow-hidden">
            <motion.div 
              className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white relative">Infants Training</h3>
                  <div className="text-blue-100 text-sm mt-1">16 months to 4 years</div>
                </div>
              </div>
              
              <motion.div 
                className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white cursor-pointer"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
            
            <div className="ml-14 mt-1 text-blue-100 text-sm">Daily 12-12:45PM session</div>
          </div>
          
          <div className="p-6">
            <motion.div 
              className="grid gap-4 mb-6"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {infantsTrainingPlans.map((plan, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center justify-between bg-sky-50 rounded-lg p-4 hover:bg-sky-100 transition-colors duration-200 border border-sky-100/50"
                  variants={item}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-lg flex items-center justify-center text-sm mr-4">
                      {i+1}
                    </div>
                    <span className="font-medium text-gray-800">{plan.classes}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-white text-sky-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm mr-3 border border-sky-200">
                      {plan.duration}
                    </span>
                    {/* <motion.button 
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openBookingModal("Infants Training", plan.classes)}
                    >
                      Details
                    </motion.button> */}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="bg-blue-50 rounded-lg p-5 mb-6 border border-blue-100">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Program Benefits
              </h4>
              <motion.ul 
                className="space-y-3"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {infantsBenefits.map((benefit, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start text-gray-600 text-sm"
                    variants={item}
                    whileHover={{ x: 3 }}
                  >
                    <svg className="w-5 h-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <div className="flex justify-center">
              <motion.button 
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors duration-300 group-hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openBookingModal("Infants Training")}
              >
                <div className="flex items-center">
                  <span>Enroll Your Child</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SpecialPrograms;