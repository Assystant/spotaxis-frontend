
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField } from "./types";

interface FormFieldRendererProps {
  field: FormField;
  preview?: boolean;
}

export const FormFieldRenderer = ({ field, preview = false }: FormFieldRendererProps) => {
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
      case "number":
        return (
          <Input
            type={field.type === "number" ? "number" : "text"}
            placeholder={field.placeholder}
            disabled={preview}
          />
        );
      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            disabled={preview}
          />
        );
      case "select":
        return (
          <Select disabled={preview}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox id={option.id} disabled={preview} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        );
      case "radio":
        return (
          <RadioGroup disabled={preview}>
            {field.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "date":
        return (
          <Input
            type="date"
            disabled={preview}
          />
        );
      default:
        return <div>Unsupported field type</div>;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>
          {field.label}
          {field.required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      </div>
      {field.description && (
        <p className="text-sm text-muted-foreground">{field.description}</p>
      )}
      {renderField()}
    </div>
  );
};
