
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Filter, Save, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for users
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Administrator", avatar: "" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Manager", avatar: "" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Recruiter", avatar: "" },
  { id: 4, name: "Alice Williams", email: "alice.williams@example.com", role: "Sales Representative", avatar: "" },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", role: "Manager", avatar: "" },
  { id: 6, name: "Diana Prince", email: "diana.prince@example.com", role: "Recruiter", avatar: "" },
];

// Mock roles
const roles = [
  { id: 1, name: "Administrator" },
  { id: 2, name: "Manager" },
  { id: 3, name: "Recruiter" },
  { id: 4, name: "Sales Representative" }
];

export const UserAssignment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoles, setUserRoles] = useState<Record<number, string>>(
    Object.fromEntries(users.map(user => [user.id, user.role]))
  );
  
  const handleRoleChange = (userId: number, role: string) => {
    setUserRoles({
      ...userRoles,
      [userId]: role
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Assign Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{userRoles[user.id]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={userRoles[user.id]} 
                      onValueChange={(value) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role.id} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
