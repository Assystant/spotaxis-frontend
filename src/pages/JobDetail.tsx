
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { KanbanBoard } from "@/components/jobs/KanbanBoard";
import { ArrowLeft, Edit, Link, Share, Archive, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockJobs } from "@/components/jobs/JobsTable";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the job from an API
    const jobData = mockJobs.find(j => j.id === id);
    setJob(jobData);
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
          <KanbanBoard jobId={job.id} />
        </div>
      </div>
    </PageContainer>
  );
};

export default JobDetail;
