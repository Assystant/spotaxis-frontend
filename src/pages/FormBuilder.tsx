
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormBuilderCanvas } from "@/components/form-builder/FormBuilderCanvas";
import { FormFieldsList } from "@/components/form-builder/FormFieldsList";
import { FormField } from "@/components/form-builder/types";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const FormBuilder = () => {
  const navigate = useNavigate();
  const [formName, setFormName] = useState<string>("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const handleAddField = (field: FormField) => {
    setFormFields((prev) => [...prev, field]);
  };

  const handleFieldPositionChange = (updatedFields: FormField[]) => {
    setFormFields(updatedFields);
  };

  const handleFieldUpdate = (updatedField: FormField) => {
    setFormFields((prev) =>
      prev.map((field) => (field.id === updatedField.id ? updatedField : field))
    );
  };

  const handleFieldDelete = (fieldId: string) => {
    setFormFields((prev) => prev.filter((field) => field.id !== fieldId));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const handleSaveForm = () => {
    if (!formName.trim()) {
      toast.error("Please enter a form name");
      return;
    }

    if (formFields.length === 0) {
      toast.error("Please add at least one field to your form");
      return;
    }

    // In a real app, save to backend
    console.log("Saving form:", { name: formName, fields: formFields });
    toast.success("Form saved successfully");
    navigate("/form-builders");
  };

  return (
    <PageContainer 
      title="Create Form" 
      actionButton={
        <Button onClick={handleSaveForm}>Save Form</Button>
      }
    >
      <div className="mb-4">
        <Card className="p-4">
          <div className="mb-4">
            <label htmlFor="formName" className="block text-sm font-medium mb-1">
              Form Name
            </label>
            <Input
              id="formName"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Enter form name"
              className="max-w-md"
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <FormFieldsList onAddField={handleAddField} />
        </div>
        <div className="md:col-span-9">
          <FormBuilderCanvas
            fields={formFields}
            selectedFieldId={selectedFieldId}
            onSelectField={setSelectedFieldId}
            onFieldUpdate={handleFieldUpdate}
            onFieldDelete={handleFieldDelete}
            onFieldPositionChange={handleFieldPositionChange}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default FormBuilder;
