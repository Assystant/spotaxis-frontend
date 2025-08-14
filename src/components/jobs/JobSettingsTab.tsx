import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, Edit, Calendar as CalendarIcon, Award, Save, Archive } from "lucide-react";
import { Job } from "@/data/mockAssociations";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { PipelineScorecardSection } from "./PipelineScorecardSection";

interface JobSettingsTabProps {
  job: Job;
  onJobUpdate?: (job: Job) => void;
}

// Mock scorecard options
const scorecardOptions = [
  { id: "default", name: "Default Scorecard", type: "System" },
  { id: "technical", name: "Technical Interview", type: "Custom" },
  { id: "cultural", name: "Cultural Fit", type: "Custom" },
  { id: "leadership", name: "Leadership Assessment", type: "Custom" }
];

export const JobSettingsTab = ({ job, onJobUpdate }: JobSettingsTabProps) => {
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    job.expiryDate ? new Date(job.expiryDate) : undefined
  );
  const [jobStatus, setJobStatus] = useState(job.status);
  

  const handleEditJob = () => {
    // Navigate to job creation form with pre-filled data
    window.location.href = `/jobs/edit/${job.id}`;
  };

  const handleSaveSettings = () => {
    const updatedJob = {
      ...job,
      status: jobStatus,
      expiryDate: expiryDate?.toISOString()
    };
    
    onJobUpdate?.(updatedJob);
    
    toast({
      title: "Settings Updated",
      description: "Job settings have been saved successfully",
    });
  };

  const handleArchiveJob = () => {
    const updatedJob = {
      ...job,
      status: "Closed" as const
    };
    
    onJobUpdate?.(updatedJob);
    setJobStatus("Closed");
    
    toast({
      title: "Job Archived",
      description: "Job has been archived and is no longer active",
    });
  };

  return (
    <Card className="shadow-none rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Job Settings & Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Job Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Basic Settings</h3>
            <Button size="sm" onClick={handleSaveSettings} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job-status">Job Status</Label>
              <Select 
                value={jobStatus} 
                onValueChange={setJobStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !expiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? format(expiryDate, "PPP") : <span>Set expiry date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={setExpiryDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <Separator />

        {/* Job Editing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Job Details</h3>
              <p className="text-sm text-muted-foreground">Modify job title, description, requirements, and other details</p>
            </div>
            <Button onClick={handleEditJob} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Job Details
            </Button>
          </div>
        </div>

        <Separator />

        {/* Pipeline & Scorecard Settings */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Pipeline & Scorecard Assignment</h3>
            <p className="text-sm text-muted-foreground">Configure hiring pipeline stages and assign scorecards for evaluation</p>
          </div>
          
          <PipelineScorecardSection 
            pipelineId={job.pipelineId || "default"} 
            pipelineName={`${job.title} Pipeline`}
          />
        </div>

        <Separator />

        {/* Advanced Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold">Advanced Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="application-limit">Application Limit</Label>
              <Input 
                id="application-limit"
                type="number"
                placeholder="No limit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="auto-response">Auto-Response</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select response type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate Confirmation</SelectItem>
                  <SelectItem value="delayed">Delayed Response</SelectItem>
                  <SelectItem value="none">No Auto-Response</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Danger Zone */}
        <div className="space-y-4">
          <h3 className="font-semibold text-destructive">Danger Zone</h3>
          <div className="border border-destructive/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Archive Job</h4>
                <p className="text-sm text-muted-foreground">
                  This will close the job and stop accepting new applications
                </p>
              </div>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleArchiveJob}
                className="gap-2"
                disabled={jobStatus === "Closed"}
              >
                <Archive className="h-4 w-4" />
                Archive Job
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};