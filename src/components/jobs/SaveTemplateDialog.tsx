import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormValues } from "./types";
import { jobTemplateService } from "@/services/jobTemplateService";
import { toast } from "sonner";

interface SaveTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: FormValues;
  onTemplateSaved?: () => void;
}

export const SaveTemplateDialog = ({ 
  open, 
  onOpenChange, 
  formData, 
  onTemplateSaved 
}: SaveTemplateDialogProps) => {
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    setIsSaving(true);
    try {
      jobTemplateService.createTemplate(
        templateName.trim(),
        templateDescription.trim(),
        formData
      );

      toast.success("Template saved successfully", {
        description: `"${templateName}" has been saved to your templates.`,
      });

      setTemplateName("");
      setTemplateDescription("");
      onOpenChange(false);
      onTemplateSaved?.();
    } catch (error) {
      toast.error("Failed to save template");
      console.error("Error saving template:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTemplateName("");
    setTemplateDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save as Template</DialogTitle>
          <DialogDescription>
            Save this job configuration as a template for future use. You can reuse this template when creating similar jobs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name *</Label>
            <Input
              id="template-name"
              placeholder="e.g. Senior Developer Template"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="template-description">Description (Optional)</Label>
            <Textarea
              id="template-description"
              placeholder="Brief description of when to use this template..."
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !templateName.trim()}
          >
            {isSaving ? "Saving..." : "Save Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};