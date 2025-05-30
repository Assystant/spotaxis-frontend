
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues, jobTypes, jobStatuses } from "./types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  Users,
} from "lucide-react";
import { mockCompanies } from "@/components/companies/CompaniesTable";

interface JobDetailsStepProps {
  form: UseFormReturn<FormValues>;
}

export const JobDetailsStep = ({ form }: JobDetailsStepProps) => {
  return (
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
  );
};
