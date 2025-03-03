import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import project1Image from "../assets/project-1.png";
import project2Image from "../assets/project-2.jpg";
import project3Image from "../assets/project-3.jpg";
import project4Image from "../assets/project-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const projectsRef = useRef(null);

  // Sample project data - replace with actual project data
  const projects = [
    {
      id: 1,
      title: "Commercial Tower HVAC Overhaul",
      category: "Electromechanical",
      description:
        "Complete modernization of HVAC systems in a 30-story commercial tower, resulting in 40% energy savings.",
      image: project1Image,
      year: "2024",
    },
    {
      id: 2,
      title: "Luxury Villa Renovation",
      category: "Contracting & Technical",
      description:
        "Comprehensive renovation of a 15,000 sq ft luxury villa, including structural enhancements and smart home integration.",
      image: project2Image,
      year: "2023",
    },
    {
      id: 3,
      title: "Hotel MEP Infrastructure",
      category: "Plumbing & MEP",
      description:
        "Installation of mechanical, electrical, and plumbing systems for a new 5-star hotel with 200+ rooms.",
      image: project3Image,
      year: "2023",
    },
    {
      id: 4,
      title: "Shopping Mall Air Filtration",
      category: "Air-Conditioning",
      description:
        "Implementation of advanced air filtration and purification systems in a major shopping mall.",
      image: project4Image,
      year: "2022",
    },
  ];

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

    // Animation for projects container
    gsap.fromTo(
      projectsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
      }
    );

    // Animated background for section
    gsap.fromTo(
      sectionRef.current,
      { backgroundPosition: "0% 50%" },
      {
        backgroundPosition: "100% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Handle project click
  const handleProjectClick = (index) => {
    setActiveProject(index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, rgb(10, 10, 10), rgb(15, 15, 15), rgb(10, 10, 10))",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6"
          >
            Our Projects
          </h2>
          <p className="text-neutral-400">
            Browse through our portfolio of successfully completed projects that
            demonstrate our expertise and commitment to excellence.
          </p>
        </div>

        <div ref={projectsRef} className="relative max-w-6xl mx-auto">
          {/* Project Display */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Project Thumbnails */}
            <div className="md:col-span-2 space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`p-0.5 rounded-lg relative cursor-pointer transition-all duration-300 ${
                    activeProject === index
                      ? "bg-gradient-to-r from-primary to-primary/30"
                      : "bg-neutral-800/50 hover:bg-neutral-800"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleProjectClick(index)}
                >
                  <div className="bg-neutral-900 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-primary mb-2">
                          {project.category}
                        </p>
                        <h3
                          className={`font-bold transition-all duration-300 ${
                            activeProject === index
                              ? "text-white"
                              : "text-neutral-400"
                          }`}
                        >
                          {project.title}
                        </h3>
                      </div>
                      <span className="text-sm text-neutral-500">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Featured Project Display */}
            <div className="md:col-span-3">
              <motion.div
                className="bg-neutral-900/80 backdrop-blur-sm rounded-lg overflow-hidden h-full"
                key={activeProject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Project Image - Replace with actual project images */}
                <div className="h-64 md:h-72 relative overflow-hidden">
                  <img
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60"></div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-primary mb-1">
                        {projects[activeProject].category}
                      </p>
                      <h3 className="text-xl font-bold text-white">
                        {projects[activeProject].title}
                      </h3>
                    </div>
                    <span className="text-neutral-500">
                      {projects[activeProject].year}
                    </span>
                  </div>

                  <p className="text-neutral-400">
                    {projects[activeProject].description}
                  </p>

                  <div className="mt-6">
                    <button className="group flex items-center text-primary">
                      <span className="font-medium mr-3 relative overflow-hidden">
                        View project details
                        <span className="block h-0.5 w-full bg-primary/30 mt-1 group-hover:w-0 transition-all duration-300"></span>
                        <span className="block h-0.5 w-0 bg-primary absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Projects;
