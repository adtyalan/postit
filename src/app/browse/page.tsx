"use client";

import React, { useState } from "react";
import { NavigationHeader } from "@/components/NavigationHeader";
import { EnvelopeCard } from "@/components/EnvelopeCard";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingUI } from "@/components/LoadingUI";
import { ErrorUI } from "@/components/ErrorUI";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: letters, error, isLoading } = useSWR("/api/letters", fetcher);

  const filteredLetters = letters?.filter((letter: any) => 
    (letter.recipient?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
    (letter.sender?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  ) || [];

  // Helper for random rotation/styles for tactile feel
  const getRandomStyle = (id: string) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // More varied rotations for a more "scattered" look
    const rotations = [
      "rotate-1", "-rotate-1", "rotate-2", "-rotate-2", 
      "rotate-3", "-rotate-3", "rotate-4", "-rotate-4",
      "rotate-6", "-rotate-6"
    ];
    const colors = ["bg-background-paper", "bg-[#e8e2d5]", "bg-[#f2ede4]", "bg-[#e5dfcc]"];
    
    return {
      rotation: rotations[hash % rotations.length],
      bgColor: colors[hash % colors.length]
    };
  };

  if (error) return <ErrorUI reset={() => window.location.reload()} />;

  return (
    <main className="relative min-h-screen w-full flex flex-col corkboard-bg font-body overflow-x-clip pt-28">
      <NavigationHeader />
      
      <AnimatePresence>
        {isLoading && <LoadingUI />}
      </AnimatePresence>

      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            
            {/* Header Area with Title & Search */}
            <div className="flex flex-col items-center gap-8 mb-8">
              {/* Wide Title Card */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl flex flex-col gap-1 p-4 bg-background-paper/90 border-2 border-text-main shadow-hard transform -rotate-1"
              >
                <h1 className="text-text-main text-2xl md:text-3xl font-display font-black leading-tight tracking-tight text-center">Public Letters</h1>
                <p className="text-muted font-body text-sm font-normal leading-normal italic text-center">A chaotic, beautiful corkboard of unsent thoughts.</p>
              </motion.div>

              {/* Wide Search Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-2xl"
              >
                <div className="absolute inset-0 bg-primary/5 rotate-0.5 translate-x-1 translate-y-1" />
                <div className="relative flex items-center bg-background-paper border-2 border-text-main p-1 shadow-hard-sm">
                  <div className="px-3 text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search by To/From..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-display text-base py-1.5 px-1 text-text-main placeholder:text-muted/50 placeholder:italic"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="px-4 text-primary hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="mt-2 flex justify-between">
                  {filteredLetters.length !== (letters?.length || 0) && (
                    <span className="font-display text-[10px] uppercase tracking-[0.3em] text-primary italic">Found {filteredLetters.length} letters</span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Envelopes Grid - Optimized without heavy layout prop */}
            {filteredLetters.length > 0 ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 p-4 space-y-6 min-h-[400px] transform-gpu">
                <AnimatePresence mode="popLayout">
                  {filteredLetters.map((letter: any) => {
                    const style = getRandomStyle(letter.id.toString());
                    return (
                      <motion.div
                        key={letter.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <EnvelopeCard 
                          id={letter.id.toString()}
                          to={letter.recipient || "Anonymous"}
                          from={letter.sender || "Unknown"}
                          rotation={style.rotation}
                          bgColor={style.bgColor}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 border-2 border-dashed border-muted/30 rounded-full flex items-center justify-center mb-6 opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-text-main mb-2">No correspondence found.</h3>
                <p className="font-newsreader text-muted italic max-w-xs mx-auto">"Even the wind doesn't carry letters for names unknown."</p>
              </motion.div>
            )}

          </div>
        </div>
      </div>
      
      {/* Global Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none noise-bg z-50 opacity-[0.03]" />
    </main>
  );
}
