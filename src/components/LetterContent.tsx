import React from "react";

interface LetterContentProps {
  date?: string;
  recipient: string;
  content: string | React.ReactNode;
  sender: string;
  fontFamily?: string;
}

export const LetterContent = ({ 
  date, 
  recipient, 
  content, 
  sender, 
  fontFamily = "font-hand" 
}: LetterContentProps) => {
  return (
    <>
      <header className="mb-4 md:mb-6 relative z-10">
        {date && (
          <p className="font-body text-[8px] text-muted uppercase tracking-widest mb-1 opacity-60">
            {date}
          </p>
        )}
        <h2 className={`font-hand text-lg md:text-xl text-text-main border-b border-primary/10 pb-2 ${fontFamily}`}>
          Dearest {recipient},
        </h2>
      </header>

      <div className="mb-6 md:mb-8">
        {typeof content === "string" ? (
          <p className={`text-lg md:text-xl text-text-main/90 leading-relaxed ink-bleed ${fontFamily}`}>
            {content}
          </p>
        ) : (
          content
        )}
      </div>

      <footer className="pt-4 border-t border-primary/10 mb-2">
        <p className={`text-lg text-text-main ${fontFamily}`}>Yours ever,</p>
        <p className={`text-xl md:text-2xl text-text-main mt-1 ink-bleed ${fontFamily}`}>
          {sender}
        </p>
      </footer>

    </>
  );
};
