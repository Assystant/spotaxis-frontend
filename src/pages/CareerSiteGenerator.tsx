
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

const CareerSiteGenerator = () => {
  return (
    <PageContainer title="Career Site Generator">
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Globe className="text-primary" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Career Site Generator</h2>
          <p className="text-muted-foreground">
            Build and customize your company's career site to showcase your job openings and company culture.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CareerSiteGenerator;
