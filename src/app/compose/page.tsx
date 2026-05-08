"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandwrittenInput } from "@/components/HandwrittenInput";
import { BackButton } from "@/components/BackButton";
import { LetterSheet } from "@/components/LetterSheet";
import { WaxSeal } from "@/components/WaxSeal";
import { useDraft } from "@/hooks/useDraft";
import Image from "next/image";
import Link from "next/link";
import { Plus, X, Check, Copy, ArrowRight } from "lucide-react";

const STAMPS = [
  { id: 'locomotive', name: 'LOCOMOTIVE', src: '/stamps/locomotive.png' },
  { id: 'botanica', name: 'BOTANICA', src: '/stamps/botanica.png' },
  { id: 'voyage', name: 'VOYAGE', src: '/stamps/voyage.png' },
  { id: 'aero', name: 'AERO', src: '/stamps/aero.png' },
];

type Step = 'compose' | 'seal' | 'success';

export default function ComposePage() {
  const [step, setStep] = useState<Step>('compose');
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  
  const [placedStampId, setPlacedStampId] = useState<string | null>(null);
  const [isStampDialogOpen, setIsStampDialogOpen] = useState(false);
  const [isSealing, setIsSealing] = useState(false);
  const [sealedLetterId, setSealedLetterId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { saveDraft, clearDraft } = useDraft();

  const handleFold = () => {
    if (message.trim()) {
      saveDraft({ to, from, message, paperStyle: "classic", fontFamily: "font-hand" });
      setStep('seal');
    }
  };

  const handleSeal = async () => {
    if (!placedStampId) {
      // Prompt user to select a stamp first
      setIsStampDialogOpen(true);
      return;
    }

    if (!sealedLetterId && !isSealing) {
      setIsSealing(true);

      try {
        const response = await fetch("/api/letters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: message,
            fontFamily: "font-hand",
            stampId: placedStampId,
            paperStyle: "classic",
            sender: from,
            recipient: to,
            isPublic: true,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSealedLetterId(data.id);
          setStep('success');
          clearDraft();
        } else {
          console.error("Failed to seal letter");
        }
      } catch (error) {
        console.error("Error sealing letter:", error);
      } finally {
        setIsSealing(false);
      }
    }
  };

  const handleCopyLink = () => {
    if (sealedLetterId) {
      const url = `${window.location.origin}/read/${sealedLetterId}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="relative min-h-[100svh] w-full bg-[#170A08] flex flex-col items-center py-6 md:py-12 px-4 md:px-6 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-48 h-48 md:w-64 md:h-64 border-4 border-background-paper/10 rounded-full -rotate-12 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 border-4 border-background-paper/10 rounded-full rotate-45 pointer-events-none" />
      
      <div className="z-50 self-start mb-6 md:fixed md:top-12 md:left-12 px-2 md:px-0">
        <BackButton href="/" label="Back" variant="secondary" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'compose' && (
          <motion.div 
            key="compose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl flex flex-col gap-6"
          >
            <LetterSheet 
              className="flex-1 min-h-[500px] flex flex-col pt-6 px-6 pb-12 md:pt-12 md:px-12 md:pb-24 transition-transform hover:rotate-[0.5deg]"
            >
              {/* Header Section */}
              <div className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-10">
                <HandwrittenInput 
                  placeholder="To: My dearest..." 
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              {/* Message Body */}
              <div className="flex-1 mt-2 md:mt-4 min-h-0 flex flex-col px-0 md:px-4">
                <HandwrittenInput 
                  isTextArea 
                  placeholder="Write your soul here..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 resize-none text-base md:text-lg min-h-[300px]"
                />
              </div>

              {/* Signature Section */}
              <div className="mt-8 md:mt-12 flex flex-col items-end gap-1">
                <span className="font-typewriter text-[10px] md:text-xs text-muted uppercase tracking-widest opacity-60 px-4">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <div className="w-full max-w-[260px] md:max-w-[300px]">
                  <HandwrittenInput 
                    placeholder="From: Your faithful..." 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="text-right"
                  />
                </div>
              </div>

              {/* Desktop Floating CTA Button */}
              <div className="hidden md:block absolute -bottom-8 -right-8">
                <button 
                  onClick={handleFold}
                  className="flex min-w-[140px] cursor-pointer items-center justify-center h-16 px-10 bg-[#DE2312] text-background-paper text-xl font-display uppercase tracking-widest hover:-translate-y-2 active:translate-y-0 transition-all duration-200 shadow-hard rounded-sm group"
                >
                  <span>Fold Letter</span>
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Watermark */}
              <div className="absolute top-6 right-6 md:top-8 md:right-12 opacity-10 pointer-events-none select-none">
                <div className="w-14 h-14 md:w-20 md:h-20 border-2 border-text-main rounded-full flex items-center justify-center font-display text-[5px] md:text-[8px] text-center uppercase tracking-tighter">
                  Registered <br /> Dispatch <br /> 1924
                </div>
              </div>
            </LetterSheet>

            {/* Mobile CTA Button */}
            <div className="md:hidden flex justify-center pb-8">
              <button 
                onClick={handleFold}
                className="w-full max-w-[280px] flex cursor-pointer items-center justify-center h-14 px-8 bg-[#DE2312] text-background-paper text-base font-display uppercase tracking-widest active:scale-95 transition-all duration-200 shadow-hard rounded-sm"
              >
                <span>Fold Letter</span>
                <ArrowRight className="w-5 h-5 ml-3" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'seal' && (
          <motion.div 
            key="seal"
            initial={{ opacity: 0, scale: 1.1, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-8 w-full max-w-2xl px-4 py-8"
          >
            <div className="text-center mb-2">
              <h2 className="font-display text-2xl md:text-4xl text-background-paper uppercase tracking-widest mb-2 ink-bleed">Seal Your Letter</h2>
              <p className="font-body text-[10px] md:text-xs text-background-paper/50 uppercase tracking-[0.2em]">Add a stamp and seal it for eternity.</p>
            </div>

            {/* Envelope Preview (Horizontal/Landscape) */}
            <div className="relative w-full aspect-[1.8/1] max-w-3xl bg-background-paper shadow-hard rounded-sm flex flex-col items-center justify-center overflow-hidden">
              
              {/* Stamp Slot */}
              <div 
                onClick={() => setIsStampDialogOpen(true)}
                className={`absolute top-4 right-4 md:top-8 md:right-8 w-16 h-20 md:w-28 md:h-36 transition-all duration-500 flex items-center justify-center cursor-pointer z-20 group
                  ${placedStampId 
                    ? 'rotate-2 drop-shadow-md' 
                    : 'border-2 border-dashed border-muted/30 hover:border-primary/50 bg-black/5'
                  }
                `}
              >
                {placedStampId ? (
                  <motion.div 
                    initial={{ scale: 1.5, opacity: 0, rotate: 10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 2 }}
                    className="relative w-full h-full p-1.5 bg-white shadow-sm border border-muted/5"
                  >
                    <Image 
                      src={STAMPS.find(s => s.id === placedStampId)?.src || ''} 
                      alt="Stamp" 
                      fill 
                      unoptimized
                      className="object-cover filter sepia-[0.1]"
                    />
                    {/* Perforated border effect */}
                    <div className="absolute inset-0 border border-background-paper border-dotted opacity-30" />
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <Plus size={24} strokeWidth={1.5} className="text-primary" />
                    <span className="text-[8px] font-bold tracking-widest">STAMP</span>
                  </div>
                )}
              </div>

              {/* Envelope Flaps with Depth */}
              <div className="absolute top-0 inset-x-0 h-[60%] bg-surface/60 z-10 origin-top shadow-lg" style={{ clipPath: "polygon(0 0, 100% 0, 50% 95%)" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
              </div>
              
              <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Bottom flap */}
                <div className="absolute inset-0 bg-surface/40" style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 45%)" }} />
                {/* Left flap */}
                <div className="absolute inset-y-0 left-0 w-full bg-surface/30" style={{ clipPath: "polygon(0 0, 0 100%, 45% 50%)" }} />
                {/* Right flap */}
                <div className="absolute inset-y-0 right-0 w-full bg-surface/30" style={{ clipPath: "polygon(100% 0, 100% 100%, 55% 50%)" }} />
                
                {/* Subtle shadows for flaps using linear gradients as clip-path drop-shadow alternative */}
                <div className="absolute inset-0 bg-black/5" style={{ clipPath: "polygon(0 100%, 50% 45%, 100% 100%, 98% 100%, 50% 47%, 2% 100%)" }} />
              </div>

              {/* Recipient Details - Moved to bottom left */}
              <div className="absolute bottom-6 left-8 md:bottom-10 md:left-12 z-0 text-left pointer-events-none">
                <div className="font-hand text-2xl md:text-4xl lg:text-5xl text-text-main/20 italic truncate max-w-[200px] md:max-w-[400px]">
                  {to || "The Universe"}
                </div>
              </div>

              {/* Wax Seal Interaction - Centered */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 scale-90 md:scale-110 drop-shadow-hard">
                <WaxSeal onSeal={handleSeal} isSealing={isSealing} />
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply bg-[url('/textures/paper-grain.png')]" />
            </div>

            <button 
              onClick={() => setStep('compose')}
              className="mt-4 font-display text-[10px] text-background-paper/40 hover:text-background-paper uppercase tracking-[0.3em] transition-all hover:tracking-[0.4em]"
            >
              ← Edit your message
            </button>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center gap-8 py-10"
          >
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white mb-4 shadow-hard">
              <Check size={48} strokeWidth={3} />
            </div>
            
            <div>
              <h2 className="font-display text-4xl text-background-paper uppercase tracking-widest mb-4 ink-bleed">Dispatch Complete</h2>
              <p className="font-body text-xs text-background-paper/60 uppercase tracking-[0.3em] max-w-sm leading-loose">
                Your letter has been sealed and placed in the archives of time.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs mt-8">
              <button 
                onClick={handleCopyLink}
                className={`flex items-center justify-center gap-3 h-14 px-8 shadow-hard font-display text-xs uppercase tracking-widest transition-all
                  ${copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-background-paper text-text-main hover:-translate-y-1'
                  }
                `}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Link Copied!' : 'Copy Letter Link'}
              </button>
              
              <Link href="/">
                <button className="w-full h-14 bg-[#DE2312] text-background-paper shadow-hard font-display text-xs uppercase tracking-widest hover:-translate-y-1 transition-transform">
                  New Letter
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stamp Selection Dialog */}
      <AnimatePresence>
        {isStampDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsStampDialogOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-background-paper shadow-2xl rounded-sm overflow-hidden"
            >
              <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-full md:w-1/4 flex flex-col gap-2">
                  <h3 className="font-display text-xl md:text-2xl text-text-main tracking-widest uppercase mb-2">Select Stamp</h3>
                  <p className="font-body text-[10px] text-muted leading-relaxed uppercase tracking-widest opacity-60">
                    Choose the mark of your dispatch. Each stamp carries the weight of its own journey.
                  </p>
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {STAMPS.map((stamp) => (
                    <button 
                      key={stamp.id}
                      onClick={() => {
                        setPlacedStampId(stamp.id);
                        setIsStampDialogOpen(false);
                      }}
                      className="group flex flex-col items-center gap-4 p-4 bg-[#E8E2D5] hover:bg-[#DED8CB] border border-transparent hover:border-primary/20 transition-all shadow-sm hover:shadow-hard-sm"
                    >
                      <div className="relative w-full aspect-[4/5] flex items-center justify-center p-2 bg-white shadow-sm group-hover:scale-105 transition-transform border border-muted/5">
                        <Image 
                          src={stamp.src} 
                          alt={stamp.name} 
                          fill 
                          unoptimized
                          className="object-cover filter sepia-[0.3] group-hover:sepia-0 transition-all p-1"
                        />
                        {/* Perforated border effect */}
                        <div className="absolute inset-0 border border-background-paper border-dotted opacity-30" />
                      </div>
                      <span className="font-display text-[9px] text-muted tracking-[0.2em] uppercase group-hover:text-primary transition-colors">
                        {stamp.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-muted/5 text-center">
                <p className="font-body text-[8px] text-muted/60 uppercase tracking-[0.2em]">Vintage Dispatch Series • 1924</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      <div className="absolute inset-0 pointer-events-none noise-bg z-[60]" />
    </main>
  );
}
