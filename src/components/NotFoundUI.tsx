"use client";

import React from "react";
import { motion } from "framer-motion";
import { MailQuestion, Home } from "lucide-react";
import Link from "next/link";

export const NotFoundUI = () => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="mb-10 relative inline-block">
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [-1, 1, -1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-28 h-28 bg-surface rounded-sm shadow-hard flex items-center justify-center border-2 border-muted/20 stamp-border p-4"
          >
            <div className="w-full h-full border border-dashed border-muted/30 flex items-center justify-center">
              <MailQuestion className="w-14 h-14 text-primary/80" />
            </div>
          </motion.div>
          <motion.div 
            initial={{ rotate: -15, scale: 0 }}
            animate={{ rotate: 12, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -bottom-2 -right-6 bg-primary text-background-paper px-4 py-1.5 font-display text-[10px] uppercase tracking-widest shadow-hard-sm"
          >
            Dead Letter Office
          </motion.div>
        </div>
        
        <div className="space-y-6">
          <h1 className="font-display text-surface text-5xl uppercase tracking-[0.2em] mb-2 ink-bleed">
            Return to Sender
          </h1>
          <p className="font-body text-muted/80 italic text-lg max-w-sm mx-auto leading-relaxed">
            This letter address no longer exists, or perhaps it was never written in the first place.
          </p>
          
          <div className="pt-10">
            <Link 
              href="/"
              className="inline-flex items-center gap-3 px-10 py-4 bg-surface text-text-main font-display uppercase tracking-[0.3em] text-xs hover:bg-background-paper transition-all shadow-hard group active:translate-y-1 active:shadow-hard-sm"
            >
              <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Return to Lobby
            </Link>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-16 flex items-center gap-4 opacity-20 grayscale">
        <div className="h-[1px] w-12 bg-muted" />
        <span className="font-display text-[10px] uppercase tracking-widest">Postage Unpaid</span>
        <div className="h-[1px] w-12 bg-muted" />
      </div>
    </div>
  );
};
