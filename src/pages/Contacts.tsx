
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { Contact } from "lucide-react";

const Contacts = () => {
  return (
    <PageContainer title="Contacts">
      <div className="flex items-center justify-center h-64">
        <Card className="p-6 text-center max-w-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Contact className="text-primary" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Contacts</h2>
          <p className="text-muted-foreground">
            Manage your professional contacts, including candidates, clients, and other industry connections.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Contacts;
