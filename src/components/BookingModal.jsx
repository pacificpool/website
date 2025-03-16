import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookingModal = ({ isOpen, onClose, onSubmit, preselectedProgram = "" }) => {
  const [formData, setFormData] = useState({
    sport: "",
    ageGroup: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    kidName: "",
    kidGender: "",
    message: ""
  });
  const [termsAccepted, setTermsAccepted] = useState(true); // Set default to true to enable button
  const modalContentRef = useRef(null);

  // Update form when preselectedProgram changes
  useEffect(() => {
    if (preselectedProgram) {
      setFormData(prev => ({
        ...prev,
        sport: preselectedProgram
      }));
    }
  }, [preselectedProgram]);

  useEffect(() => {
    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Add click outside handler
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const formatWhatsAppMessage = (data) => {
    return `
*New Swim Session Booking*
--------------------------
*Program:* ${data.sport}
*Age Group:* ${data.ageGroup}
*Parent/Guardian:* ${data.parentName}
*Phone:* ${data.parentPhone}
*Email:* ${data.parentEmail}
${data.kidName ? `*Child's Name:* ${data.kidName}` : ''}
${data.kidName ? `*Child's Gender:* ${data.kidGender}` : ''}
${data.message ? `*Additional Message:* ${data.message}` : ''}
`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the data for WhatsApp
    const whatsappMessage = formatWhatsAppMessage(formData);
    
    // Create WhatsApp URL with the formatted message
    const whatsappNumber = "919008838001"; // With country code
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Also call the onSubmit handler if provided
    if (onSubmit) {
      onSubmit(formData);
    }
    
    // Reset form
    setFormData({
      sport: "",
      ageGroup: "Kids (4 to 14 years)",
      parentName: "",
      parentPhone: "",
      parentEmail: "",
      kidName: "",
      kidGender: "Male",
      message: ""
    });
    
    // Close the modal
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Background Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => {
              const size = Math.random() * 100 + 50;
              const startX = Math.random() * 100;
              const startY = Math.random() * 100;
              const duration = Math.random() * 10 + 15;
              
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-sky-400/5"
                  style={{
                    width: size,
                    height: size,
                    left: `${startX}%`,
                    top: `${startY}%`
                  }}
                  animate={{
                    x: [0, Math.random() * 40 - 20],
                    y: [0, Math.random() * 40 - 20],
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </div>
          
          <motion.div
            className="bg-gradient-to-br from-sky-900 to-neutral-900 rounded-2xl p-1 max-w-md w-full shadow-2xl overflow-hidden max-h-[95vh]"
            initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal ripple background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -inset-[100px] opacity-30"
                style={{
                  background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(56,189,248,0) 70%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            
            <div ref={modalContentRef} className="relative bg-neutral-800/90 backdrop-blur-md rounded-2xl p-6 h-[calc(95vh-2px)] flex flex-col">
              {/* Water surface at the top of the modal */}
              <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-sky-500/20 to-transparent"
                  style={{ top: "-15px" }}
                  animate={{
                    y: [0, 5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Water surface wave effect */}
                <svg width="100%" height="100%" viewBox="0 0 600 100" preserveAspectRatio="none">
                  <motion.path 
                    d="M0,40 C150,20 300,60 450,30 C525,15 575,40 600,30 L600,100 L0,100 Z"
                    fill="rgba(56, 189, 248, 0.15)"
                    animate={{
                      d: [
                        "M0,40 C150,20 300,60 450,30 C525,15 575,40 600,30 L600,100 L0,100 Z",
                        "M0,30 C75,50 225,20 375,40 C450,50 550,25 600,40 L600,100 L0,100 Z",
                        "M0,40 C150,20 300,60 450,30 C525,15 575,40 600,30 L600,100 L0,100 Z"
                      ]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
                
                {/* Small floating bubbles */}
                {[...Array(8)].map((_, i) => {
                  const size = Math.random() * 8 + 4;
                  const left = Math.random() * 100;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/40"
                      style={{
                        width: size,
                        height: size,
                        left: `${left}%`,
                        top: "50%"
                      }}
                      animate={{
                        y: [0, -30],
                        opacity: [0.7, 0]
                      }}
                      transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        delay: Math.random() * 5
                      }}
                    />
                  );
                })}
              </div>
              
              <div className="flex justify-between items-center mb-6 pt-2">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">
                  Book Your Swim Session
                </h2>
                <motion.button
                  onClick={onClose}
                  className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
              
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-1">
                      Program
                    </label>
                    <div className="relative">
                      <select
                        name="sport"
                        value={formData.sport}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-white placeholder-white/40 focus:ring-2 focus:ring-sky-400/50 focus:border-transparent outline-none transition-all duration-300 appearance-none"
                      >
                        <option value="" disabled>
                          Select Program
                        </option>
                        <option value="Elite Training">Elite Training</option>
                        <option value="Aqua Fitness">Aqua Fitness</option>
                        <option value="Learn to Swim">Learn to Swim</option>
                        <option value="Therapeutic">Therapeutic</option>
                        <option value="Personal Training">Personal Training</option>
                        <option value="Infants Training">Infants Training</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-1">
                      Age Group
                    </label>
                    <div className="relative">
                      <select
                        name="ageGroup"
                        value={formData.ageGroup}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-white placeholder-white/40 focus:ring-2 focus:ring-sky-400/50 focus:border-transparent outline-none transition-all duration-300 appearance-none"
                      >
                        <option value="Kids (4 to 14 years)">
                          Kids (4 to 14 years)
                        </option>
                        <option value="Teens (15 to 18 years)">
                          Teens (15 to 18 years)
                        </option>
                        <option value="Adults (19+ years)">
                          Adults (19+ years)
                        </option>
                        <option value="Seniors (60+ years)">
                          Seniors (60+ years)
                        </option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-white placeholder-white/40 focus:ring-2 focus:ring-sky-400/50 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-1">
                      WhatsApp Number
                    </label>
                    <div className="relative overflow-hidden">
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-white placeholder-white/40 focus:ring-2 focus:ring-sky-400/50 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="+91 9876543210"
                      />
                      
                      {/* WhatsApp icon with animation */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 pointer-events-none">
                        <motion.svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </motion.svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-1">
                      Email
                    </label>
                    <div className="relative overflow-hidden">
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-white placeholder-white/40 focus:ring-2 focus:ring-sky-400/50 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="email@example.com"
                      />
                      
                      {/* Email icon with animation */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 pointer-events-none">
                        <motion.svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </motion.svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-1">
                      Child's Name
                    </label>
                    <input
                      type="text"
                      name="kidName"
                      value={formData.kidName}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-white placeholder-white/40 focus:ring-2 focus:ring-sky-400/50 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Enter child's name (if applicable)"
                    />
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-1">
                      Child's Gender
                    </label>
                    <div className="flex space-x-4">
                      <label className="relative inline-flex items-center">
                        <motion.input
                          whileTap={{ scale: 0.9 }}
                          type="radio"
                          name="kidGender"
                          value="Male"
                          checked={formData.kidGender === "Male"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <motion.span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.kidGender === "Male"
                              ? "border-sky-400"
                              : "border-white/40"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formData.kidGender === "Male" && (
                            <motion.span
                              className="w-2.5 h-2.5 rounded-full bg-sky-400"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.span>
                        <span className="ml-2 text-white/90">Male</span>
                      </label>
                      
                      <label className="relative inline-flex items-center">
                        <motion.input
                          whileTap={{ scale: 0.9 }}
                          type="radio"
                          name="kidGender"
                          value="Female"
                          checked={formData.kidGender === "Female"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <motion.span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.kidGender === "Female"
                              ? "border-sky-400"
                              : "border-white/40"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {formData.kidGender === "Female" && (
                            <motion.span
                              className="w-2.5 h-2.5 rounded-full bg-sky-400"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.span>
                        <span className="ml-2 text-white/90">Female</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-1">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 px-4 text-white placeholder-white/40 focus:ring-2 focus:ring-sky-400/50 focus:border-transparent outline-none transition-all duration-300 resize-none"
                      placeholder="Any special requests or questions?"
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="pt-4">
                {/* Enhanced submit button with WhatsApp icon */}
                <motion.button
                  type="submit"
                  onClick={handleSubmit}
                  className="relative w-full py-3 px-6 bg-gradient-to-r from-sky-400 to-blue-600 text-white font-bold rounded-lg overflow-hidden cursor-pointer"
                  initial={{ boxShadow: "0 4px 10px rgba(56, 189, 248, 0.3)" }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 6px 20px rgba(56, 189, 248, 0.5)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/>
                    </svg>
                    Submit via WhatsApp
                  </span>
                  
                  {/* Water ripple effect on button */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/30"
                        style={{
                          width: Math.random() * 60 + 20,
                          height: Math.random() * 60 + 20,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1],
                          opacity: [0.7, 0]
                        }}
                        transition={{
                          duration: Math.random() * 1 + 1,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.button>

                <div className="mt-4 text-center">
                  <p className="text-white/50 text-sm">
                    For special requests or assistance, <br />contact us at{" "}
                    <a
                      href="https://wa.me/919008838001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300 transition-colors duration-300"
                    >
                      +91 9008838001
                    </a>
                  </p>
                </div>
              </div>
              
              {/* Water bubbles at bottom of modal */}
              <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => {
                  const size = Math.random() * 10 + 5;
                  const leftPos = Math.random() * 100;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/20"
                      style={{
                        width: size,
                        height: size,
                        left: `${leftPos}%`,
                        bottom: "-20%"
                      }}
                      animate={{
                        y: [0, -30],
                        opacity: [0.7, 0]
                      }}
                      transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "easeOut"
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;