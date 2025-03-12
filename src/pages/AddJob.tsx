
import { PageContainer } from "@/components/layout/PageContainer";
import { AddJobForm } from "@/components/jobs/AddJobForm";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const AddJob = () => {
  return (
    <PageContainer title="Add Job">
      <div className="mb-6">
        <Link 
          to="/jobs" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Jobs
        </Link>
        <h2 className="text-2xl font-semibold">Create New Job</h2>
        <p className="text-muted-foreground">Add a new job posting to your recruitment pipeline</p>
      </div>
      
      <AddJobForm />
    </PageContainer>
  );
};

export default AddJob;
