
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Ats1TalentPool = () => {
  return (
    <PageContainer title="ATS1 Talent Pool">
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Star className="text-primary" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">ATS1 Talent Pool</h2>
          <p className="text-muted-foreground">
            Manage your talent database, tag candidates with skills, and build teams from your talent pool.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Ats1TalentPool;
