
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { KanbanBoard } from "@/components/jobs/KanbanBoard";
import { ArrowLeft, Edit, Link, Share, Archive, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockJobs } from "@/components/jobs/JobsTable";
import { JobPromotionDialog } from "@/components/jobs/JobPromotionDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddApplicantDialog } from "@/components/applicants/AddApplicantDialog";
import { JobPreviewModal } from "@/components/jobs/JobPreviewModal";
import { MoreVertical, Eye } from "lucide-react";

// Example stages for the job applicants
const applicantStages = [
  { id: "new", name: "New", color: "bg-blue-500", order: 0 },
  { id: "screening", name: "Screening", color: "bg-purple-500", order: 1 },
  { id: "interview", name: "Interview", color: "bg-amber-500", order: 2 },
  { id: "offer", name: "Offer", color: "bg-green-500", order: 3 },
  { id: "rejected", name: "Rejected", color: "bg-red-500", order: 4 }
];

// Enhanced mock applicants data
const mockApplicants = [
  {
    id: "app1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    stage: "new",
    appliedDate: "2023-05-10",
    jobId: "job1",
    photo: "",
    resume: "resume_john_doe.pdf"
  },
  {
    id: "app2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "123-456-7891",
    stage: "screening",
    appliedDate: "2023-05-12",
    jobId: "job1",
    photo: "",
    resume: "resume_jane_smith.pdf"
  },
  {
    id: "app3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "123-456-7892",
    stage: "interview",
    appliedDate: "2023-05-15",
    jobId: "job2",
    photo: "",
    resume: "resume_bob_johnson.pdf"
  },
  {
    id: "app4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "123-456-7893",
    stage: "new",
    appliedDate: "2023-05-16",
    jobId: "job1",
    photo: "",
    resume: "resume_sarah_williams.pdf"
  },
  {
    id: "app5",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "123-456-7894",
    stage: "offer",
    appliedDate: "2023-05-08",
    jobId: "job1",
    photo: "",
    resume: "resume_michael_brown.pdf"
  }
];

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [showAddApplicantDialog, setShowAddApplicantDialog] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    // In a real app, fetch the job from an API
    const jobData = mockJobs.find(j => j.id === id);
    setJob(jobData);
    
    // Filter applicants based on the job ID
    const jobApplicants = mockApplicants.filter(a => a.jobId === id);
    setApplicants(jobApplicants);
    
    setLoading(false);
  }, [id]);

  const handleStatusChange = (status: string) => {
    setJob(prev => ({...prev, status}));
    // In a real app, this would be an API call to update the job status
  };

  const handleEditJob = () => {
    // In a real app, redirect to edit page or open a modal with the job form
    // For now, we'll just log the action
    console.log("Edit job", job.id);
    window.location.href = `/jobs/edit/${job.id}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // In a real app, you'd show a toast notification
    console.log("Link copied to clipboard");
  };

  const getStatusButtonStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Paused":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleAddApplicant = (applicant: any) => {
    // Add the new applicant to the list with the current job ID
    const newApplicant = {
      ...applicant,
      id: `app${Date.now()}`, // Generate a unique ID
      jobId: id,
      stage: "new", // New applicants start in the "new" stage
      appliedDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    };
    
    setApplicants((prev) => [...prev, newApplicant]);
    setShowAddApplicantDialog(false);
  };

  // Handle applicant stage change in kanban board
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

  if (loading) {
    return (
      <PageContainer title="Job Detail">
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </PageContainer>
    );
  }

  if (!job) {
    return (
      <PageContainer title="Job Detail">
        <div className="flex items-center justify-center h-64">
          <p>Job not found</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={job.title}>
      <div className="space-y-6">
        {/* Header with back button and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              Back to Jobs
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`gap-2 ${getStatusButtonStyle(job.status)}`}
                >
                  <Archive size={14} />
                  {job.status}
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleStatusChange("Active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Paused")}>
                  Paused
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("Closed")}>
                  Closed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEditJob}>
                  <Edit size={14} className="mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyLink}>
                  <Link size={14} className="mr-2" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowPromotionDialog(true)}>
                  <Share size={14} className="mr-2" />
                  Promote
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowPreviewModal(true)}>
                  <Eye size={14} className="mr-2" />
                  Preview
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Applicant Pipeline - Moved to top */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Applicant Pipeline</h2>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => setShowAddApplicantDialog(true)}
            >
              Add Applicant
            </Button>
          </div>
          <KanbanBoard 
            stages={applicantStages} 
            items={applicants}
            entityType="applicant"
            onStageChange={handleStageChange}
            jobId={id}
          />
        </div>

        {/* Job Details - Moved to collapsible section */}
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                <p className="text-muted-foreground mb-4">{job.company} • {job.location}</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-muted-foreground" />
                    <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                  <span className={`status-badge ${getStatusButtonStyle(job.status)}`}>{job.status}</span>
                  <span className="status-badge bg-blue-100 text-blue-800">{job.type}</span>
                </div>

                <h3 className="font-semibold text-lg mb-2">Job Description</h3>
                <p className="text-muted-foreground">
                  This is a placeholder for the job description. In a real application, this would contain the full job details, requirements, responsibilities, and other information.
                </p>
              </div>

              <div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Job Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium">{job.status}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Job Type</span>
                      <span className="font-medium">{job.type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Applicants</span>
                      <span className="font-medium">{applicants.length}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Posted Date</span>
                      <span className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Promotion Dialog */}
      <JobPromotionDialog
        open={showPromotionDialog}
        onOpenChange={setShowPromotionDialog}
        jobTitle={job.title}
        companyName={job.company}
      />

      {/* Add Applicant Dialog */}
      <AddApplicantDialog
        open={showAddApplicantDialog}
        onOpenChange={setShowAddApplicantDialog}
        onAddApplicant={handleAddApplicant}
        jobId={id}
        jobTitle={job.title}
      />

      {/* Job Preview Modal */}
      <JobPreviewModal
        open={showPreviewModal}
        onOpenChange={setShowPreviewModal}
        job={{
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          salary: job.salary || "$80,000 - $120,000",
          description: "This is a placeholder for the job description. In a real application, this would contain the full job details, requirements, responsibilities, and other information.",
          requirements: [
            "Bachelor's degree in relevant field",
            "3+ years of experience",
            "Strong communication skills",
            "Team player with leadership qualities"
          ]
        }}
      />
    </PageContainer>
  );
};

export default JobDetail;
