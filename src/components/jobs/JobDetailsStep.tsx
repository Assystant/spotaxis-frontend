
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues, employmentTypes, jobTypes, jobStatuses, workSchedules, travelOptions, educationLevels } from "./types";
import { JobTemplateSelector } from "./JobTemplateSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  Clock,
  Plane,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Settings,
} from "lucide-react";
import { mockCompanies } from "@/components/companies/CompaniesTable";

interface JobDetailsStepProps {
  form: UseFormReturn<FormValues>;
}

export const JobDetailsStep = ({ form }: JobDetailsStepProps) => {
  const [isAdditionalPrefsOpen, setIsAdditionalPrefsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <JobTemplateSelector form={form} />
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="employmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Employment Type</FormLabel>
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
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
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
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Job Type</FormLabel>
              <div className="relative mt-1.5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="pl-10 w-full">
                      <SelectValue placeholder="Select job type" />
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

        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Benefits & Perks</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe benefits, perks, and compensation details..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Preferences - Collapsible Section */}
        <Collapsible 
          open={isAdditionalPrefsOpen} 
          onOpenChange={setIsAdditionalPrefsOpen}
          className="border rounded-lg p-4 bg-muted/30"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-base font-medium">Additional Preferences</span>
            </div>
            {isAdditionalPrefsOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-4">
            {/* Quick Options */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="urgentHiring"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        Urgent Hiring
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Mark as priority position
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featuredListing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        Featured Listing
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Highlight in job boards
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visaSponsorship"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        Visa Sponsorship
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Available for eligible candidates
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Experience Level as Years Range */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="experienceMinYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Minimum Experience (Years)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 2"
                        min="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceMaxYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Maximum Experience (Years)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 5"
                        min="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Work Schedule and Travel */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="workSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Work Schedule</FormLabel>
                    <div className="relative mt-1.5">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="pl-10 w-full">
                            <SelectValue placeholder="Select schedule" />
                          </SelectTrigger>
                          <SelectContent>
                            {workSchedules.map((schedule) => (
                              <SelectItem key={schedule} value={schedule}>
                                {schedule}
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
                name="travelRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Travel Required</FormLabel>
                    <div className="relative mt-1.5">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Plane className="w-4 h-4 text-gray-400" />
                      </div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="pl-10 w-full">
                            <SelectValue placeholder="Select travel requirement" />
                          </SelectTrigger>
                          <SelectContent>
                            {travelOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
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

            {/* Additional Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="applicationDeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Application Deadline</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfOpenings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Number of Openings</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 1, 2, 5"
                        min="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reportsTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Reports To</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Engineering Manager, VP of Sales"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="educationRequirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Education Requirement</FormLabel>
                    <div className="relative mt-1.5">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                      </div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="pl-10 w-full">
                            <SelectValue placeholder="Select education level" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
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
              name="languageRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Language Requirements</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. English (fluent), Spanish (conversational)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Checkboxes */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="securityClearance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        Security Clearance Required
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Position requires security clearance
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backgroundCheck"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        Background Check Required
                      </FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Standard background screening
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Preferred Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };
