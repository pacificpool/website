import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    // Animation for the heading
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for the form
    gsap.fromTo(
      formRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation for contact info
    gsap.fromTo(
      infoRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Please fill in all required fields.",
      });
      return;
    }

    // Simulate form submission success
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We'll be in touch soon.",
    });

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    // In a real application, you would send the form data to a server here
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-neutral-950 relative"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6"
          >
            Get In Touch
          </h2>
          <p className="text-neutral-400">
            Have a question or need our services? Contact us today and we'll get
            back to you shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef}>
            <motion.div
              className="bg-neutral-900/80 backdrop-blur-sm p-8 rounded-lg border border-neutral-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Send us a message
              </h3>

              {formStatus.submitted && (
                <div
                  className={`p-4 mb-6 rounded-md ${
                    formStatus.success
                      ? "bg-green-900/30 text-green-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-300 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-300 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative overflow-hidden px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors duration-300"
                  >
                    <span className="relative z-10">Send Message</span>
                    <span className="absolute inset-0 w-0 bg-white/20 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div ref={infoRef}>
            <motion.div
              className="h-full bg-neutral-900/80 backdrop-blur-sm p-8 rounded-lg border border-neutral-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-white">Phone</h4>
                    <p className="mt-1 text-neutral-400">+971-561952403</p>
                  </div>
                </div>

                {/* Email - Coming Soon */}
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-white">Email</h4>
                    <p className="mt-1 text-neutral-400">Coming Soon</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-white">Address</h4>
                    <p className="mt-1 text-neutral-400">Dubai, UAE</p>
                  </div>
                </div>
              </div>

              {/* Map - Would be replaced with an actual map */}
              {/* Embedded Google Map */}
              <div className="mt-6">
                <iframe
                  className="w-full h-64 rounded-lg border border-neutral-800"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.8718850706274!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f428c6b1bdb8b%3A0x4b05f3b6b6d1e47a!2sDubai!5e0!3m2!1sen!2sae!4v123456789"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} BuildCraft. All rights reserved.
          </p>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Contact;
