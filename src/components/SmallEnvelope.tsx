"use client";

import React from "react";
import Link from "next/link";

interface SmallEnvelopeProps {
  id: string;
  to: string;
  rotation?: number;
}

export const SmallEnvelope: React.FC<SmallEnvelopeProps> = ({ id, to, rotation = 0 }) => {
  return (
    <Link href={`/read/${id}`} className="group block">
      <div 
        className="relative w-full aspect-[4/3] bg-background-paper shadow-hard-sm border border-muted/10 p-4 transition-all duration-300 group-hover:shadow-hard group-hover:-translate-y-1"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Postmark overlay */}
        <div className="absolute top-2 right-2 w-12 h-12 border border-primary/20 rounded-full flex items-center justify-center rotate-12 opacity-40">
          <span className="font-special text-[6px] text-center uppercase text-primary leading-none">
            Gallery <br /> 1924
          </span>
        </div>

        {/* Recipient text */}
        <div className="mt-8">
          <p className="font-courier text-[10px] text-muted uppercase tracking-widest mb-1">To:</p>
          <p className="font-handwriting text-xl text-text-main leading-none truncate">
            {to}
          </p>
        </div>

        {/* Small Wax Seal (Visual only) */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-hard-sm opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
};
