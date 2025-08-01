
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { FileSpreadsheet, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FormsTable } from "@/components/form-builder/FormsTable";
import { useFormsStore } from "@/store/formsStore";
import { FormData } from "@/components/form-builder/types";
import { toast } from "sonner";

const FormBuilders = () => {
  const navigate = useNavigate();
  const { forms, duplicateForm } = useFormsStore();

  const handleEditForm = (form: FormData) => {
    navigate(`/form-builder?formId=${form.id}`);
  };

  const handleDuplicateForm = (form: FormData) => {
    const duplicatedForm = duplicateForm(form);
    toast.success(`Form duplicated as "${duplicatedForm.name}"`);
    navigate(`/form-builder?formId=${duplicatedForm.id}`);
  };

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
      {forms.length > 0 ? (
        <FormsTable 
          forms={forms}
          onEdit={handleEditForm}
          onDuplicate={handleDuplicateForm}
        />
      ) : (
        <div className="flex items-center justify-center h-64">
          <Card className="p-6 text-center max-w-md rounded-2xl shadow-md">
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
