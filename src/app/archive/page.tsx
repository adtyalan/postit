"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NavigationHeader } from "@/components/NavigationHeader";
import { EnvelopeCard } from "@/components/EnvelopeCard";
import { motion, AnimatePresence } from "framer-motion";

import { LoadingUI } from "@/components/LoadingUI";

export default function ArchivePage() {
  const [archivedLetters, setArchivedLetters] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("postit_archive") || "[]");
    // Simulate short delay for tactile feel and loading visualization
    const timer = setTimeout(() => {
      setArchivedLetters(saved);
      setIsLoaded(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const removeLetter = (id: string) => {
    const updated = archivedLetters.filter(l => l.id !== id);
    setArchivedLetters(updated);
    localStorage.setItem("postit_archive", JSON.stringify(updated));
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col corkboard-bg font-body overflow-x-clip pt-28">
      <NavigationHeader />
      
      <AnimatePresence>
        {!isLoaded && <LoadingUI />}
      </AnimatePresence>

      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            
            {/* Header Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 p-4 mb-12 bg-background-paper/80 self-start border border-muted shadow-hard transform -rotate-1"
            >
              <h1 className="text-text-main text-3xl md:text-4xl font-display font-black leading-tight tracking-tight uppercase">Your Private Archive</h1>
              <p className="text-muted font-body text-base font-normal leading-normal italic">Memories pinned to the walls of your own mind.</p>
            </motion.div>

            {/* Archive Grid */}
            {isLoaded && archivedLetters.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 p-4 space-y-6">
                <AnimatePresence>
                  {archivedLetters.map((letter, index) => (
                    <motion.div
                      key={letter.id || index}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative group"
                    >
                      <EnvelopeCard 
                        id={letter.id} 
                        to={letter.to} 
                        from={letter.from} 
                        rotation={index % 2 === 0 ? "rotate-2" : "-rotate-1"} 
                      />
                      
                      {/* Remove Button */}
                      <button 
                        onClick={() => removeLetter(letter.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-background-paper rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-hard-sm z-20 hover:scale-110"
                        title="Remove from Archive"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : isLoaded ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 border-2 border-dashed border-muted/30 rounded-full flex items-center justify-center mb-6 opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-muted">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-text-main mb-2">The folders are empty.</h3>
                <p className="font-newsreader text-muted italic max-w-xs mx-auto mb-8">"Go back to the Dead Letter Office and find something worth keeping."</p>
                <Link href="/browse">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-primary text-background-paper font-display text-xs uppercase tracking-widest shadow-hard border-2 border-text-main"
                  >
                    Enter the Office
                  </motion.button>
                </Link>
              </motion.div>
            ) : null}

          </div>
        </div>
      </div>
      
      {/* Global Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none noise-bg z-50 opacity-[0.03]" />
    </main>
  );
}
