import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, FileText, Mail, Phone, Building2, DollarSign, Calendar, User2 } from "lucide-react";
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

type DealType = {
  id: string;
  title: string;
  company: string;
  contactName: string;
  value: number;
  currency: string;
  stage: string;
  progress: number;
  probability: number;
  closeDate: string;
  createdDate: string;
};

type StageType = {
  id: string;
  name: string;
  color: string;
  order: number;
  applicants?: ApplicantType[];
};

export type KanbanEntityType = "applicant" | "deal";

interface KanbanBoardProps {
  stages: StageType[];
  items: ApplicantType[] | DealType[];
  entityType: KanbanEntityType;
  onStageChange?: (itemId: string, newStageId: string) => void;
}

export const KanbanBoard = ({
  stages,
  items,
  entityType,
  onStageChange,
}: KanbanBoardProps) => {
  const [localItems, setLocalItems] = useState<(ApplicantType | DealType)[]>(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === draggableId
          ? { ...item, stage: destination.droppableId }
          : item
      )
    );
    if (onStageChange) {
      onStageChange(draggableId, destination.droppableId);
    }
  };

  // Group by stage
  const itemsByStage = stages.reduce((acc, stage) => {
    acc[stage.id] = localItems.filter((item) => item.stage === stage.id);
    return acc;
  }, {} as Record<string, typeof localItems>);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-4 min-w-max">
          {stages.sort((a, b) => a.order - b.order).map((stage) => (
            <div key={stage.id} className="w-72 flex-shrink-0">
              <Card className="h-full">
                <CardHeader className="p-4 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <h3 className="font-medium">{stage.name}</h3>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                      {itemsByStage[stage.id]?.length || 0}
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
                      {itemsByStage[stage.id]?.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2"
                            >
                              {entityType === "applicant" ? (
                                // Applicant Card
                                <Card className="p-3 hover:shadow-md transition-shadow">
                                  <div className="flex gap-3 items-start">
                                    <Avatar className="h-10 w-10">
                                      <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full rounded-full text-sm">
                                        {((item as ApplicantType).name || "?").charAt(0)}
                                      </div>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-sm truncate">{(item as ApplicantType).name}</h4>
                                      <p className="text-xs text-muted-foreground truncate">{(item as ApplicantType).email}</p>
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
                                      {new Date((item as ApplicantType).appliedDate).toLocaleDateString()}
                                    </div>
                                  </div>
                                </Card>
                              ) : (
                                // Deal Card
                                <Card className="bg-white p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab">
                                  <div>
                                    <div className="font-medium mb-1 truncate">{(item as DealType).title}</div>
                                    <div className="text-xs text-muted-foreground mb-2 flex gap-1 items-center">
                                      <Building2 className="h-3 w-3" />
                                      {(item as DealType).company}
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold">
                                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: (item as DealType).currency, maximumFractionDigits: 0 }).format((item as DealType).value)}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {(item as DealType).probability}%
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {new Date((item as DealType).closeDate).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <User2 className="h-3 w-3" />
                                      {(item as DealType).contactName.split(' ')[0]}
                                    </div>
                                  </div>
                                </Card>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <Button variant="ghost" size="sm" className="w-full mt-2 text-muted-foreground">
                        <Plus size={14} className="mr-1" />
                        Add {entityType === "applicant" ? "Applicant" : "Deal"}
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

// For legacy imports
export default KanbanBoard;
