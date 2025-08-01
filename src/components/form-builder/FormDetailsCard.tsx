import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FormType } from "./types";
import { useState } from "react";

interface FormDetailsCardProps {
  name: string;
  type: FormType;
  tags: string[];
  onNameChange: (name: string) => void;
  onTypeChange: (type: FormType) => void;
  onTagsChange: (tags: string[]) => void;
}

export const FormDetailsCard = ({
  name,
  type,
  tags,
  onNameChange,
  onTypeChange,
  onTagsChange,
}: FormDetailsCardProps) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="formName">Form Name *</Label>
          <Input
            id="formName"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter form name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="formType">Form Type *</Label>
          <Select value={type} onValueChange={(value: FormType) => onTypeChange(value)}>
            <SelectTrigger id="formType">
              <SelectValue placeholder="Select form type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Scorecard">Scorecard</SelectItem>
              <SelectItem value="Applicant Form">Applicant Form</SelectItem>
              <SelectItem value="Feedback Form">Feedback Form</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="formTags">Tags</Label>
          <div className="flex gap-2">
            <Input
              id="formTags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              placeholder="Add a tag and press Enter"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTag}
              disabled={!newTag.trim() || tags.includes(newTag.trim())}
            >
              Add
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="pr-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove ${tag} tag`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};