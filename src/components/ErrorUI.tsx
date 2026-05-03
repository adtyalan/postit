"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, RotateCcw } from "lucide-react";
import { BackButton } from "./BackButton";

interface ErrorUIProps {
  message?: string;
  reset?: () => void;
  title?: string;
}

export const ErrorUI: React.FC<ErrorUIProps> = ({ 
  message, 
  reset, 
  title = "Letter Lost in Transit" 
}) => {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-6 text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-background-paper p-8 rounded-sm shadow-hard border border-muted/20 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rotate-45 translate-x-8 -translate-y-8" />
        <div className="absolute bottom-0 left-0 w-24 h-1 bg-primary/20" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          
          <div className="space-y-3">
            <h2 className="font-display text-text-main text-2xl uppercase tracking-wider ink-bleed">
              {title}
            </h2>
            <p className="font-body text-text-main/70 leading-relaxed text-sm">
              {message || "We encountered an unexpected error while processing your request. The ink might have spilled or the postage was lost."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
            {reset && (
              <button
                onClick={reset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-background-paper font-display uppercase tracking-widest text-xs hover:opacity-90 transition-opacity shadow-hard-sm active:translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            )}
            <div className="w-full sm:w-auto">
              <BackButton label="Go Back" className="justify-center" />
            </div>
          </div>
        </div>
      </motion.div>
      
      <p className="mt-8 font-body text-muted/40 text-[10px] uppercase tracking-[0.2em]">
        Status Code: ERR_TRANSIT_FAILED
      </p>
    </div>
  );
};
