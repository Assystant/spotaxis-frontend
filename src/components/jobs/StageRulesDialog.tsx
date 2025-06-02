
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search } from "lucide-react";

interface Rule {
  id: string;
  name: string;
  description: string;
  type: string;
  color: string;
}

interface StageRulesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stageName: string;
}

const availableRules: Rule[] = [
  { 
    id: "notify-rule", 
    name: "Notify Rule", 
    description: "Send notification to user if application moves to next round",
    type: "notification", 
    color: "bg-blue-100 text-blue-800 border-blue-200" 
  },
  { 
    id: "max-application-rule", 
    name: "Max Application Rule", 
    description: "Stop receiving application if max number achieved",
    type: "limit", 
    color: "bg-green-100 text-green-800 border-green-200" 
  },
  { 
    id: "criminal-rule", 
    name: "Criminal Rule", 
    description: "Reject application is candidate have criminal record",
    type: "validation", 
    color: "bg-red-100 text-red-800 border-red-200" 
  },
  { 
    id: "auto-reject", 
    name: "Auto Reject", 
    description: "Automatically reject applications based on criteria",
    type: "automation", 
    color: "bg-orange-100 text-orange-800 border-orange-200" 
  },
  { 
    id: "schedule-interview", 
    name: "Schedule Interview", 
    description: "Automatically schedule interviews for qualified candidates",
    type: "scheduling", 
    color: "bg-purple-100 text-purple-800 border-purple-200" 
  },
];

export const StageRulesDialog = ({ open, onOpenChange, stageName }: StageRulesDialogProps) => {
  const [selectedRules, setSelectedRules] = useState<Rule[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedRule, setDraggedRule] = useState<Rule | null>(null);

  const filteredRules = availableRules.filter(rule => 
    rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRule = (rule: Rule) => {
    const newRule = { ...rule, id: `${rule.id}-${Date.now()}` };
    setSelectedRules(prev => [...prev, newRule]);
  };

  const handleRemoveRule = (ruleId: string) => {
    setSelectedRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const handleSave = () => {
    console.log("Saving rules for stage:", stageName, selectedRules);
    // Here you would typically save the rules
    onOpenChange(false);
  };

  const handleDragStart = (e: React.DragEvent, rule: Rule) => {
    setDraggedRule(rule);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedRule) {
      handleAddRule(draggedRule);
      setDraggedRule(null);
    }
  };

  const handleAddNewRule = () => {
    console.log("Create new rule");
    // This would typically open a form to create a new rule
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[50vw] max-h-[50vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle>Add Rules for {stageName}</DialogTitle>
          <Button onClick={handleAddNewRule} size="sm" className="ml-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          {/* Selected Rules Area */}
          <div 
            className="border-2 border-dashed border-muted-foreground/25 bg-muted/20 rounded-lg p-4 mb-4 min-h-[120px] transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedRules.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Drop rules here or click + to add</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedRules.map((rule) => (
                  <div
                    key={rule.id}
                    className={`${rule.color} px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer`}
                    onClick={() => handleRemoveRule(rule.id)}
                  >
                    {rule.name}
                    <span className="ml-2 text-xs opacity-60">×</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Rules List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Available Rules</h4>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-8"
                />
              </div>
            </div>
            <ScrollArea className="h-[200px] border rounded-lg">
              <div className="p-3 space-y-2">
                {filteredRules.map((rule) => (
                  <Card 
                    key={rule.id} 
                    className="cursor-grab hover:shadow-sm transition-shadow active:cursor-grabbing"
                    draggable
                    onDragStart={(e) => handleDragStart(e, rule)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`${rule.color} px-2 py-1 rounded text-xs font-medium`}>
                              {rule.name}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{rule.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddRule(rule)}
                          className="ml-2"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredRules.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No rules found matching your search
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Rules
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
