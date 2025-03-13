
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ApplicantsList } from "@/components/applicants/ApplicantsList";
import { ApplicantDetail } from "@/components/applicants/ApplicantDetail";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download, Upload } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AddApplicantForm } from "@/components/applicants/AddApplicantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Applicants = () => {
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);
  const [isAddApplicantOpen, setIsAddApplicantOpen] = useState(false);

  const handleApplicantSelect = (id: string) => {
    setSelectedApplicantId(id);
  };

  const handleAddApplicantSuccess = () => {
    setIsAddApplicantOpen(false);
  };

  return (
    <PageContainer title="Applicants">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Applicants</h2>
            <p className="text-muted-foreground">
              Manage and track all candidates in your hiring pipeline
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={14} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download size={14} />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload size={14} />
              Import
            </Button>
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => setIsAddApplicantOpen(true)}
            >
              <Plus size={14} />
              Add Applicant
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ApplicantsList onSelectApplicant={handleApplicantSelect} selectedId={selectedApplicantId} />
            </div>
            
            <div className="lg:col-span-2">
              {selectedApplicantId ? (
                <ApplicantDetail id={selectedApplicantId} />
              ) : (
                <div className="border rounded-lg p-8 text-center h-full flex flex-col items-center justify-center bg-slate-50">
                  <div className="max-w-md">
                    <h3 className="text-lg font-medium mb-2">No Applicant Selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select an applicant from the list to view their details
                    </p>
                    <Button 
                      onClick={() => setIsAddApplicantOpen(true)}
                      className="gap-2"
                    >
                      <Plus size={14} />
                      Add New Applicant
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="kanban">
          <p className="text-muted-foreground">
            The Kanban view allows you to manage applicants through your hiring stages.
            This view is available per job in the job details page.
          </p>
          <div className="mt-4">
            <Button variant="outline" onClick={() => window.location.href = "/jobs"}>
              Go to Jobs
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Sheet open={isAddApplicantOpen} onOpenChange={setIsAddApplicantOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Applicant</SheetTitle>
          </SheetHeader>
          <AddApplicantForm onSuccess={handleAddApplicantSuccess} />
        </SheetContent>
      </Sheet>
    </PageContainer>
  );
};

export default Applicants;
