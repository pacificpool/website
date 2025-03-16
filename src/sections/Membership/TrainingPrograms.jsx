import { motion } from 'framer-motion';

const TrainingPrograms = ({ fadeIn }) => {
  // Animation for staggered item appearance
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const batchItem = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const kidsTimesWeekdays = ["9-10AM", "10-11AM", "11-12PM", "12-1PM", "3-4PM", "4-5PM", "5-6PM", "6-7PM"];
  const kidsTimesWeekends = ["9-10AM", "10-11AM", "4-5PM"];
  
  const adultsTimesWeekdays = ["6-7AM", "3-4PM (LADIES)", "8-9PM"];
  const adultsTimesWeekends = ["7-8AM", "11-12PM", "7-8PM"];
  
  const batchTypes = [
    { level: "Beginners", classes: "L2S 16 CLASSES" },
    { level: "Beginners", classes: "L2S 32 CLASSES" },
    { level: "Intermediate", classes: "L2S 48 CLASSES" },
    { level: "Advance", classes: "L2S 96 CLASSES" },
    { level: "Competitive", classes: "L2S 150 CLASSES" }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-12"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Kids Training */}
        <motion.div 
          className="bg-white rounded-xl overflow-hidden shadow-lg border border-sky-100/30"
          whileHover={{ 
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
          }}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white relative">Kids Training</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Weekdays */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Weekdays
                </h4>
                <motion.ul 
                  className="space-y-2 bg-sky-50 rounded-lg p-3"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {kidsTimesWeekdays.map((time, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center text-sm text-gray-600"
                      variants={batchItem}
                      whileHover={{ x: 3 }}
                    >
                      <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                      {time}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              
              {/* Weekends */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Weekends
                </h4>
                <motion.ul 
                  className="space-y-2 bg-sky-50 rounded-lg p-3"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {kidsTimesWeekends.map((time, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center text-sm text-gray-600"
                      variants={batchItem}
                      whileHover={{ x: 3 }}
                    >
                      <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                      {time}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-sky-100 to-blue-100 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Batch Types
              </h4>
              <motion.ul 
                className="space-y-2"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {batchTypes.map((batch, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center justify-between text-sm bg-white rounded-lg p-3 shadow-sm"
                    variants={batchItem}
                    whileHover={{ x: 5, backgroundColor: "rgba(224, 242, 254, 0.5)" }}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                        {i+1}
                      </span>
                      <span className="font-medium text-gray-800">{batch.level}</span>
                    </div>
                    <span className="text-gray-600">{batch.classes}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            
          </div>
        </motion.div>
        
        {/* Adults Training */}
        <motion.div 
          className="bg-white rounded-xl overflow-hidden shadow-lg border border-sky-100/30"
          whileHover={{ 
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
          }}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white relative">Adults Training</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Weekdays */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Weekdays
                </h4>
                <motion.ul 
                  className="space-y-2 bg-sky-50 rounded-lg p-3"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {adultsTimesWeekdays.map((time, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center text-sm text-gray-600"
                      variants={batchItem}
                      whileHover={{ x: 3 }}
                    >
                      <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                      {time}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              
              {/* Weekends */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Weekends
                </h4>
                <motion.ul 
                  className="space-y-2 bg-sky-50 rounded-lg p-3"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {adultsTimesWeekends.map((time, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center text-sm text-gray-600"
                      variants={batchItem}
                      whileHover={{ x: 3 }}
                    >
                      <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                      {time}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-sky-100 to-blue-100 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-sky-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Batch Types
              </h4>
              <motion.ul 
                className="space-y-2"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {batchTypes.map((batch, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center justify-between text-sm bg-white rounded-lg p-3 shadow-sm"
                    variants={batchItem}
                    whileHover={{ x: 5, backgroundColor: "rgba(224, 242, 254, 0.5)" }}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                        {i+1}
                      </span>
                      <span className="font-medium text-gray-800">{batch.level}</span>
                    </div>
                    <span className="text-gray-600">{batch.classes}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
           
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TrainingPrograms;