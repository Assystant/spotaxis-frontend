
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { MainMenu } from "./MainMenu";
import { Sidebar } from "./Sidebar";

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
  const [activeSidebar, setActiveSidebar] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainMenu setActiveSidebar={setActiveSidebar} />
      
      <div className="transition-all duration-300 pl-20 lg:pl-20 min-h-screen">
        <Sidebar activeSidebar={activeSidebar} />
        <Header 
          title={title} 
          description={description} 
          actionButton={actionButton} 
        />
        <main className={cn(
          "flex-1 p-4 md:p-6 animate-fade-in",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};
