import { create } from "zustand";
import { FormData, FormField, FormType } from "@/components/form-builder/types";
import { v4 as uuidv4 } from "uuid";

interface FormsStore {
  forms: FormData[];
  addForm: (form: Omit<FormData, "id" | "lastModified" | "fieldsCount">) => FormData;
  updateForm: (id: string, updates: Partial<FormData>) => void;
  duplicateForm: (form: FormData) => FormData;
  getFormById: (id: string) => FormData | undefined;
  getUniqueFormName: (baseName: string) => string;
}

// Mock initial forms
const initialForms: FormData[] = [
  {
    id: "1",
    name: "Job Application",
    type: "Applicant Form",
    tags: ["recruitment", "standard"],
    lastModified: "2023-11-10",
    fieldsCount: 12,
    fields: [],
    description: "Standard job application form with contact details and experience.",
  },
  {
    id: "2",
    name: "Candidate Assessment",
    type: "Scorecard",
    tags: ["technical", "assessment"],
    lastModified: "2023-10-25",
    fieldsCount: 8,
    fields: [],
    description: "Technical skills and experience assessment for developers.",
  },
  {
    id: "3",
    name: "Client Feedback",
    type: "Feedback Form",
    tags: ["client", "feedback", "satisfaction"],
    lastModified: "2023-10-15",
    fieldsCount: 10,
    fields: [],
    description: "Post-project client feedback and satisfaction survey.",
  },
];

export const useFormsStore = create<FormsStore>((set, get) => ({
  forms: initialForms,
  
  addForm: (formData) => {
    const newForm: FormData = {
      ...formData,
      id: uuidv4(),
      lastModified: new Date().toISOString(),
      fieldsCount: formData.fields.length,
    };
    
    set((state) => ({
      forms: [...state.forms, newForm],
    }));
    
    return newForm;
  },
  
  updateForm: (id, updates) => {
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === id
          ? {
              ...form,
              ...updates,
              lastModified: new Date().toISOString(),
              fieldsCount: updates.fields ? updates.fields.length : form.fieldsCount,
            }
          : form
      ),
    }));
  },
  
  duplicateForm: (originalForm) => {
    const { getUniqueFormName } = get();
    const uniqueName = getUniqueFormName(originalForm.name);
    
    const duplicatedForm: FormData = {
      ...originalForm,
      id: uuidv4(),
      name: uniqueName,
      lastModified: new Date().toISOString(),
      // Duplicate all fields with new IDs
      fields: originalForm.fields.map((field) => ({
        ...field,
        id: uuidv4(),
        options: field.options?.map((option) => ({
          ...option,
          id: uuidv4(),
        })),
      })),
    };
    
    set((state) => ({
      forms: [...state.forms, duplicatedForm],
    }));
    
    return duplicatedForm;
  },
  
  getFormById: (id) => {
    return get().forms.find((form) => form.id === id);
  },
  
  getUniqueFormName: (baseName) => {
    const { forms } = get();
    const existingNames = forms.map((form) => form.name.toLowerCase());
    
    if (!existingNames.includes(baseName.toLowerCase())) {
      return baseName;
    }
    
    let counter = 1;
    let newName = `${baseName} (Copy)`;
    
    while (existingNames.includes(newName.toLowerCase())) {
      counter++;
      newName = `${baseName} (Copy ${counter})`;
    }
    
    return newName;
  },
}));