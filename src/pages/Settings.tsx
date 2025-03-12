
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <PageContainer title="Settings">
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <SettingsIcon className="text-primary" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-muted-foreground">
            Configure your application settings, customize workflows, and manage your account preferences.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Settings;
