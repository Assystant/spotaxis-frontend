
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GripVertical, Eye, Plus } from "lucide-react";

interface Stage {
  id: string;
  name: string;
  scorecardId?: string;
  scorecardType: "Default" | "User generated" | "Customise";
}

interface PipelineScorecardSectionProps {
  pipelineId: string;
  pipelineName: string;
}

// Mock data for stages based on pipeline
const mockPipelineStages: Record<string, Stage[]> = {
  "p1": [
    { id: "s1", name: "Application Review", scorecardId: "default", scorecardType: "Default" },
    { id: "s2", name: "Phone Screening", scorecardId: "default", scorecardType: "Default" },
    { id: "s3", name: "Technical Interview", scorecardId: "tech-eval", scorecardType: "User generated" },
    { id: "s4", name: "Final Interview", scorecardId: "default", scorecardType: "Default" },
  ],
  "p2": [
    { id: "s5", name: "Resume Review", scorecardId: "default", scorecardType: "Default" },
    { id: "s6", name: "Executive Assessment", scorecardId: "exec-eval", scorecardType: "User generated" },
    { id: "s7", name: "Panel Interview", scorecardId: "default", scorecardType: "Default" },
  ],
  "p3": [
    { id: "s8", name: "Initial Screening", scorecardId: "default", scorecardType: "Default" },
    { id: "s9", name: "Coding Challenge", scorecardId: "coding-eval", scorecardType: "User generated" },
    { id: "s10", name: "System Design", scorecardId: "design-eval", scorecardType: "User generated" },
    { id: "s11", name: "Culture Fit", scorecardId: "default", scorecardType: "Default" },
  ],
};

const scorecardOptions = [
  { value: "default", label: "Default", type: "Default" as const },
  { value: "tech-eval", label: "Technical Evaluation", type: "User generated" as const },
  { value: "exec-eval", label: "Executive Assessment", type: "User generated" as const },
  { value: "coding-eval", label: "Coding Assessment", type: "User generated" as const },
  { value: "design-eval", label: "System Design Review", type: "User generated" as const },
  { value: "customise", label: "Customise", type: "Customise" as const },
];

export const PipelineScorecardSection = ({ pipelineId, pipelineName }: PipelineScorecardSectionProps) => {
  const [stages, setStages] = useState<Stage[]>(mockPipelineStages[pipelineId] || []);
  const [activeTab, setActiveTab] = useState("stages");

  const handleScorecardChange = (stageId: string, scorecardValue: string) => {
    const selectedOption = scorecardOptions.find(opt => opt.value === scorecardValue);
    if (!selectedOption) return;

    setStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? { 
            ...stage, 
            scorecardId: scorecardValue, 
            scorecardType: selectedOption.type 
          }
        : stage
    ));
  };

  const handlePreview = (scorecardId: string) => {
    console.log("Preview scorecard:", scorecardId);
    // Implement preview logic here
  };

  const handleCreateCustom = () => {
    console.log("Create custom scorecard");
    // Implement custom scorecard creation logic here
  };

  const moveStage = (fromIndex: number, toIndex: number) => {
    const newStages = [...stages];
    const [movedStage] = newStages.splice(fromIndex, 1);
    newStages.splice(toIndex, 0, movedStage);
    setStages(newStages);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Pipeline Configuration</span>
          <span className="text-sm font-normal text-muted-foreground">({pipelineName})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stages">Stages</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="automate">Automate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stages" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Pipeline Stages</h3>
              <p className="text-sm text-muted-foreground">
                Drag stages to reorder the pipeline flow
              </p>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Stage Name</TableHead>
                    <TableHead>Scorecard</TableHead>
                    <TableHead className="w-24">Preview</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stages.map((stage, index) => (
                    <TableRow key={stage.id}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <GripVertical 
                            className="h-4 w-4 text-muted-foreground cursor-move" 
                            onMouseDown={(e) => {
                              // Simple drag implementation - in a real app, you'd use a proper drag library
                              console.log("Drag started for stage:", stage.name);
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{stage.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Stage {index + 1} of {stages.length}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            value={stage.scorecardId}
                            onValueChange={(value) => handleScorecardChange(stage.id, value)}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Select scorecard" />
                            </SelectTrigger>
                            <SelectContent>
                              {scorecardOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    <span>{option.label}</span>
                                    {option.type === "Customise" && (
                                      <Plus className="h-3 w-3" />
                                    )}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {stage.scorecardType === "Customise" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={handleCreateCustom}
                            >
                              Create
                            </Button>
                          )}
                        </div>
                        
                        <div className="text-xs text-muted-foreground mt-1">
                          Type: {stage.scorecardType}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(stage.scorecardId || "")}
                          disabled={!stage.scorecardId || stage.scorecardType === "Customise"}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {stages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No stages configured for this pipeline
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <h3 className="text-lg font-medium mb-2">Pipeline Rules</h3>
              <p>Configure automation rules and criteria for stage progression</p>
              <p className="text-sm mt-2">Coming soon...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="automate" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <h3 className="text-lg font-medium mb-2">Automation Settings</h3>
              <p>Set up automated actions and notifications</p>
              <p className="text-sm mt-2">Coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
