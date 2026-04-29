"use client";

import React from "react";
import { SmallEnvelope } from "@/components/SmallEnvelope";
import Link from "next/link";

const MOCK_MESSAGES = [
  { id: "1", to: "Elizabeth Bennet", rotation: -2 },
  { id: "2", to: "Fitzwilliam Darcy", rotation: 3 },
  { id: "3", to: "Atticus Finch", rotation: 1 },
  { id: "4", to: "Jay Gatsby", rotation: -4 },
  { id: "5", to: "Sherlock Holmes", rotation: 2 },
  { id: "6", to: "Hercule Poirot", rotation: -1 },
  { id: "7", to: "Jane Eyre", rotation: 5 },
  { id: "8", to: "Heathcliff", rotation: -3 },
  { id: "9", to: "Jo March", rotation: 1 },
  { id: "10", to: "Dorian Gray", rotation: -2 },
  { id: "11", to: "Clarissa Dalloway", rotation: 4 },
  { id: "12", to: "Leopold Bloom", rotation: -1 },
];

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen w-full bg-background flex flex-col items-center py-16 px-6 overflow-x-hidden">
      
      {/* Page Header */}
      <header className="max-w-2xl w-full mb-16 text-center space-y-4">
        <h1 className="font-display text-5xl md:text-6xl text-text-main leading-tight">
          The Dead Letter Office
        </h1>
        <p className="font-courier text-xs text-muted uppercase tracking-[0.3em] leading-relaxed">
          Archives of the unread, the forgotten, and the eternal. <br />
          Messages here have reached their final destination.
        </p>
        <div className="w-24 h-px bg-primary/30 mx-auto mt-8" />
      </header>

      {/* Grid Container */}
      <div className="max-w-6xl w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 pb-24">
        {MOCK_MESSAGES.map((msg) => (
          <SmallEnvelope key={msg.id} {...msg} />
        ))}
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40">
        <Link href="/compose">
          <button className="h-14 px-8 bg-primary text-background-paper shadow-hard font-special uppercase tracking-widest hover:-translate-y-2 transition-all duration-300 rounded-sm whitespace-nowrap">
            Write a New Letter
          </button>
        </Link>
      </div>

      {/* Background Decorative Element */}
      <div className="fixed -bottom-32 -left-32 w-96 h-96 border-[40px] border-muted/5 rounded-full pointer-events-none" />

      {/* Back button */}
      <nav className="fixed top-8 left-8 z-40">
        <Link href="/" className="font-courier text-muted hover:text-primary transition-colors uppercase text-[10px] tracking-widest flex items-center bg-background/50 backdrop-blur-sm p-2 rounded-sm border border-muted/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Desk
        </Link>
      </nav>

      <div className="absolute inset-0 pointer-events-none noise-bg z-0" />
    </main>
  );
}
