import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Plus, ChevronDown, Briefcase, Users } from "lucide-react";
import { useActivityTypes } from "@/contexts/ActivityTypesContext";

export const ActivityTypeDropdown = () => {
  const { allActivityTypes, enabledTypes, toggleActivityType, lists, addList, addActivityType } = useActivityTypes();

  const handleAddJobsTab = (listId: string) => {
    const list = lists.find((l) => l.id === listId);
    if (!list) return;
    addActivityType({ id: `related_jobs:${list.id}`, name: `Jobs: ${list.name}`, icon: "Briefcase" });
  };

  const handleAddApplicationsTab = (listId: string) => {
    const list = lists.find((l) => l.id === listId);
    if (!list) return;
    addActivityType({ id: `related_applications:${list.id}`, name: `Applications: ${list.name}`, icon: "Users" });
  };

  const handleCreateList = (type: 'jobs' | 'applications') => {
    const name = window.prompt(`Name this ${type} list`);
    if (!name) return;
    const newList = addList(type, name, 'all');
    if (type === 'jobs') handleAddJobsTab(newList.id);
    else handleAddApplicationsTab(newList.id);
  };

  const jobLists = lists.filter((l) => l.type === 'jobs');
  const applicationLists = lists.filter((l) => l.type === 'applications');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Manage Activity Types
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-background border shadow-lg z-50"
      >
        <DropdownMenuLabel>Activity Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {allActivityTypes.map((activityType) => (
          <DropdownMenuCheckboxItem
            key={activityType.id}
            checked={enabledTypes.includes(activityType.id)}
            onCheckedChange={() => toggleActivityType(activityType.id)}
            disabled={activityType.id === 'overview'}
            className="cursor-pointer"
          >
            {activityType.name}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Add Related Records Tabs</DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <Briefcase className="h-4 w-4 mr-2" /> Related Jobs
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {jobLists.map((l) => (
              <DropdownMenuItem key={l.id} className="cursor-pointer" onClick={() => handleAddJobsTab(l.id)}>
                {l.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleCreateList('jobs')}>
              + Create new list
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <Users className="h-4 w-4 mr-2" /> Related Applications
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {applicationLists.map((l) => (
              <DropdownMenuItem key={l.id} className="cursor-pointer" onClick={() => handleAddApplicationsTab(l.id)}>
                {l.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleCreateList('applications')}>
              + Create new list
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};