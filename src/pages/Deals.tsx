
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { KanbanBoard } from "@/components/jobs/KanbanBoard";

const Deals = () => {
  const [activeJobId, setActiveJobId] = useState("1"); // Default job ID

  return (
    <PageContainer title="Deals">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Deals</h2>
            <p className="text-muted-foreground">Manage your sales pipeline and track deal progress</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="border-b">
              <h3 className="text-lg font-medium">Sales Pipeline</h3>
            </CardHeader>
            <CardContent className="p-6">
              <KanbanBoard jobId={activeJobId} category="deal" />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Deals;
