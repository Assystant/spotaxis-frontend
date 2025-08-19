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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ExternalJobLink } from "@/services/jobPromotionService";
import { toast } from "sonner";

interface CreateExternalLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateLink: (linkData: Omit<ExternalJobLink, "id" | "createdAt">) => void;
  editingLink?: ExternalJobLink | null;
  jobTitle?: string;
  companyName?: string;
  jobId?: string;
}

export const CreateExternalLinkDialog = ({ 
  open, 
  onOpenChange, 
  onCreateLink,
  editingLink,
  jobTitle = "",
  companyName = "",
  jobId = "temp-job-id"
}: CreateExternalLinkDialogProps) => {
  const [jobBoardName, setJobBoardName] = useState(editingLink?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  // Auto-generate fields based on job board name (native Spotaxis URLs)
  const generateFields = (boardName: string) => {
    const cleanBoardName = boardName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const cleanJobTitle = jobTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const cleanCompanyName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Generate native Spotaxis URLs
    const baseJobUrl = `/jobs/${jobId}`;
    const baseApplyUrl = `/jobs/${jobId}/apply`;
    
    return {
      name: boardName,
      jobInfoUrl: baseJobUrl,
      applyUrl: baseApplyUrl,
      utmSource: cleanBoardName,
      utmMedium: "job_board",
      utmCampaign: `${cleanJobTitle}_${cleanCompanyName}_hiring`,
      utmTerm: cleanJobTitle,
      utmContent: `${cleanBoardName}_posting`,
    };
  };

  const handleSave = async () => {
    if (!jobBoardName.trim()) {
      toast.error("Please enter a job board name");
      return;
    }

    setIsSaving(true);
    try {
      const generatedData = generateFields(jobBoardName.trim());
      onCreateLink(generatedData);
      handleCancel();
      toast.success(`External link ${editingLink ? 'updated' : 'created'} successfully`);
    } catch (error) {
      toast.error(`Failed to ${editingLink ? 'update' : 'create'} external link`);
      console.error("Error saving external link:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setJobBoardName("");
    onOpenChange(false);
  };

  // Generate preview data for display
  const previewData = jobBoardName.trim() ? generateFields(jobBoardName.trim()) : null;

  const generatePreviewUrl = (baseUrl: string, utmData: any) => {
    if (!baseUrl.trim()) return "";
    
    const utmParams = new URLSearchParams({
      utm_source: utmData.utmSource,
      utm_medium: utmData.utmMedium,
      utm_campaign: utmData.utmCampaign,
      utm_term: utmData.utmTerm,
      utm_content: utmData.utmContent
    });

    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${utmParams.toString()}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingLink ? 'Edit External Link' : 'Create External Link'}
          </DialogTitle>
          <DialogDescription>
            Enter the job board name to create trackable Spotaxis links with UTM parameters.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Job Board Name Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="boardName">Job Board Name *</Label>
              <Input
                id="boardName"
                placeholder="e.g. AngelList, Tech Jobs Board, Stack Overflow Jobs"
                value={jobBoardName}
                onChange={(e) => setJobBoardName(e.target.value)}
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                Enter the job board name - we'll create Spotaxis URLs with UTM tracking
              </p>
            </div>
          </div>

          {/* Auto-generated Preview */}
          {previewData && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Auto-Generated Configuration</h4>
                
                {/* URLs Preview */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Job Information URL:</Label>
                    <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                      {generatePreviewUrl(previewData.jobInfoUrl, previewData)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Application URL:</Label>
                    <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                      {generatePreviewUrl(previewData.applyUrl, previewData)}
                    </div>
                  </div>
                </div>

                {/* UTM Parameters Preview */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">UTM Parameters:</Label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="font-mono">{previewData.utmSource}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span className="text-muted-foreground">Medium:</span>
                      <span className="font-mono">{previewData.utmMedium}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span className="text-muted-foreground">Campaign:</span>
                      <span className="font-mono">{previewData.utmCampaign}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span className="text-muted-foreground">Term:</span>
                      <span className="font-mono">{previewData.utmTerm}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded border border-blue-200">
                  <strong>Note:</strong> These are native Spotaxis URLs with UTM parameters for tracking traffic from this job board.
                </div>
              </div>
            </>
          )}
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
            disabled={isSaving || !jobBoardName.trim()}
          >
            {isSaving ? "Creating..." : (editingLink ? "Update Link" : "Create Link")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};