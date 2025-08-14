import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, DollarSign, Calendar, Clock, Users, Edit, Link, Eye } from "lucide-react";
import { Job } from "@/data/mockAssociations";
import { toast } from "@/hooks/use-toast";

interface JobDetailsTabProps {
  job: Job;
}

export const JobDetailsTab = ({ job }: JobDetailsTabProps) => {
  
  const handleEditJob = () => {
    window.location.href = `/jobs/edit/${job.id}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/jobs/${job.id}`);
    toast({
      title: "Link Copied",
      description: "Job link has been copied to clipboard",
    });
  };

  const handlePreview = () => {
    // Open job preview in new tab or modal
    window.open(`/jobs/${job.id}/preview`, '_blank');
  };

  return (
    <Card className="shadow-none rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Job Information
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview} className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-2">
              <Link className="h-4 w-4" />
              Copy Link
            </Button>
            <Button size="sm" onClick={handleEditJob} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Job
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Header */}
        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
              {job.status}
            </Badge>
            <Badge variant="outline">{job.type}</Badge>
            {job.department && <Badge variant="outline">{job.department}</Badge>}
          </div>
        </div>

        {/* Job Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Job Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Type:</span>
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Status:</span>
                <span>{job.status}</span>
              </div>
              {job.startDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Start Date:</span>
                  <span>{new Date(job.startDate).toLocaleDateString()}</span>
                </div>
              )}
              {job.department && (
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Department:</span>
                  <span>{job.department}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Posting Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Posted:</span>
                <span>{new Date(job.postedDate || '').toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Applicants:</span>
                <span>{job.applicants || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Required Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Job Description */}
        {job.description && (
          <div className="space-y-3">
            <h3 className="font-semibold">Job Description</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && (
          <div className="space-y-3">
            <h3 className="font-semibold">Requirements</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {job.requirements}
              </p>
            </div>
          </div>
        )}

        {/* Responsibilities */}
        {job.responsibilities && (
          <div className="space-y-3">
            <h3 className="font-semibold">Responsibilities</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {job.responsibilities}
              </p>
            </div>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && (
          <div className="space-y-3">
            <h3 className="font-semibold">Benefits</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {job.benefits}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};