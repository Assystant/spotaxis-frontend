
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Star,
  Contact,
  Building2,
  DollarSign,
  FileSpreadsheet,
  Settings,
  Globe,
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Bell
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  isCollapsed: boolean;
};

const SidebarItem = ({ icon: Icon, label, path, isCollapsed }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={cn(
        "sidebar-item group relative",
        isActive && "active"
      )}
    >
      <Icon className="sidebar-item-icon flex-shrink-0" />
      <span className={cn(
        "transition-all duration-300",
        isCollapsed ? "opacity-0 absolute w-0 overflow-hidden" : "opacity-100"
      )}>
        {label}
      </span>
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover rounded-md text-popover-foreground text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          {label}
        </div>
      )}
    </Link>
  );
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
    { icon: Users, label: "Applicants", path: "/applicants" },
    { icon: Star, label: "Talent Pool", path: "/talent-pool" },
    { icon: Contact, label: "Contacts", path: "/contacts" },
    { icon: Building2, label: "Companies", path: "/companies" },
    { icon: DollarSign, label: "Deals", path: "/deals" },
    { icon: FileSpreadsheet, label: "Form Builders", path: "/form-builders" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Globe, label: "Career Site", path: "/career-site" }
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar fixed top-0 left-0 z-40 border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <div className={cn(
            "flex items-center gap-3 transition-all duration-300",
            collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}>
            <div className="bg-primary rounded-md p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="font-semibold text-lg tracking-tight">RecruiTrak</h1>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-2 rounded-md hover:bg-sidebar-accent transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {/* Sidebar Search */}
        <div className={cn(
          "px-4 pt-4 pb-2",
          collapsed && "hidden"
        )}>
          <div className="flex items-center px-3 py-2 rounded-md bg-sidebar-accent/50 text-sidebar-foreground/60">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isCollapsed={collapsed}
              />
            ))}
          </div>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User size={16} />
            </div>
            <div className={cn(
              "transition-all duration-300 flex-1 min-w-0",
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}>
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
