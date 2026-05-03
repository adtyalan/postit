import React from "react";
import { motion } from "framer-motion";

interface LetterSheetProps {
  children: React.ReactNode;
  className?: string;
  animate?: any;
  initial?: any;
  layout?: boolean;
}

export const LetterSheet = ({ 
  children, 
  className = "", 
  animate, 
  initial,
  layout = false
}: LetterSheetProps) => {
  return (
    <motion.div 
      layout={layout}
      initial={initial}
      animate={animate}
      className={`relative w-full bg-background-paper paper-texture shadow-hard rounded-sm z-10 ${className}`}
    >
      <div className={`relative p-8 md:p-16 lg:p-20`}>
        {children}
      </div>

    </motion.div>
  );
};
