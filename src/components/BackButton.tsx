"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PostmarkButton } from "./PostmarkButton";

interface BackButtonProps {
  href?: string;
  className?: string;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ href, className = "", label = "Back" }) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div className={className}>
      <PostmarkButton 
        label={label}
        onClick={href ? undefined : handleClick}
        href={href}
        variant="secondary"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        }
      />
    </div>
  );
};
