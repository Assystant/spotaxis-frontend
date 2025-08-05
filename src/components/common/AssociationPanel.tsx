import React, { useState } from "react";
import { Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssociationTile } from "./AssociationTile";
import { cn } from "@/lib/utils";

interface AssociationConfig {
  id: string;
  title: string;
  records: Array<{
    id: string;
    name: string;
    subtitle?: string;
    route: string;
  }>;
  searchPlaceholder?: string;
  onSearch?: (query: string) => Promise<any[]>;
  onLink?: (record: any) => void;
  onUnlink?: (recordId: string) => void;
  defaultOpen?: boolean;
}

interface AssociationPanelProps {
  title: string;
  associations: AssociationConfig[];
  onReorder?: (newOrder: string[]) => void;
  onResetToDefault?: () => void;
  className?: string;
}

export const AssociationPanel = ({
  title,
  associations,
  onReorder,
  onResetToDefault,
  className
}: AssociationPanelProps) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [orderedAssociations, setOrderedAssociations] = useState(associations);

  const handleResetToDefault = () => {
    if (onResetToDefault) {
      onResetToDefault();
      setIsCustomizing(false);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {isCustomizing && onResetToDefault && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetToDefault}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          )}
          {onReorder && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              {isCustomizing ? "Done" : "Customize"}
            </Button>
          )}
        </div>
      </div>

      {/* Customization Notice */}
      {isCustomizing && (
        <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
          Drag tiles to reorder them. Click "Reset" to restore default order.
        </div>
      )}

      {/* Association Tiles */}
      <div className="space-y-3 max-h-[70vh] overflow-y-auto">
        {orderedAssociations.map((association) => (
          <AssociationTile
            key={association.id}
            title={association.title}
            records={association.records}
            searchPlaceholder={association.searchPlaceholder}
            onSearch={association.onSearch}
            onLink={association.onLink}
            onUnlink={association.onUnlink}
            defaultOpen={association.defaultOpen}
            className={isCustomizing ? "border-dashed cursor-move" : ""}
          />
        ))}
      </div>
    </div>
  );
};