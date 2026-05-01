"use client";

import React from "react";

interface HandwrittenInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  isTextArea?: boolean;
}

export const HandwrittenInput: React.FC<HandwrittenInputProps> = ({ 
  label, 
  isTextArea = false, 
  className = "", 
  ...props 
}) => {
  const Component = isTextArea ? "textarea" : "input";
  
  return (
    <div className={`flex flex-col w-full gap-1 ${isTextArea ? "flex-1 min-h-0" : ""}`}>
      {label && (
        <span className="font-body text-[10px] uppercase text-muted tracking-widest px-4 opacity-60">
          {label}
        </span>
      )}
      <Component
        className={`
          w-full bg-transparent border-none text-text-main 
          focus:outline-none focus:ring-0
          placeholder:text-text-main/20
          font-hand text-xl md:text-3xl leading-[1.3] md:leading-[1.4] ink-bleed
          px-4 py-2
          ${isTextArea ? "resize-none overflow-y-auto custom-scrollbar flex-1 min-h-0" : "h-14"}
          ${className}
        `}
        {...(props as any)}
      />
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(178, 74, 64, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
