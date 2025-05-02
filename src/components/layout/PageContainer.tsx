
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
    <div className="min-h-screen flex flex-col transition-all duration-300 
      pl-20 lg:pl-20">
      <Header title={title} description={description} actionButton={actionButton} />
      <main className={cn(
        "flex-1 p-4 md:p-6 animate-fade-in",
        className
      )}>
        {children}
      </main>
    </div>
  );
};
