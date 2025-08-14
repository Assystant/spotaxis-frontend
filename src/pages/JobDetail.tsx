import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { JobTabs } from "@/components/jobs/JobTabs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { mockJobs } from "@/components/jobs/JobsTable";
import { Job } from "@/data/mockAssociations";


const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch the job from an API
    const jobData = mockJobs.find(j => j.id === id);
    if (jobData) {
      // Map mockJobs format to Job interface
      const mappedJob: Job = {
        id: jobData.id,
        title: jobData.title,
        company: jobData.company,
        companyId: jobData.company,
        location: jobData.location,
        type: jobData.type,
        status: jobData.status,
        postedDate: jobData.postedDate,
        description: "Detailed job description will be loaded here...",
        skills: [],
        applicants: jobData.applicants
      };
      setJob(mappedJob);
    }
    setLoading(false);
  }, [id]);

  const handleJobUpdate = (updatedJob: Job) => {
    setJob(updatedJob);
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
    <div className="overflow-x-hidden">
      <PageContainer title={job.title}>
        <div className="space-y-6">
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              Back to Jobs
            </Button>
          </div>
          
          {/* Job Tabs */}
          <JobTabs job={job} onJobUpdate={handleJobUpdate} />
        </div>
      </PageContainer>
    </div>
  );
};

export default JobDetail;