
import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

type HeaderProps = {
  title: string;
  sidebarCollapsed?: boolean;
};

export const Header = ({ title, sidebarCollapsed = false }: HeaderProps) => {
  return (
    <header className="h-16 px-6 border-b border-border flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <h1 className={cn(
        "text-xl font-medium tracking-tight",
        "animate-slide-in-left"
      )}>
        {title}
      </h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
        
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer">
          <User size={16} />
        </div>
      </div>
    </header>
  );
};
