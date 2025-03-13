
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Plus, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockForms = [
  { 
    id: "1", 
    name: "Job Application", 
    description: "Standard job application form with contact details and experience.",
    fields: 12,
    createdAt: "2023-11-10",
  },
  { 
    id: "2", 
    name: "Candidate Assessment", 
    description: "Technical skills and experience assessment for developers.",
    fields: 8,
    createdAt: "2023-10-25",
  },
  { 
    id: "3", 
    name: "Client Feedback", 
    description: "Post-project client feedback and satisfaction survey.",
    fields: 10,
    createdAt: "2023-10-15",
  },
];

const FormBuilders = () => {
  const navigate = useNavigate();

  return (
    <PageContainer 
      title="Form Builders" 
      description="Create and manage custom forms for your organization"
      actionButton={
        <Button onClick={() => navigate("/form-builder")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      }
    >
      {mockForms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockForms.map((form) => (
            <Card key={form.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {form.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{form.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="bg-primary/10 text-primary rounded-md px-2 py-1 text-xs">
                    {form.fields} fields
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {form.createdAt}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 flex justify-between">
                <Button size="sm" variant="ghost" onClick={() => navigate(`/form-builder`)}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <Card className="p-6 text-center max-w-md">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileSpreadsheet className="text-primary" size={24} />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Forms Yet</h2>
            <p className="text-muted-foreground mb-4">
              Create custom forms for job applications, candidate assessments, and client feedback.
            </p>
            <Button onClick={() => navigate("/form-builder")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Form
            </Button>
          </Card>
        </div>
      )}
    </PageContainer>
  );
};

export default FormBuilders;
