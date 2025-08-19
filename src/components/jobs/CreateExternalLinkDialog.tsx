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
}

export const CreateExternalLinkDialog = ({ 
  open, 
  onOpenChange, 
  onCreateLink,
  editingLink
}: CreateExternalLinkDialogProps) => {
  const [formData, setFormData] = useState({
    name: editingLink?.name || "",
    jobInfoUrl: editingLink?.jobInfoUrl || "",
    applyUrl: editingLink?.applyUrl || "",
    utmSource: editingLink?.utmSource || "",
    utmMedium: editingLink?.utmMedium || "job_board",
    utmCampaign: editingLink?.utmCampaign || "",
    utmTerm: editingLink?.utmTerm || "",
    utmContent: editingLink?.utmContent || "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.jobInfoUrl.trim() || !formData.applyUrl.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.utmSource.trim() || !formData.utmCampaign.trim()) {
      toast.error("UTM Source and Campaign are required");
      return;
    }

    setIsSaving(true);
    try {
      onCreateLink(formData);
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
    setFormData({
      name: "",
      jobInfoUrl: "",
      applyUrl: "",
      utmSource: "",
      utmMedium: "job_board",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
    });
    onOpenChange(false);
  };

  const generatePreviewUrl = (baseUrl: string) => {
    if (!baseUrl.trim()) return "";
    
    const utmParams = new URLSearchParams({
      utm_source: formData.utmSource || "source",
      utm_medium: formData.utmMedium || "job_board",
      utm_campaign: formData.utmCampaign || "campaign",
      ...(formData.utmTerm && { utm_term: formData.utmTerm }),
      ...(formData.utmContent && { utm_content: formData.utmContent })
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
            Create trackable links for external job boards with custom UTM parameters.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium">Basic Information</h4>
            <div className="space-y-2">
              <Label htmlFor="name">Job Board Name *</Label>
              <Input
                id="name"
                placeholder="e.g. AngelList, Tech Jobs Board"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                A name to identify this link set for tracking purposes
              </p>
            </div>
          </div>

          <Separator />

          {/* URLs */}
          <div className="space-y-4">
            <h4 className="font-medium">URLs</h4>
            <div className="space-y-2">
              <Label htmlFor="jobInfoUrl">Job Information URL *</Label>
              <Input
                id="jobInfoUrl"
                placeholder="https://jobboard.com/job/12345"
                value={formData.jobInfoUrl}
                onChange={(e) => handleInputChange("jobInfoUrl", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                URL where job seekers can view job details
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applyUrl">Application URL *</Label>
              <Input
                id="applyUrl"
                placeholder="https://jobboard.com/apply/12345"
                value={formData.applyUrl}
                onChange={(e) => handleInputChange("applyUrl", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                URL where job seekers can apply for the position
              </p>
            </div>
          </div>

          <Separator />

          {/* UTM Parameters */}
          <div className="space-y-4">
            <h4 className="font-medium">UTM Tracking Parameters</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="utmSource">UTM Source *</Label>
                <Input
                  id="utmSource"
                  placeholder="angellist"
                  value={formData.utmSource}
                  onChange={(e) => handleInputChange("utmSource", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="utmMedium">UTM Medium *</Label>
                <Input
                  id="utmMedium"
                  placeholder="job_board"
                  value={formData.utmMedium}
                  onChange={(e) => handleInputChange("utmMedium", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="utmCampaign">UTM Campaign *</Label>
                <Input
                  id="utmCampaign"
                  placeholder="software_engineer_hiring"
                  value={formData.utmCampaign}
                  onChange={(e) => handleInputChange("utmCampaign", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="utmTerm">UTM Term</Label>
                <Input
                  id="utmTerm"
                  placeholder="frontend_developer"
                  value={formData.utmTerm}
                  onChange={(e) => handleInputChange("utmTerm", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="utmContent">UTM Content</Label>
              <Input
                id="utmContent"
                placeholder="banner_ad"
                value={formData.utmContent}
                onChange={(e) => handleInputChange("utmContent", e.target.value)}
              />
            </div>
          </div>

          {/* URL Preview */}
          {formData.jobInfoUrl && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">URL Preview</h4>
                <div className="space-y-2">
                  <Label>Job Info URL with UTM:</Label>
                  <Textarea
                    value={generatePreviewUrl(formData.jobInfoUrl)}
                    readOnly
                    className="text-xs font-mono"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Apply URL with UTM:</Label>
                  <Textarea
                    value={generatePreviewUrl(formData.applyUrl)}
                    readOnly
                    className="text-xs font-mono"
                    rows={2}
                  />
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
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : (editingLink ? "Update Link" : "Create Link")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};