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

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch data");
  }
  return res.json();
};

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
        <div className="relative w-full max-w-5xl flex-1 flex flex-col items-center justify-center min-h-screen py-10">
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 z-40">
          <BackButton href="/browse" label="Back" />
        </div>
        
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Envelope Stage */
            <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
              <motion.div 
                key="envelope"
                initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.1, opacity: 0, y: 100 }}
                className="relative w-full aspect-[1.8/1] bg-background-paper shadow-hard rounded-sm flex items-center justify-center cursor-pointer group shrink-0 overflow-hidden"
                onClick={() => setIsOpen(true)}
              >
                {/* The Stamp (from DB) */}
                {letter.stampId && (
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 w-16 h-20 md:w-24 md:h-32 pointer-events-none z-20">
                    <div className="relative w-full h-full opacity-90 sepia-[0.1] rotate-2 bg-white shadow-sm p-1 border border-muted/5">
                      <img 
                        src={`/stamps/${letter.stampId}.png`} 
                        alt="Postage Stamp" 
                        className="w-full h-full object-contain"
                      />
                      {/* Perforated border effect */}
                      <div className="absolute inset-0 border border-background-paper border-dotted opacity-30" />
                    </div>
                  </div>
                )}

                {/* Envelope Flaps (Back Side) */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* Bottom flap */}
                  <div className="absolute inset-0 bg-surface/40" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 45%)" }} />
                  {/* Left flap */}
                  <div className="absolute inset-y-0 left-0 w-full bg-surface/30" style={{ clipPath: "polygon(0 0, 0 100%, 45% 50%)" }} />
                  {/* Right flap */}
                  <div className="absolute inset-y-0 right-0 w-full bg-surface/30" style={{ clipPath: "polygon(100% 0, 100% 100%, 55% 50%)" }} />
                  
                  {/* Subtle shadows for flaps */}
                  <div className="absolute inset-0 bg-black/5" style={{ clipPath: "polygon(0 100%, 50% 45%, 100% 100%, 98% 100%, 50% 47%, 2% 100%)" }} />
                  
                  {/* Top Flap Animation (Opening) */}
                  <motion.div 
                    className="absolute top-0 inset-x-0 h-[60%] bg-surface/60 origin-top z-30 shadow-lg"
                    initial={false}
                    animate={isOpen ? { rotateX: -160, opacity: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    style={{ clipPath: "polygon(0 0, 100% 0, 50% 95%)" }}
                    onAnimationComplete={() => isOpen && setTimeout(() => setIsRevealed(true), 200)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* The Wax Seal - Centered */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-16 h-16 md:w-20 md:h-20 bg-[#B24A40] rounded-full shadow-hard flex flex-col items-center justify-center cursor-pointer border-4 border-primary/20 drop-shadow-hard"
                  animate={isOpen ? { scale: 0, opacity: 0 } : {}}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <div className="font-display text-[8px] md:text-[10px] text-background-paper uppercase font-black text-center leading-tight tracking-widest">
                    Break <br /> Seal
                  </div>
                  <div className="absolute inset-1.5 border border-background-paper/20 rounded-full" />
                </motion.div>

                {/* Recipient Hint - Moved to bottom left */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-0 text-left">
                  <div className="font-hand text-2xl md:text-4xl lg:text-5xl text-text-main/20 italic truncate max-w-[200px] md:max-w-[350px]">
                    {letter.recipient || "The Recipient"}
                  </div>
                </div>
                
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply bg-[url('/textures/paper-grain.png')]" />
              </motion.div>

              {/* Outside instruction */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-display text-[9px] md:text-[11px] text-background-paper/40 uppercase tracking-[0.4em] text-center"
              >
                Click to open dispatch
              </motion.div>
            </div>
          ) : (
            /* Letter Stage */
            <div className="relative flex items-center justify-center w-full">
              {/* Envelope Back Visual (Static background for the letter) */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.05, opacity: 1 }}
                className="absolute inset-0 max-w-2xl aspect-[1.8/1] bg-surface/40 shadow-xl rounded-sm mx-auto -z-10"
                style={{ 
                  clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                  filter: "brightness(0.9)"
                }}
              />

              <LetterSheet 
                key="letter"
                initial={{ y: 350, opacity: 0, rotate: -3 }}
                animate={{ y: 0, opacity: 1, rotate: 1.5 }}
                transition={{ 
                  type: "spring", 
                  damping: 18, 
                  stiffness: 80,
                  delay: 0.1
                }}
                className="w-full max-w-[480px] min-h-[600px] hover:rotate-0 transition-transform duration-500"
                useStampBorder={true}
              >
                {/* The Stamp (from DB) - Also visible on the letter */}
                {letter.stampId && (
                  <div className="absolute top-6 right-6 w-12 h-16 md:w-16 md:h-20 pointer-events-none z-20">
                    <div className="relative w-full h-full opacity-90 sepia-[0.2] rotate-2">
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
            </div>

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
