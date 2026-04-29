"use client";

import React, { useState } from "react";
import { WaxSeal } from "@/components/WaxSeal";
import Link from "next/link";

export default function SealPage() {
  const [isSealed, setIsSealed] = useState(false);

  const handleSeal = () => {
    if (!isSealed) {
      setIsSealed(true);
      // Play sound or haptic feedback if available
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center py-12 px-4 overflow-hidden">
      
      {/* Envelope Back View */}
      <div className="relative w-full max-w-[600px] h-[450px] bg-background-paper shadow-hard rounded-sm flex flex-col items-center justify-center">
        
        {/* Top Flap (Diagonal shapes) */}
        <div className={`
          absolute top-0 inset-x-0 h-40 bg-surface/50 origin-top transition-all duration-700 ease-in-out
          ${isSealed ? "clip-path-flap-closed z-20" : "clip-path-flap-open z-0"}
        `} 
        style={{
          clipPath: isSealed 
            ? "polygon(0 0, 100% 0, 50% 100%)" 
            : "polygon(0 0, 100% 0, 50% 0)"
        }} />

        {/* Diagonal side folds (Visual decoration) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-full border-l-[300px] border-l-transparent border-r-[300px] border-r-transparent border-b-[225px] border-b-surface/30" />
          <div className="absolute top-0 left-0 w-1/2 h-full border-t-[225px] border-t-transparent border-b-[225px] border-b-transparent border-l-[300px] border-l-surface/20" />
          <div className="absolute top-0 right-0 w-1/2 h-full border-t-[225px] border-t-transparent border-b-[225px] border-b-transparent border-r-[300px] border-r-surface/20" />
        </div>

        {/* Central Seal Area */}
        <div className="relative z-30">
          <WaxSeal onSeal={handleSeal} isSealed={isSealed} />
        </div>

        {/* Success Message & Next Steps */}
        <div className={`
          absolute -bottom-32 flex flex-col items-center gap-6 transition-all duration-500
          ${isSealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}>
          <div className="text-center">
            <h2 className="font-display text-3xl text-text-main mb-1">Dispatched successfully.</h2>
            <p className="font-body text-xs text-muted uppercase tracking-widest">A copy will remain in the forgotten archives.</p>
          </div>

          <div className="flex gap-4">
            <button className="h-12 px-6 bg-surface border border-muted/20 shadow-hard-sm font-display text-xs uppercase tracking-widest hover:-translate-y-1 transition-transform">
              Copy Share Link
            </button>
            <Link href="/">
              <button className="h-12 px-6 bg-text-main text-background-paper shadow-hard-sm font-display text-xs uppercase tracking-widest hover:-translate-y-1 transition-transform">
                Return to Desk
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative text */}
      <div className="mt-24 font-body text-[10px] text-muted/50 text-center uppercase tracking-[0.5em] max-w-xs leading-relaxed">
        The weight of a word is measured by the silence it keeps.
      </div>

      <div className="absolute inset-0 pointer-events-none noise-bg z-50" />
    </main>
  );
}
