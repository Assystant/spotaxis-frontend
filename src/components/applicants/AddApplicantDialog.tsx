
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddApplicantForm } from "./AddApplicantForm";
import { ApplicantsList } from "./ApplicantsList";

interface AddApplicantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddApplicant: (applicant: any) => void;
  jobId: string | undefined;
  jobTitle: string;
}

export const AddApplicantDialog = ({
  open,
  onOpenChange,
  onAddApplicant,
  jobId,
  jobTitle
}: AddApplicantDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("search");
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);

  const handleApplicantSelect = (id: string) => {
    setSelectedApplicantId(id);
  };

  const handleAddExistingApplicant = () => {
    // In a real app, we would fetch the selected applicant's data
    if (selectedApplicantId) {
      const mockApplicant = {
        name: "Selected Applicant",
        email: "selected@example.com",
        phone: "123-456-7890",
      };
      
      onAddApplicant(mockApplicant);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Applicant to {jobTitle}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="search">Search Existing</TabsTrigger>
            <TabsTrigger value="new">New Applicant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-4">
            <div className="grid md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <ApplicantsList 
                  onSelectApplicant={handleApplicantSelect}
                  selectedId={selectedApplicantId}
                />
              </div>
              
              <div className="md:col-span-4">
                {selectedApplicantId ? (
                  <div className="p-4 border rounded-md h-full">
                    <h3 className="text-lg font-medium mb-4">Applicant Details</h3>
                    <p className="mb-2">This would show the selected applicant details</p>
                    <div className="mt-8 flex justify-end">
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-md"
                        onClick={handleAddExistingApplicant}
                      >
                        Add to Job
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full border rounded-md p-8">
                    <p className="text-muted-foreground text-center">
                      Select an applicant from the list to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <AddApplicantForm 
              onSuccess={() => {
                onOpenChange(false);
              }} 
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
