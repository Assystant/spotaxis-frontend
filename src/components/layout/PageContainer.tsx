
import React from "react";
import { cn } from "@/lib/utils";
import { Header } from "./Header";

type PageContainerProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

export const PageContainer = ({
  children,
  title,
  className,
}: PageContainerProps) => {
  return (
    <div className="ml-64 min-h-screen flex flex-col">
      <Header title={title} />
      <main className={cn(
        "flex-1 p-6 animate-fade-in",
        className
      )}>
        {children}
      </main>
    </div>
  );
};
