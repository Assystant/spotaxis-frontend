
import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  ChevronRight,
  Settings as SettingsIcon
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type PipelineStage = {
  id: string;
  name: string;
  color: string;
  order: number;
};

const defaultStages: PipelineStage[] = [
  { id: "stage-1", name: "Applied", color: "bg-blue-500", order: 0 },
  { id: "stage-2", name: "Screening", color: "bg-purple-500", order: 1 },
  { id: "stage-3", name: "Interview", color: "bg-orange-500", order: 2 },
  { id: "stage-4", name: "Assessment", color: "bg-yellow-500", order: 3 },
  { id: "stage-5", name: "Offer", color: "bg-green-500", order: 4 },
  { id: "stage-6", name: "Hired", color: "bg-emerald-500", order: 5 },
  { id: "stage-7", name: "Rejected", color: "bg-red-500", order: 6 },
];

const colorOptions = [
  { label: "Blue", value: "bg-blue-500" },
  { label: "Purple", value: "bg-purple-500" },
  { label: "Orange", value: "bg-orange-500" },
  { label: "Yellow", value: "bg-yellow-500" },
  { label: "Green", value: "bg-green-500" },
  { label: "Emerald", value: "bg-emerald-500" },
  { label: "Red", value: "bg-red-500" },
  { label: "Pink", value: "bg-pink-500" },
  { label: "Indigo", value: "bg-indigo-500" },
  { label: "Sky", value: "bg-sky-500" }
];

const PipelineSettings = () => {
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [newStageName, setNewStageName] = useState("");
  const [newStageColor, setNewStageColor] = useState("bg-blue-500");
  const [activeTab, setActiveTab] = useState("applicants");

  useEffect(() => {
    // Load stages from localStorage or use defaults
    const storedStages = localStorage.getItem('pipelineStages');
    if (storedStages) {
      setStages(JSON.parse(storedStages));
    } else {
      setStages(defaultStages);
    }
  }, []);

  // Save stages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pipelineStages', JSON.stringify(stages));
  }, [stages]);

  const handleAddStage = () => {
    if (!newStageName.trim()) return;

    const newStage: PipelineStage = {
      id: `stage-${Date.now()}`,
      name: newStageName,
      color: newStageColor,
      order: stages.length,
    };

    setStages([...stages, newStage]);
    setNewStageName("");
    setNewStageColor("bg-blue-500");
  };

  const handleRemoveStage = (id: string) => {
    setStages(stages.filter(stage => stage.id !== id));
  };

  const handleChangeStage = (id: string, field: keyof PipelineStage, value: string) => {
    setStages(stages.map(stage => 
      stage.id === id ? { ...stage, [field]: value } : stage
    ));
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // Drop outside of a droppable area or same position
    if (!destination || (destination.index === source.index)) return;

    const reorderedStages = Array.from(stages);
    const [removed] = reorderedStages.splice(source.index, 1);
    reorderedStages.splice(destination.index, 0, removed);

    // Update order property
    const updatedStages = reorderedStages.map((stage, index) => ({
      ...stage,
      order: index
    }));

    setStages(updatedStages);
  };

  return (
    <PageContainer title="Pipeline Settings">
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Pipeline Settings</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage your recruitment pipeline stages and workflows
            </p>
          </div>
        </div>

        <div className="flex gap-2 border-b overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0">
          <button 
            className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'applicants' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('applicants')}
          >
            Applicant Pipeline
          </button>
          <button 
            className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'tasks' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            Task Status
          </button>
          <button 
            className={`px-3 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'deals' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('deals')}
          >
            Deal Stages
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b">
                <h3 className="text-lg font-medium">Pipeline Stages</h3>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="stages">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-3"
                      >
                        {stages
                          .sort((a, b) => a.order - b.order)
                          .map((stage, index) => (
                            <Draggable
                              key={stage.id}
                              draggableId={stage.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 border rounded-md p-3 bg-white"
                                >
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-grab"
                                  >
                                    <GripVertical size={16} />
                                  </div>
                                  <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                                  <Input
                                    value={stage.name}
                                    onChange={(e) => handleChangeStage(stage.id, "name", e.target.value)}
                                    className="flex-1 min-w-0"
                                  />
                                  <select
                                    value={stage.color}
                                    onChange={(e) => handleChangeStage(stage.id, "color", e.target.value)}
                                    className="w-full sm:w-auto p-2 border rounded-md"
                                  >
                                    {colorOptions.map((color) => (
                                      <option key={color.value} value={color.value}>
                                        {color.label}
                                      </option>
                                    ))}
                                  </select>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveStage(stage.id)}
                                    className="text-destructive hover:text-destructive/90"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-end gap-3">
                  <div className="w-full sm:flex-1 space-y-2">
                    <Label htmlFor="new-stage-name">New Stage Name</Label>
                    <Input
                      id="new-stage-name"
                      value={newStageName}
                      onChange={(e) => setNewStageName(e.target.value)}
                      placeholder="Enter stage name"
                    />
                  </div>
                  <div className="w-full sm:w-auto space-y-2">
                    <Label htmlFor="new-stage-color">Color</Label>
                    <select
                      id="new-stage-color"
                      value={newStageColor}
                      onChange={(e) => setNewStageColor(e.target.value)}
                      className="w-full p-2 border rounded-md h-10"
                    >
                      {colorOptions.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button onClick={handleAddStage} className="w-full sm:w-auto mt-2 sm:mt-0">
                    <Plus size={16} className="mr-1" />
                    Add Stage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit">
            <CardHeader className="border-b">
              <h3 className="text-lg font-medium">Tips & Help</h3>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Pipeline Management</h4>
                <p className="text-sm text-muted-foreground">
                  Pipelines help you track the progress of candidates through your recruitment process.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Customization</h4>
                <p className="text-sm text-muted-foreground">
                  Create stages that match your company's hiring workflow. Drag and drop to reorder stages.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Best Practices</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Keep your pipeline stages clear and concise</li>
                  <li>Use colors to visually differentiate stages</li>
                  <li>Limit the number of stages to avoid complexity</li>
                </ul>
              </div>
              
              <Button variant="outline" className="w-full">
                <SettingsIcon size={14} className="mr-2" />
                Advanced Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default PipelineSettings;
