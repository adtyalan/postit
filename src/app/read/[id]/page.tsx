"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { PostmarkButton } from "@/components/PostmarkButton";
import { BackButton } from "@/components/BackButton";
import { ReactionTray } from "@/components/ReactionTray";
import { LetterSheet } from "@/components/LetterSheet";
import { LetterContent } from "@/components/LetterContent";

import { LoadingUI } from "@/components/LoadingUI";
import { ErrorUI } from "@/components/ErrorUI";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReadPage() {
  const params = useParams();
  const id = params?.id as string;
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [appliedReactions, setAppliedReactions] = useState<{id: string, label: string, x: number, y: number, rotate: number, variant: string}[]>([]);

  const { data: letter, error, isLoading } = useSWR(id ? `/api/letters/${id}` : null, fetcher);

  if (error || (letter && letter.error)) {
    return (
      <ErrorUI 
        message={letter?.error || "We couldn't find the letter you're looking for."} 
        reset={() => window.location.reload()}
        title="Letter Missing"
      />
    );
  }

  const dateStr = letter ? new Date(letter.createdAt).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }) : "";

  return (
    <main className="relative min-h-svh w-full bg-[#170A08] flex flex-col items-center justify-center p-4 md:p-12 lg:p-16 overflow-x-hidden font-body">
      <AnimatePresence>
        {isLoading && <LoadingUI />}
      </AnimatePresence>
      
      {/* Atmospheric decoration */}
      <div className="absolute inset-0 pointer-events-none noise-bg z-50" />

      {letter && (
        <div className="relative w-full max-w-7xl flex-1 flex flex-col items-center justify-center min-h-0 py-10">
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 z-40">
          <BackButton href="/browse" label="Back" />
        </div>
        
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Envelope Stage */
            <motion.div 
              key="envelope"
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: 100 }}
              className="relative w-full max-w-[450px] aspect-[4/3] bg-background-paper shadow-hard rounded-sm flex items-center justify-center cursor-pointer group shrink-0"
              onClick={() => setIsOpen(true)}
            >
              {/* The Stamp (from DB) */}
              {letter.stampId && (
                <div className="absolute top-4 right-4 w-12 h-16 md:w-16 md:h-20 pointer-events-none z-20">
                  <div className="relative w-full h-full opacity-80 sepia-[0.3] rotate-3">
                    <img 
                      src={`/stamps/${letter.stampId}.png`} 
                      alt="Postage Stamp" 
                      className="w-full h-full object-contain"
                    />
                    {/* Perforated border effect */}
                    <div className="absolute inset-0 border-[2px] border-background-paper border-dotted opacity-40" />
                  </div>
                </div>
              )}

              {/* Back side of envelope with side folds - using clip-paths for responsiveness */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-surface/30" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 50%)" }} />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-surface/20" style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }} />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-surface/20" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }} />
                
                {/* Top Flap Animation */}
                <motion.div 
                  className="absolute top-0 inset-x-0 h-[40%] bg-surface/50 origin-top z-20"
                  initial={false}
                  animate={isOpen ? { rotateX: -160, opacity: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  onAnimationComplete={() => isOpen && setTimeout(() => setIsRevealed(true), 100)}
                />
              </div>

              {/* The Wax Seal */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 bg-[#DE2312] rounded-full shadow-hard-sm flex flex-col items-center justify-center cursor-pointer border-4 border-primary/20"
                animate={isOpen ? { scale: 0, opacity: 0 } : {}}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <div className="font-display text-[6px] md:text-[8px] text-background-paper uppercase font-bold text-center leading-tight tracking-tighter">
                  Break <br /> Seal
                </div>
                <div className="absolute inset-1 border border-background-paper/10 rounded-full" />
              </motion.div>

              <div className="absolute bottom-6 font-body text-[8px] text-muted uppercase tracking-[0.4em] group-hover:text-primary transition-colors z-0">
                Tap to unbox message
              </div>
            </motion.div>
          ) : (
            /* Letter Stage */
            <LetterSheet 
              key="letter"
              initial={{ y: 200, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              className="lg:max-w-[750px]"
            >

              {/* Applied Reactions Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <AnimatePresence>
                  {appliedReactions.map((reaction, index) => (
                    <motion.div
                      key={`${reaction.id}-${index}`}
                      initial={{ scale: 4, opacity: 0, rotate: reaction.rotate - 15 }}
                      animate={{ scale: 1, opacity: 0.5, rotate: reaction.rotate }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }}
                      className="absolute"
                      style={{ 
                        left: `${reaction.x}%`, 
                        top: `${reaction.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className={`border-[3px] px-3 py-1 rounded-sm font-display text-[14px] md:text-[18px] font-black uppercase tracking-tighter ink-bleed ${reaction.variant === 'primary' ? 'border-primary text-primary' : 'border-muted text-muted'}`}>
                        {reaction.label}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <LetterContent 
                date={dateStr}
                recipient={letter.recipient}
                content={letter.content}
                sender={letter.sender}
                fontFamily={letter.fontFamily}
              />

              {/* ARCHIVED STAMP REACTION */}
              <AnimatePresence>
                {isArchived && (
                  <motion.div
                    initial={{ scale: 3, opacity: 0, rotate: -25, x: "-50%", y: "-50%" }}
                    animate={{ scale: 1, opacity: 0.6, rotate: -15, x: "-50%", y: "-50%" }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="absolute top-1/2 left-1/2 z-50 pointer-events-none"
                  >
                    <div className="border-[12px] border-primary/80 px-10 py-5 rounded-2xl">
                      <span className="font-display text-6xl md:text-8xl text-primary/80 font-black uppercase tracking-tighter ink-bleed">
                        Archived
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>


              {/* Reaction Tray */}
              <ReactionTray 
                id={id}
                letter={letter}
                onAddReaction={(reaction) => setAppliedReactions(prev => [...prev, reaction])}
                onArchive={() => {
                  setIsArchived(true);
                  setTimeout(() => setIsArchived(false), 2000);
                }}
              />
            </LetterSheet>

          )}
        </AnimatePresence>

      </div>
      )}

      {/* Atmospheric Footer */}
      {!isRevealed && (
        <div className="font-body text-[8px] md:text-[9px] text-background-paper/30 text-center uppercase tracking-[0.5em] py-4 shrink-0">
          The weight of a word is measured by the silence it keeps.
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.03);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(178, 74, 64, 0.15);
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
