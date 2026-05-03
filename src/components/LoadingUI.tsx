"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const LoadingUI = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
      {/* Backdrop with subtle blur - allows user to see context of current page */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-[#170A08]/60 backdrop-blur-[2px]"
      />

      {/* Modal Content - Styled as a small dispatch card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[300px] bg-background-paper p-8 shadow-hard border-2 border-text-main flex flex-col items-center justify-center gap-6 overflow-hidden pointer-events-auto"
      >
        {/* Subtle noise texture for tactile feel */}
        <div className="absolute inset-0 noise-bg pointer-events-none opacity-[0.05]" />
        
        <div className="relative">
          {/* Decorative background glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary rounded-full blur-2xl"
          />
          
          {/* Rotating Stamp/Seal Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-hard-sm border-2 border-background-paper/20"
          >
            <Loader2 className="w-8 h-8 text-background-paper" />
          </motion.div>
          
          {/* Orbiting dashed line */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 border border-muted/20 rounded-full border-dashed"
          />
        </div>
        
        <div className="text-center space-y-2 relative z-10">
          <motion.h3 
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-display text-text-main text-sm uppercase tracking-[0.3em] ink-bleed"
          >
            Sifting mail...
          </motion.h3>
          <p className="font-body text-muted text-[10px] italic leading-tight max-w-[180px] mx-auto">
            "The weight of a word is measured by the silence it keeps."
          </p>
        </div>

        {/* Small corner details for postcard aesthetic */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/10 pointer-events-none" />
        
        {/* Postmark stamp detail */}
        <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-muted/10 rounded-full flex items-center justify-center rotate-12">
          <div className="text-[8px] text-muted/20 font-display uppercase tracking-widest">D.L.O.</div>
        </div>
      </motion.div>
    </div>
  );
};
