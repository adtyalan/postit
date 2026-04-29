"use client";

import React, { useState } from "react";
import { HandwrittenInput } from "@/components/HandwrittenInput";
import Link from "next/link";

export default function ComposePage() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  return (
    <main className="relative min-h-screen w-full bg-background flex flex-col items-center py-12 px-4 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 border-4 border-muted/5 rounded-full -rotate-12 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 border-4 border-muted/5 rounded-full rotate-45 pointer-events-none" />

      {/* Main Letter Sheet */}
      <div className="relative w-full max-w-[700px] min-h-[900px] bg-background-paper paper-texture shadow-hard rounded-sm flex flex-col p-12 md:p-20 z-10 transition-transform hover:rotate-[0.5deg]">
        
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-12">
          <HandwrittenInput 
            placeholder="To: My dearest..." 
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <HandwrittenInput 
            placeholder="From: Your faithful..." 
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        {/* Message Body */}
        <div className="flex-1 mt-4">
          <HandwrittenInput 
            isTextArea 
            placeholder="Write your soul here..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="line-clamp-none"
            style={{ lineHeight: '32px' }}
          />
        </div>

        {/* Floating CTA Button */}
        <div className="absolute -bottom-8 -right-8">
          <Link href="/seal">
            <button className="flex min-w-[140px] cursor-pointer items-center justify-center h-16 px-10 bg-primary text-background-paper text-xl font-display uppercase tracking-widest hover:-translate-y-2 active:translate-y-0 transition-all duration-200 shadow-hard rounded-sm group">
              <span>Fold Letter</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute top-8 right-12 opacity-10 pointer-events-none select-none">
          <div className="w-20 h-20 border-2 border-text-main rounded-full flex items-center justify-center font-display text-[8px] text-center uppercase tracking-tighter">
            Registered <br /> Dispatch <br /> 1924
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <nav className="mt-16 flex gap-12 z-20">
        <Link href="/" className="font-body text-muted hover:text-primary transition-colors uppercase text-xs tracking-widest flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Desk
        </Link>
      </nav>

      <div className="absolute inset-0 pointer-events-none noise-bg z-50" />
    </main>
  );
}
