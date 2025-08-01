
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Users } from "lucide-react";
import { ApplicantsListLegacy } from "@/components/applicants/ApplicantsListLegacy";
import { AddApplicantDialog } from "@/components/applicants/AddApplicantDialog";
import { PageContainer } from "@/components/layout/PageContainer";

const Ats1Applicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);

  const handleAddApplicant = (applicant: any) => {
    console.log("Adding applicant:", applicant);
    setIsAddDialogOpen(false);
  };

  return (
    <PageContainer 
      title="Applicants" 
      description="Manage and track job applicants"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-1 gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
          </div>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Applicant
          </Button>
        </div>

        {/* Content */}
        <ApplicantsListLegacy 
          onSelectApplicant={setSelectedApplicantId}
          selectedId={selectedApplicantId}
        />

        {/* Add Applicant Dialog */}
        <AddApplicantDialog 
          open={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen}
          onAddApplicant={handleAddApplicant}
          jobId={undefined}
          jobTitle="General Application"
        />
      </div>
    </PageContainer>
  );
};

export default Ats1Applicants;
