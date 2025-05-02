
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Contact,
  Briefcase,
  ShoppingBag,
  Wallet,
  Settings
} from "lucide-react";

type MainMenuItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  active: boolean;
};

const MainMenuItem = ({ icon: Icon, label, path, active }: MainMenuItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center justify-center w-16 h-16 p-2 rounded-md transition-colors",
        active ? "bg-primary text-primary-foreground" : "hover:bg-accent"
      )}
    >
      <Icon className="w-6 h-6 mb-1" strokeWidth={active ? 2.5 : 1.8} />
      <span className="text-xs text-center font-medium truncate w-full">
        {label}
      </span>
    </Link>
  );
};

export const MainMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    // Dashboard is active on '/' or '/dashboard'
    if (path === "/dashboard" && (currentPath === "/" || currentPath === "/dashboard")) {
      return true;
    }
    
    // For other paths, check if the currentPath starts with the path
    if (path !== "/dashboard") {
      const pathSegment = path.split('/')[1];
      return currentPath.startsWith(`/${pathSegment}`);
    }
    
    return false;
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
    <div className="flex flex-col items-center py-4 h-screen bg-background border-r border-border w-20">
      <div className="mb-6 p-2">
        <div className="bg-primary rounded-md p-1 w-10 h-10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 overflow-y-auto px-2 w-full">
        {mainMenuItems.map((item) => (
          <MainMenuItem
            key={item.section}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={isActive(item.path)}
          />
        ))}
      </div>
    </div>
  );
};
