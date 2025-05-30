
import React from "react";
import { FormValues } from "./types";
import { mockPipelines, mockApplicationForms } from "./mockData";
import { mockCompanies } from "@/components/companies/CompaniesTable";

interface JobReviewSectionProps {
  formValues: FormValues;
}

export const JobReviewSection = ({ formValues }: JobReviewSectionProps) => {
  const selectedCompany = formValues.companyId
    ? mockCompanies.find((company) => company.id === formValues.companyId)
    : null;

  return (
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
              {formValues.createNewPipeline 
                ? formValues.newPipelineName || "New pipeline" 
                : mockPipelines.find(p => p.id === formValues.pipelineId)?.name || "Not selected"}
            </p>
          </div>
          
          <div>
            <span className="text-sm font-medium">Application Form:</span>
            <p className="text-base">
              {formValues.useDefaultForm 
                ? "Default Application Form" 
                : mockApplicationForms.find(f => f.id === formValues.applicationFormId)?.name || "Not selected"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
