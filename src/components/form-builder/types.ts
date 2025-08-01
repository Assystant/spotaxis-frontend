
export type FieldType = 
  | "text" 
  | "textarea" 
  | "number" 
  | "email" 
  | "phone" 
  | "select" 
  | "checkbox" 
  | "radio" 
  | "date";

export type FormType = "Scorecard" | "Applicant Form" | "Feedback Form" | "Custom";

export interface FormFieldOption {
  id: string;
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  shortCode: string;
  options?: FormFieldOption[];
  defaultValue?: string;
  description?: string;
}

export interface FormData {
  id: string;
  name: string;
  type: FormType;
  tags: string[];
  lastModified: string;
  fieldsCount: number;
  fields: FormField[];
  description?: string;
}

export interface FormBuilderProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelectField: (id: string | null) => void;
  onFieldUpdate: (field: FormField) => void;
  onFieldDelete: (id: string) => void;
  onFieldPositionChange: (fields: FormField[]) => void;
}
