
import { Outlet } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <PageContainer title="Settings">
      <div className="flex h-[calc(100vh-140px)]">
        <SettingsSidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </PageContainer>
  );
};

// Default content when no settings sub-route is selected
export const SettingsDefault = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="p-6 text-center max-w-md">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <SettingsIcon className="text-primary" size={24} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Settings</h2>
        <p className="text-muted-foreground">
          Configure your application settings, customize workflows, and manage your account preferences.
          Select an option from the sidebar to begin.
        </p>
      </Card>
    </div>
  );
};

export default Settings;
