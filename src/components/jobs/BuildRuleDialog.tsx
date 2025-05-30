
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BuildRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BuildRuleDialog = ({ open, onOpenChange }: BuildRuleDialogProps) => {
  const [ruleName, setRuleName] = useState("");
  const [ruleType, setRuleType] = useState("");
  const [description, setDescription] = useState("");
  const [triggerCondition, setTriggerCondition] = useState("");
  const [action, setAction] = useState("");

  const handleSave = () => {
    // Here you would typically save the rule
    console.log("Saving rule:", {
      name: ruleName,
      type: ruleType,
      description,
      triggerCondition,
      action
    });
    
    // Reset form
    setRuleName("");
    setRuleType("");
    setDescription("");
    setTriggerCondition("");
    setAction("");
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Build Custom Rule</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ruleName">Rule Name</Label>
              <Input
                id="ruleName"
                placeholder="Enter rule name"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ruleType">Rule Type</Label>
              <Select value={ruleType} onValueChange={setRuleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rule type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notification">Notification</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                  <SelectItem value="scheduling">Scheduling</SelectItem>
                  <SelectItem value="validation">Validation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this rule does"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rule Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trigger">Trigger Condition</Label>
                <Select value={triggerCondition} onValueChange={setTriggerCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="When should this rule trigger?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candidate-enters">When candidate enters stage</SelectItem>
                    <SelectItem value="candidate-exits">When candidate exits stage</SelectItem>
                    <SelectItem value="time-based">Time-based trigger</SelectItem>
                    <SelectItem value="application-count">Application count threshold</SelectItem>
                    <SelectItem value="score-threshold">Score threshold met</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="action">Action</Label>
                <Select value={action} onValueChange={setAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="What action should be taken?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="send-email">Send email notification</SelectItem>
                    <SelectItem value="assign-reviewer">Assign reviewer</SelectItem>
                    <SelectItem value="schedule-interview">Schedule interview</SelectItem>
                    <SelectItem value="move-stage">Move to next stage</SelectItem>
                    <SelectItem value="reject-application">Reject application</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!ruleName || !ruleType || !triggerCondition || !action}
            >
              Save Rule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
