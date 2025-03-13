
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Text, 
  AlignLeft, 
  Hash, 
  Mail, 
  Phone, 
  ListFilter, 
  CheckSquare, 
  CircleCheck, 
  Calendar 
} from "lucide-react";
import { FormField, FieldType } from "./types";
import { v4 as uuidv4 } from "uuid";

interface FieldTypeInfo {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
}

interface FormFieldsListProps {
  onAddField: (field: FormField) => void;
}

const fieldTypes: FieldTypeInfo[] = [
  { type: "text", label: "Text", icon: <Text size={18} /> },
  { type: "textarea", label: "Text Area", icon: <AlignLeft size={18} /> },
  { type: "number", label: "Number", icon: <Hash size={18} /> },
  { type: "email", label: "Email", icon: <Mail size={18} /> },
  { type: "phone", label: "Phone", icon: <Phone size={18} /> },
  { type: "select", label: "Dropdown", icon: <ListFilter size={18} /> },
  { type: "checkbox", label: "Checkboxes", icon: <CheckSquare size={18} /> },
  { type: "radio", label: "Radio", icon: <CircleCheck size={18} /> },
  { type: "date", label: "Date", icon: <Calendar size={18} /> },
];

export const FormFieldsList = ({ onAddField }: FormFieldsListProps) => {
  const handleDragStart = (e: React.DragEvent, fieldType: FieldType) => {
    e.dataTransfer.setData("fieldType", fieldType);
  };

  const generateShortCode = (type: FieldType, label: string) => {
    // Create a shortcode from the type and first word of the label
    const baseCode = `${type}_${label.split(' ')[0].toLowerCase()}`;
    // Add a random 4-digit number for uniqueness
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${baseCode}_${randomSuffix}`;
  };

  const createDefaultField = (type: FieldType): FormField => {
    const defaultLabel = `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`;
    
    const field: FormField = {
      id: uuidv4(),
      type,
      label: defaultLabel,
      placeholder: `Enter ${type}...`,
      required: false,
      shortCode: generateShortCode(type, defaultLabel),
    };

    if (type === "select" || type === "radio" || type === "checkbox") {
      field.options = [
        { id: uuidv4(), label: "Option 1", value: "option_1" },
        { id: uuidv4(), label: "Option 2", value: "option_2" },
      ];
    }

    return field;
  };

  const handleAddField = (type: FieldType) => {
    const newField = createDefaultField(type);
    onAddField(newField);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Field Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {fieldTypes.map((fieldType) => (
            <div
              key={fieldType.type}
              className="flex items-center p-2 rounded-md border border-dashed hover:bg-accent cursor-grab"
              draggable
              onDragStart={(e) => handleDragStart(e, fieldType.type)}
              onClick={() => handleAddField(fieldType.type)}
            >
              <div className="mr-3">{fieldType.icon}</div>
              <span>{fieldType.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
