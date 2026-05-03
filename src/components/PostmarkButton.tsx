"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PostmarkButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
}

export const PostmarkButton = ({
  label,
  onClick,
  href,
  variant = "primary",
  icon,
  className = "",
}: PostmarkButtonProps) => {
  // Generate a random rotation once to keep it consistent for this instance
  const rotation = useMemo(() => Math.random() * 4 - 2, []);

  const baseStyles = `
    relative group flex items-center justify-center gap-2 px-6 py-2 
    font-display text-[11px] md:text-[13px] uppercase tracking-[0.2em] font-bold
    border-[2.5px] transition-all duration-300
    ${variant === "primary" 
      ? "border-primary text-primary hover:bg-primary/5 shadow-[2px_2px_0px_rgba(178,74,64,0.3)] hover:shadow-[4px_4px_0px_rgba(178,74,64,0.4)]" 
      : "border-muted text-muted hover:bg-muted/5 shadow-[2px_2px_0px_rgba(140,130,115,0.3)] hover:shadow-[4px_4px_0px_rgba(140,130,115,0.4)]"
    }
    ${className}
  `;

  const content = (
    <>
      {icon && <span className="opacity-80 shrink-0">{icon}</span>}
      <span className="ink-bleed whitespace-nowrap">{label}</span>
      
      {/* Decorative corner highlights to make it look like a physical stamp */}
      <div className={`absolute top-0.5 left-0.5 w-1 h-1 border-t border-l opacity-40 ${variant === "primary" ? "border-primary" : "border-muted"}`} />
      <div className={`absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r opacity-40 ${variant === "primary" ? "border-primary" : "border-muted"}`} />
    </>
  );

  const motionProps = {
    whileHover: { 
      scale: 1.05, 
      rotate: 0,
      y: -2
    },
    whileTap: { 
      scale: 0.95, 
      rotate: rotation * 0.5,
      y: 1
    },
    initial: { rotate: rotation },
  };

  if (href) {
    return (
      <Link href={href} className="block">
        <motion.div {...motionProps} className={baseStyles}>
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button 
      onClick={onClick}
      {...motionProps}
      className={baseStyles}
    >
      {content}
    </motion.button>
  );
};
