
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { FormBuilderCanvas } from "@/components/form-builder/FormBuilderCanvas";
import { FormFieldsList } from "@/components/form-builder/FormFieldsList";
import { FormDetailsCard } from "@/components/form-builder/FormDetailsCard";
import { FormField, FormType } from "@/components/form-builder/types";
import { useFormsStore } from "@/store/formsStore";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const FormBuilder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("formId");
  
  const { forms, addForm, updateForm, getUniqueFormName } = useFormsStore();
  
  const [formName, setFormName] = useState<string>("");
  const [formType, setFormType] = useState<FormType>("Custom");
  const [formTags, setFormTags] = useState<string[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string>("");

  const isEditing = !!formId;

  // Load form data if editing
  useEffect(() => {
    if (formId) {
      const form = forms.find(f => f.id === formId);
      if (form) {
        setFormName(form.name);
        setFormType(form.type);
        setFormTags(form.tags);
        setFormFields(form.fields);
      } else {
        toast.error("Form not found");
        navigate("/form-builders");
      }
    }
  }, [formId, forms, navigate]);

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

  const validateFormName = (name: string): boolean => {
    if (!name.trim()) {
      setNameError("Form name is required");
      return false;
    }

    // Check for duplicate names (excluding current form if editing)
    const existingForm = forms.find(f => 
      f.name.toLowerCase() === name.trim().toLowerCase() && 
      f.id !== formId
    );
    
    if (existingForm) {
      setNameError(`A form named "${name}" already exists. Please choose a different name.`);
      return false;
    }

    setNameError("");
    return true;
  };

  const handleNameChange = (name: string) => {
    setFormName(name);
    if (nameError) {
      validateFormName(name);
    }
  };

  const handleAutoRename = () => {
    const uniqueName = getUniqueFormName(formName);
    setFormName(uniqueName);
    setNameError("");
  };

  const handleSaveForm = () => {
    if (!validateFormName(formName)) {
      return;
    }

    if (formFields.length === 0) {
      toast.error("Please add at least one field to your form");
      return;
    }

    try {
      if (isEditing && formId) {
        updateForm(formId, {
          name: formName.trim(),
          type: formType,
          tags: formTags,
          fields: formFields,
        });
        toast.success("Form updated successfully");
      } else {
        addForm({
          name: formName.trim(),
          type: formType,
          tags: formTags,
          fields: formFields,
        });
        toast.success("Form created successfully");
      }
      navigate("/form-builders");
    } catch (error) {
      toast.error("Failed to save form");
    }
  };

  return (
    <PageContainer 
      title={isEditing ? "Edit Form" : "Create Form"}
      actionButton={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/form-builders")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forms
          </Button>
          <Button onClick={handleSaveForm}>
            {isEditing ? "Update Form" : "Save Form"}
          </Button>
        </div>
      }
    >
      <div className="mb-6">
        <FormDetailsCard
          name={formName}
          type={formType}
          tags={formTags}
          onNameChange={handleNameChange}
          onTypeChange={setFormType}
          onTagsChange={setFormTags}
        />
        
        {nameError && (
          <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{nameError}</p>
            {nameError.includes("already exists") && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAutoRename}
                className="mt-2"
              >
                Auto-rename to "{getUniqueFormName(formName)}"
              </Button>
            )}
          </div>
        )}
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
