import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import heroBg from "../assets/hero-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Initialize split text for animation
    const heading1Text = new SplitType(heading1Ref.current, { types: "chars" });
    const heading2Text = new SplitType(heading2Ref.current, { types: "chars" });
    const bodyText = new SplitType(textRef.current, { types: "lines" });

    // Create a timeline for the sequence
    const tl = gsap.timeline();

    // Animate first part of heading
    tl.fromTo(
      heading1Text.chars,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: "power4.out",
        delay: 0.5,
      }
    );

    // Animate second part of heading
    tl.fromTo(
      heading2Text.chars,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: "power4.out",
      },
      "-=0.2"
    );

    // Animate body text
    tl.fromTo(
      bodyText.lines,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Create scroll-triggered animations
    gsap.to(sectionRef.current, {
      backgroundPosition: "50% 100%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Fade out text elements as user scrolls
    gsap.to([heading1Ref.current, heading2Ref.current, textRef.current], {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "5% top",
        end: "25% top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,30,60,0.7), rgba(10,10,10,0.8)), url(${heroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-neutral-950/30 z-0"></div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl">
          <div className="mb-8">
            <div className="overflow-hidden">
              <motion.h1
                ref={heading1Ref}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
              >
                Build with
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                ref={heading2Ref}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
              >
                Confidence
              </motion.h1>
            </div>
          </div>

          <div
            ref={textRef}
            className="text-lg md:text-xl text-white/90 max-w-2xl overflow-hidden"
          >
            <p className="mb-4">
              Leading provider of contracting and technical services in the UAE,
              delivering high-quality solutions for residential, commercial, and
              industrial projects.
            </p>
            <p>
              At BuildCraft, we don't just build projects—we build trust,
              lasting partnerships, and a better future.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mt-10"
          >
            <div className="scroll-indicator flex items-center">
              <span className="text-white/70 mr-3 text-sm">
                Scroll to explore
              </span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll-down"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
