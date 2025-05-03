
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  Users,
  CheckCircle,
  ChevronRight,
  ChevronLeft 
} from "lucide-react";
import { toast } from "sonner";
import { mockCompanies } from "@/components/companies/CompaniesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Job form schema
const formSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  companyId: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["Full-time", "Part-time", "Contract", "Remote"]),
  status: z.enum(["Active", "Paused", "Closed"]).default("Active"),
  description: z.string().optional(),
  salary: z.string().optional(),
  department: z.string().optional(),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
  startDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];
const jobStatuses = ["Active", "Paused", "Closed"];

export const AddJobForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { id: "basic", label: "Basic Info" },
    { id: "details", label: "Job Details" },
    { id: "review", label: "Review & Submit" }
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Active",
      type: "Full-time",
    },
    mode: "onChange"
  });

  const selectedCompanyId = watch("companyId");
  const selectedCompany = selectedCompanyId
    ? mockCompanies.find((company) => company.id === selectedCompanyId)
    : null;
  
  const formValues = watch();

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    
    if (currentStep === 0) {
      fieldsToValidate = ['title', 'companyId', 'location', 'type', 'status'];
    } else if (currentStep === 1) {
      fieldsToValidate = ['description', 'requirements', 'responsibilities'];
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
      
      navigate("/jobs");
    } catch (error) {
      toast.error("Failed to add job", {
        description: "There was an error adding the job. Please try again.",
      });
      console.error("Error adding job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                Job Title
              </Label>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="title"
                  placeholder="e.g. Senior Frontend Developer"
                  className="pl-10"
                  {...register("title")}
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company" className="text-base font-medium">
                Company
              </Label>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
                <Select
                  onValueChange={(value) => setValue("companyId", value)}
                  defaultValue=""
                >
                  <SelectTrigger className="pl-10 w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCompanies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.companyId && (
                <p className="mt-1 text-sm text-red-500">{errors.companyId.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location" className="text-base font-medium">
                Location
              </Label>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA or Remote"
                  className="pl-10"
                  {...register("location")}
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="type" className="text-base font-medium">
                  Job Type
                </Label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <Select
                    onValueChange={(value) => setValue("type", value as any)}
                    defaultValue="Full-time"
                  >
                    <SelectTrigger className="pl-10 w-full">
                      <SelectValue placeholder="Select a job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status" className="text-base font-medium">
                  Status
                </Label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <Select
                    onValueChange={(value) => setValue("status", value as any)}
                    defaultValue="Active"
                  >
                    <SelectTrigger className="pl-10 w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="description" className="text-base font-medium">
                Job Description
              </Label>
              <div className="relative mt-1.5">
                <textarea
                  id="description"
                  rows={4}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Overall job description..."
                  {...register("description")}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="requirements" className="text-base font-medium">
                Requirements
              </Label>
              <div className="relative mt-1.5">
                <textarea
                  id="requirements"
                  rows={3}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Skills, education, experience required..."
                  {...register("requirements")}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="responsibilities" className="text-base font-medium">
                Responsibilities
              </Label>
              <div className="relative mt-1.5">
                <textarea
                  id="responsibilities"
                  rows={3}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Key duties and responsibilities..."
                  {...register("responsibilities")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="department" className="text-base font-medium">
                  Department
                </Label>
                <Input
                  id="department"
                  placeholder="e.g. Engineering, Marketing"
                  {...register("department")}
                />
              </div>

              <div>
                <Label htmlFor="salary" className="text-base font-medium">
                  Salary Range
                </Label>
                <Input
                  id="salary"
                  placeholder="e.g. $80,000 - $120,000"
                  {...register("salary")}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-4">Review Job Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Job Title:</span>
                    <p className="text-base">{formValues.title}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Company:</span>
                    <p className="text-base">{selectedCompany?.name}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Location:</span>
                    <p className="text-base">{formValues.location}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Type:</span>
                    <p className="text-base">{formValues.type}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Status:</span>
                    <p className="text-base">{formValues.status}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">Department:</span>
                    <p className="text-base">{formValues.department || "Not specified"}</p>
                  </div>
                </div>
              </div>
              
              {formValues.description && (
                <div className="mt-4">
                  <span className="text-sm font-medium">Description:</span>
                  <p className="text-base mt-1">{formValues.description}</p>
                </div>
              )}
              
              {formValues.requirements && (
                <div className="mt-4">
                  <span className="text-sm font-medium">Requirements:</span>
                  <p className="text-base mt-1">{formValues.requirements}</p>
                </div>
              )}
              
              {formValues.responsibilities && (
                <div className="mt-4">
                  <span className="text-sm font-medium">Responsibilities:</span>
                  <p className="text-base mt-1">{formValues.responsibilities}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 0 ? () => navigate("/jobs") : prevStep}
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
                  Submit Job
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
    </Card>
  );
};
