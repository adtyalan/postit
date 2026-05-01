"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaxSeal } from "@/components/WaxSeal";
import Link from "next/link";
import Image from "next/image";

const STAMPS = [
  { id: 'locomotive', name: 'LOCOMOTIVE', src: '/stamps/locomotive.png' },
  { id: 'botanica', name: 'BOTANICA', src: '/stamps/botanica.png' },
  { id: 'voyage', name: 'VOYAGE', src: '/stamps/voyage.png' },
  { id: 'aero', name: 'AERO', src: '/stamps/aero.png' },
];

export default function SealPage() {
  const [isSealed, setIsSealed] = useState(false);
  const [placedStampId, setPlacedStampId] = useState<string | null>(null);
  const [selectedStampId, setSelectedStampId] = useState<string | null>(null);

  const handleSeal = () => {
    if (!isSealed && placedStampId) {
      setIsSealed(true);
    }
  };

  const handlePlaceStamp = () => {
    if (selectedStampId && !isSealed) {
      setPlacedStampId(selectedStampId);
    }
  };

  return (
    <main className="relative h-svh w-full bg-[#170A08] flex flex-col md:flex-row overflow-hidden font-body text-text-main">
      
      {/* Background Noise */}
      <div className="absolute inset-0 pointer-events-none noise-bg z-50" />

      {/* Main Workspace (Envelope Area) */}
      <div className="relative flex-1 flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden">
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-40">
          <Link href="/compose">
            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-background-paper shadow-hard-sm flex items-center justify-center hover:-translate-y-1 transition-transform border border-muted/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-text-main">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
          </Link>
        </div>

        <div className="font-display text-xl md:text-3xl lg:text-4xl text-background-paper opacity-80 mt-2 tracking-wider uppercase">
          Seal & Send
        </div>

        {/* Envelope Container */}
        <motion.div 
          layout
          initial={false}
          animate={{ 
            y: isSealed ? -30 : 0,
            scale: isSealed ? 0.75 : 1,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 25 }}
          className="relative w-full max-w-[min(500px,85vw)] aspect-[4/3] bg-background-paper shadow-hard rounded-sm flex flex-col items-center justify-center shrink-0 z-10"
        >
          {/* Stamp Slot */}
          <div 
            onClick={handlePlaceStamp}
            className={`absolute top-3 right-3 md:top-4 md:right-4 w-14 h-18 md:w-20 md:h-24 border-2 border-dashed transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden
              ${placedStampId ? 'border-transparent' : 'border-muted/30 hover:border-primary/50 bg-black/5'}
            `}
          >
            {placedStampId ? (
              <motion.div 
                initial={{ scale: 1.2, opacity: 0, rotate: 5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                className="relative w-full h-full p-1"
              >
                <Image 
                  src={STAMPS.find(s => s.id === placedStampId)?.src || ''} 
                  alt="Stamp" 
                  fill 
                  unoptimized
                  className="object-contain filter sepia-[0.2] contrast-[1.1]"
                />
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-muted/40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-[7px] md:text-[8px] text-muted/40 font-bold tracking-tighter">STAMP</span>
              </div>
            )}
          </div>

          {/* Top Flap */}
          <motion.div 
            className="absolute top-0 inset-x-0 h-[40%] bg-surface/50 origin-top z-0"
            animate={{ 
              zIndex: isSealed ? 20 : 0,
            }}
            style={{
              clipPath: isSealed 
                ? "polygon(0 0, 100% 0, 50% 100%)" 
                : "polygon(0 0, 100% 0, 50% 0)"
            }} 
          />

          {/* Diagonal side folds */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 bg-surface/30" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)" }} />
            <div className="absolute inset-y-0 left-0 w-1/2 bg-surface/20" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }} />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-surface/20" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }} />
          </div>

          {/* Central Seal Area */}
          <div className="relative z-30 scale-90 md:scale-100">
            <WaxSeal onSeal={handleSeal} isSealed={isSealed} />
          </div>
        </motion.div>

        {/* Instructions / Success Message */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px]">
          <AnimatePresence mode="wait">
            {isSealed ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 md:gap-6"
              >
                <div className="text-center px-4">
                  <h2 className="font-display text-xl md:text-3xl lg:text-4xl text-background-paper mb-1 ink-bleed">
                    Dispatched successfully.
                  </h2>
                  <p className="font-body text-[8px] md:text-xs text-background-paper/60 uppercase tracking-[0.3em]">
                    Your words are now part of the history.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pb-4">
                  <button className="h-9 md:h-12 px-6 md:px-8 bg-background-paper text-text-main shadow-hard-sm font-display text-[9px] md:text-[10px] uppercase tracking-widest hover:-translate-y-1 transition-transform">
                    Copy Link
                  </button>
                  <Link href="/">
                    <button className="h-9 md:h-12 px-6 md:px-8 bg-[#DE2312] text-background-paper shadow-hard-sm font-display text-[9px] md:text-[10px] uppercase tracking-widest hover:-translate-y-1 transition-transform">
                      New Letter
                    </button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="instruction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-2"
              >
                <span className="font-body text-[9px] md:text-xs text-background-paper/40 uppercase tracking-[0.4em] text-center max-w-xs leading-loose">
                  {placedStampId 
                    ? "Now, press and hold the seal to finalize." 
                    : "Choose a stamp from the drawer and place it on the corner."}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer text */}
        <div className="font-body text-[8px] md:text-[9px] text-background-paper/30 text-center uppercase tracking-[0.5em] pb-2 pt-0">
          The weight of a word is measured by the silence it keeps.
        </div>
      </div>

      {/* Stamp Drawer Sidebar */}
      <aside className="w-full md:w-[300px] lg:w-[350px] bg-background-paper shadow-[-10px_0_30px_rgba(0,0,0,0.2)] z-40 flex flex-col border-l border-muted/10 h-[35vh] md:h-full shrink-0">
        <div className="p-4 md:p-8 flex-1 flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-6 md:mb-10">
            <h3 className="font-display text-lg md:text-xl text-text-main tracking-widest uppercase">
              Stamp Drawer
            </h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-muted/30">
              <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 flex-1 content-start overflow-y-auto pr-2 custom-scrollbar min-h-0">
            {STAMPS.map((stamp) => (
              <div key={stamp.id} className="flex flex-col items-center gap-2 group">
                <button 
                  onClick={() => setSelectedStampId(stamp.id)}
                  className={`relative w-full aspect-[4/5] bg-[#E8E2D5] shadow-sm border transition-all duration-300 p-2
                    ${selectedStampId === stamp.id 
                      ? 'border-primary shadow-md -translate-y-1 scale-[1.02]' 
                      : 'border-transparent hover:border-muted/20 hover:shadow-md hover:-translate-y-1'
                    }
                  `}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                     <Image 
                        src={stamp.src} 
                        alt={stamp.name} 
                        fill 
                        unoptimized
                        className="object-contain filter sepia-[0.3] group-hover:sepia-0 transition-all"
                      />
                  </div>
                  {/* Perforated border effect */}
                  <div className="absolute inset-0 border-[3px] border-background-paper border-dotted pointer-events-none opacity-50" />
                </button>
                <span className="font-body text-[8px] md:text-[9px] text-muted tracking-widest uppercase">
                  {stamp.name}
                </span>
              </div>
            ))}
            
            {/* Placeholders */}
            <div className="flex flex-col items-center gap-2 opacity-30 grayscale">
              <div className="relative w-full aspect-[4/5] bg-[#E8E2D5] border-2 border-dashed border-muted/50 flex items-center justify-center">
                <span className="font-display text-[7px] text-muted/50 uppercase tracking-widest rotate-[-15deg]">Monument</span>
              </div>
              <span className="font-body text-[8px] md:text-[9px] text-muted tracking-widest uppercase">MONUMENT</span>
            </div>
            <div className="flex flex-col items-center gap-2 opacity-30 grayscale">
              <div className="relative w-full aspect-[4/5] bg-[#E8E2D5] border-2 border-dashed border-muted/50 flex items-center justify-center">
                <span className="font-display text-[7px] text-muted/50 uppercase tracking-widest rotate-[15deg]">Custom</span>
              </div>
              <span className="font-body text-[8px] md:text-[9px] text-muted tracking-widest uppercase">CUSTOM</span>
            </div>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(178, 74, 64, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
