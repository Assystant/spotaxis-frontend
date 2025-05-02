
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Contact,
  Briefcase,
  ShoppingBag,
  Wallet,
  Settings,
  User,
  LogOut
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MainMenuItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  active: boolean;
  onMouseEnter: () => void;
};

const MainMenuItem = ({ icon: Icon, label, path, active, onMouseEnter }: MainMenuItemProps) => {
  return (
    <Link
      to={path}
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-md transition-colors cursor-pointer",
        active ? "bg-primary text-primary-foreground" : "hover:bg-accent",
        "w-16 h-16 sm:w-16 sm:h-16" // Responsive sizes
      )}
    >
      <Icon className="w-5 h-5 mb-1 sm:w-6 sm:h-6" strokeWidth={active ? 2.5 : 1.8} />
      <span className="text-xs text-center font-medium truncate w-full">
        {label}
      </span>
    </Link>
  );
};

export const MainMenu = ({ setActiveSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (section: string) => {
    switch(section) {
      case "dashboard":
        return currentPath === "/" || currentPath === "/dashboard";
      case "crm":
        return currentPath.startsWith("/contacts") || currentPath.startsWith("/companies") || currentPath.startsWith("/deals");
      case "ats":
        return currentPath.startsWith("/jobs") || currentPath.startsWith("/applicants") || currentPath.startsWith("/talent-pool");
      case "marketing":
        return currentPath.startsWith("/form-builders") || currentPath.startsWith("/career-site");
      case "finance":
        return currentPath.startsWith("/finance");
      case "admin":
        return currentPath.startsWith("/settings");
      default:
        return false;
    }
  };

  const mainMenuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
      section: "dashboard"
    },
    {
      icon: Contact,
      label: "CRM",
      path: "/contacts",
      section: "crm"
    },
    {
      icon: Briefcase,
      label: "ATS",
      path: "/jobs",
      section: "ats"
    },
    {
      icon: ShoppingBag,
      label: "Marketing",
      path: "/form-builders",
      section: "marketing"
    },
    {
      icon: Wallet,
      label: "Finance",
      path: "/finance",
      section: "finance"
    },
    {
      icon: Settings,
      label: "Admin",
      path: "/settings",
      section: "admin"
    }
  ];

  return (
    <div className="fixed top-0 left-0 z-40 flex flex-col items-center justify-between py-4 h-screen bg-background border-r border-border w-20">
      <div className="flex flex-col items-center">
        <div className="mb-6 p-2">
          <div className="bg-primary rounded-md p-1 w-10 h-10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 md:space-y-4 overflow-y-auto px-2 w-full">
          {mainMenuItems.map((item) => (
            <Popover key={item.section}>
              <PopoverTrigger asChild>
                <div>
                  <MainMenuItem
                    icon={item.icon}
                    label={item.label}
                    path={item.path}
                    active={isActive(item.section)}
                    onMouseEnter={() => setActiveSidebar(item.section)}
                  />
                </div>
              </PopoverTrigger>
            </Popover>
          ))}
        </div>
      </div>
      
      {/* User Profile at bottom */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-col items-center cursor-pointer hover:bg-accent rounded-md p-2 mb-2">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-1">
              <User size={18} />
            </div>
            <span className="text-xs font-medium">Account</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
