
import { PageContainer } from "@/components/layout/PageContainer";
import { CompaniesTable } from "@/components/companies/CompaniesTable";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";

const Companies = () => {
  return (
    <PageContainer title="Companies">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Companies</h2>
            <p className="text-muted-foreground">Manage your client companies and organizations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download size={14} />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload size={14} />
              Import
            </Button>
            <Button size="sm" className="gap-2">
              <Plus size={14} />
              Add Company
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-border shadow-subtle">
            <h3 className="text-lg font-medium mb-2">Active Companies</h3>
            <p className="text-3xl font-semibold">42</p>
            <p className="text-sm text-muted-foreground mt-1">+3 this month</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-border shadow-subtle">
            <h3 className="text-lg font-medium mb-2">Jobs Posted</h3>
            <p className="text-3xl font-semibold">156</p>
            <p className="text-sm text-muted-foreground mt-1">+12 this month</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-border shadow-subtle">
            <h3 className="text-lg font-medium mb-2">Active Contracts</h3>
            <p className="text-3xl font-semibold">28</p>
            <p className="text-sm text-muted-foreground mt-1">+2 this month</p>
          </div>
        </div>
        
        <CompaniesTable />
      </div>
    </PageContainer>
  );
};

export default Companies;
