"use client";

import React, { useState } from "react";

interface WaxSealProps {
  onSeal?: () => void;
  isSealed?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({ onSeal, isSealed = false }) => {
  const [isPressing, setIsPressing] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={onSeal}
        onPointerDown={() => !isSealed && setIsPressing(true)}
        onPointerUp={() => setIsPressing(false)}
        onPointerLeave={() => setIsPressing(false)}
        onPointerCancel={() => setIsPressing(false)}
        className={`
          relative w-24 h-24 rounded-full flex items-center justify-center
          transition-all duration-300 touch-none
          ${isSealed 
            ? "bg-primary scale-110 shadow-hard rotate-12 cursor-default" 
            : "bg-primary/90 hover:bg-primary scale-100 shadow-hard-sm hover:scale-105 cursor-pointer"}
          ${isPressing && !isSealed ? "scale-95 shadow-none translate-y-1" : ""}
        `}
      >
        {/* Seal Texture (SVG for the emblem) */}
        <div className="absolute inset-2 border-2 border-background-paper/20 rounded-full" />
        
        <div className="relative z-10 text-background-paper select-none">
          {isSealed ? (
            <div className="flex flex-col items-center">
              <span className="font-display text-[10px] leading-tight uppercase font-bold tracking-tighter">Sealed</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-40">
                <path fillRule="evenodd" d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM4.5 12a.75.75 0 0 1 .75-.75H6.75a.75.75 0 0 1 0 1.5H5.25A.75.75 0 0 1 4.5 12Zm12 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H17.25a.75.75 0 0 1-.75-.75ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM5.25 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM17.25 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5Z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <span className="font-display text-xs uppercase font-bold tracking-widest text-center">
              Tap <br /> to Seal
            </span>
          )}
        </div>

        {/* Melted Wax Effect around edges */}
        {!isSealed && (
          <div className="absolute -inset-1 border-4 border-primary/20 rounded-full animate-pulse pointer-events-none" />
        )}
      </button>

      {!isSealed && (
        <p className="mt-4 font-body text-[10px] text-muted uppercase tracking-[0.2em] animate-bounce">
          Press to close
        </p>
      )}
    </div>
  );
};
