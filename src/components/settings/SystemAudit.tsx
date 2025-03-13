
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, DownloadCloud, Filter, Search, User, Info, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Mock data for audit logs
const generateAuditLogs = () => {
  const actions = ["login", "logout", "create", "update", "delete", "view", "export", "import"];
  const resources = ["user", "role", "job", "candidate", "contact", "company", "deal", "settings"];
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", avatar: "" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", avatar: "" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", avatar: "" },
  ];
  
  const logs = [];
  
  for (let i = 0; i < 50; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const resource = resources[Math.floor(Math.random() * resources.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    logs.push({
      id: i + 1,
      user,
      action,
      resource,
      resourceId: Math.floor(Math.random() * 1000),
      timestamp: date,
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    });
  }
  
  // Sort by timestamp (newest first)
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const auditLogs = generateAuditLogs();

export const SystemAudit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [actionFilter, setActionFilter] = useState("");
  const [resourceFilter, setResourceFilter] = useState("");
  
  const formattedDate = selectedDate ? format(selectedDate, "PPP") : "Select date";
  
  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "update":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "delete":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "login":
      case "logout":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const filteredLogs = auditLogs.filter(log => {
    // Search term filter
    const searchMatch = 
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date filter
    const dateMatch = selectedDate 
      ? log.timestamp.toDateString() === selectedDate.toDateString() 
      : true;
    
    // Action filter
    const actionMatch = actionFilter ? log.action === actionFilter : true;
    
    // Resource filter
    const resourceMatch = resourceFilter ? log.resource === resourceFilter : true;
    
    return searchMatch && dateMatch && actionMatch && resourceMatch;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formattedDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Actions</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="view">View</SelectItem>
              <SelectItem value="export">Export</SelectItem>
              <SelectItem value="import">Import</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={resourceFilter} onValueChange={setResourceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by resource" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Resources</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="role">Role</SelectItem>
              <SelectItem value="job">Job</SelectItem>
              <SelectItem value="candidate">Candidate</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="deal">Deal</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" onClick={() => {
            setSearchTerm("");
            setSelectedDate(undefined);
            setActionFilter("");
            setResourceFilter("");
          }}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
          <Button size="sm">
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.slice(0, 10).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={log.user.avatar} alt={log.user.name} />
                        <AvatarFallback>
                          <User className="h-3.5 w-3.5" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{log.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getActionColor(log.action)} variant="outline">
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{log.resource} #{log.resourceId}</span>
                  </TableCell>
                  <TableCell>
                    {format(log.timestamp, "MMM d, yyyy 'at' h:mm a")}
                  </TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
