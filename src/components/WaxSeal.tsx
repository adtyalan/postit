"use client";

import React, { useState, useEffect, useRef } from "react";
import { Fingerprint, ShieldCheck, Loader2 } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

interface WaxSealProps {
  onSeal?: () => void;
  isSealed?: boolean;
  isSealing?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({ onSeal, isSealed = false, isSealing = false }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();

  const HOLD_DURATION = 1500; // 1.5 detik

  useEffect(() => {
    if (isHolding && !isSealed && !isSealing) {
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
        setHoldProgress(progress);

        if (progress >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsHolding(false);
          onSeal?.();
        }
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setHoldProgress(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHolding, isSealed, isSealing, onSeal]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative group">
        {/* Progress Ring Background */}
        {!isSealed && (
          <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] -rotate-90 pointer-events-none z-0">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              className="stroke-primary/10 fill-none"
              strokeWidth="2"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              className="stroke-primary fill-none"
              strokeWidth="3"
              strokeDasharray="100 100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - holdProgress }}
              transition={{ type: "tween", ease: "linear" }}
              strokeLinecap="round"
            />
          </svg>
        )}

        <button
          type="button"
          onPointerDown={() => !isSealed && !isSealing && setIsHolding(true)}
          onPointerUp={() => setIsHolding(false)}
          onPointerLeave={() => setIsHolding(false)}
          onPointerCancel={() => setIsHolding(false)}
          className={`
            relative w-24 h-24 rounded-full flex items-center justify-center
            transition-all duration-300 touch-none z-10
            ${isSealed 
              ? "bg-primary scale-110 shadow-hard rotate-12 cursor-default" 
              : "bg-primary/90 hover:bg-primary scale-100 shadow-hard-sm hover:scale-105 cursor-pointer"}
            ${isHolding && !isSealed ? "scale-95 shadow-none translate-y-1" : ""}
            ${isSealing ? "opacity-80" : ""}
          `}
        >
          {/* Seal Texture */}
          <div className="absolute inset-2 border-2 border-background-paper/20 rounded-full" />
          
          <div className="relative z-10 text-background-paper select-none">
            {isSealed ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <ShieldCheck size={40} strokeWidth={1.5} className="drop-shadow-sm" />
                <span className="font-display text-[8px] mt-1 tracking-widest opacity-60">VERIFIED</span>
              </motion.div>
            ) : isSealing ? (
              <Loader2 size={32} className="animate-spin opacity-80" />
            ) : (
              <div className="flex flex-col items-center">
                <Fingerprint 
                  size={42} 
                  strokeWidth={1} 
                  className={`transition-opacity duration-300 ${isHolding ? 'opacity-100' : 'opacity-40 animate-pulse'}`} 
                />
                {isHolding && (
                  <motion.span 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 whitespace-nowrap font-display text-[10px] text-background-paper tracking-widest"
                  >
                    HOLDING...
                  </motion.span>
                )}
              </div>
            )}
          </div>

          {/* Melted Wax Outer Ring */}
          {!isSealed && !isSealing && (
            <div className={`absolute -inset-1 border-4 border-primary/20 rounded-full pointer-events-none transition-opacity ${isHolding ? 'opacity-100 animate-ping' : 'opacity-0'}`} />
          )}
        </button>
      </div>

      {/* Progress Label */}
      {!isSealed && !isSealing && !isHolding && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="mt-6 font-display text-[9px] tracking-[0.3em] text-background-paper/60 uppercase"
        >
          Hold to Seal
        </motion.div>
      )}
    </div>
  );
};
