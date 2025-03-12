
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
import { Briefcase, Building2, MapPin, Calendar, Users } from "lucide-react";
import { toast } from "sonner";
import { mockCompanies } from "@/components/companies/CompaniesTable";

// Job form schema
const formSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  companyId: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  type: z.enum(["Full-time", "Part-time", "Contract", "Remote"]),
  status: z.enum(["Active", "Paused", "Closed"]).default("Active"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const jobTypes = ["Full-time", "Part-time", "Contract", "Remote"];
const jobStatuses = ["Active", "Paused", "Closed"];

export const AddJobForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Active",
      type: "Full-time",
    },
  });

  const selectedCompanyId = watch("companyId");
  const selectedCompany = selectedCompanyId
    ? mockCompanies.find((company) => company.id === selectedCompanyId)
    : null;

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Description
            </Label>
            <div className="relative mt-1.5">
              <textarea
                id="description"
                rows={4}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Job description and requirements..."
                {...register("description")}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/jobs")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Job"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
