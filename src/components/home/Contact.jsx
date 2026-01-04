import React from 'react';

const Contact = () => {
  return (
    <div className="text-center px-6">
      {/* Animated gradient shimmering text */}
      <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-8
                     bg-gradient-to-r from-white via-[#c792ff] to-white bg-clip-text text-transparent animate-text-gradient">
        LET'S WORK TOGETHER
      </h2>
      <a href="mailto:hello@nirmal.com" className="text-xl md:text-3xl font-bold text-white/60 hover:text-[#c792ff] transition-all duration-500 lowercase tracking-tight">
        hello@nirmal.com
      </a>
    </div>
  );
};

export default Contact;