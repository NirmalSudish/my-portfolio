import React, { useState, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import BrandSection from '../components/home/BrandSection';
import WorkSection from '../components/home/WorkSection';
import About from '../components/home/About';
import Contact from '../components/home/Contact';
import Footer from '../components/common/Footer';
import MotionBackground from '../components/background/MotionBackground';
import BottomProgress from '../components/common/BottomProgress';

const Home = () => {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);

  const scrollToSection = (index) => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const sectionIndex = Math.round(scrollPosition / window.innerHeight);
    if (sectionIndex !== activeSection) setActiveSection(sectionIndex);
  };

  return (
    /* REPAIRED: Removed background class to enable body transitions */
    <div className="relative w-full h-screen overflow-hidden">
      <MotionBackground />
      <div className="fixed top-0 left-0 w-full z-50"><Navbar /></div>
      <BottomProgress activeSection={activeSection} totalSections={5} onLineClick={scrollToSection} />

      <main ref={containerRef} onScroll={handleScroll} className="snap-container no-scrollbar relative z-10">
        <section className="snap-section justify-center"><Hero /></section>
        <section className="snap-section justify-center"><BrandSection /></section>
        <section className="snap-section justify-center"><WorkSection /></section>
        <section className="snap-section justify-center"><About /></section>
        <section className="snap-section justify-between pt-24 bg-transparent">
          <div className="flex-grow flex items-center justify-center"><Contact /></div>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Home;