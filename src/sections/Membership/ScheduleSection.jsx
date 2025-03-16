import { motion } from 'framer-motion';

const ScheduleSection = ({ fadeIn }) => {
  // Self-swimming times
  const selfSwimmingWeekdays = ["5-6AM", "12-1PM", "7-8PM", "7-8AM", "1-2PM", "9-10PM", "8-9AM", "2-3PM", "10-11PM"];
  const selfSwimmingWeekends = ["5-6AM", "9-10AM", "2-3PM", "6-7AM", "10-11AM", "3-4PM", "8-9AM", "12-1PM", "5-6PM", "1-2PM", "6-7PM", "9-10PM"];
  
  // Training times
  const kidsWeekdays = ["9-10AM", "10-11AM", "11-12PM", "12-1PM", "3-4PM", "4-5PM", "5-6PM", "6-7PM"];
  const kidsWeekends = ["9-10AM", "10-11AM", "4-5PM"];
  const adultsWeekdays = ["6-7AM", "3-4PM (LADIES & KIDS)", "8-9PM"];
  const adultsWeekends = ["7-8AM", "11-12PM (LADIES)", "8-9PM"];

  // Animation variants for staggered appearance
  const gridContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };
  
  const gridItem = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-10"
    >
      {/* Important Notice */}
      <motion.div 
        className="bg-white rounded-xl p-8 shadow-lg border border-sky-100/30 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-100/50 rounded-full"></div>
        <div className="absolute -left-16 -bottom-16 w-40 h-40 bg-sky-100/50 rounded-full"></div>
        
        <div className="relative">
          <div className="flex items-start mb-6">
            <div className="bg-sky-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-xl mb-1">Important Notice</h4>
              <p className="text-sky-600 text-sm">March 24 - May 31, 2025</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Dear members, casual swimmers, and students, please note that this timing schedule will be followed
            from March 24th to May 31st, 2025. Due to summer camp, there will be time slot changes for regular
            swimmers and training batches. Kindly cooperate for any inconvenience caused. Thank you!
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-sky-50 rounded-xl p-4 border border-sky-100"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Timing Guidelines
              </h5>
              <ul className="space-y-3">
                <motion.li 
                  className="flex items-start text-gray-600 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg className="w-5 h-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Parents are allowed to watch kids training only on Fridays (weekday batches) and every second fourth Saturday (weekend batches)
                </motion.li>
                <motion.li 
                  className="flex items-start text-gray-600 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <svg className="w-5 h-5 text-sky-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Missed classes can be compensated with prior updates (May month last two weekends)
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Self Swimming Batches */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-100/30"
          whileHover={{ y: -5 }}
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
            
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white relative">Self Swimming Batches</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-5">
              <div>
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Weekdays
                </h5>
                <motion.div 
                  className="grid grid-cols-3 gap-2"
                  variants={gridContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {selfSwimmingWeekdays.map((time, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-sky-50 hover:bg-sky-100 py-2 px-3 rounded-lg text-center text-sm text-gray-700 border border-sky-100 transition-colors duration-200"
                      variants={gridItem}
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    >
                      {time}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <div>
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Weekend (Sat-Sun)
                </h5>
                <motion.div 
                  className="grid grid-cols-4 gap-2"
                  variants={gridContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {selfSwimmingWeekends.map((time, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-sky-50 hover:bg-sky-100 py-2 px-3 rounded-lg text-center text-sm text-gray-700 border border-sky-100 transition-colors duration-200"
                      variants={gridItem}
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    >
                      {time}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Training Batches */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-sky-100/30"
          whileHover={{ y: -5 }}
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
            
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white relative">Training Batches</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {/* KIDS */}
              <motion.div 
                className="overflow-hidden rounded-xl bg-white shadow-md border border-sky-100"
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gradient-to-r from-sky-600 to-blue-600 py-3 px-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 flex flex-wrap gap-1 opacity-20 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-2 h-2 rounded-full bg-white"
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          repeatType: "reverse"
                        }}
                      />
                    ))}
                  </div>
                  <h6 className="font-bold text-white text-base relative">KIDS</h6>
                </div>
                
                <div className="p-4 space-y-4">
                  <div>
                    <h6 className="font-medium text-gray-800 text-sm mb-2 flex items-center">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-1.5"></span>
                      Weekdays
                    </h6>
                    <div className="flex flex-wrap gap-1">
                      {kidsWeekdays.map((time, i) => (
                        <motion.div 
                          key={i} 
                          className="text-xs bg-sky-50 text-gray-600 px-2 py-1 rounded-md border border-sky-100"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(186, 230, 253, 0.5)" }}
                        >
                          {time}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-gray-800 text-sm mb-2 flex items-center">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-1.5"></span>
                      Weekends
                    </h6>
                    <div className="flex flex-wrap gap-1">
                      {kidsWeekends.map((time, i) => (
                        <motion.div 
                          key={i} 
                          className="text-xs bg-sky-50 text-gray-600 px-2 py-1 rounded-md border border-sky-100"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 + 0.5 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(186, 230, 253, 0.5)" }}
                        >
                          {time}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* ADULTS */}
              <motion.div 
                className="overflow-hidden rounded-xl bg-white shadow-md border border-sky-100"
                whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gradient-to-r from-sky-600 to-blue-600 py-3 px-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 flex flex-wrap gap-1 opacity-20 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-2 h-2 rounded-full bg-white"
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          repeatType: "reverse"
                        }}
                      />
                    ))}
                  </div>
                  <h6 className="font-bold text-white text-base relative">ADULTS</h6>
                </div>
                
                <div className="p-4 space-y-4">
                  <div>
                    <h6 className="font-medium text-gray-800 text-sm mb-2 flex items-center">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-1.5"></span>
                      Weekdays
                    </h6>
                    <div className="flex flex-wrap gap-1">
                      {adultsWeekdays.map((time, i) => (
                        <motion.div 
                          key={i} 
                          className="text-xs bg-sky-50 text-gray-600 px-2 py-1 rounded-md border border-sky-100"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(186, 230, 253, 0.5)" }}
                        >
                          {time}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-gray-800 text-sm mb-2 flex items-center">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mr-1.5"></span>
                      Weekends
                    </h6>
                    <div className="flex flex-wrap gap-1">
                      {adultsWeekends.map((time, i) => (
                        <motion.div 
                          key={i} 
                          className="text-xs bg-sky-50 text-gray-600 px-2 py-1 rounded-md border border-sky-100"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 + 0.5 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(186, 230, 253, 0.5)" }}
                        >
                          {time}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScheduleSection;