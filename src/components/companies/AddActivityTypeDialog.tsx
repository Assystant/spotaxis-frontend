import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useActivityTypes } from '@/contexts/ActivityTypesContext';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const iconOptions = [
  { value: 'FileText', label: 'Document' },
  { value: 'Phone', label: 'Phone' },
  { value: 'Video', label: 'Video' },
  { value: 'MessageSquare', label: 'Message' },
  { value: 'Calendar', label: 'Calendar' },
  { value: 'Clock', label: 'Clock' },
  { value: 'Users', label: 'Users' },
  { value: 'Briefcase', label: 'Briefcase' },
  { value: 'Target', label: 'Target' },
  { value: 'TrendingUp', label: 'Trending Up' },
];

export const AddActivityTypeDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const { addActivityType } = useActivityTypes();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Activity type name is required",
        variant: "destructive",
      });
      return;
    }

    if (!icon) {
      toast({
        title: "Error", 
        description: "Please select an icon",
        variant: "destructive",
      });
      return;
    }

    addActivityType({
      name: name.trim(),
      icon,
      description: description.trim() || undefined,
    });

    toast({
      title: "Success",
      description: `Activity type "${name}" added successfully`,
    });

    // Reset form
    setName('');
    setIcon('');
    setDescription('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Plus className="h-4 w-4 mr-1" />
          Add Activity Type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Activity Type</DialogTitle>
          <DialogDescription>
            Create a new activity type to organize your company activities.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Tasks, Documents, Proposals"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this activity type"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Activity Type</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};