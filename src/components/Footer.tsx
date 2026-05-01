import React from "react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full px-6 py-8 mt-auto border-t border-muted/10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-muted font-display text-[10px] uppercase tracking-[0.2em]">
            © {currentYear} The Dead Letter Office
          </p>
          <p className="text-muted/60 font-body text-[10px] italic">
            "Analog warmth for the digital age."
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            href="/about" 
            className="text-muted hover:text-primary transition-colors font-display text-[10px] uppercase tracking-widest"
          >
            About
          </Link>
          <Link 
            href="/terms" 
            className="text-muted hover:text-primary transition-colors font-display text-[10px] uppercase tracking-widest"
          >
            Terms
          </Link>
          <div className="w-px h-3 bg-muted/20" />
          <span className="text-muted font-display text-[10px] uppercase tracking-widest opacity-40">
            Est. 2026
          </span>
        </div>
      </div>
    </footer>
  );
};
