
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Settings,
  User,
  Shield,
  Mail,
  Bell,
  Globe,
  CreditCard,
  Kanban,
  Workflow,
  UserCog,
  Sliders
} from "lucide-react";

const navItems = [
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
];

export const SettingsSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 border-r h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="font-semibold text-xl flex items-center gap-2">
          <Settings size={20} />
          Settings
        </h2>
      </div>
      <nav className="mt-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
