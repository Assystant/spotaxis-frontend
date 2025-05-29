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
  LogOut,
  CheckSquare,
  CalendarDays,
  Building2,
  DollarSign,
  Users,
  Star,
  FileSpreadsheet,
  Globe,
  FileText,
  Receipt,
  CreditCard
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";

type MainMenuItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  active: boolean;
  subItems?: Array<{icon: React.ElementType; label: string; path: string}>;
  onMouseEnter?: () => void;
};

const MainMenuItem = ({ icon: Icon, label, path, active, subItems, onMouseEnter }: MainMenuItemProps) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Link
        to={path}
        className={cn(
          "flex flex-col items-center justify-center p-2 rounded-md transition-colors cursor-pointer",
          active ? "bg-primary text-primary-foreground" : "hover:bg-accent",
          "w-16 h-16 sm:w-16 sm:h-16"
        )}
      >
        <Icon className="w-5 h-5 mb-1 sm:w-6 sm:h-6" strokeWidth={active ? 2.5 : 1.8} />
        <span className="text-xs text-center font-medium truncate w-full">
          {label}
        </span>
      </Link>
    );
  }
  
  return (
    <HoverCard openDelay={0} closeDelay={150}>
      <HoverCardTrigger asChild>
        <Link
          to={path}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-md transition-colors cursor-pointer",
            active ? "bg-primary text-primary-foreground" : "hover:bg-accent",
            "w-16 h-16 sm:w-16 sm:h-16"
          )}
          onMouseEnter={onMouseEnter}
        >
          <Icon className="w-5 h-5 mb-1 sm:w-6 sm:h-6" strokeWidth={active ? 2.5 : 1.8} />
          <span className="text-xs text-center font-medium truncate w-full">
            {label}
          </span>
        </Link>
      </HoverCardTrigger>
      {subItems && subItems.length > 0 && (
        <HoverCardContent 
          side="right" 
          align="start"
          className="w-56 p-2 border border-border bg-background shadow-lg rounded-md z-50"
        >
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-medium mb-1 px-2 text-muted-foreground">
              {label} Menu
            </p>
            {subItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors",
                  location.pathname === item.path && "bg-accent font-medium"
                )}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
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
      case "ats1":
        return currentPath.startsWith("/ats1");
      case "marketing":
        return currentPath.startsWith("/form-builders") || currentPath.startsWith("/job-board") || currentPath.startsWith("/website");
      case "finance":
        return currentPath.startsWith("/finance");
      case "admin":
        return currentPath.startsWith("/settings");
      default:
        return false;
    }
  };

  const dashboardSubItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: CalendarDays, label: "Calendar", path: "/calendar" }
  ];

  const crmSubItems = [
    { icon: Contact, label: "Contacts", path: "/contacts" },
    { icon: Building2, label: "Companies", path: "/companies" },
    { icon: DollarSign, label: "Deals", path: "/deals" }
  ];

  const atsSubItems = [
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
    { icon: Users, label: "Applicants", path: "/applicants" },
    { icon: Star, label: "Talent Pool", path: "/talent-pool" }
  ];

  const ats1SubItems = [
    { icon: Briefcase, label: "Jobs", path: "/ats1/jobs" },
    { icon: Users, label: "Applicants", path: "/ats1/applicants" },
    { icon: Star, label: "Talent Pool", path: "/ats1/talent-pool" }
  ];

  const marketingSubItems = [
    { icon: FileSpreadsheet, label: "Form Builders", path: "/form-builders" },
    { icon: Globe, label: "Job Board", path: "/job-board" },
  ];

  const financeSubItems = [
    { icon: Receipt, label: "Invoices", path: "/finance/invoices" },
    { icon: Wallet, label: "Expenses", path: "/finance/expenses" },
    { icon: CreditCard, label: "Transactions", path: "/finance/transactions" }
  ];

  const adminSubItems = [
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const mainMenuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
      section: "dashboard",
      subItems: dashboardSubItems
    },
    {
      icon: Contact,
      label: "CRM",
      path: "/contacts",
      section: "crm",
      subItems: crmSubItems
    },
    {
      icon: Briefcase,
      label: "ATS",
      path: "/jobs",
      section: "ats",
      subItems: atsSubItems
    },
    {
      icon: Briefcase,
      label: "ATS1",
      path: "/ats1/jobs",
      section: "ats1",
      subItems: ats1SubItems
    },
    {
      icon: ShoppingBag,
      label: "Marketing",
      path: "/job-board",
      section: "marketing",
      subItems: marketingSubItems
    },
    {
      icon: Wallet,
      label: "Finance",
      path: "/finance",
      section: "finance",
      subItems: financeSubItems
    },
    {
      icon: Settings,
      label: "Admin",
      path: "/settings",
      section: "admin",
      subItems: adminSubItems
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
            <MainMenuItem
              key={item.section}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={isActive(item.section)}
              subItems={item.subItems}
              onMouseEnter={() => setActiveSidebar(item.section)}
            />
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
