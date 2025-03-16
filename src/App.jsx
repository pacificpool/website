import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Programs from "./sections/Programs";
import Facilities from "./sections/Facilities";
import Membership from "./sections/Membership/Membership";
import FAQ from "./sections/Faq";
import Contact from "./sections/Contact";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import InteractiveSwimStrokes from "./sections/InteractiveSwimStrokes";

function App() {
  const [loading, setLoading] = useState(true);

  // Smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureOrientation: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // After assets are loaded, remove the loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Loader />}</AnimatePresence>

      <div className="bg-neutral-950 text-neutral-100 overflow-hidden">
        <Cursor />
        <Navbar />
        <main>
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="facilities">
            <Facilities />
          </section>
          <section id="programs">
            <Programs />
          </section>
          <section id="membership">
            <Membership />
          </section>
          <section id="faq">
            <FAQ />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
