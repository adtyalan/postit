"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationHeader = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Browse", href: "/browse" },
    { name: "Archive", href: "/archive" },
  ];

  return (
    <div className="w-full px-4 pt-4 pb-2 z-50">
      <header className="flex items-center justify-between whitespace-nowrap border-b-2 border-solid border-muted/30 px-6 md:px-10 py-2.5 bg-background-paper/90 shadow-hard rounded-sm transform -rotate-1 transition-transform hover:rotate-0 duration-500">
        <Link href="/" className="flex items-center gap-3 text-text-main group">
          <div className="size-5 text-primary group-hover:scale-110 transition-transform">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-text-main text-lg md:text-xl font-display font-bold leading-tight tracking-tight">The Dead Letter Office</h2>
        </Link>

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

          <Link href="/compose" className="hidden sm:block text-text-main font-display uppercase tracking-widest text-xs md:text-sm hover:text-primary transition-colors border-2 border-primary/20 px-4 py-1.5 rounded-sm hover:bg-primary/5">
            Draft a Letter
          </Link>
        </div>
      </header>
    </div>
  );
};
