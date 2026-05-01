"use client";

import React from "react";
import Link from "next/link";

interface EnvelopeCardProps {
  id: string;
  to: string;
  from: string;
  rotation: string;
  bgColor?: string;
  postmark?: React.ReactNode;
  textAlign?: "left" | "center" | "right";
  padding?: string;
}

export const EnvelopeCard: React.FC<EnvelopeCardProps> = ({ 
  id, to, from, rotation, bgColor = "bg-surface", postmark, textAlign = "left", padding = "p-6" 
}) => {
  return (
    <Link 
      href={`/read/${id}`} 
      className={`
        block w-full ${padding} drop-shadow-hard cursor-pointer transition-all duration-300 
        hover:scale-105 hover:rotate-0 hover:z-10 break-inside-avoid relative
        ${bgColor} ${rotation} group stamp-border
      `}
    >
      <div className="envelope-flap" />
      
      {postmark && (
        <div className="absolute opacity-40 postmark text-muted group-hover:rotate-15 transition-transform duration-500">
          {postmark}
        </div>
      )}

      <div className={`mt-8 flex flex-col gap-2 relative z-10 ${textAlign === "center" ? "items-center text-center" : textAlign === "right" ? "text-right" : ""}`}>
        <h2 className="text-text-main text-2xl font-hand leading-tight tracking-tight">To: {to}</h2>
        <p className="text-muted text-lg font-hand leading-normal">From: {from}</p>
      </div>
    </Link>
  );
};
