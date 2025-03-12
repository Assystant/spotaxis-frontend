
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const Companies = () => {
  return (
    <PageContainer title="Companies">
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Building2 className="text-primary" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Companies</h2>
          <p className="text-muted-foreground">
            Track and manage the companies you work with, including clients, partners, and potential hiring organizations.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Companies;
