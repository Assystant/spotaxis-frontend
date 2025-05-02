
import React, { useState, useEffect } from "react";
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
  Bell,
  FileText,
  CreditCard,
  Wallet,
  Receipt,
  CheckSquare,
  CalendarDays,
  Menu
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

export const Sidebar = ({ activeSidebar = "dashboard" }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close sidebar on mobile when changing routes
  const location = useLocation();
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location, isMobile]);
  
  const dashboardNavItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: CalendarDays, label: "Calendar", path: "/calendar" }
  ];

  const crmNavItems = [
    { icon: Contact, label: "Contacts", path: "/contacts" },
    { icon: Building2, label: "Companies", path: "/companies" },
    { icon: DollarSign, label: "Deals", path: "/deals" }
  ];

  const atsNavItems = [
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
    { icon: Users, label: "Applicants", path: "/applicants" },
    { icon: Star, label: "Talent Pool", path: "/talent-pool" }
  ];

  const marketingNavItems = [
    { icon: FileSpreadsheet, label: "Form Builders", path: "/form-builders" },
    { icon: Globe, label: "Career Site", path: "/career-site" },
    { icon: FileText, label: "Website", path: "/website" }
  ];

  const financeNavItems = [
    { icon: Receipt, label: "Invoices", path: "/finance/invoices" },
    { icon: Wallet, label: "Expenses", path: "/finance/expenses" },
    { icon: CreditCard, label: "Transactions", path: "/finance/transactions" }
  ];

  const adminNavItems = [
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const getNavItemsForSection = () => {
    switch(activeSidebar) {
      case "dashboard": return dashboardNavItems;
      case "crm": return crmNavItems;
      case "ats": return atsNavItems;
      case "marketing": return marketingNavItems;
      case "finance": return financeNavItems;
      case "admin": return adminNavItems;
      default: return dashboardNavItems;
    }
  };

  const getSectionTitle = () => {
    switch(activeSidebar) {
      case "dashboard": return "Dashboard";
      case "crm": return "CRM";
      case "ats": return "ATS";
      case "marketing": return "Marketing";
      case "finance": return "Finance";
      case "admin": return "Admin";
      default: return "Dashboard";
    }
  };

  const navItems = getNavItemsForSection();
  
  // Mobile sidebar overlay
  const MobileSidebarOverlay = () => {
    if (!isMobile || !mobileOpen) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black/50 z-20" 
        onClick={() => setMobileOpen(false)}
      />
    );
  };

  return (
    <>
      <MobileSidebarOverlay />
      
      {/* Mobile menu trigger */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed top-4 left-24 z-30 p-2 rounded-md bg-background/90 shadow-sm border"
          aria-label="Toggle sidebar menu"
        >
          <Menu size={18} />
        </button>
      )}
      
      <aside
        className={cn(
          "h-screen bg-sidebar fixed top-0 left-20 z-30 transition-all duration-300 ease-in-out hidden group-hover:block",
          collapsed ? "w-0" : "w-64",
          isMobile && (mobileOpen ? "block translate-x-0" : "-translate-x-full")
        )}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <div className="flex flex-col h-full border-r border-sidebar-border">
          {/* Sidebar Header */}
          <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
            <div className={cn(
              "flex items-center gap-3 transition-all duration-300",
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            )}>
              <h1 className="font-semibold text-lg tracking-tight">{getSectionTitle()}</h1>
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "ml-auto p-2 rounded-md hover:bg-sidebar-accent transition-colors",
                isMobile && "hidden" // Hide collapse button on mobile
              )}
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
        </div>
      </aside>
    </>
  );
};
