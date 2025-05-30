
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";
import { mockApplicationForms } from "./mockData";
import { Label } from "@/components/ui/label";
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
  FormMessage,
} from "@/components/ui/form";
import { FileText } from "lucide-react";

interface ApplicationFormStepProps {
  form: UseFormReturn<FormValues>;
}

export const ApplicationFormStep = ({ form }: ApplicationFormStepProps) => {
  const { watch, setValue } = form;
  const useDefaultForm = watch("useDefaultForm");

  return (
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
    </div>
  );
};
