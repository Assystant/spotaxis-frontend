import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Clock, DollarSign } from "lucide-react";

interface JobPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
  };
}

export const JobPreviewModal = ({ open, onOpenChange, job }: JobPreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Job Board Preview - SpotAxis</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Job Header */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Building size={14} />
                {job.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {job.type}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-sm">
                <DollarSign size={14} />
                {job.salary}
              </div>
              <Badge variant="secondary">Full-time</Badge>
            </div>
            <Button className="w-full">Apply for this Position</Button>
          </div>
          
          {/* Job Description */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Job Description</h2>
            <div className="text-sm leading-relaxed whitespace-pre-line">
              {job.description}
            </div>
          </div>
          
          {/* Requirements */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Info */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">About {job.company}</h3>
            <p className="text-sm text-muted-foreground">
              {job.company} is a leading technology company focused on innovation and excellence.
              Join our team to work on cutting-edge projects with talented professionals.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};