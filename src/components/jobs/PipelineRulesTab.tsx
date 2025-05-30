
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Settings } from "lucide-react";
import { BuildRuleDialog } from "./BuildRuleDialog";

interface Rule {
  id: string;
  name: string;
  type: string;
  color: string;
}

interface PipelineStage {
  id: string;
  name: string;
  rules: Rule[];
}

interface PipelineRulesTabProps {
  pipelineId: string;
  pipelineName: string;
}

const availableRules: Rule[] = [
  { id: "notify-1", name: "Notify", type: "notification", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "max-app-1", name: "Max Application Rule", type: "limit", color: "bg-green-100 text-green-800 border-green-200" },
  { id: "auto-reject-1", name: "Auto Reject", type: "automation", color: "bg-red-100 text-red-800 border-red-200" },
  { id: "schedule-1", name: "Schedule Interview", type: "scheduling", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "reminder-1", name: "Send Reminder", type: "notification", color: "bg-orange-100 text-orange-800 border-orange-200" },
];

const mockPipelineStages: PipelineStage[] = [
  { id: "stage-1", name: "Application Review", rules: [] },
  { id: "stage-2", name: "Phone Screening", rules: [] },
  { id: "stage-3", name: "Technical Interview", rules: [] },
  { id: "stage-4", name: "Final Interview", rules: [] },
  { id: "stage-5", name: "Offer", rules: [] },
];

export const PipelineRulesTab = ({ pipelineId, pipelineName }: PipelineRulesTabProps) => {
  const [stages, setStages] = useState<PipelineStage[]>(mockPipelineStages);
  const [pipelineRules, setPipelineRules] = useState<Rule[]>([]);
  const [showBuildRuleDialog, setShowBuildRuleDialog] = useState(false);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    // Handle dragging from available rules to stages or pipeline
    if (source.droppableId === "available-rules") {
      const rule = availableRules[source.index];
      const newRule = { ...rule, id: `${rule.id}-${Date.now()}` };

      if (destination.droppableId === "pipeline-rules") {
        setPipelineRules(prev => [...prev, newRule]);
      } else if (destination.droppableId.startsWith("stage-")) {
        const stageId = destination.droppableId;
        setStages(prev => prev.map(stage => 
          stage.id === stageId 
            ? { ...stage, rules: [...stage.rules, newRule] }
            : stage
        ));
      }
    }
  };

  const removeRule = (ruleId: string, stageId?: string) => {
    if (stageId) {
      setStages(prev => prev.map(stage => 
        stage.id === stageId 
          ? { ...stage, rules: stage.rules.filter(rule => rule.id !== ruleId) }
          : stage
      ));
    } else {
      setPipelineRules(prev => prev.filter(rule => rule.id !== ruleId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Pipeline Rules</h3>
          <p className="text-sm text-muted-foreground">Configure rules for {pipelineName}</p>
        </div>
        <Button onClick={() => setShowBuildRuleDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Build Rule
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {/* Pipeline-wide rules drop area */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Pipeline-wide Rules</span>
            </div>
            <Droppable droppableId="pipeline-rules" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[60px] p-3 rounded-lg border-2 border-dashed transition-colors ${
                    snapshot.isDraggingOver 
                      ? "border-primary bg-primary/5" 
                      : "border-muted-foreground/25 bg-muted/20"
                  }`}
                >
                  <div className="flex flex-wrap gap-2">
                    {pipelineRules.map((rule, index) => (
                      <RuleCard 
                        key={rule.id} 
                        rule={rule} 
                        index={index}
                        onRemove={() => removeRule(rule.id)}
                        isDraggable={false}
                      />
                    ))}
                    {pipelineRules.length === 0 && (
                      <span className="text-sm text-muted-foreground">
                        Drop rules here to apply to entire pipeline
                      </span>
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>

        {/* Pipeline stages sandbox */}
        <Card>
          <CardContent className="p-6">
            <h4 className="text-base font-medium mb-4">Pipeline Stages</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
              {stages.map((stage) => (
                <div key={stage.id} className="space-y-3">
                  {/* Stage node */}
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 text-center">
                    <h5 className="font-medium text-sm">{stage.name}</h5>
                  </div>
                  
                  {/* Drop area for stage rules */}
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[100px] p-3 rounded-lg border-2 border-dashed transition-colors ${
                          snapshot.isDraggingOver 
                            ? "border-primary bg-primary/5" 
                            : "border-muted-foreground/25 bg-muted/20"
                        }`}
                      >
                        <div className="space-y-2">
                          {stage.rules.map((rule, index) => (
                            <RuleCard 
                              key={rule.id} 
                              rule={rule} 
                              index={index}
                              onRemove={() => removeRule(rule.id, stage.id)}
                              isDraggable={false}
                            />
                          ))}
                          {stage.rules.length === 0 && (
                            <span className="text-xs text-muted-foreground">
                              Drop rules here
                            </span>
                          )}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available rules */}
        <Card>
          <CardContent className="p-4">
            <h4 className="text-base font-medium mb-3">Available Rules</h4>
            <Droppable droppableId="available-rules" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-wrap gap-3"
                >
                  {availableRules.map((rule, index) => (
                    <Draggable key={rule.id} draggableId={rule.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-transform ${
                            snapshot.isDragging ? "scale-105 shadow-lg" : ""
                          }`}
                        >
                          <RuleCard rule={rule} index={index} isDraggable={true} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>
      </DragDropContext>

      <BuildRuleDialog 
        open={showBuildRuleDialog}
        onOpenChange={setShowBuildRuleDialog}
      />
    </div>
  );
};

interface RuleCardProps {
  rule: Rule;
  index: number;
  onRemove?: () => void;
  isDraggable?: boolean;
}

const RuleCard = ({ rule, onRemove, isDraggable }: RuleCardProps) => {
  return (
    <div
      className={`${rule.color} px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer hover:shadow-sm transition-shadow ${
        isDraggable ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      onClick={onRemove}
    >
      {rule.name}
      {onRemove && !isDraggable && (
        <span className="ml-2 text-xs opacity-60">×</span>
      )}
    </div>
  );
};
