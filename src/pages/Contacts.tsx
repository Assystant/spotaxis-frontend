import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download, Upload, Search, MoreHorizontal, Mail, Phone, MapPin, Check, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

// Mock data for contacts
const mockContacts = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 555-123-4567",
    company: "Acme Inc.",
    position: "Software Developer",
    type: "Candidate",
    location: "New York, USA",
    tags: ["Developer", "React"],
    lastContact: "2023-05-10"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 555-234-5678",
    company: "TechCorp",
    position: "HR Manager",
    type: "Client",
    location: "San Francisco, USA",
    tags: ["HR", "Hiring Manager"],
    lastContact: "2023-05-15"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "+1 555-345-6789",
    company: "Global Solutions",
    position: "CTO",
    type: "Client",
    location: "Boston, USA",
    tags: ["Executive", "Tech"],
    lastContact: "2023-05-12"
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "+1 555-456-7890",
    company: "Startup Hub",
    position: "UX Designer",
    type: "Candidate",
    location: "Austin, USA",
    tags: ["Design", "UX/UI"],
    lastContact: "2023-05-08"
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 555-567-8901",
    company: "Enterprise Ltd.",
    position: "Sales Director",
    type: "Partner",
    location: "Chicago, USA",
    tags: ["Sales", "Management"],
    lastContact: "2023-05-14"
  }
];

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const filteredContacts = mockContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const isAllSelected = filteredContacts.length > 0 && filteredContacts.every(
    contact => selectedContacts.includes(contact.id)
  );

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  return (
    <PageContainer 
      title="Contacts" 
      description="Manage your professional contacts and relationships"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </div>
      </div>

      <Card className="border shadow-sm">
        <Tabs defaultValue="list">
          <div className="border-b px-4">
            <TabsList className="ml-1 my-1">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="list" className="p-0">
            <div className="rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-5 w-5"
                          onClick={toggleSelectAll}
                        >
                          {isAllSelected ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <div className="h-4 w-4 rounded border border-muted-foreground/30" />
                          )}
                        </Button>
                      </div>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-5 w-5"
                          onClick={() => toggleContactSelection(contact.id)}
                        >
                          {selectedContacts.includes(contact.id) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <div className="h-4 w-4 rounded border border-muted-foreground/30" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary font-medium">
                              {contact.name.charAt(0)}
                            </div>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-xs text-muted-foreground">{contact.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>
                        <Badge variant={
                          contact.type === 'Candidate' ? 'default' :
                          contact.type === 'Client' ? 'secondary' : 'outline'
                        }>
                          {contact.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="bg-muted">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                            <DropdownMenuItem>Send Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete Contact
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="grid">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContacts.map((contact) => (
                  <Card key={contact.id} className="border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <Avatar className="h-12 w-12">
                          <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary font-medium text-lg">
                            {contact.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div>
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <Badge variant={
                            contact.type === 'Candidate' ? 'default' :
                            contact.type === 'Client' ? 'secondary' : 'outline'
                          }>
                            {contact.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.position} at {contact.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.location}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {contact.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="bg-muted">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="border-t flex">
                      <Button variant="ghost" className="flex-1 rounded-none h-10" asChild>
                        <a href={`/contacts/${contact.id}`}>View Details</a>
                      </Button>
                      <div className="border-l h-10" />
                      <Button variant="ghost" className="flex-1 rounded-none h-10">
                        Send Email
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Contacts;
