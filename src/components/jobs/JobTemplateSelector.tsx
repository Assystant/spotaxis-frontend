import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FileText } from "lucide-react";
import { jobTemplateService } from "@/services/jobTemplateService";

interface JobTemplateSelectorProps {
  form: UseFormReturn<FormValues>;
}

export const JobTemplateSelector = ({ form }: JobTemplateSelectorProps) => {
  const templates = jobTemplateService.getTemplates();

  const handleTemplateSelect = (templateId: string) => {
    if (templateId === "none") return;
    
    const templateData = jobTemplateService.applyTemplate(templateId);
    if (templateData) {
      // Reset form with template data while preserving companyId
      const currentCompanyId = form.getValues("companyId");
      form.reset({
        ...templateData,
        companyId: currentCompanyId,
      });
    }
  };

  return (
    <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-dashed">
      <FormField
        control={form.control}
        name="title" // We use title as a dummy field since we don't need to store template selection
        render={() => (
          <FormItem>
            <FormLabel className="text-base font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Start with a Template (Optional)
            </FormLabel>
            <FormControl>
              <Select onValueChange={handleTemplateSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a template to pre-fill the form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None - Start from scratch</SelectItem>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{template.name}</span>
                        {template.description && (
                          <span className="text-xs text-muted-foreground">
                            {template.description}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};