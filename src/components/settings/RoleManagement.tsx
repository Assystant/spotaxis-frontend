
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Plus, Trash2, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock data for roles
const initialRoles = [
  { id: 1, name: "Administrator", description: "Full access to all system features", isSystem: true },
  { id: 2, name: "Manager", description: "Access to manage teams and view reports", isSystem: true },
  { id: 3, name: "Recruiter", description: "Access to job postings and candidates", isSystem: false },
  { id: 4, name: "Sales Representative", description: "Access to deals and contacts", isSystem: false },
];

export const RoleManagement = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState({ name: "", description: "", isSystem: false });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);

  const handleAddRole = () => {
    if (newRole.name.trim() === "") return;
    
    if (editingRoleId) {
      setRoles(roles.map(role => role.id === editingRoleId ? { ...newRole, id: editingRoleId } : role));
    } else {
      setRoles([...roles, { ...newRole, id: Date.now() }]);
    }
    
    setNewRole({ name: "", description: "", isSystem: false });
    setEditingRoleId(null);
    setIsDialogOpen(false);
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleEditRole = (role: typeof roles[0]) => {
    setNewRole({ name: role.name, description: role.description, isSystem: role.isSystem });
    setEditingRoleId(role.id);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Roles</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus size={16} />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRoleId ? "Edit Role" : "Add New Role"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Enter role name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="roleDescription">Description</Label>
                <Input
                  id="roleDescription"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Enter role description"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isSystem"
                  checked={newRole.isSystem}
                  onCheckedChange={(checked) => setNewRole({ ...newRole, isSystem: checked })}
                />
                <Label htmlFor="isSystem">System Role</Label>
              </div>
            </div>
            <Button onClick={handleAddRole}>{editingRoleId ? "Update Role" : "Add Role"}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    {role.isSystem ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        <Shield className="h-3 w-3 mr-1" />
                        System
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        Custom
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditRole(role)}
                      className="h-8 w-8 p-0 mr-1"
                    >
                      <Pencil size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      disabled={role.isSystem}
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
