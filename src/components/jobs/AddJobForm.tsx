import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  Users,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ListChecks,
  FileText,
  FileCheck,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { mockCompanies } from "@/components/companies/CompaniesTable";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@/components/ui/dialog";
import { JobPromotionDialog } from "./JobPromotionDialog";
import { PipelineScorecardSection } from "./PipelineScorecardSection";

// Job form schema
const formSchema = z.object({
  // Step 1: Job details
  title: z.string().min(3, "Job title must be at least 3 characters"),
  companyId: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["Full-time", "Part-time", "Contract", "Remote"]),
  status: z.enum(["Active", "Paused", "Closed"]).default("Active"),
  department: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().min(10, "Job description is required"),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
  startDate: z.string().optional(),
  
  // Step 2: Pipeline settings
  pipelineId: z.string().optional(),
  createNewPipeline: z.boolean().default(false),
  newPipelineName: z.string().optional(),
  scoreCardId: z.string().optional(),
  createNewScoreCard: z.boolean().default(false),
  newScoreCardName: z.string().optional(),
  
  // Step 3: Application form
  applicationFormId: z.string().optional(),
  useDefaultForm: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];
const jobStatuses = ["Active", "Paused", "Closed"];

// Mock data for pipelines, scorecards, and application forms
const mockPipelines = [
  { id: "p1", name: "Standard Recruitment Pipeline" },
  { id: "p2", name: "Executive Search Pipeline" },
  { id: "p3", name: "Technical Hiring Pipeline" },
];

const mockScoreCards = [
  { id: "s1", name: "Engineering Assessment" },
  { id: "s2", name: "Leadership Evaluation" },
  { id: "s3", name: "Cultural Fit Assessment" },
];

const mockApplicationForms = [
  { id: "f1", name: "Standard Application" },
  { id: "f2", name: "Detailed Technical Application" },
  { id: "f3", name: "Quick Apply Form" },
];

