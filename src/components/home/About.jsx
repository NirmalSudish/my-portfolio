import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';

const About = () => {
  return (
    <section id="about" className="py-32 bg-transparent relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* LEFT COLUMN: Personal Image */}
          <div className="w-full md:w-5/12">
            <ScrollReveal>
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#c792ff]/15 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                    alt="Nirmal" 
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100" 
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Bio and Moving Gradient Button */}
          <div className="w-full md:w-7/12">
            <ScrollReveal delay={0.2}>
              <h4 className="text-xl md:text-3xl font-black text-[#c792ff] uppercase tracking-[0.2em] mb-6">
                The Story So Far
              </h4>
              
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                I'm Nirmal.
              </h2>

              <div className="space-y-6 text-lg md:text-xl text-white/70 leading-relaxed font-medium mb-10">
                <p>
                  I am a multi-disciplinary designer and <span className="text-white">Computer Science student</span> born and raised in the UAE. 
                </p>
                <p>
                  My work lives at the edge of design and logic, specializing in <span className="text-[#c792ff] italic font-black">human-centered UI/UX.</span>
                </p>
              </div>

              {/* MOVING GREEN GRADIENT BUTTON: Placed below text */}
              <div className="mt-8 mb-16 relative inline-flex items-center justify-center p-[1.5px] overflow-hidden rounded-full group">
                {/* Rotating Border Effect */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#22c55e_360deg)]"
                />
                
                {/* Button Content */}
                <div className="relative z-10 flex items-center gap-3 px-8 py-3 bg-[#0a0a0a] rounded-full">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Available for work</span>
                </div>
              </div>

              {/* MINIMALIST INFORMATION GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 pt-12 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#c792ff] uppercase tracking-[0.3em] mb-2">Based In</span>
                  <span className="text-lg md:text-xl font-bold text-white uppercase">Dubai, UAE</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#c792ff] uppercase tracking-[0.3em] mb-2">Currently working in</span>
                  <span className="text-lg md:text-xl font-bold text-white uppercase">Google</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#c792ff] uppercase tracking-[0.3em] mb-2">Previous working</span>
                  <span className="text-lg md:text-xl font-bold text-white/40 uppercase">Independent Freelance</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;