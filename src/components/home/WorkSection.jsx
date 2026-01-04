import React, { useState, useMemo, memo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; 
import { projects, visuals, motionVideos, threeD, experiments, brandingAssets, packagingAssets } from '../../data/portfolioData';

const SECONDS_PER_ITEM = 12;

const categoryLogos = {
  'ux-branding': (<svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8m-4-4v4" /></svg>),
  'packaging-print': (<svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 8l-9-4-9 4m18 0l-9 4m9-4v8l-9 4m0-12L3 8m9 4v8m-9-12v8l9 4" /></svg>),
  'visual': (<svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></svg>),
  '3d': (<svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" /><path d="M12 22V12" /><path d="M21 7l-9 5L3 7" /></svg>),
  'motion': (<svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>),
  'experimental': (<svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 3h6M10 3v7l-4 8a2 2 0 002 2h8a2 2 0 002-2l-4-8V3" /></svg>)
};

const ProjectCard = memo(({ item, onMouseEnter, onMouseLeave, onSelect }) => {
  const isProject = item.client !== undefined;
  const isVideo = typeof item.src === 'string' && item.src.endsWith('.mp4');
  return (
    <div className="project-card flex-shrink-0 relative group/card cursor-pointer" onMouseEnter={() => onMouseEnter(item.bgColor || '#1d1d1d')} onMouseLeave={onMouseLeave} onClick={() => !isProject && onSelect(item)}>
      {isProject ? (
        <Link to={`/project/${item.id}`} className="block text-white transition-all duration-500">
          <div className="rounded-xl overflow-hidden mb-6 bg-zinc-900 h-[350px] md:h-[550px] w-auto inline-block relative">
            <img src={item.mainImageUrl} className="h-full w-auto object-contain group-hover/card:scale-105 transition-all duration-1000" alt={item.client} />
          </div>
          <div className="flex justify-between items-start px-1">
            <div className="text-left"><h3 className="font-bold text-xl md:text-2xl uppercase tracking-tighter leading-none mb-1">{item.client}</h3><p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest font-medium">{item.project}</p></div>
            <div className="text-right"><span className="text-[9px] md:text-[10px] text-[#c792ff] font-black uppercase tracking-[0.2em]">{item.categories.join(' / ')}</span></div>
          </div>
        </Link>
      ) : (
        <div className="h-[400px] md:h-[650px] w-auto rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
           {isVideo ? <video src={item.src} autoPlay muted loop playsInline className="h-full w-auto object-contain" /> : <img src={item.src} className="h-full w-auto object-contain" alt="Asset" />}
        </div>
      )}
    </div>
  );
});

const WorkSection = () => {
  const [activeFilter, setActiveFilter] = useState('ux-branding');
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const scrollContainerRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  // FIXED: Toggles body class to hide BottomProgress bar
  useEffect(() => {
    if (selectedAsset) { document.body.classList.add('lightbox-open'); }
    else { document.body.classList.remove('lightbox-open'); }
  }, [selectedAsset]);

  const handleScroll = (direction) => {
    setIsPaused(true); 
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.6; 
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 8000); 
  };

  const filteredItems = useMemo(() => {
    const pMatched = projects.filter(p => {
        if (activeFilter === 'ux-branding') return p.categories.includes('ux-ui') || p.categories.includes('branding');
        if (activeFilter === 'packaging-print') return p.categories.includes('print');
        return p.categories.includes(activeFilter);
    });
    let aMatched = [];
    if (activeFilter === 'ux-branding') aMatched = brandingAssets.map(src => ({ src, id: src }));
    else if (activeFilter === 'packaging-print') aMatched = packagingAssets.map(src => ({ src, id: src }));
    else if (activeFilter === 'visual') aMatched = visuals.map(src => ({ src, id: src }));
    else if (activeFilter === 'motion') aMatched = motionVideos.map(src => ({ src, id: src }));
    else if (activeFilter === '3d') aMatched = threeD.map(src => ({ src, id: src }));
    else if (activeFilter === 'experimental') aMatched = experiments.map(src => ({ src, id: src }));
    const all = [...pMatched, ...aMatched];
    return [...all, ...all];
  }, [activeFilter]);

  const dynamicDuration = useMemo(() => { return filteredItems.length * SECONDS_PER_ITEM; }, [filteredItems]);

  return (
    <section id="work" className="relative min-h-screen flex flex-col justify-center bg-transparent z-10 overflow-hidden">
      
      <AnimatePresence>
        {selectedAsset && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center">
            {/* BACKDROP: Sibling layer handles blur separately */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedAsset(null)} />

            {/* FIXED Close Button: Sibling layer to avoid inherited blur */}
            <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="absolute top-10 right-10 w-14 h-14 rounded-full bg-zinc-800 text-white flex items-center justify-center z-[170] border border-white/20 active:scale-90 shadow-2xl" onClick={() => setSelectedAsset(null)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </motion.button>

            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative z-[160] max-w-[90vw] max-h-[85vh] flex items-center justify-center pointer-events-none">
              {selectedAsset.src.endsWith('.mp4') ? <video src={selectedAsset.src} controls autoPlay loop className="max-h-[85vh] rounded-lg shadow-2xl pointer-events-auto" /> : <img src={selectedAsset.src} className="max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-auto" alt="" />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 text-center mb-16 md:mb-24">
        <h2 className="text-5xl md:text-8xl font-black text-white mb-12 uppercase tracking-tighter">Featured Work</h2>
        <div className="flex justify-center w-full"><div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[{ id: 'ux-branding', label: 'UI / UX and BRANDING' }, { id: 'packaging-print', label: 'PRINT & PACKAGING' }, { id: '3d', label: '3D DESIGN' }, { id: 'visual', label: 'VISUAL DESIGN' }, { id: 'experimental', label: 'EXPERIMENTAL DESIGN' }, { id: 'motion', label: 'MOTION DESIGN' }].map(f => (
              <button key={f.id} onClick={() => { setActiveFilter(f.id); setIsPaused(false); }} className={`group relative flex items-center gap-3 px-6 py-3 md:px-10 md:py-4 rounded-full transition-all duration-500 text-[10px] md:text-xs font-black uppercase tracking-widest cursor-pointer backdrop-blur-2xl ${activeFilter === f.id ? 'bg-black/90 text-white ring-1 ring-white/40 scale-105 shadow-[0_0_30px_-5px_rgba(199,146,255,0.4)]' : 'bg-white/10 border border-white/20 text-white hover:border-white/40 hover:bg-white/20'}`}>
                {activeFilter === f.id && <div className="absolute inset-0 rounded-full opacity-30 blur-xl -z-10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse" />}
                <span>{categoryLogos[f.id]}</span><span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div></div>
      </div>

      <div className="w-full relative group/marquee">
        <button onClick={() => handleScroll('left')} className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl opacity-0 group-hover/marquee:opacity-100 transition-all duration-500 flex items-center justify-center text-white active:scale-90 shadow-2xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6"><path d="M15 18l-6-6 6-6" /></svg></button>
        <button onClick={() => handleScroll('right')} className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl opacity-0 group-hover/marquee:opacity-100 transition-all duration-500 flex items-center justify-center text-white active:scale-90 shadow-2xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6"><path d="M9 18l6-6-6-6" /></svg></button>
        <div className="w-full overflow-hidden"><div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar">
            <div className={`flex w-max gap-12 md:gap-24 px-[5vw] ${!isPaused ? 'animate-marquee-slow' : ''}`} style={{ animationPlayState: isPaused ? 'paused' : 'running', animationDuration: `${dynamicDuration}s` }}>
              {filteredItems.map((item, idx) => (<ProjectCard key={idx} item={item} onMouseEnter={(color) => { document.body.style.backgroundColor = color; }} onMouseLeave={() => { document.body.style.backgroundColor = '#111111'; }} onSelect={setSelectedAsset} />))}
            </div>
          </div></div>
      </div>
    </section>
  );
};

export default WorkSection;