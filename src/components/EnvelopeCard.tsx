"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
  // Fix parsing logic for tailwind rotation classes
  const rotationDegrees = rotation.startsWith("-") 
    ? -parseInt(rotation.split("-")[2] || "0") 
    : parseInt(rotation.split("-")[1] || "0");

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        rotate: 0, 
        zIndex: 60, // Di atas noise overlay (50)
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 30 }
      }}
      initial={{ rotate: rotationDegrees }}
      className="relative break-inside-avoid will-change-transform"
    >
      <Link 
        href={`/read/${id}`} 
        className={`
          block w-full ${padding} cursor-pointer transition-shadow duration-300 
          ${bgColor} stamp-border group relative overflow-hidden
          shadow-md hover:shadow-2xl
        `}
      >
        <div className="envelope-flap" />
        
        {postmark && (
          <div className="absolute opacity-20 postmark text-muted group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
            {postmark}
          </div>
        )}

        <div className={`mt-8 flex flex-col gap-2 relative z-10 ${textAlign === "center" ? "items-center text-center" : textAlign === "right" ? "text-right" : ""}`}>
          <h2 className="text-text-main text-2xl font-hand leading-tight tracking-tight">To: {to}</h2>
          <p className="text-muted text-lg font-hand leading-normal">From: {from}</p>
        </div>

        {/* Paper Grain Overlay - Dioptimasi dengan opacity lebih rendah */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply bg-[url('/textures/paper-grain.png')]" />
      </Link>
    </motion.div>
  );
};
