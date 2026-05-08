"use client";

import React from "react";
import { motion } from "framer-motion";

interface TactileSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "paper" | "dark" | "transparent";
  rounded?: boolean;
}

export const TactileSkeleton = ({
  width = "100%",
  height = "1rem",
  className = "",
  variant = "paper",
  rounded = false,
}: TactileSkeletonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "dark":
        return "bg-text-main/10 border-text-main/5";
      case "transparent":
        return "bg-white/5 border-white/10";
      default:
        return "bg-background-paper/60 border-muted/10";
    }
  };

  return (
    <div
      className={`relative overflow-hidden border ${getVariantStyles()} ${rounded ? 'rounded-full' : 'rounded-sm'} ${className}`}
      style={{ width, height }}
    >
      {/* Tactile Shimmer Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"
      />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 noise-bg opacity-10 pointer-events-none" />
    </div>
  );
};

export const LetterSkeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex flex-col gap-2 p-6 bg-background-paper/40 border border-muted/20 shadow-hard-sm rounded-sm aspect-[1.8/1] w-full ${className}`}>
      {/* Stamp area */}
      <div className="absolute top-4 right-4">
        <TactileSkeleton width={40} height={50} variant="paper" />
      </div>

      {/* Recipient */}
      <div className="flex flex-col gap-2 mt-2 pr-12">
        <TactileSkeleton width="40%" height="0.6rem" variant="dark" />
        <TactileSkeleton width="70%" height="1rem" variant="dark" />
      </div>

      {/* Footer / From */}
      <div className="flex flex-col gap-1 mt-auto">
        <TactileSkeleton width="30%" height="0.5rem" opacity-30 />
        <TactileSkeleton width="40%" height="0.75rem" variant="dark" />
      </div>
      
      <div className="absolute inset-0 noise-bg opacity-[0.02] pointer-events-none" />
    </div>
  );
};

interface SkeletonWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  className?: string;
}

/**
 * A wrapper that shows a skeleton matching the dimensions 
 * of its children or a provided skeleton component.
 */
export const TactileSkeletonWrapper = ({
  isLoading,
  children,
  skeleton,
  width,
  height,
  className = "",
}: SkeletonWrapperProps) => {
  if (!isLoading) return <>{children}</>;

  if (skeleton) return <>{skeleton}</>;

  return (
    <TactileSkeleton 
      width={width || "100%"} 
      height={height || "100%"} 
      className={className} 
    />
  );
};

