"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavigationHeader } from "@/components/NavigationHeader";


export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col corkboard-bg font-body overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full z-50">
        <NavigationHeader />
      </div>
      
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
        <section className="w-full bg-[#1A0F0D]/40 py-24 md:py-32 flex flex-col items-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-muted/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-muted/20 to-transparent" />
          
          <div className="relative z-10 w-full max-w-4xl px-6">
            <div className="text-center mb-16">
              <span className="font-display text-xs text-primary-fixed-dim uppercase tracking-[0.4em] mb-4 block drop-shadow-sm">Featured Correspondence</span>
              <h2 className="text-3xl md:text-4xl font-display text-background-paper drop-shadow-md">A Message from the Void</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, rotate: 2, scale: 0.9 }}
              whileInView={{ opacity: 1, rotate: -1.5, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[500px] aspect-[3/4] bg-background-paper p-6 md:p-12 flex flex-col drop-shadow-hard stamp-border"
            >
              {/* Paper Texture */}
              <div className="absolute inset-0 pointer-events-none noise-bg opacity-[0.05]" />
              <div className="absolute inset-0 pointer-events-none paper-texture opacity-10" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8 md:mb-12">
                  <div className="space-y-1">
                    <p className="font-display text-[10px] text-muted uppercase tracking-widest">Date:</p>
                    <p className="font-typewriter text-xs md:text-sm text-text-main">October 14, 1924</p>
                  </div>
                  <div className="w-14 h-18 md:w-16 md:h-20 border border-muted/30 flex items-center justify-center p-1 grayscale opacity-60">
                    <img 
                      src="/stamps/locomotive.png" 
                      alt="Vintage Locomotive Stamp" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/64x80/E8DEC3/8C8273?text=STAMP";
                      }}
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col space-y-4 md:space-y-6 overflow-hidden">
                  <h3 className="font-hand text-2xl md:text-3xl text-text-main leading-none">Dearest Stranger,</h3>
                  <p className="font-newsreader text-base md:text-xl text-text-main/90 leading-relaxed italic ink-bleed">
                    "I am writing this to a version of you that doesn't exist yet. The coffee is cold, and the rain is tapping against the glass like a rhythmic ghost. I hope wherever you are, the sun is warmer than it is here."
                  </p>
                </div>

                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-muted/10">
                  <p className="font-hand text-xl md:text-2xl text-text-main">— Anonymous</p>
                </div>
              </div>
              
              {/* Decorative coffee stain or something could go here if I had an image */}
            </motion.div>
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
