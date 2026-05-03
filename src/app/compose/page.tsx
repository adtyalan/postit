"use client";

import React, { useState } from "react";
import { HandwrittenInput } from "@/components/HandwrittenInput";
import { BackButton } from "@/components/BackButton";
import { LetterSheet } from "@/components/LetterSheet";
import { useDraft } from "@/hooks/useDraft";

export default function ComposePage() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const { saveDraft } = useDraft();

  return (
    <main className="relative min-h-[100svh] w-full bg-[#170A08] flex flex-col items-center py-6 md:py-12 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 border-4 border-background-paper/10 rounded-full -rotate-12 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 border-4 border-background-paper/10 rounded-full rotate-45 pointer-events-none" />
      
      <div className="z-50 self-start mb-6 md:absolute md:top-12 md:left-12">
        <BackButton href="/" label="Back to Desk" variant="secondary" />
      </div>

      {/* Main Letter Sheet */}
      <LetterSheet 
        className="flex-1 min-h-0 flex flex-col pt-6 px-6 pb-20 md:pt-12 md:px-12 md:pb-24 transition-transform hover:rotate-[0.5deg]"
      >
        
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
          <button 
            onClick={() => {
              if (message.trim()) {
                saveDraft({
                  to,
                  from,
                  message,
                  paperStyle: "classic",
                  fontFamily: "font-hand",
                });
                window.location.href = "/seal";
              }
            }}
            className="flex min-w-[120px] md:min-w-[140px] cursor-pointer items-center justify-center h-14 md:h-16 px-6 md:px-10 bg-[#DE2312] text-background-paper text-lg md:text-xl font-display uppercase tracking-widest hover:-translate-y-2 active:translate-y-0 transition-all duration-200 shadow-hard rounded-sm group"
          >
            <span>Fold Letter</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute top-6 right-8 md:top-8 md:right-12 opacity-10 pointer-events-none select-none">
          <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-text-main rounded-full flex items-center justify-center font-display text-[6px] md:text-[8px] text-center uppercase tracking-tighter">
            Registered <br /> Dispatch <br /> 1924
          </div>
        </div>
      </LetterSheet>




      <div className="absolute inset-0 pointer-events-none noise-bg z-50" />
    </main>
  );
}
