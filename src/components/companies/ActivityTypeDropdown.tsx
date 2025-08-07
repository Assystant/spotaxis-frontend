import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Plus, ChevronDown } from "lucide-react";
import { useActivityTypes } from "@/contexts/ActivityTypesContext";

export const ActivityTypeDropdown = () => {
  const { allActivityTypes, enabledTypes, toggleActivityType } = useActivityTypes();

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
        className="w-56 bg-background border shadow-lg z-50"
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};