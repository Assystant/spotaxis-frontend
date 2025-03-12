
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";

const FormBuilders = () => {
  return (
    <PageContainer title="Form Builders">
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileSpreadsheet className="text-primary" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Form Builders</h2>
          <p className="text-muted-foreground">
            Create custom forms for job applications, candidate assessments, and client feedback.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default FormBuilders;
