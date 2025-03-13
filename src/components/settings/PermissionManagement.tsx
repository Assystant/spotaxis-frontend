
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data for modules and permissions
const modules = [
  {
    id: "crm",
    name: "CRM",
    resources: [
      { id: "contacts", name: "Contacts" },
      { id: "companies", name: "Companies" },
      { id: "deals", name: "Deals" }
    ]
  },
  {
    id: "ats",
    name: "ATS",
    resources: [
      { id: "jobs", name: "Jobs" },
      { id: "candidates", name: "Candidates" },
      { id: "applications", name: "Applications" }
    ]
  },
  {
    id: "admin",
    name: "Admin",
    resources: [
      { id: "users", name: "Users" },
      { id: "roles", name: "Roles" },
      { id: "settings", name: "Settings" }
    ]
  }
];

const actions = ["view", "create", "edit", "delete"];

// Mock roles
const roles = [
  { id: 1, name: "Administrator" },
  { id: 2, name: "Manager" },
  { id: 3, name: "Recruiter" },
  { id: 4, name: "Sales Representative" }
];

export const PermissionManagement = () => {
  const [selectedRole, setSelectedRole] = useState<string>("1");
  const [selectedModule, setSelectedModule] = useState("crm");
  // Initialize permissions state with some sample data
  const [permissions, setPermissions] = useState<Record<string, Record<string, string[]>>>({
    1: { // Admin role
      contacts: ["view", "create", "edit", "delete"],
      companies: ["view", "create", "edit", "delete"],
      deals: ["view", "create", "edit", "delete"],
      jobs: ["view", "create", "edit", "delete"],
      candidates: ["view", "create", "edit", "delete"],
      applications: ["view", "create", "edit", "delete"],
      users: ["view", "create", "edit", "delete"],
      roles: ["view", "create", "edit", "delete"],
      settings: ["view", "create", "edit", "delete"]
    },
    2: { // Manager role
      contacts: ["view", "create", "edit"],
      companies: ["view", "create", "edit"],
      deals: ["view", "create", "edit"],
      jobs: ["view", "create", "edit"],
      candidates: ["view", "create", "edit"],
      applications: ["view", "create", "edit"],
      users: ["view"],
      roles: ["view"],
      settings: ["view"]
    },
    3: { // Recruiter role
      contacts: ["view"],
      companies: ["view"],
      deals: [],
      jobs: ["view", "create", "edit"],
      candidates: ["view", "create", "edit"],
      applications: ["view", "create", "edit"],
      users: [],
      roles: [],
      settings: []
    },
    4: { // Sales Rep role
      contacts: ["view", "create", "edit"],
      companies: ["view", "create", "edit"],
      deals: ["view", "create", "edit"],
      jobs: ["view"],
      candidates: [],
      applications: [],
      users: [],
      roles: [],
      settings: []
    }
  });

  const togglePermission = (resource: string, action: string) => {
    const roleId = selectedRole;
    const rolePermissions = permissions[roleId] || {};
    const resourcePermissions = rolePermissions[resource] || [];
    
    const updatedPermissions = { ...permissions };
    
    if (resourcePermissions.includes(action)) {
      updatedPermissions[roleId] = {
        ...rolePermissions,
        [resource]: resourcePermissions.filter(a => a !== action)
      };
    } else {
      updatedPermissions[roleId] = {
        ...rolePermissions,
        [resource]: [...resourcePermissions, action]
      };
    }
    
    setPermissions(updatedPermissions);
  };

  const isChecked = (resource: string, action: string) => {
    const roleId = selectedRole;
    return permissions[roleId]?.[resource]?.includes(action) || false;
  };

  const currentModule = modules.find(m => m.id === selectedModule);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="space-y-2 flex-1">
          <label className="text-sm font-medium">Select Role</label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-auto">
          <Button className="w-full md:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save Permissions
          </Button>
        </div>
      </div>

      <Tabs value={selectedModule} onValueChange={setSelectedModule} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto md:inline-flex">
          {modules.map(module => (
            <TabsTrigger key={module.id} value={module.id}>
              {module.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {modules.map(module => (
          <TabsContent key={module.id} value={module.id} className="mt-6">
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      {actions.map(action => (
                        <TableHead key={action} className="text-center">
                          <div className="flex items-center justify-center capitalize">
                            {action}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="capitalize">Permission to {action} {module.name} records</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {module.resources.map(resource => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.name}</TableCell>
                        {actions.map(action => (
                          <TableCell key={action} className="text-center">
                            <Checkbox
                              checked={isChecked(resource.id, action)}
                              onCheckedChange={() => togglePermission(resource.id, action)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
