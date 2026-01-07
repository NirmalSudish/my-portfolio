import React, { useState, useRef, useEffect } from 'react';
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
  const isScrollingRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const scrollToSection = (index, instant = false) => {
    if (!isDesktop) return;

    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: index * window.innerHeight, behavior: instant ? 'auto' : 'smooth' });
      setActiveSection(index);
    }
  };

  const handleScroll = (e) => {
    if (!isDesktop || isScrollingRef.current) return;

    const scrollPosition = e.target.scrollTop;
    const sectionIndex = Math.round(scrollPosition / window.innerHeight);

    if (sectionIndex !== activeSection && sectionIndex >= 0 && sectionIndex < 5) {
      isScrollingRef.current = true;
      setActiveSection(sectionIndex);

      const container = containerRef.current;
      if (container) {
        container.scrollTo({ top: sectionIndex * window.innerHeight, behavior: 'auto' });
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 100); // Debounce to prevent rapid refiring
    }
  };

  useEffect(() => {
    if (!isDesktop) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextSection = Math.min(activeSection + 1, 4);
        scrollToSection(nextSection, true);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevSection = Math.max(activeSection - 1, 0);
        scrollToSection(prevSection, true);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0, true);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(4, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isDesktop]);

  return (
    <div className="relative w-full">
      <MotionBackground />
      <div className="fixed top-0 left-0 w-full z-50"><Navbar /></div>
      {isDesktop && <BottomProgress activeSection={activeSection} totalSections={5} onLineClick={scrollToSection} />}

      <main ref={containerRef} onScroll={isDesktop ? handleScroll : undefined} className="snap-container no-scrollbar relative z-10">
        <section className="snap-section justify-center"><Hero /></section>
        <section className="snap-section"><BrandSection /></section>
        <section className="snap-section"><WorkSection /></section>
        <section className="snap-section"><About /></section>
        <section className="snap-section">
          <div id="contact" className="flex-grow flex items-center justify-center"><Contact /></div>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Home;