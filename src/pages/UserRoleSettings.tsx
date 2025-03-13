
import { PageContainer } from "@/components/layout/PageContainer";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleManagement } from "@/components/settings/RoleManagement";
import { PermissionManagement } from "@/components/settings/PermissionManagement";
import { UserAssignment } from "@/components/settings/UserAssignment";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const UserRoleSettings = () => {
  const [activeTab, setActiveTab] = useState("roles");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer title="User Roles & Permissions">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">User Roles & Permissions</h2>
        <p className="text-muted-foreground">Manage user roles, permissions, and assignments</p>
      </div>

      <Card className="p-4 mb-6 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950/10">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Administrator Access Required</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Changes to user roles and permissions affect system-wide access. Please ensure you have proper authorization.
            </p>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn("grid w-full md:w-auto md:inline-flex", 
          activeTab === "roles" ? "grid-cols-3" : activeTab === "permissions" ? "grid-cols-3" : "grid-cols-3")}>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="users">User Assignment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="mt-6">
          <RoleManagement />
        </TabsContent>
        
        <TabsContent value="permissions" className="mt-6">
          <PermissionManagement />
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <UserAssignment />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default UserRoleSettings;
