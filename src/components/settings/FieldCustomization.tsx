
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Pencil, Plus, Trash2, GripVertical } from "lucide-react";

// Field types
const fieldTypes = [
  { id: "text", name: "Text" },
  { id: "textarea", name: "Text Area" },
  { id: "select", name: "Dropdown" },
  { id: "number", name: "Number" },
  { id: "date", name: "Date" },
  { id: "checkbox", name: "Checkbox" },
  { id: "email", name: "Email" }
];

// Mock data for modules
const modules = [
  { id: "contact", name: "Contact" },
  { id: "company", name: "Company" },
  { id: "job", name: "Job" },
  { id: "candidate", name: "Candidate" },
  { id: "deal", name: "Deal" }
];

// Mock fields
const initialFields = {
  contact: [
    { id: 1, label: "First Name", type: "text", required: true, active: true, isSystem: true },
    { id: 2, label: "Last Name", type: "text", required: true, active: true, isSystem: true },
    { id: 3, label: "Email", type: "email", required: true, active: true, isSystem: true },
    { id: 4, label: "Phone", type: "text", required: false, active: true, isSystem: true },
    { id: 5, label: "Source", type: "select", required: false, active: true, isSystem: false },
  ],
  company: [
    { id: 1, label: "Company Name", type: "text", required: true, active: true, isSystem: true },
    { id: 2, label: "Industry", type: "select", required: false, active: true, isSystem: true },
    { id: 3, label: "Website", type: "text", required: false, active: true, isSystem: true },
    { id: 4, label: "Employee Count", type: "number", required: false, active: true, isSystem: false },
  ],
  job: [
    { id: 1, label: "Job Title", type: "text", required: true, active: true, isSystem: true },
    { id: 2, label: "Description", type: "textarea", required: true, active: true, isSystem: true },
    { id: 3, label: "Location", type: "text", required: true, active: true, isSystem: true },
    { id: 4, label: "Salary Range", type: "text", required: false, active: true, isSystem: false },
  ],
  candidate: [
    { id: 1, label: "First Name", type: "text", required: true, active: true, isSystem: true },
    { id: 2, label: "Last Name", type: "text", required: true, active: true, isSystem: true },
    { id: 3, label: "Email", type: "email", required: true, active: true, isSystem: true },
    { id: 4, label: "Resume", type: "file", required: false, active: true, isSystem: true },
  ],
  deal: [
    { id: 1, label: "Deal Name", type: "text", required: true, active: true, isSystem: true },
    { id: 2, label: "Amount", type: "number", required: true, active: true, isSystem: true },
    { id: 3, label: "Close Date", type: "date", required: true, active: true, isSystem: true },
    { id: 4, label: "Stage", type: "select", required: true, active: true, isSystem: true },
  ]
};

export const FieldCustomization = () => {
  const [selectedModule, setSelectedModule] = useState("contact");
  const [fields, setFields] = useState(initialFields);
  const [newField, setNewField] = useState({ label: "", type: "text", required: false, active: true, isSystem: false });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<number | null>(null);

  const handleAddField = () => {
    if (newField.label.trim() === "") return;
    
    if (editingFieldId) {
      setFields({
        ...fields,
        [selectedModule]: fields[selectedModule as keyof typeof fields].map(field => 
          field.id === editingFieldId ? { ...newField, id: editingFieldId } : field
        )
      });
    } else {
      setFields({
        ...fields,
        [selectedModule]: [
          ...fields[selectedModule as keyof typeof fields],
          { ...newField, id: Date.now() }
        ]
      });
    }
    
    setNewField({ label: "", type: "text", required: false, active: true, isSystem: false });
    setEditingFieldId(null);
    setIsDialogOpen(false);
  };

  const handleDeleteField = (id: number) => {
    setFields({
      ...fields,
      [selectedModule]: fields[selectedModule as keyof typeof fields].filter(field => field.id !== id)
    });
  };

  const handleEditField = (field: typeof fields[keyof typeof fields][0]) => {
    setNewField({ 
      label: field.label, 
      type: field.type, 
      required: field.required, 
      active: field.active, 
      isSystem: field.isSystem 
    });
    setEditingFieldId(field.id);
    setIsDialogOpen(true);
  };

  const toggleFieldActive = (id: number) => {
    setFields({
      ...fields,
      [selectedModule]: fields[selectedModule as keyof typeof fields].map(field => 
        field.id === id ? { ...field, active: !field.active } : field
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <h3 className="text-lg font-medium">Custom Fields</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus size={16} />
              Add Field
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFieldId ? "Edit Field" : "Add New Field"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fieldLabel">Field Label</Label>
                <Input
                  id="fieldLabel"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="Enter field label"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fieldType">Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField({ ...newField, type: value })}
                >
                  <SelectTrigger id="fieldType">
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="required"
                  checked={newField.required}
                  onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
                />
                <Label htmlFor="required">Required Field</Label>
              </div>
            </div>
            <Button onClick={handleAddField}>{editingFieldId ? "Update Field" : "Add Field"}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedModule} onValueChange={setSelectedModule} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
          {modules.map(module => (
            <TabsTrigger key={module.id} value={module.id}>
              {module.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {modules.map(module => (
          <TabsContent key={module.id} value={module.id} className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ width: '40px' }}></TableHead>
                      <TableHead>Field Label</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields[module.id as keyof typeof fields].map((field) => (
                      <TableRow key={field.id}>
                        <TableCell>
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        </TableCell>
                        <TableCell className="font-medium">{field.label}</TableCell>
                        <TableCell>
                          {fieldTypes.find(type => type.id === field.type)?.name || field.type}
                        </TableCell>
                        <TableCell>{field.required ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Switch
                              checked={field.active}
                              onCheckedChange={() => !field.isSystem && toggleFieldActive(field.id)}
                              disabled={field.isSystem}
                            />
                            <span className="ml-2 text-sm">
                              {field.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => !field.isSystem && handleEditField(field)}
                            className="h-8 w-8 p-0 mr-1"
                            disabled={field.isSystem}
                          >
                            <Pencil size={16} />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => !field.isSystem && handleDeleteField(field.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            disabled={field.isSystem}
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
