
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const Applicants = () => {
  return (
    <PageContainer title="Applicants">
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Users className="text-primary" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Applicants</h2>
          <p className="text-muted-foreground">
            This section will allow you to manage all your job applicants, track their status, and communicate with them.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Applicants;
