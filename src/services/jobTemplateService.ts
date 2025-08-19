import { FormValues } from "@/components/jobs/types";

export interface JobTemplate {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  template: Omit<FormValues, "companyId">; // Exclude company since it's specific to each job
}

const STORAGE_KEY = "jobTemplates";

// Mock templates for initial data
const mockTemplates: JobTemplate[] = [
  {
    id: "template-1",
    name: "Software Engineer Template",
    description: "Standard template for software engineering positions",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    template: {
      title: "Software Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      status: "Active",
      department: "Engineering",
      salary: "$80,000 - $120,000",
      description: "We are seeking a talented Software Engineer to join our dynamic team. You will be responsible for developing high-quality applications and working collaboratively with cross-functional teams.",
      requirements: "• Bachelor's degree in Computer Science or related field\n• 3+ years of experience in software development\n• Proficiency in JavaScript, React, and Node.js\n• Strong problem-solving skills",
      responsibilities: "• Design and develop software applications\n• Collaborate with product managers and designers\n• Write clean, maintainable code\n• Participate in code reviews",
      benefits: "• Competitive salary and equity\n• Comprehensive health insurance\n• Flexible work arrangements\n• Professional development opportunities",
      startDate: "",
      pipelineId: "",
      createNewPipeline: false,
      newPipelineName: "",
      applicationFormId: "",
      useDefaultForm: true,
    }
  },
  {
    id: "template-2", 
    name: "Marketing Manager Template",
    description: "Template for marketing management roles",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
    template: {
      title: "Marketing Manager",
      location: "New York, NY",
      type: "Full-time",
      status: "Active",
      department: "Marketing",
      salary: "$70,000 - $100,000",
      description: "Join our marketing team as a Marketing Manager where you'll lead strategic campaigns and drive brand awareness.",
      requirements: "• Bachelor's degree in Marketing or related field\n• 5+ years of marketing experience\n• Experience with digital marketing tools\n• Strong analytical skills",
      responsibilities: "• Develop and execute marketing strategies\n• Manage marketing campaigns\n• Analyze market trends and customer behavior\n• Collaborate with sales and product teams",
      benefits: "• Competitive salary\n• Health and dental insurance\n• 401(k) matching\n• Flexible PTO",
      startDate: "",
      pipelineId: "",
      createNewPipeline: false,
      newPipelineName: "",
      applicationFormId: "",
      useDefaultForm: true,
    }
  }
];

export const jobTemplateService = {
  // Get all templates
  getTemplates(): JobTemplate[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with mock data if no stored templates
      this.saveTemplates(mockTemplates);
      return mockTemplates;
    } catch (error) {
      console.error("Error loading job templates:", error);
      return mockTemplates;
    }
  },

  // Save templates to storage
  saveTemplates(templates: JobTemplate[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    } catch (error) {
      console.error("Error saving job templates:", error);
    }
  },

  // Get template by ID
  getTemplate(id: string): JobTemplate | null {
    const templates = this.getTemplates();
    return templates.find(template => template.id === id) || null;
  },

  // Create new template
  createTemplate(name: string, description: string, formData: FormValues): JobTemplate {
    const templates = this.getTemplates();
    const newTemplate: JobTemplate = {
      id: `template-${Date.now()}`,
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      template: {
        ...formData,
        companyId: undefined, // Remove company-specific data
      } as Omit<FormValues, "companyId">
    };

    const updatedTemplates = [newTemplate, ...templates];
    this.saveTemplates(updatedTemplates);
    return newTemplate;
  },

  // Update existing template
  updateTemplate(id: string, updates: Partial<Pick<JobTemplate, "name" | "description" | "template">>): JobTemplate | null {
    const templates = this.getTemplates();
    const index = templates.findIndex(template => template.id === id);
    
    if (index === -1) return null;

    const updatedTemplate = {
      ...templates[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    templates[index] = updatedTemplate;
    this.saveTemplates(templates);
    return updatedTemplate;
  },

  // Delete template
  deleteTemplate(id: string): boolean {
    const templates = this.getTemplates();
    const filteredTemplates = templates.filter(template => template.id !== id);
    
    if (filteredTemplates.length === templates.length) {
      return false; // Template not found
    }

    this.saveTemplates(filteredTemplates);
    return true;
  },

  // Apply template to form data
  applyTemplate(templateId: string): Omit<FormValues, "companyId"> | null {
    const template = this.getTemplate(templateId);
    return template ? template.template : null;
  }
};