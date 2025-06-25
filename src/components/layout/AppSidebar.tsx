
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Receipt,
  CreditCard,
  Search,
  ChevronDown,
  ChevronRight,
  Shield,
  Mail,
  Bell,
  Kanban,
  Workflow,
  UserCog,
  Sliders,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigationGroups = [
  {
    id: "dashboard",
    label: "Dashboard",
    items: [
      { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
      { icon: CheckSquare, label: "Tasks", path: "/tasks" },
      { icon: CalendarDays, label: "Calendar", path: "/calendar" },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    items: [
      { icon: Contact, label: "Contacts", path: "/contacts" },
      { icon: Building2, label: "Companies", path: "/companies" },
      { icon: DollarSign, label: "Deals", path: "/deals" },
    ],
  },
  {
    id: "ats",
    label: "ATS",
    items: [
      { icon: Briefcase, label: "Jobs", path: "/jobs" },
      { icon: Users, label: "Applicants", path: "/applicants" },
      { icon: Star, label: "Talent Pool", path: "/talent-pool" },
    ],
  },
  {
    id: "ats1",
    label: "ATS1",
    items: [
      { icon: Briefcase, label: "Jobs", path: "/ats1/jobs" },
      { icon: Users, label: "Applicants", path: "/ats1/applicants" },
      { icon: Star, label: "Talent Pool", path: "/ats1/talent-pool" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      { icon: FileSpreadsheet, label: "Form Builders", path: "/form-builders" },
      { icon: Globe, label: "Job Board", path: "/job-board" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    items: [
      { icon: Receipt, label: "Invoices", path: "/finance/invoices" },
      { icon: Wallet, label: "Expenses", path: "/finance/expenses" },
      { icon: CreditCard, label: "Transactions", path: "/finance/transactions" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      { icon: User, label: "Profile", path: "/settings/profile" },
      { icon: Shield, label: "Security", path: "/settings/security" },
      { icon: Mail, label: "Notifications", path: "/settings/notifications" },
      { icon: Bell, label: "Email Templates", path: "/settings/email-templates" },
      { icon: Globe, label: "Career Site", path: "/settings/career-site" },
      { icon: CreditCard, label: "Billing", path: "/settings/billing" },
      { icon: Kanban, label: "Pipeline Manager", path: "/settings/pipeline" },
      { icon: Workflow, label: "Workflow", path: "/settings/workflow" },
      { icon: UserCog, label: "User Roles", path: "/settings/user-roles" },
      { icon: Sliders, label: "System Settings", path: "/settings/system" },
    ],
  },
];

// Helper function to get/set localStorage state
const getStoredGroupState = (groupId: string): boolean => {
  const stored = localStorage.getItem(`sidebar-group-${groupId}`);
  return stored ? JSON.parse(stored) : true; // Default to expanded
};

const setStoredGroupState = (groupId: string, isOpen: boolean) => {
  localStorage.setItem(`sidebar-group-${groupId}`, JSON.stringify(isOpen));
};

export function AppSidebar() {
  const location = useLocation();
  
  // Initialize collapse states from localStorage
  const [groupStates, setGroupStates] = useState<Record<string, boolean>>(() => {
    const initialStates: Record<string, boolean> = {};
    navigationGroups.forEach(group => {
      initialStates[group.id] = getStoredGroupState(group.id);
    });
    return initialStates;
  });

  const toggleGroup = (groupId: string) => {
    const newState = !groupStates[groupId];
    setGroupStates(prev => ({ ...prev, [groupId]: newState }));
    setStoredGroupState(groupId, newState);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div className="bg-primary rounded-md p-1 w-8 h-8 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-lg">ATS</span>
        </div>
        <div className="px-2">
          <SidebarInput
            placeholder="Search..."
            className="h-8"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationGroups.map((group) => {
          const isExpanded = groupStates[group.id];
          const hasActiveItem = group.items.some(item => 
            location.pathname === item.path || 
            (item.path === '/settings' && location.pathname.startsWith('/settings'))
          );

          return (
            <SidebarGroup key={group.id}>
              <Collapsible open={isExpanded} onOpenChange={() => toggleGroup(group.id)}>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="group/label w-full flex items-center justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md px-2 py-1 cursor-pointer">
                    <span>{group.label}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 transition-transform" />
                    ) : (
                      <ChevronRight className="h-4 w-4 transition-transform" />
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => {
                        const isActive = location.pathname === item.path;
                        
                        return (
                          <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton asChild isActive={isActive}>
                              <Link to={item.path}>
                                <item.icon />
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
