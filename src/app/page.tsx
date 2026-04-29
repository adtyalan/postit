"use client";

import React from "react";
import Link from "next/link";

interface EnvelopeCardProps {
  id: string;
  to: string;
  from: string;
  rotation: string;
  bgColor?: string;
  postmark?: React.ReactNode;
  textAlign?: "left" | "center" | "right";
  padding?: string;
}

const EnvelopeCard: React.FC<EnvelopeCardProps> = ({ 
  id, to, from, rotation, bgColor = "bg-surface", postmark, textAlign = "left", padding = "p-6" 
}) => {
  return (
    <Link 
      href={`/read/${id}`} 
      className={`
        block w-full ${padding} shadow-hard cursor-pointer transition-all duration-300 
        hover:scale-105 hover:rotate-0 hover:z-10 break-inside-avoid relative overflow-hidden
        ${bgColor} ${rotation} group
      `}
    >
      <div className="envelope-flap" />
      
      {postmark && (
        <div className="absolute opacity-40 postmark text-muted group-hover:rotate-15 transition-transform duration-500">
          {postmark}
        </div>
      )}

      <div className={`mt-8 flex flex-col gap-2 relative z-10 ${textAlign === "center" ? "items-center text-center" : textAlign === "right" ? "text-right" : ""}`}>
        <h2 className="text-text-main text-2xl font-hand leading-tight tracking-tight">To: {to}</h2>
        <p className="text-muted text-lg font-hand leading-normal">From: {from}</p>
      </div>
    </Link>
  );
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col corkboard-bg font-body overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b-2 border-solid border-muted/30 px-4 md:px-10 py-4 mb-8 bg-background-paper/90 shadow-hard rounded-sm transform -rotate-1">
              <div className="flex items-center gap-4 text-text-main">
                <div className="size-6 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2 className="text-text-main text-xl md:text-2xl font-display font-bold leading-tight tracking-tight">The Dead Letter Office</h2>
              </div>
              <div className="flex flex-1 justify-end gap-8">
                <Link href="/compose" className="text-text-main font-display uppercase tracking-widest text-sm hover:text-primary transition-colors">
                  Draft a Letter
                </Link>
              </div>
            </header>

            {/* Section Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4 mb-6 bg-background-paper/80 inline-block self-start border border-muted shadow-hard transform rotate-1">
              <div className="flex flex-col gap-3">
                <p className="text-text-main text-3xl md:text-4xl font-display font-black leading-tight tracking-tight">Public Letters</p>
                <p className="text-muted font-body text-base font-normal leading-normal">A chaotic, beautiful corkboard of unsent thoughts.</p>
              </div>
            </div>

            {/* Envelopes Grid (Masonry using columns) */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 p-4 space-y-6">
              
              <EnvelopeCard 
                id="1" to="The Dreamer" from="Stranger" rotation="-rotate-2" 
                postmark={
                  <div className="absolute top-4 right-4">
                    <svg height="60" viewBox="0 0 100 100" width="60">
                      <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="4 2" strokeWidth="2"></circle>
                      <circle cx="50" cy="50" fill="none" r="35" stroke="currentColor" strokeWidth="1"></circle>
                      <text fill="currentColor" fontSize="12" textAnchor="middle" transform="rotate(-15 50 50)" x="50" y="55" className="font-body">LONDON</text>
                    </svg>
                  </div>
                }
              />

              <EnvelopeCard 
                id="2" to="My Future Self" from="Me" rotation="rotate-3" padding="p-8"
                postmark={
                  <div className="absolute top-2 right-8 opacity-30">
                    <svg height="70" viewBox="0 0 100 100" width="70">
                      <circle cx="50" cy="50" fill="none" r="48" stroke="currentColor" strokeWidth="3"></circle>
                      <path d="M20 50 H80 M50 20 V80" opacity="0.5" stroke="currentColor" strokeWidth="1"></path>
                      <text fill="currentColor" fontSize="10" textAnchor="middle" x="50" y="45" className="font-body">1998</text>
                    </svg>
                  </div>
                }
              />

              <EnvelopeCard 
                id="3" to="A Lost Friend" from="J." rotation="-rotate-4" bgColor="bg-[#e0d6b8]" padding="p-5" textAlign="right"
                postmark={
                  <div className="absolute bottom-4 left-4 opacity-50 text-primary">
                    <svg height="50" viewBox="0 0 100 100" width="50">
                      <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeWidth="4"></circle>
                      <text fill="currentColor" fontSize="16" textAnchor="middle" x="50" y="55" className="font-display">VOID</text>
                    </svg>
                  </div>
                }
              />

              <EnvelopeCard 
                id="4" to="The Midnight Writer" from="Night Owl" rotation="rotate-1" padding="p-7" textAlign="center"
              />

              <EnvelopeCard 
                id="5" to="An Old Flame" from="Anonymous" rotation="-rotate-1" bgColor="bg-[#ecdcd0]"
                postmark={
                  <div className="absolute top-6 left-6 opacity-40">
                    <svg height="40" viewBox="0 0 200 100" width="80">
                      <rect fill="none" height="80" stroke="currentColor" strokeWidth="2" width="180" x="10" y="10"></rect>
                      <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="20" x2="180" y1="30" y2="30"></line>
                      <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="20" x2="180" y1="50" y2="50"></line>
                      <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="20" x2="180" y1="70" y2="70"></line>
                    </svg>
                  </div>
                }
              />

              <EnvelopeCard 
                id="6" to="The Wanderer" from="The Nomad" rotation="rotate-4" padding="p-8"
                postmark={
                  <div className="absolute bottom-6 right-6 opacity-60">
                    <svg height="60" viewBox="0 0 100 100" width="60">
                      <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="1"></circle>
                      <text fill="currentColor" fontSize="14" textAnchor="middle" transform="rotate(45 50 50)" x="50" y="55" className="font-body">PARIS</text>
                    </svg>
                  </div>
                }
              />

              <EnvelopeCard 
                id="7" to="Whoever Finds This" from="A Friend" rotation="-rotate-3" bgColor="bg-[#e5dfcc]" padding="p-5" textAlign="center"
              />

            </div>

            {/* Bottom Floating Action Button */}
            <div className="flex justify-end px-5 pb-10 mt-8">
              <Link href="/compose">
                <button className="flex items-center justify-center h-14 px-8 bg-primary text-background-paper font-display text-base uppercase tracking-[2px] shadow-hard hover:shadow-hard-hover transition-all transform rotate-1 gap-4 border-2 border-text-main group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:rotate-12 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  <span className="truncate">Draft a Letter</span>
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
      
      {/* Global Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none noise-bg z-50 opacity-[0.03]" />
    </main>
  );
}
