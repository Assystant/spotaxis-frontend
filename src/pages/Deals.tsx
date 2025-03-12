
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const Deals = () => {
  return (
    <PageContainer title="Deals">
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <DollarSign className="text-primary" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Deals</h2>
          <p className="text-muted-foreground">
            Manage your sales pipeline, track deal progress, and monitor revenue from your recruiting activities.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Deals;
