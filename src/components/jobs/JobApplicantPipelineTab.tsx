import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "./KanbanBoard";
import { AddApplicantDialog } from "@/components/applicants/AddApplicantDialog";
import { Plus } from "lucide-react";
import { Job } from "@/data/mockAssociations";
import { mockApplicants } from "@/data/mockApplicants";

interface JobApplicantPipelineTabProps {
  job: Job;
}

// Enhanced applicant stages for job pipeline
const applicantStages = [
  { id: "new", name: "New", color: "bg-blue-500", order: 0 },
  { id: "screening", name: "Screening", color: "bg-purple-500", order: 1 },
  { id: "interview", name: "Interview", color: "bg-amber-500", order: 2 },
  { id: "offer", name: "Offer", color: "bg-green-500", order: 3 },
  { id: "hired", name: "Hired", color: "bg-emerald-600", order: 4 },
  { id: "rejected", name: "Rejected", color: "bg-red-500", order: 5 }
];

// Map mockApplicants stages to job pipeline stages
const mapApplicantStage = (stage: string): string => {
  const stageMap: Record<string, string> = {
    "Applied": "new",
    "New": "new", 
    "Screening": "screening",
    "Interview": "interview",
    "Offer": "offer",
    "Hired": "hired",
    "Rejected": "rejected"
  };
  return stageMap[stage] || "new";
};

export const JobApplicantPipelineTab = ({ job }: JobApplicantPipelineTabProps) => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [showAddApplicantDialog, setShowAddApplicantDialog] = useState(false);

  useEffect(() => {
    // Get applicants that match this job based on jobTitle
    const jobApplicants = mockApplicants
      .filter(applicant => applicant.jobTitle === job.title)
      .map(applicant => ({
        ...applicant,
        stage: mapApplicantStage(applicant.stage),
        jobId: job.id,
        // Add additional fields for kanban display
        phone: applicant.phone || "",
        appliedDate: applicant.appliedDate || new Date().toISOString().split('T')[0],
        photo: "",
        resume: `resume_${applicant.name.toLowerCase().replace(/\s+/g, '_')}.pdf`
      }));
    
    setApplicants(jobApplicants);
  }, [job]);

  const handleStageChange = (applicantId: string, newStageId: string) => {
    setApplicants(prev => 
      prev.map(applicant => 
        applicant.id === applicantId 
          ? { ...applicant, stage: newStageId } 
          : applicant
      )
    );
    // In a real app, this would be an API call to update the applicant stage
  };

  const handleAddApplicant = (applicant: any) => {
    const newApplicant = {
      ...applicant,
      id: `app${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      stage: "new",
      appliedDate: new Date().toISOString().split('T')[0],
      source: "Manual Entry"
    };
    
    setApplicants(prev => [...prev, newApplicant]);
    setShowAddApplicantDialog(false);
  };

  return (
    <Card className="shadow-none rounded-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span>Applicant Pipeline Overview</span>
          </CardTitle>
          <Button 
            size="sm"
            onClick={() => setShowAddApplicantDialog(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Applicant
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {applicantStages.map(stage => {
              const count = applicants.filter(a => a.stage === stage.id).length;
              return (
                <div key={stage.id} className="text-center">
                  <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto mb-2`}></div>
                  <div className="text-2xl font-semibold">{count}</div>
                  <div className="text-sm text-muted-foreground">{stage.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <KanbanBoard 
          stages={applicantStages} 
          items={applicants}
          entityType="applicant"
          onStageChange={handleStageChange}
          jobId={job.id}
        />
      </CardContent>

      <AddApplicantDialog 
        open={showAddApplicantDialog}
        onOpenChange={setShowAddApplicantDialog}
        onAddApplicant={handleAddApplicant}
        jobId={job.id}
        jobTitle={job.title}
      />
    </Card>
  );
};