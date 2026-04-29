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
    <main className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
      
      <div className="relative w-full max-w-[600px] h-[500px] flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Envelope Stage */
            <motion.div 
              key="envelope"
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: 100 }}
              className="relative w-full h-[400px] bg-background-paper shadow-hard rounded-sm flex items-center justify-center cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* Back side of envelope with flap */}
              <div className="absolute inset-0 z-10">
                {/* Side Folds */}
                <div className="absolute inset-0 border-l-[300px] border-l-transparent border-r-[300px] border-r-transparent border-b-[200px] border-b-surface/30 bottom-0" />
                <div className="absolute inset-y-0 left-0 border-t-[200px] border-t-transparent border-b-[200px] border-b-transparent border-l-[300px] border-l-surface/20" />
                <div className="absolute inset-y-0 right-0 border-t-[200px] border-t-transparent border-b-[200px] border-b-transparent border-r-[300px] border-r-surface/20" />
                
                {/* Top Flap Animation */}
                <motion.div 
                  className="absolute top-0 inset-x-0 h-40 bg-surface/60 origin-top z-20"
                  initial={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  animate={isOpen ? { rotateX: -160, opacity: 0.8 } : {}}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  onAnimationComplete={() => isOpen && setTimeout(() => setIsRevealed(true), 400)}
                />
              </div>

              {/* The Wax Seal */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-primary rounded-full shadow-hard-sm"
                animate={isOpen ? { scale: 0, opacity: 0 } : {}}
              >
                <div className="absolute inset-0 flex items-center justify-center font-special text-[8px] text-background-paper uppercase font-bold text-center">
                  Break <br /> Seal
                </div>
              </motion.div>

              <div className="absolute bottom-8 font-courier text-[10px] text-muted uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
                Tap to unbox message
              </div>
            </motion.div>
          ) : (
            /* Letter Stage */
            <motion.div 
              key="letter"
              initial={{ y: 200, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              className="relative w-full max-w-[550px] min-h-[700px] bg-background-paper paper-texture shadow-hard rounded-sm p-12 md:p-16 flex flex-col"
            >
              <header className="mb-12">
                <p className="font-courier text-xs text-muted uppercase tracking-widest mb-4">{messageData.date}</p>
                <h2 className="font-handwriting text-3xl text-text-main border-b border-primary/20 pb-4">Dearest {messageData.to},</h2>
              </header>

              <div className="flex-1">
                <p className="font-handwriting text-3xl text-text-main/90 leading-relaxed ink-bleed">
                  {messageData.body}
                </p>
              </div>

              <footer className="mt-12 pt-8 border-t border-primary/10">
                <p className="font-handwriting text-3xl text-text-main">Yours ever,</p>
                <p className="font-handwriting text-4xl text-text-main mt-2 ink-bleed">{messageData.from}</p>
              </footer>

              {/* Navigation back */}
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex gap-8">
                <Link href="/gallery" className="font-special text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors">
                  Return to Archives
                </Link>
                <Link href="/" className="font-special text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors">
                  Back to Desk
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Atmospheric decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none noise-bg z-50" />
    </main>
  );
}
