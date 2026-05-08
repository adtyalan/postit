import React from "react";
import { motion } from "framer-motion";

interface LetterSheetProps {
  children: React.ReactNode;
  className?: string;
  animate?: any;
  initial?: any;
  transition?: any;
  layout?: boolean;
  useStampBorder?: boolean;
}

export const LetterSheet = ({ 
  children, 
  className = "", 
  animate, 
  initial,
  transition,
  layout = false,
  useStampBorder = false
}: LetterSheetProps) => {
  return (
    <motion.div 
      layout={layout}
      initial={initial}
      animate={animate}
      transition={transition}
      className={`relative w-full bg-background-paper paper-texture shadow-hard rounded-sm z-10 ${useStampBorder ? 'stamp-border-tl' : ''} ${className}`}
    >
      <div className={`relative p-6 md:p-12 lg:p-16`}>
        {children}
      </div>

    </motion.div>
  );
};
