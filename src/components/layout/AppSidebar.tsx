
import React from "react";
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
    label: "Dashboard",
    items: [
      { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
      { icon: CheckSquare, label: "Tasks", path: "/tasks" },
      { icon: CalendarDays, label: "Calendar", path: "/calendar" },
    ],
  },
  {
    label: "CRM",
    items: [
      { icon: Contact, label: "Contacts", path: "/contacts" },
      { icon: Building2, label: "Companies", path: "/companies" },
      { icon: DollarSign, label: "Deals", path: "/deals" },
    ],
  },
  {
    label: "ATS",
    items: [
      { icon: Briefcase, label: "Jobs", path: "/jobs" },
      { icon: Users, label: "Applicants", path: "/applicants" },
      { icon: Star, label: "Talent Pool", path: "/talent-pool" },
    ],
  },
  {
    label: "ATS1",
    items: [
      { icon: Briefcase, label: "Jobs", path: "/ats1/jobs" },
      { icon: Users, label: "Applicants", path: "/ats1/applicants" },
      { icon: Star, label: "Talent Pool", path: "/ats1/talent-pool" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { icon: FileSpreadsheet, label: "Form Builders", path: "/form-builders" },
      { icon: Globe, label: "Job Board", path: "/job-board" },
    ],
  },
  {
    label: "Finance",
    items: [
      { icon: Receipt, label: "Invoices", path: "/finance/invoices" },
      { icon: Wallet, label: "Expenses", path: "/finance/expenses" },
      { icon: CreditCard, label: "Transactions", path: "/finance/transactions" },
    ],
  },
  {
    label: "Settings",
    items: [
      { icon: Settings, label: "Settings", path: "/settings" },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();

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
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path || 
                    (item.path === '/settings' && location.pathname.startsWith('/settings'));
                  
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={item.path}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.path === '/settings' && location.pathname.startsWith('/settings') && (
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={location.pathname === '/settings/pipeline'}>
                              <Link to="/settings/pipeline">Pipeline Manager</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={location.pathname === '/settings/workflow'}>
                              <Link to="/settings/workflow">Workflow</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={location.pathname === '/settings/user-roles'}>
                              <Link to="/settings/user-roles">User Roles</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={location.pathname === '/settings/system'}>
                              <Link to="/settings/system">System Settings</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
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
