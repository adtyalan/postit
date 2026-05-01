"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ReadPage() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Mock data - in real app, fetch based on ID
  const messageData = {
    to: "Elizabeth Bennet",
    from: "Fitzwilliam Darcy",
    body: "In vain I have struggled. It will not do. My feelings will not be repressed. You must allow me to tell you how ardently I admire and love you.",
    date: "April 28, 1813"
  };

  return (
    <main className="relative h-svh w-full bg-[#170A08] flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-body">
      
      {/* Atmospheric decoration */}
      <div className="absolute inset-0 pointer-events-none noise-bg z-50" />

      <div className="relative w-full max-w-[650px] flex-1 flex flex-col items-center justify-center min-h-0">
        
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Envelope Stage */
            <motion.div 
              key="envelope"
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: 100 }}
              className="relative w-full max-w-[500px] aspect-[4/3] bg-background-paper shadow-hard rounded-sm flex items-center justify-center cursor-pointer group shrink-0"
              onClick={() => setIsOpen(true)}
            >
              {/* Back side of envelope with side folds - using clip-paths for responsiveness */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-surface/30" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)" }} />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-surface/20" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }} />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-surface/20" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }} />
                
                {/* Top Flap Animation */}
                <motion.div 
                  className="absolute top-0 inset-x-0 h-[40%] bg-surface/50 origin-top z-20"
                  initial={false}
                  animate={isOpen ? { rotateX: -160, opacity: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  onAnimationComplete={() => isOpen && setTimeout(() => setIsRevealed(true), 100)}
                />
              </div>

              {/* The Wax Seal */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-[#DE2312] rounded-full shadow-hard-sm flex items-center justify-center cursor-pointer"
                animate={isOpen ? { scale: 0, opacity: 0 } : {}}
              >
                <div className="font-display text-[8px] text-background-paper uppercase font-bold text-center leading-tight">
                  Break <br /> Seal
                </div>
              </motion.div>

              <div className="absolute bottom-6 font-body text-[9px] text-muted uppercase tracking-[0.4em] group-hover:text-primary transition-colors z-0">
                Tap to unbox message
              </div>
            </motion.div>
          ) : (
            /* Letter Stage */
            <motion.div 
              key="letter"
              initial={{ y: 200, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              className="relative w-full flex flex-col max-h-[85vh] min-h-0 bg-background-paper paper-texture shadow-hard rounded-sm z-10"
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-14 lg:p-16">
                <header className="mb-6 md:mb-10">
                  <p className="font-body text-[9px] text-muted uppercase tracking-widest mb-2 opacity-60">{messageData.date}</p>
                  <h2 className="font-hand text-xl md:text-2xl text-text-main border-b border-primary/10 pb-3">Dearest {messageData.to},</h2>
                </header>

                <div className="mb-8 md:mb-12">
                  <p className="font-hand text-xl md:text-2xl text-text-main/90 leading-relaxed ink-bleed">
                    {messageData.body}
                  </p>
                </div>

                <footer className="pt-6 border-t border-primary/10 mb-2">
                  <p className="font-hand text-xl text-text-main">Yours ever,</p>
                  <p className="font-hand text-2xl md:text-3xl text-text-main mt-1 ink-bleed">{messageData.from}</p>
                </footer>
              </div>

              {/* Navigation overlay inside the letter area or below it */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-6 border-t border-muted/5 bg-background-paper/50 backdrop-blur-sm shrink-0">
                <button 
                  onClick={() => {
                    const saved = JSON.parse(localStorage.getItem("postit_archive") || "[]");
                    if (!saved.find((l: any) => l.id === id)) {
                      saved.push({ id, ...messageData });
                      localStorage.setItem("postit_archive", JSON.stringify(saved));
                      alert("Letter archived!");
                    } else {
                      alert("Already in archive.");
                    }
                  }}
                  className="font-display text-[9px] uppercase tracking-widest text-primary hover:scale-105 transition-all flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m17.5 5.5-.707.707L16.293 5.5l.707-.707.707.707Zm-11 0-.707.707L5.293 5.5l.707-.707.707.707ZM12 5.5l-.707.707L10.793 5.5l.707-.707.707.707ZM12 18.5l-.707.707L10.793 18.5l.707-.707.707.707Zm5.5 0-.707.707L16.293 18.5l.707-.707.707.707Zm-11 0-.707.707L5.293 18.5l.707-.707.707.707Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 8.25v3.75m0 0 2.25-2.25M12 12l-2.25-2.25" />
                  </svg>
                  Archive Letter
                </button>
                <Link href="/browse" className="font-display text-[9px] uppercase tracking-widest text-muted hover:text-primary transition-colors">
                  Return to Office
                </Link>
                <Link href="/" className="font-display text-[9px] uppercase tracking-widest text-muted hover:text-primary transition-colors">
                  Back to Desk
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Atmospheric Footer */}
      {!isRevealed && (
        <div className="font-body text-[8px] md:text-[9px] text-background-paper/30 text-center uppercase tracking-[0.5em] py-4 shrink-0">
          The weight of a word is measured by the silence it keeps.
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.03);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(178, 74, 64, 0.15);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
