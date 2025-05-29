
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { AddJobForm } from "@/components/jobs/AddJobForm";
import { ArrowLeft, Save, Eye } from "lucide-react";

const Ats1AddJob = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const handleBack = () => {
    navigate("/ats1/jobs");
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving job...");
    navigate("/ats1/jobs");
  };

  const handlePreview = () => {
    // Handle preview logic here
    console.log("Previewing job...");
  };

  return (
    <PageContainer title="Create New Job">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft size={16} className="mr-2" />
              Back to ATS1 Jobs
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Create New Job</h1>
              <p className="text-muted-foreground">Step {currentStep} of 3</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye size={16} className="mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Save Job
            </Button>
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent>
            <AddJobForm />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Ats1AddJob;
