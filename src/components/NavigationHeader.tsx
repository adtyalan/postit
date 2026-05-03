"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const NavigationHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse", href: "/browse" },
    { name: "Archive", href: "/archive" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full px-4 pt-4 pb-2 z-50">
      <header className="relative flex items-center justify-between whitespace-nowrap border-b-2 border-solid border-muted/30 px-6 md:px-10 py-2.5 bg-background-paper/90 backdrop-blur-sm shadow-hard rounded-sm transform -rotate-1 transition-transform hover:rotate-0 duration-500">
        <Link href="/" className="flex items-center gap-3 text-text-main group z-50">
          <div className="size-5 text-primary group-hover:scale-110 transition-transform">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-text-main text-lg md:text-xl font-display font-bold leading-tight tracking-tight">The Dead Letter Office</h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex flex-1 justify-end gap-8 items-center">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`font-display uppercase tracking-widest text-xs md:text-sm transition-colors duration-300 ${
                    isActive ? "text-primary font-bold underline underline-offset-4 decoration-2" : "text-text-main hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="w-px h-6 bg-muted/20 hidden md:block mx-2" />

          <Link href="/compose" className="hidden md:block text-text-main font-display uppercase tracking-widest text-xs md:text-sm hover:text-primary transition-colors border-2 border-primary/20 px-4 py-1.5 rounded-sm hover:bg-primary/5">
            Draft a Letter
          </Link>

          {/* Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-main hover:text-primary transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-full left-0 right-0 mt-2 bg-background-paper border-2 border-muted/30 shadow-hard rounded-sm p-6 flex flex-col gap-6 md:hidden z-40 origin-top"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-display uppercase tracking-[0.2em] text-sm py-3 transition-all duration-300 border-b border-muted/10 ${
                        isActive ? "text-primary font-bold pl-2 border-l-4 border-l-primary border-b-transparent" : "text-text-main hover:text-primary hover:pl-2"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <Link 
                href="/compose" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-text-main font-display uppercase tracking-[0.2em] text-sm hover:text-primary transition-colors border-2 border-primary/20 px-4 py-3 rounded-sm hover:bg-primary/5 bg-primary/5"
              >
                Draft a Letter
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

