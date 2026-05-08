"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavigationHeader } from "@/components/NavigationHeader";

import { ShowcaseCarousel } from "@/components/ShowcaseCarousel";


export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col corkboard-bg font-body overflow-x-clip">
      <NavigationHeader />
      
      <div className="w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full relative h-svh flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Focal Glow Overlay - Smooths out the corkboard texture in the center */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              background: "radial-gradient(circle at center, rgba(244, 238, 221, 0.45) 0%, rgba(244, 238, 221, 0) 70%)" 
            }} 
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 space-y-8 px-6 max-w-5xl flex flex-col items-center text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-text-main tracking-tighter ink-bleed">
              THE DEAD <br />
              <span className="text-primary italic">LETTER</span> OFFICE
            </h1>
            
            <div className="relative max-w-2xl mx-auto">
              <span className="absolute -left-4 md:-left-8 -top-6 text-primary/20 text-5xl md:text-7xl font-display select-none">“</span>
              <p className="text-base md:text-lg text-text-main/80 font-newsreader italic leading-relaxed drop-shadow-sm px-4">
                A digital archive for the unsent, the forgotten, and the lost. <br className="hidden md:block" />
                Every letter is a memory waiting to be found.
              </p>
              <span className="absolute -right-4 md:-right-8 -bottom-8 text-primary/20 text-5xl md:text-7xl font-display select-none">”</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/compose">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Draft a new letter"
                  className="h-12 md:h-14 px-6 md:px-8 bg-primary text-background-paper font-display text-sm md:text-base uppercase tracking-[0.2em] shadow-hard border-2 border-text-main flex items-center gap-3 group rounded-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                  Draft a Letter
                </motion.button>
              </Link>

              <Link href="/browse">
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Browse public letters"
                  className="h-12 md:h-14 px-6 md:px-8 bg-background-paper text-text-main font-display text-sm md:text-base uppercase tracking-[0.2em] shadow-hard border-2 border-text-main flex items-center gap-3 group rounded-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  Browse Public
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Showcase Section */}
        <section className="w-full h-svh bg-[#1A0F0D]/40 flex flex-col items-center justify-center relative overflow-hidden px-4 pt-[15vh] pb-[5vh]">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-muted/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-muted/20 to-transparent" />
          
          <div className="relative z-10 w-full max-w-5xl h-full flex flex-col items-center justify-between min-h-0">
            <div className="text-center shrink-0">
              <span className="font-display text-[min(1.4vh,0.75rem)] text-primary-fixed-dim uppercase tracking-[0.4em] mb-1 block drop-shadow-sm">Featured Correspondence</span>
              <h2 className="text-[min(4vh,2.5rem)] font-display text-background-paper drop-shadow-md italic leading-tight">Surat dari Kehampaan</h2>
            </div>

            <div className="w-full flex-1 flex flex-col items-center justify-center min-h-0 overflow-hidden py-[2vh]">
              <ShowcaseCarousel />
            </div>
          </div>

          {/* Background Decorative Text */}
          <div className="absolute -bottom-10 -right-10 text-[12rem] font-display font-black text-white/[0.02] pointer-events-none select-none uppercase leading-none">
            Post
          </div>
          <div className="absolute -top-10 -left-10 text-[12rem] font-display font-black text-white/[0.02] pointer-events-none select-none uppercase leading-none">
            Void
          </div>
        </section>

        {/* Footer info */}

      </div>

      {/* Global Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none noise-bg z-50 opacity-[0.03]" />
    </main>
  );
}
