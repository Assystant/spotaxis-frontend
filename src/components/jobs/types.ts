
import { z } from "zod";

// Job form schema
export const formSchema = z.object({
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
  
  // Step 3: Application form
  applicationFormId: z.string().optional(),
  useDefaultForm: z.boolean().default(true),
});

export type FormValues = z.infer<typeof formSchema>;

export const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];
export const jobStatuses = ["Active", "Paused", "Closed"];

export const steps = [
  { id: "details", label: "Job Details" },
  { id: "pipeline", label: "Pipeline & Scoring" },
  { id: "application", label: "Application Form" }
];
