import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import aboutImage from "../assets/about-image.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    // Split text for animation
    const heading = new SplitType(headingRef.current, { types: "lines" });

    const paragraphs = textRefs.current.map(
      (ref) => new SplitType(ref, { types: "lines" })
    );

    // Create scroll animations
    gsap.fromTo(
      heading.lines,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate paragraphs
    paragraphs.forEach((split, index) => {
      gsap.fromTo(
        split.lines,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRefs.current[index],
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Animate image appearance with parallax
    gsap.fromTo(
      imageRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    // Create parallax effect for image when scrolling
    gsap.to(imageRef.current, {
      y: -80,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-neutral-950 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                ref={headingRef}
                className="text-3xl md:text-4xl xl:text-5xl font-bold mb-8 text-white overflow-hidden leading-tight"
              >
                We're not just builders.
                <br />
                We're innovators.
              </h2>

              <div className="space-y-6 text-neutral-300">
                <p ref={addToRefs} className="overflow-hidden leading-relaxed">
                  At BuildCraft, we take pride in being a leading provider of
                  contracting and technical services, delivering high-quality
                  solutions for residential, commercial, and industrial projects
                  across the United Arab Emirates.
                </p>

                <p ref={addToRefs} className="overflow-hidden leading-relaxed">
                  With a strong commitment to quality, safety, and customer
                  satisfaction, we ensure that every project is executed with
                  precision and excellence.
                </p>

                <p ref={addToRefs} className="overflow-hidden leading-relaxed">
                  Our team of skilled professionals is dedicated to delivering
                  innovative and cost-effective solutions that not only meet but
                  exceed expectations.
                </p>
              </div>

              <div className="mt-10">
                <button className="group flex items-center">
                  {/* <span className="text-white font-medium mr-3 relative overflow-hidden">
                    Discover our story
                    <span className="block h-0.5 w-full bg-white/30 mt-1 group-hover:w-0 transition-all duration-300"></span>
                    <span className="block h-0.5 w-0 bg-white absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
                  </span> */}
                  <svg
                    className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
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

            <div ref={imageRef} className="relative aspect-square">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={aboutImage}
                  alt="BuildCraft Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/60 mix-blend-multiply"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute w-32 h-32 rounded-full bg-primary/20 -top-10 -left-10 blur-2xl"></div>
              <div className="absolute w-40 h-40 rounded-full bg-primary/20 -bottom-10 -right-10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background design elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-neutral-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-neutral-900 to-transparent"></div>
    </section>
  );
};

export default About;
