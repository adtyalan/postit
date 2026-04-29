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
    <div className="flex flex-col w-full gap-1 px-4 py-2">
      {label && (
        <span className="font-body text-xs uppercase text-muted tracking-widest px-4">
          {label}
        </span>
      )}
      <Component
        className={`
          w-full bg-transparent border-none text-text-main 
          focus:outline-none focus:ring-0
          placeholder:text-text-main/30
          font-hand text-4xl leading-tight ink-bleed
          ${isTextArea ? "resize-none overflow-hidden h-full min-h-[300px]" : "h-14"}
          ${className}
        `}
        {...(props as any)}
      />
    </div>
  );
};
