import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ExternalJobLink, jobPromotionService } from "@/services/jobPromotionService";
import { ExternalLink, Edit, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

interface ExternalLinksListProps {
  links: ExternalJobLink[];
  jobId: string;
  onEditLink: (link: ExternalJobLink) => void;
  onLinksChange: () => void;
}

export const ExternalLinksList = ({ 
  links, 
  jobId, 
  onEditLink,
  onLinksChange 
}: ExternalLinksListProps) => {
  const handleDeleteLink = (linkId: string, linkName: string) => {
    const success = jobPromotionService.removeExternalLink(jobId, linkId);
    if (success) {
      onLinksChange();
      toast.success(`External link "${linkName}" deleted successfully`);
    } else {
      toast.error("Failed to delete external link");
    }
  };

  const handleCopyUrl = (url: string, type: string) => {
    navigator.clipboard.writeText(url);
    toast.success(`${type} URL copied to clipboard`);
  };

  if (links.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        No external links created yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {links.map((link) => {
        const { jobInfoUrl, applyUrl } = jobPromotionService.generateUrls(link);
        
        return (
          <Card key={link.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{link.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {link.utmSource}
                    </Badge>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{link.utmCampaign}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEditLink(link)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete External Link</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{link.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => handleDeleteLink(link.id, link.name)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Job Info URL */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Job Information URL</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1"
                    onClick={() => handleCopyUrl(jobInfoUrl, "Job Info")}
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs font-mono break-all">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{jobInfoUrl}</span>
                </div>
              </div>

              {/* Apply URL */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Application URL</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1"
                    onClick={() => handleCopyUrl(applyUrl, "Apply")}
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </Button>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs font-mono break-all">
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{applyUrl}</span>
                </div>
              </div>

              {/* UTM Parameters Summary */}
              <div className="flex flex-wrap gap-1 pt-2">
                <Badge variant="outline" className="text-xs">
                  source: {link.utmSource}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  medium: {link.utmMedium}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  campaign: {link.utmCampaign}
                </Badge>
                {link.utmTerm && (
                  <Badge variant="outline" className="text-xs">
                    term: {link.utmTerm}
                  </Badge>
                )}
                {link.utmContent && (
                  <Badge variant="outline" className="text-xs">
                    content: {link.utmContent}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};