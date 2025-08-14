import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Plus, ExternalLink, TrendingUp, Eye } from "lucide-react";
import { Job } from "@/data/mockAssociations";
import { JobPromotionDialog } from "./JobPromotionDialog";

interface JobPromotionsTabProps {
  job: Job;
}

// Mock data for job board promotions
const mockPromotions = [
  {
    id: "linkedin",
    name: "LinkedIn",
    logo: "https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg",
    status: "Active",
    postedDate: "2024-01-15",
    views: 1234,
    applications: 45,
    cost: "$99/mo"
  },
  {
    id: "indeed",
    name: "Indeed",
    logo: "https://d3fw5vlhllyvee.cloudfront.net/dist/images/indeed_logo-8ca38a9e62b52597.svg",
    status: "Active", 
    postedDate: "2024-01-16",
    views: 856,
    applications: 23,
    cost: "$75/mo"
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    logo: "https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png",
    status: "Paused",
    postedDate: "2024-01-10",
    views: 432,
    applications: 12,
    cost: "$50/mo"
  }
];

export const JobPromotionsTab = ({ job }: JobPromotionsTabProps) => {
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);

  const handleViewPromotion = (promotionId: string) => {
    // Open external link to job board
    console.log("Viewing promotion on", promotionId);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Paused":
        return "secondary";
      case "Completed":
        return "outline";
      default:
        return "outline";
    }
  };

  const totalViews = mockPromotions.reduce((sum, p) => sum + p.views, 0);
  const totalApplications = mockPromotions.reduce((sum, p) => sum + p.applications, 0);
  const activePromotions = mockPromotions.filter(p => p.status === "Active").length;

  return (
    <Card className="shadow-none rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Job Board Promotions
          </CardTitle>
          <Button 
            size="sm"
            onClick={() => setShowPromotionDialog(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Promote Job
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Promotion Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-semibold">{activePromotions}</div>
            <div className="text-sm text-muted-foreground">Active Promotions</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-semibold">{totalViews.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-semibold">{totalApplications}</div>
            <div className="text-sm text-muted-foreground">Applications</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-semibold">{totalViews > 0 ? ((totalApplications / totalViews) * 100).toFixed(1) : 0}%</div>
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
          </div>
        </div>

        {/* Active Promotions */}
        <div className="space-y-4">
          <h3 className="font-semibold">Current Promotions</h3>
          {mockPromotions.length > 0 ? (
            <div className="space-y-3">
              {mockPromotions.map((promotion) => (
                <div key={promotion.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs font-medium">{promotion.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{promotion.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Posted {new Date(promotion.postedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusBadgeVariant(promotion.status)}>
                        {promotion.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">{promotion.cost}</div>
                        <div className="text-xs text-muted-foreground">Cost</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{promotion.views.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{promotion.applications}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Applications</div>
                    </div>
                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewPromotion(promotion.id)}
                        className="gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Share2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No job promotions yet</p>
              <p className="text-sm mb-4">Start promoting your job to reach more candidates</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowPromotionDialog(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Promote Job
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      <JobPromotionDialog 
        open={showPromotionDialog}
        onOpenChange={setShowPromotionDialog}
        jobTitle={job.title}
        companyName={job.company}
      />
    </Card>
  );
};