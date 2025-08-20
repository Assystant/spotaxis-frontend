
import { z } from "zod";

// Job form schema
export const formSchema = z.object({
  // Step 1: Job details
  title: z.string().min(3, "Job title must be at least 3 characters"),
  companyId: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Temporary"]),
  jobType: z.enum(["Remote", "On-site", "Hybrid"]),
  status: z.enum(["Active", "Paused", "Closed"]).default("Active"),
  department: z.string().optional(),
  salary: z.string().optional(),
  description: z.string().min(10, "Job description is required"),
  benefits: z.string().optional(),
  startDate: z.string().optional(),
  
  // Additional fields (moved to additional preferences)
  experienceMinYears: z.string().optional(),
  experienceMaxYears: z.string().optional(),
  workSchedule: z.enum(["Day Shift", "Night Shift", "Rotating", "Flexible"]).optional(),
  travelRequired: z.enum(["None", "Occasional", "25%", "50%", "75%", "100%"]).optional(),
  
  // Additional preferences (expandable section)
  urgentHiring: z.boolean().default(false),
  featuredListing: z.boolean().default(false),
  applicationDeadline: z.string().optional(),
  numberOfOpenings: z.string().optional(),
  reportsTo: z.string().optional(),
  educationRequirement: z.enum(["High School", "Bachelor's", "Master's", "PhD", "Not Specified"]).optional(),
  languageRequirements: z.string().optional(),
  visaSponsorship: z.boolean().default(false),
  securityClearance: z.boolean().default(false),
  backgroundCheck: z.boolean().default(false),
  
  // Step 2: Pipeline settings
  pipelineId: z.string().optional(),
  createNewPipeline: z.boolean().default(false),
  newPipelineName: z.string().optional(),
  
  // Step 3: Application form
  applicationFormId: z.string().optional(),
  useDefaultForm: z.boolean().default(true),
});

export type FormValues = z.infer<typeof formSchema>;

export const employmentTypes = ["Full-time", "Part-time", "Contract", "Temporary"];
export const jobTypes = ["Remote", "On-site", "Hybrid"];
export const jobStatuses = ["Active", "Paused", "Closed"];
export const workSchedules = ["Day Shift", "Night Shift", "Rotating", "Flexible"];
export const travelOptions = ["None", "Occasional", "25%", "50%", "75%", "100%"];
export const educationLevels = ["High School", "Bachelor's", "Master's", "PhD", "Not Specified"];

export const steps = [
  { id: "details", label: "Job Details" },
  { id: "pipeline", label: "Pipeline & Scoring" },
  { id: "application", label: "Application Form" }
];
