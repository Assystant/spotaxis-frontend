
import React from "react";
import { cn } from "@/lib/utils";
import { Header } from "./Header";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
  actionButton?: React.ReactNode;
  description?: string;
};

export const PageContainer = ({
  children,
  title,
  className,
  actionButton,
  description,
}: PageContainerProps) => {
  return (
    <div className="flex flex-col h-full overflow-x-hidden">
      <Header 
        title={title} 
        description={description} 
        actionButton={actionButton} 
      />
      <main className={cn(
        "flex-1 p-4 md:p-6 animate-fade-in overflow-x-hidden",
        className
      )}>
        {children}
      </main>
    </div>
  );
};
