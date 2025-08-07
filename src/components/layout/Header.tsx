
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

type HeaderProps = {
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
};

export const Header = ({ 
  title, 
  description, 
  actionButton,
}: HeaderProps) => {
  return (
    <header className="h-16 px-4 md:px-6 border-b border-border flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="animate-slide-in-left flex flex-col justify-center">
          <h1 className="text-lg md:text-xl font-medium tracking-tight truncate max-w-[200px] sm:max-w-none">
            {title}
          </h1>
          {description && (
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {actionButton && (
          <div className="mr-1 md:mr-2">
            {actionButton}
          </div>
        )}
        
        <div className="relative">
          <button className="p-1.5 md:p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
