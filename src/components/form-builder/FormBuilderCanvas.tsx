
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormBuilderProps } from "./types";
import { FieldPropertiesPanel } from "./FieldPropertiesPanel";
import { FormFieldRenderer } from "./FormFieldRenderer";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FormBuilderCanvas = ({
  fields,
  selectedFieldId,
  onSelectField,
  onFieldUpdate,
  onFieldDelete,
  onFieldPositionChange,
}: FormBuilderProps) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData("fieldType") as any;
    
    if (!fieldType) return;
    
    // This is just a notification that a field was dropped
    // The actual field creation happens in the parent component
    console.log(`Field of type ${fieldType} dropped on canvas`);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onFieldPositionChange(items);
  };

  const selectedField = fields.find(field => field.id === selectedFieldId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Form Layout</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Edit Mode" : "Preview"}
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-[70vh] w-full">
              <div 
                className={`p-4 min-h-[50vh] ${!showPreview ? 'border-2 border-dashed border-gray-200 rounded-md' : ''}`} 
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
              >
                {fields.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground">
                    <p>Drag and drop fields here</p>
                    <p className="text-sm">or click on field types to add them</p>
                  </div>
                ) : showPreview ? (
                  <div className="space-y-4">
                    {fields.map((field) => (
                      <FormFieldRenderer key={field.id} field={field} preview />
                    ))}
                  </div>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="form-fields">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-2"
                        >
                          {fields.map((field, index) => (
                            <Draggable key={field.id} draggableId={field.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`p-3 border rounded-md ${
                                    selectedFieldId === field.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div 
                                      {...provided.dragHandleProps}
                                      className="py-1 px-3 bg-gray-100 rounded text-xs cursor-grab"
                                    >
                                      Drag
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onFieldDelete(field.id)}
                                        className="h-6 w-6 text-destructive"
                                      >
                                        <Trash2 size={14} />
                                      </Button>
                                    </div>
                                  </div>
                                  <div
                                    onClick={() => onSelectField(field.id)}
                                    className="cursor-pointer"
                                  >
                                    <FormFieldRenderer field={field} />
                                  </div>
                                  <div className="mt-1 text-xs text-muted-foreground">
                                    <span className="font-mono bg-muted p-1 rounded text-[10px]">
                                      {field.shortCode}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        <FieldPropertiesPanel
          selectedField={selectedField}
          onFieldUpdate={onFieldUpdate}
        />
      </div>
    </div>
  );
};
