
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Users } from "lucide-react";
import { ApplicantsList } from "@/components/applicants/ApplicantsList";
import { AddApplicantDialog } from "@/components/applicants/AddApplicantDialog";
import { PageContainer } from "@/components/layout/PageContainer";

const Ats1Applicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <PageContainer title="ATS1 Applicants">
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
        <ApplicantsList searchTerm={searchTerm} />

        {/* Add Applicant Dialog */}
        <AddApplicantDialog 
          open={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen}
        />
      </div>
    </PageContainer>
  );
};

export default Ats1Applicants;
