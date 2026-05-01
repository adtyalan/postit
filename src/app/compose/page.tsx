"use client";

import React, { useState } from "react";
import { HandwrittenInput } from "@/components/HandwrittenInput";
import Link from "next/link";

export default function ComposePage() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  return (
    <main className="relative min-h-[100svh] w-full bg-[#170A08] flex flex-col items-center py-6 md:py-12 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 border-4 border-background-paper/10 rounded-full -rotate-12 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 border-4 border-background-paper/10 rounded-full rotate-45 pointer-events-none" />
      
      <Link href="/" className="z-50 self-start mb-6 md:absolute md:top-12 md:left-12 font-body text-muted/60 hover:text-primary transition-colors uppercase text-[10px] tracking-[0.3em] flex items-center group">
        <div className="w-8 h-8 rounded-full bg-background-paper/5 flex items-center justify-center mr-2 md:bg-transparent md:w-auto md:h-auto md:mr-2 group-hover:bg-primary/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </div>
        <span className="md:block">Back to Desk</span>
      </Link>

      {/* Main Letter Sheet */}
      <div className="relative w-full max-w-[700px] flex-1 min-h-0 bg-background-paper paper-texture shadow-hard rounded-sm flex flex-col pt-6 px-6 pb-20 md:pt-12 md:px-12 md:pb-24 z-10 transition-transform hover:rotate-[0.5deg]">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-10">
          <HandwrittenInput 
            placeholder="To: My dearest..." 
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        {/* Message Body */}
        <div className="flex-1 mt-2 md:mt-4 min-h-0 flex flex-col px-0 md:px-4">
          <HandwrittenInput 
            isTextArea 
            placeholder="Write your soul here..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 resize-none"
          />
        </div>

        {/* Signature Section */}
        <div className="mt-8 md:mt-12 flex flex-col items-end gap-1">
          <span className="font-typewriter text-[10px] md:text-xs text-muted uppercase tracking-widest opacity-60 px-4">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <div className="w-full max-w-[300px]">
            <HandwrittenInput 
              placeholder="From: Your faithful..." 
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="text-right"
            />
          </div>
        </div>

        {/* Floating CTA Button */}
        <div className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-8">
          <Link href="/seal">
            <button className="flex min-w-[120px] md:min-w-[140px] cursor-pointer items-center justify-center h-14 md:h-16 px-6 md:px-10 bg-[#DE2312] text-background-paper text-lg md:text-xl font-display uppercase tracking-widest hover:-translate-y-2 active:translate-y-0 transition-all duration-200 shadow-hard rounded-sm group">
              <span>Fold Letter</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute top-6 right-8 md:top-8 md:right-12 opacity-10 pointer-events-none select-none">
          <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-text-main rounded-full flex items-center justify-center font-display text-[6px] md:text-[8px] text-center uppercase tracking-tighter">
            Registered <br /> Dispatch <br /> 1924
          </div>
        </div>
      </div>



      <div className="absolute inset-0 pointer-events-none noise-bg z-50" />
    </main>
  );
}
