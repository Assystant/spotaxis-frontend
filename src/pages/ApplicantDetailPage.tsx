import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { ApplicantDetail } from "@/components/applicants/ApplicantDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ApplicantDetailPage = () => {
  const { applicantId } = useParams<{ applicantId: string }>();
  const navigate = useNavigate();

  if (!applicantId) {
    return (
      <PageContainer title="Applicant Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Applicant ID is required</p>
          <Button onClick={() => navigate("/applicants")}>
            Back to Applicants
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Applicant Details">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/applicants")}
          className="gap-2 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Applicants
        </Button>
      </div>
      
      <div className="rounded-2xl shadow-md">
        <ApplicantDetail id={applicantId} />
      </div>
    </PageContainer>
  );
};

export default ApplicantDetailPage;