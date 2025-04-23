
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { KanbanBoard } from "@/components/jobs/KanbanBoard";
import { ArrowLeft, Edit, Link, Share, Archive, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockJobs } from "@/components/jobs/JobsTable";

// Example stages for the job applicants
const applicantStages = [
  { id: "new", name: "New", color: "bg-blue-500", order: 0 },
  { id: "screening", name: "Screening", color: "bg-purple-500", order: 1 },
  { id: "interview", name: "Interview", color: "bg-amber-500", order: 2 },
  { id: "offer", name: "Offer", color: "bg-green-500", order: 3 },
  { id: "rejected", name: "Rejected", color: "bg-red-500", order: 4 }
];

// Mock applicants data
const mockApplicants = [
  {
    id: "app1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    stage: "new",
    appliedDate: "2023-05-10",
    jobId: "job1"
  },
  {
    id: "app2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "123-456-7891",
    stage: "screening",
    appliedDate: "2023-05-12",
    jobId: "job1"
  },
  {
    id: "app3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "123-456-7892",
    stage: "interview",
    appliedDate: "2023-05-15",
    jobId: "job2"
  }
];

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch the job from an API
    const jobData = mockJobs.find(j => j.id === id);
    setJob(jobData);
    
    // Filter applicants based on the job ID
    const jobApplicants = mockApplicants.filter(a => a.jobId === id);
    setApplicants(jobApplicants);
    
    setLoading(false);
  }, [id]);

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
            <Button variant="outline" size="sm" className="gap-2">
              <Link size={14} />
              Copy Link
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share size={14} />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit size={14} />
              Edit
            </Button>
            <Button variant="destructive" size="sm" className="gap-2">
              <Archive size={14} />
              Archive
            </Button>
          </div>
        </div>

        {/* Job details */}
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
                  <span className="status-badge bg-green-100 text-green-800">{job.status}</span>
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
                      <span className="font-medium">{job.applicants}</span>
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

        {/* Kanban Board */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Applicant Pipeline</h2>
          <KanbanBoard 
            stages={applicantStages} 
            items={applicants}
            entityType="applicant"
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default JobDetail;
