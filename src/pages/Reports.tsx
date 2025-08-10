import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";

const Reports = () => {
  return (
    <PageContainer title="Reports">
      <div className="grid gap-4">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Reports</h2>
          <p className="text-muted-foreground">Analytics and reporting coming soon.</p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Reports;