export const AddJobForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [jobCreated, setJobCreated] = useState<FormValues | null>(null);
  
  const steps = [
    { id: "details", label: "Job Details" },
    { id: "pipeline", label: "Pipeline & Scoring" },
    { id: "application", label: "Application Form" }
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Active",
      type: "Full-time",
      createNewPipeline: false,
      createNewScoreCard: false,
      useDefaultForm: true,
    },
    mode: "onChange"
  });

  const { watch, trigger, setValue } = form;
  
  const selectedCompanyId = watch("companyId");
  const selectedCompany = selectedCompanyId
    ? mockCompanies.find((company) => company.id === selectedCompanyId)
    : null;
  
  const createNewPipeline = watch("createNewPipeline");
  const createNewScoreCard = watch("createNewScoreCard");
  const useDefaultForm = watch("useDefaultForm");
  const selectedPipelineId = watch("pipelineId");
  const selectedPipeline = selectedPipelineId 
    ? mockPipelines.find(p => p.id === selectedPipelineId)
    : null;
  
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
      
      if (createNewScoreCard) {
        fieldsToValidate.push('newScoreCardName');
      } else {
        fieldsToValidate.push('scoreCardId');
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
            {/* Step 1: Job Details */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Job Title</FormLabel>
                      <div className="relative mt-1.5">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Briefcase className="w-5 h-5 text-gray-400" />
                        </div>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Frontend Developer"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Company</FormLabel>
                      <div className="relative mt-1.5">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Building2 className="w-5 h-5 text-gray-400" />
                        </div>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
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
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Location</FormLabel>
                      <div className="relative mt-1.5">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPin className="w-5 h-5 text-gray-400" />
                        </div>
                        <FormControl>
                          <Input
                            placeholder="e.g. San Francisco, CA or Remote"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Job Type</FormLabel>
                        <div className="relative mt-1.5">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Calendar className="w-5 h-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Status</FormLabel>
                        <div className="relative mt-1.5">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Users className="w-5 h-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the job role and responsibilities..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Department</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Engineering, Marketing"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Salary Range</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. $80,000 - $120,000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Pipeline & Scorecard */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recruitment Pipeline</h3>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <input 
                      type="checkbox" 
                      id="createPipeline" 
                      checked={createNewPipeline}
                      onChange={(e) => setValue("createNewPipeline", e.target.checked)}
                      className="rounded border-gray-300 text-primary"
                    />
                    <Label htmlFor="createPipeline">Create new pipeline</Label>
                  </div>

                  {createNewPipeline ? (
                    <FormField
                      control={form.control}
                      name="newPipelineName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">New Pipeline Name</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="Enter pipeline name" {...field} />
                            </FormControl>
                            <Button variant="outline" size="icon" type="button">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="pipelineId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Select Pipeline</FormLabel>
                          <div className="relative mt-1.5">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <ListChecks className="w-5 h-5 text-gray-400" />
                            </div>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="pl-10 w-full">
                                  <SelectValue placeholder="Select a pipeline" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockPipelines.map((pipeline) => (
                                    <SelectItem key={pipeline.id} value={pipeline.id}>
                                      {pipeline.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Pipeline Scorecard Section - Only show when pipeline is selected */}
                {selectedPipelineId && selectedPipeline && !createNewPipeline && (
                  <PipelineScorecardSection 
                    pipelineId={selectedPipelineId}
                    pipelineName={selectedPipeline.name}
                  />
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Scorecard</h3>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <input 
                      type="checkbox" 
                      id="createScoreCard" 
                      checked={createNewScoreCard}
                      onChange={(e) => setValue("createNewScoreCard", e.target.checked)}
                      className="rounded border-gray-300 text-primary"
                    />
                    <Label htmlFor="createScoreCard">Create new scorecard</Label>
                  </div>

                  {createNewScoreCard ? (
                    <FormField
                      control={form.control}
                      name="newScoreCardName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">New Scorecard Name</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="Enter scorecard name" {...field} />
                            </FormControl>
                            <Button variant="outline" size="icon" type="button">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="scoreCardId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Select Scorecard</FormLabel>
                          <div className="relative mt-1.5">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <FileCheck className="w-5 h-5 text-gray-400" />
                            </div>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="pl-10 w-full">
                                  <SelectValue placeholder="Select a scorecard" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mockScoreCards.map((scoreCard) => (
                                    <SelectItem key={scoreCard.id} value={scoreCard.id}>
                                      {scoreCard.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Application Form */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Application Form</h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <input 
                    type="checkbox" 
                    id="useDefaultForm" 
                    checked={useDefaultForm}
                    onChange={(e) => setValue("useDefaultForm", e.target.checked)}
                    className="rounded border-gray-300 text-primary"
                  />
                  <Label htmlFor="useDefaultForm">Use default application form</Label>
                </div>

                {!useDefaultForm && (
                  <FormField
                    control={form.control}
                    name="applicationFormId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Select Application Form</FormLabel>
                        <div className="relative mt-1.5">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FileText className="w-5 h-5 text-gray-400" />
                          </div>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="pl-10 w-full">
                                <SelectValue placeholder="Select a form" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockApplicationForms.map((form) => (
                                  <SelectItem key={form.id} value={form.id}>
                                    {form.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {useDefaultForm && (
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Default Application Form</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The default application form includes the following fields:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Full Name</li>
                      <li>Email Address</li>
                      <li>Phone Number</li>
                      <li>Resume/CV Upload</li>
                      <li>Cover Letter (Optional)</li>
                      <li>Work Experience</li>
                      <li>Education</li>
                    </ul>
                  </div>
                )}

                <div className="bg-muted/30 p-4 rounded-md mt-6">
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
                      
                      <div>
                        <span className="text-sm font-medium">Type:</span>
                        <p className="text-base">{formValues.type}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Status:</span>
                        <p className="text-base">{formValues.status}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Department:</span>
                        <p className="text-base">{formValues.department || "Not specified"}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Pipeline:</span>
                        <p className="text-base">
                          {createNewPipeline 
                            ? formValues.newPipelineName || "New pipeline" 
                            : mockPipelines.find(p => p.id === formValues.pipelineId)?.name || "Not selected"}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Application Form:</span>
                        <p className="text-base">
                          {useDefaultForm 
                            ? "Default Application Form" 
                            : mockApplicationForms.find(f => f.id === formValues.applicationFormId)?.name || "Not selected"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
