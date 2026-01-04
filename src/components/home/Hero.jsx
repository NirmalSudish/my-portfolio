import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const flipWords = ["communicate", "captivate", "inspire", "engage", "tell stories"];
const roles = ["graphic designer", "motion designer", "UI/UX designer"]; 

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0); 
  const [nameFinished, setNameFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % flipWords.length);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between h-full">
        
        <div className="w-full md:w-2/3 lg:w-3/4 text-center md:text-left">
          <motion.h1 
            initial="hidden" animate="visible"
            onAnimationComplete={() => setNameFinished(true)}
            className="font-black hero-title-responsive text-white uppercase tracking-tighter leading-[0.9] select-none"
          >
            <div className="block mb-6">
              {"HI, I'M".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants}>{char === " " ? "\u00A0" : char}</motion.span>
              ))}
            </div>
            <div className="block">
              {"NIRMAL".split("").map((char, i) => (
                <motion.span key={i} variants={letterVariants}>{char === " " ? "\u00A0" : char}</motion.span>
              ))}
            </div>
          </motion.h1>
        </div>

        {/* FIXED: Increased role height and added vertical gap to stop text clashing */}
        <div className="w-full md:w-1/3 text-center md:text-right flex flex-col items-center md:items-end md:mt-32">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={nameFinished ? { opacity: 1 } : { opacity: 0 }} 
            className="flex flex-col gap-6"
          >
            <div className="text-xl md:text-2xl text-gray-400 font-light flex flex-col items-center md:items-end">
              <span className="mb-2">I’m a</span>
              
              <div className="h-[2.5em] md:h-[1.5em] relative w-full mb-4"> 
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-0 font-bold text-white whitespace-pre-wrap md:whitespace-nowrap"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span className="mb-2">passionate about creating visuals that</span>

              <div className="h-[1.2em] relative w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute right-0 top-0 font-bold text-[#c792ff]"
                  >
                    {flipWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;