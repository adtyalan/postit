"use client";

import React from "react";

interface ReactionTrayProps {
  id: string;
  letter: any;
  onAddReaction: (reaction: { id: string, label: string, variant: string, x: number, y: number, rotate: number }) => void;
  onArchive: () => void;
}

export const ReactionTray = ({ id, letter, onAddReaction, onArchive }: ReactionTrayProps) => {
  const reactions = [
    { id: 'loved', label: 'Loved', variant: 'primary' },
    { id: 'seen', label: 'Received', variant: 'secondary' },
    { id: 'bravo', label: 'Bravo', variant: 'primary' },
  ];

  const handleArchive = () => {
    const saved = JSON.parse(localStorage.getItem("postit_archive") || "[]");
    if (!saved.find((l: any) => l.id === id)) {
      saved.push({ id, ...letter });
      localStorage.setItem("postit_archive", JSON.stringify(saved));
    }
    onArchive();
  };

  return (
    <div className="px-8 py-6 bg-surface/10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 border-t border-muted/5">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <span className="font-display text-[8px] uppercase tracking-widest text-muted opacity-60">Stamp Reaction:</span>
        <div className="flex flex-wrap justify-center gap-3">
          {reactions.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                onAddReaction({
                  ...type,
                  x: 15 + Math.random() * 70,
                  y: 15 + Math.random() * 70,
                  rotate: Math.random() * 40 - 20,
                });
              }}
              className={`font-display text-[9px] uppercase tracking-widest px-3 py-1 border transition-all hover:scale-110 active:scale-95
                ${type.variant === 'primary' ? 'border-primary/30 text-primary hover:border-primary' : 'border-muted/30 text-muted hover:border-muted'}
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="hidden md:block w-px h-4 bg-muted/20 mx-2" />
      <div className="md:hidden h-px w-24 bg-muted/10" />

      <button
        onClick={handleArchive}
        className="font-display text-[9px] uppercase tracking-widest px-3 py-1 border border-primary/30 text-primary hover:border-primary hover:bg-primary/5 transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
        </svg>
        Archive
      </button>
    </div>
  );
};
