import { motion } from 'framer-motion';

const MembershipPlans = ({ fadeIn }) => {
  // Animation for staggered card appearance
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const membershipPackages = [
    {
      duration: "1 Month",
      features: ["Full access to pool facilities", "Basic amenities", "Limited reservation privileges"]
    },
    {
      duration: "3 Months + 1 Month Free",
      features: ["Extended access hours", "All basic amenities", "Priority reservations", "Complimentary evaluation"]
    },
    {
      duration: "6 Months",
      features: ["Extended access hours", "Premium amenities", "Priority reservations", "Free swimming assessment"]
    },
    {
      duration: "1 Year + 1 Month Free",
      features: ["24/7 pool access", "All premium amenities", "Priority lane booking", "Monthly progress tracking"]
    },
    {
      duration: "Elite Family Membership",
      features: ["Full family access", "All premium amenities", "Reserved time slots", "Personal trainer consultation", "Special events access"]
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-12"
    >
      {/* Membership Packages */}
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {membershipPackages.map((plan, index) => (
          <motion.div 
            key={index}
            variants={item}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-sky-100/30"
          >
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-6 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full"></div>
              
              <h4 className="font-bold text-white mb-2 text-xl relative">
                {plan.duration}
              </h4>
              
              <motion.div 
                className="absolute right-4 top-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </div>
            
            <div className="px-6 py-5">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <svg className="w-5 h-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* <div className="mt-6 pt-4 border-t border-gray-100">
                <motion.button 
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Details</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div> */}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MembershipPlans;