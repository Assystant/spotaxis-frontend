import React from "react";
import { cn } from "@/lib/utils";

interface TwoPanelDetailLayoutProps {
  children: React.ReactNode;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  className?: string;
}

export const TwoPanelDetailLayout = ({
  children,
  leftPanel,
  rightPanel,
  className
}: TwoPanelDetailLayoutProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header/Navigation section */}
      {children}
      
      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Left Panel - Main Details (70% on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {leftPanel}
        </div>
        
        {/* Right Panel - Association Tiles (30% on desktop) */}
        <div className="lg:col-span-3 space-y-4">
          {rightPanel}
        </div>
      </div>
    </div>
  );
};