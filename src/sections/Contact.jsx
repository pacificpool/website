import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "membership",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          phone: "",
          message: "",
          interest: "membership",
        });
      }, 5000);
    }, 1500);
  };

  const inputClasses =
    "w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:ring-2 focus:ring-sky-400/50 focus:border-transparent outline-none transition-all duration-300";

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 bg-gradient-to-b from-sky-900 to-neutral-900 text-white relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgb(255, 255, 255)"
            d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,208C672,235,768,245,864,224C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        {/* Animated water-like elements */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-sky-400 to-blue-500 opacity-10"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-10 left-0 right-0 h-12 bg-gradient-to-r from-blue-400 to-sky-500 opacity-5"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        ></motion.div>
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
            <span className="text-sm font-medium text-sky-300 bg-sky-900/30 backdrop-blur-sm px-4 py-1.5 rounded-full tracking-wide">
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-white"
          >
            Contact Pacific Pool
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
            className="max-w-2xl mx-auto text-white/80 text-lg"
          >
            Have questions about our luxury swimming facilities or membership
            options? Our team is ready to assist you with personalized
            information.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Information
                </h3>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-sky-600/20 flex items-center justify-center flex-shrink-0 mr-4">
                      <svg
                        className="w-5 h-5 text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Location</h4>
                      <p className="text-white/70">
                        35/7, 2nd Cross Rd, Seenappa Layout,
                        <br />
                        Vasantha Vallabha Nagar, Bikasipura,
                        <br />
                        Bengaluru, Karnataka 560062
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-sky-600/20 flex items-center justify-center flex-shrink-0 mr-4">
                      <svg
                        className="w-5 h-5 text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Contact</h4>
                      <p className="text-white/70 mb-1">
                        <a
                          href="tel:+91999999999"
                          className="hover:text-white transition-colors duration-300"
                        >
                          +91 999999999
                        </a>
                      </p>
                      <p className="text-white/70">
                        <a
                          href="mailto:info@pacificpool.com"
                          className="hover:text-white transition-colors duration-300"
                        >
                          info@pacificpool.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-sky-600/20 flex items-center justify-center flex-shrink-0 mr-4">
                      <svg
                        className="w-5 h-5 text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Hours</h4>
                      <p className="text-white/70 mb-1">
                        Monday - Friday: 6:00 AM - 10:00 PM
                      </p>
                      <p className="text-white/70">
                        Weekends: 7:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="text-white font-medium mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    {["facebook", "twitter", "instagram", "linkedin"].map(
                      (social) => (
                        <a
                          key={social}
                          href="#"
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 transition-all duration-300"
                        >
                          <span className="sr-only">{social}</span>
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {social === "facebook" && (
                              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            )}
                            {social === "twitter" && (
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            )}
                            {social === "instagram" && (
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            )}
                            {social === "linkedin" && (
                              <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                            )}
                          </svg>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-3"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Send Us a Message
                </h3>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-white/80 text-sm font-medium mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-white/80 text-sm font-medium mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-white/80 text-sm font-medium mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="+91 9876543210"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="interest"
                          className="block text-white/80 text-sm font-medium mb-2"
                        >
                          I'm Interested In
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={formState.interest}
                          onChange={handleChange}
                          className={inputClasses}
                        >
                          <option value="membership">
                            Membership Information
                          </option>
                          <option value="trial">Free Trial Session</option>
                          <option value="classes">Swimming Classes</option>
                          <option value="corporate">Corporate Packages</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={inputClasses}
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    <div className="flex items-center mb-6">
                      <input
                        id="privacy"
                        type="checkbox"
                        required
                        className="w-4 h-4 bg-white/5 border border-white/20 rounded-md focus:ring-2 focus:ring-sky-400/50"
                      />
                      <label
                        htmlFor="privacy"
                        className="ml-2 text-sm text-white/70"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-sky-400 hover:text-sky-300">
                          Privacy Policy
                        </a>{" "}
                        and consent to being contacted.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-sky-400 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:from-sky-500 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-sky-600/20 to-blue-600/20 backdrop-blur-sm p-8 rounded-xl text-center"
                  >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-white/80">
                      Thank you for contacting Pacific Pool. Our team will get
                      back to you shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-1 overflow-hidden"
          >
            <div className="rounded-xl overflow-hidden h-80 bg-neutral-800 relative">
              {/* Map container - made relative to position the iframe */}
              <div className="absolute inset-0">
                {/* Iframe takes up 100% of container */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.2684029899187!2d77.55120147691262!3d12.890455087417513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f6e01e1437f%3A0x2b3863047b4aca6b!2sPacific%20Pool!5e0!3m2!1sen!2sin!4v1741368277345!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
