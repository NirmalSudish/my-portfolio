import React, { useState, useEffect } from 'react';

const TypewriterHero = () => {
  // Matches the two-line uppercase design from your screenshots
  const fullText = "HI, I'M\nNIRMAL"; 
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, 100); 

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div className="flex justify-center items-center py-20 text-center select-none">
      <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
        {/* We map through the typed string to create individual interactive spans */}
        {displayedText.split("").map((char, i) => (
          char === "\n" ? (
            <br key={i} />
          ) : (
            <span key={i} className="stretch-letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          )
        ))}
        
        {/* Blinking cursor effect outside the stretch spans */}
        <span className="animate-pulse border-r-8 border-white ml-2">&nbsp;</span>
      </h1>
    </div>
  );
};

export default TypewriterHero;