import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, FileText, Mail, Phone } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type ApplicantType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  resume?: string;
  stage: string;
  appliedDate: string;
  jobId: string;
};

type StageType = {
  id: string;
  name: string;
  color: string;
  order: number;
  category: string;
  applicants?: ApplicantType[];
};

// Mock data for pipeline stages
const defaultStages: StageType[] = [
  { id: "stage-1", name: "Applied", color: "bg-blue-500", order: 0, category: "applicant" },
  { id: "stage-2", name: "Screening", color: "bg-purple-500", order: 1, category: "applicant" },
  { id: "stage-3", name: "Interview", color: "bg-orange-500", order: 2, category: "applicant" },
  { id: "stage-4", name: "Assessment", color: "bg-yellow-500", order: 3, category: "applicant" },
  { id: "stage-5", name: "Offer", color: "bg-green-500", order: 4, category: "applicant" },
  { id: "stage-6", name: "Hired", color: "bg-emerald-500", order: 5, category: "applicant" },
  { id: "stage-7", name: "Rejected", color: "bg-red-500", order: 6, category: "applicant" },
];

// Mock data for applicants
const mockApplicants: ApplicantType[] = [
  {
    id: "app-1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    stage: "stage-1",
    appliedDate: "2023-08-15",
    jobId: "1",
  },
  {
    id: "app-2",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "(555) 987-6543",
    stage: "stage-1",
    appliedDate: "2023-08-14",
    jobId: "1",
  },
  {
    id: "app-3",
    name: "Aisha Patel",
    email: "aisha.p@example.com",
    phone: "(555) 456-7890",
    stage: "stage-2",
    appliedDate: "2023-08-10",
    jobId: "1",
  },
  {
    id: "app-4",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 111-2222",
    stage: "stage-3",
    appliedDate: "2023-08-05",
    jobId: "1",
  },
  {
    id: "app-5",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "(555) 333-4444",
    stage: "stage-4",
    appliedDate: "2023-08-01",
    jobId: "1",
  },
  {
    id: "app-6",
    name: "David Rodriguez",
    email: "david.r@example.com",
    phone: "(555) 555-6666",
    stage: "stage-5",
    appliedDate: "2023-07-25",
    jobId: "2",
  },
  {
    id: "app-7",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    phone: "(555) 777-8888",
    stage: "stage-6",
    appliedDate: "2023-07-20",
    jobId: "2",
  },
  {
    id: "app-8",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "(555) 999-0000",
    stage: "stage-7",
    appliedDate: "2023-07-15",
    jobId: "2",
  }
];

interface KanbanBoardProps {
  jobId: string;
  category?: string;
}

export const KanbanBoard = ({ jobId, category = "applicant" }: KanbanBoardProps) => {
  // In a real app, we would fetch these from an API
  const [stages, setStages] = useState<StageType[]>([]);
  const [applicants, setApplicants] = useState<ApplicantType[]>([]);

  useEffect(() => {
    // Simulate fetching pipeline stages
    const fetchStages = async () => {
      // In a real app, get this from an API or context
      const storedStages = localStorage.getItem('pipelineStages');
      if (storedStages) {
        const allStages = JSON.parse(storedStages);
        // Filter stages by category
        setStages(allStages.filter((stage: StageType) => stage.category === category));
      } else {
        setStages(defaultStages.filter(stage => stage.category === category));
      }
    };
    
    // Simulate fetching applicants for this job
    const fetchApplicants = async () => {
      const filteredApplicants = mockApplicants.filter(app => app.jobId === jobId);
      setApplicants(filteredApplicants);
    };
    
    fetchStages();
    fetchApplicants();
  }, [jobId, category]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // Drop outside of a droppable area
    if (!destination) return;

    // Drop in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update the applicant's stage
    setApplicants(prevApplicants => 
      prevApplicants.map(applicant => 
        applicant.id === draggableId 
          ? { ...applicant, stage: destination.droppableId }
          : applicant
      )
    );
  };

  // Group applicants by stage
  const applicantsByStage = stages.reduce((acc, stage) => {
    acc[stage.id] = applicants.filter(app => app.stage === stage.id);
    return acc;
  }, {} as Record<string, ApplicantType[]>);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-4 min-w-max">
          {stages.sort((a, b) => a.order - b.order).map(stage => (
            <div key={stage.id} className="w-72 flex-shrink-0">
              <Card className="h-full">
                <CardHeader className="p-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-medium">{stage.name}</h3>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                      {applicantsByStage[stage.id]?.length || 0}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} />
                  </Button>
                </CardHeader>
                <Droppable droppableId={stage.id}>
                  {(provided) => (
                    <CardContent 
                      className="p-2 h-[calc(100vh-300px)] overflow-y-auto"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {applicantsByStage[stage.id]?.map((applicant, index) => (
                        <Draggable 
                          key={applicant.id} 
                          draggableId={applicant.id} 
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2"
                            >
                              <Card className="p-3 hover:shadow-md transition-shadow">
                                <div className="flex gap-3 items-start">
                                  <Avatar className="h-10 w-10">
                                    <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full rounded-full text-sm">
                                      {applicant.name.charAt(0)}
                                    </div>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm truncate">{applicant.name}</h4>
                                    <p className="text-xs text-muted-foreground truncate">{applicant.email}</p>
                                    <div className="flex gap-2 mt-2">
                                      <Button variant="outline" size="sm" className="h-7 px-2">
                                        <FileText size={14} />
                                      </Button>
                                      <Button variant="outline" size="sm" className="h-7 px-2">
                                        <Mail size={14} />
                                      </Button>
                                      <Button variant="outline" size="sm" className="h-7 px-2">
                                        <Phone size={14} />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                                    {new Date(applicant.appliedDate).toLocaleDateString()}
                                  </div>
                                </div>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <Button variant="ghost" size="sm" className="w-full mt-2 text-muted-foreground">
                        <Plus size={14} className="mr-1" />
                        Add Applicant
                      </Button>
                    </CardContent>
                  )}
                </Droppable>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};
