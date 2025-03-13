
import { PageContainer } from "@/components/layout/PageContainer";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldCustomization } from "@/components/settings/FieldCustomization";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SystemAudit } from "@/components/settings/SystemAudit";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("fields");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer title="System Settings">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">System Settings</h2>
        <p className="text-muted-foreground">Customize system behavior and configure global settings</p>
      </div>

      <Card className="p-4 mb-6 border-l-4 border-l-primary bg-primary/5">
        <div className="flex">
          <Settings className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium">System Customization</h3>
            <p className="text-sm text-muted-foreground">
              Changes made here will affect all users and system functionality.
            </p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="fields" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn("grid w-full md:w-auto md:inline-flex", 
          activeTab === "fields" ? "grid-cols-3" : activeTab === "notifications" ? "grid-cols-3" : "grid-cols-3")}>
          <TabsTrigger value="fields">Field Customization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="audit">System Audit</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fields" className="mt-6">
          <FieldCustomization />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="audit" className="mt-6">
          <SystemAudit />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SystemSettings;
