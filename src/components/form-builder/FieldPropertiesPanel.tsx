
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormFieldOption } from "./types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { Trash2, Plus } from "lucide-react";

interface FieldPropertiesPanelProps {
  selectedField: FormField | undefined;
  onFieldUpdate: (field: FormField) => void;
}

export const FieldPropertiesPanel = ({
  selectedField,
  onFieldUpdate,
}: FieldPropertiesPanelProps) => {
  const [newOptionLabel, setNewOptionLabel] = useState("");

  if (!selectedField) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">Field Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            Select a field to edit its properties
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onFieldUpdate({
      ...selectedField,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    onFieldUpdate({
      ...selectedField,
      [name]: checked,
    });
  };

  const handleOptionChange = (
    id: string,
    field: "label" | "value",
    value: string
  ) => {
    if (!selectedField.options) return;

    const updatedOptions = selectedField.options.map((option) =>
      option.id === id ? { ...option, [field]: value } : option
    );

    onFieldUpdate({
      ...selectedField,
      options: updatedOptions,
    });
  };

  const handleAddOption = () => {
    if (!newOptionLabel.trim()) return;

    const newOption: FormFieldOption = {
      id: uuidv4(),
      label: newOptionLabel,
      value: newOptionLabel.toLowerCase().replace(/\s+/g, "_"),
    };

    onFieldUpdate({
      ...selectedField,
      options: [...(selectedField.options || []), newOption],
    });

    setNewOptionLabel("");
  };

  const handleDeleteOption = (id: string) => {
    if (!selectedField.options) return;

    const updatedOptions = selectedField.options.filter(
      (option) => option.id !== id
    );

    onFieldUpdate({
      ...selectedField,
      options: updatedOptions,
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Field Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="label">Field Label</Label>
          <Input
            id="label"
            name="label"
            value={selectedField.label}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="shortCode">Short Code</Label>
          <Input
            id="shortCode"
            name="shortCode"
            value={selectedField.shortCode}
            onChange={handleChange}
          />
        </div>

        {selectedField.type !== "checkbox" && (
          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              name="placeholder"
              value={selectedField.placeholder || ""}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={selectedField.description || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="required"
            checked={selectedField.required}
            onCheckedChange={(checked) =>
              handleSwitchChange("required", checked)
            }
          />
          <Label htmlFor="required">Required Field</Label>
        </div>

        {(selectedField.type === "select" ||
          selectedField.type === "radio" ||
          selectedField.type === "checkbox") && (
          <div className="space-y-2">
            <Label>Options</Label>
            <div className="space-y-2">
              {selectedField.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Input
                    value={option.label}
                    onChange={(e) =>
                      handleOptionChange(option.id, "label", e.target.value)
                    }
                    placeholder="Option Label"
                    className="flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteOption(option.id)}
                    className="h-10 w-10 text-destructive"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <Input
                  value={newOptionLabel}
                  onChange={(e) => setNewOptionLabel(e.target.value)}
                  placeholder="New Option"
                  className="flex-grow"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddOption}
                  className="h-10 w-10"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
