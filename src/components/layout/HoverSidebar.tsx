import React, { useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { useSidebar } from "@/components/ui/sidebar";

export function HoverSidebar() {
  const [showHoverSidebar, setShowHoverSidebar] = useState(false);
  const { state } = useSidebar();

  useEffect(() => {
    if (state !== "collapsed") {
      setShowHoverSidebar(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Don't show hover sidebar if mouse is over the expand button area (top-left 60x60px)
      if (e.clientX <= 60 && e.clientY <= 60) {
        setShowHoverSidebar(false);
        return;
      }
      
      // Show hover sidebar if mouse is within 10px of left edge
      if (e.clientX <= 10) {
        setShowHoverSidebar(true);
      }
      // Hide hover sidebar if mouse moves away from sidebar area
      else if (e.clientX > 280) { // Sidebar width + some margin
        setShowHoverSidebar(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [state]);

  if (state !== "collapsed" || !showHoverSidebar) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 z-40 h-full"
      onMouseLeave={() => setShowHoverSidebar(false)}
    >
      <div className="bg-background/95 backdrop-blur-sm border-r shadow-lg">
        <AppSidebar />
      </div>
    </div>
  );
}