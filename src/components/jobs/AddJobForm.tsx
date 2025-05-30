
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { mockCompanies } from "@/components/companies/CompaniesTable";
import { JobPromotionDialog } from "./JobPromotionDialog";
import { JobDetailsStep } from "./JobDetailsStep";
import { PipelineStep } from "./PipelineStep";
import { ApplicationFormStep } from "./ApplicationFormStep";
import { JobReviewSection } from "./JobReviewSection";
import { FormValues, formSchema, steps } from "./types";

export const AddJobForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [jobCreated, setJobCreated] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Active",
      type: "Full-time",
      createNewPipeline: false,
      useDefaultForm: true,
    },
    mode: "onChange"
  });

  const { watch, trigger } = form;
  
  const selectedCompanyId = watch("companyId");
  const selectedCompany = selectedCompanyId
    ? mockCompanies.find((company) => company.id === selectedCompanyId)
    : null;
  
  const createNewPipeline = watch("createNewPipeline");
  const formValues = watch();

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    
    if (currentStep === 0) {
      fieldsToValidate = ['title', 'companyId', 'location', 'type', 'status', 'description'];
    } else if (currentStep === 1) {
      if (createNewPipeline) {
        fieldsToValidate = ['newPipelineName'];
      } else {
        fieldsToValidate = ['pipelineId'];
      }
    }
    
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => prev < steps.length - 1 ? prev + 1 : prev);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev > 0 ? prev - 1 : prev);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send data to your API
      console.log("Form submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Job added successfully", {
        description: `${data.title} at ${selectedCompany?.name} has been created.`,
      });
      
      setJobCreated(data);
      setShowPromotionDialog(true);
    } catch (error) {
      toast.error("Failed to add job", {
        description: "There was an error adding the job. Please try again.",
      });
      console.error("Error adding job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <JobDetailsStep form={form} />;
      case 1:
        return <PipelineStep form={form} />;
      case 2:
        return (
          <>
            <ApplicationFormStep form={form} />
            <JobReviewSection formValues={formValues} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, idx) => (
              <span 
                key={step.id} 
                className={`text-sm font-medium ${currentStep >= idx ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {step.label}
              </span>
            ))}
          </div>
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderCurrentStep()}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={currentStep === 0 ? () => navigate("/ats1/jobs") : prevStep}
                disabled={isSubmitting}
                className="gap-2"
              >
                {currentStep === 0 ? 'Cancel' : (
                  <>
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </>
                )}
              </Button>
              
              <Button 
                type={currentStep === steps.length - 1 ? "submit" : "button"}
                onClick={currentStep === steps.length - 1 ? undefined : nextStep}
                disabled={isSubmitting}
                className="gap-2"
              >
                {currentStep === steps.length - 1 ? (
                  isSubmitting ? "Adding..." : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Create Job
                    </>
                  )
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      <JobPromotionDialog
        open={showPromotionDialog}
        onOpenChange={setShowPromotionDialog}
        jobTitle={jobCreated?.title || ""}
        companyName={selectedCompany?.name || ""}
      />
    </>
  );
};
