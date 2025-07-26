
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";
import { mockPipelines } from "./mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { ListChecks, Plus } from "lucide-react";
import { PipelineScorecardSection } from "./PipelineScorecardSection";

interface PipelineStepProps {
  form: UseFormReturn<FormValues>;
}

export const PipelineStep = ({ form }: PipelineStepProps) => {
  const { watch, setValue } = form;
  const createNewPipeline = watch("createNewPipeline");
  const selectedPipelineId = watch("pipelineId");
  const selectedPipeline = selectedPipelineId 
    ? mockPipelines.find(p => p.id === selectedPipelineId)
    : null;

  return (
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

      {/* Show pipeline scorecard configuration if a pipeline is selected */}
      {selectedPipeline && (
        <div className="mt-6">
          <PipelineScorecardSection 
            pipelineId={selectedPipeline.id} 
            pipelineName={selectedPipeline.name} 
          />
        </div>
      )}
    </div>
  );
};
