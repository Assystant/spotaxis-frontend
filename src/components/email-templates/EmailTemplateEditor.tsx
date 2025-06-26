
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useEmailTemplates, type EmailTemplate } from '@/contexts/EmailTemplatesContext';
import { RichTextEditor } from './RichTextEditor';
import { EmailPreview } from './EmailPreview';

interface EmailTemplateEditorProps {
  template: EmailTemplate | null;
  onBack: () => void;
}

export const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({ template, onBack }) => {
  const { saveTemplate } = useEmailTemplates();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: '',
    body: '',
  });

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        description: template.description,
        subject: template.subject,
        body: template.body,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        subject: '',
        body: '',
      });
    }
  }, [template]);

  const handleSave = (publish: boolean = false) => {
    const templateData = {
      ...formData,
      id: template?.id,
      lastUsed: template?.lastUsed || null,
    };
    
    saveTemplate(templateData);
    onBack();
  };

  const isValid = formData.name.trim() && formData.subject.trim() && formData.body.trim();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
          <h2 className="text-2xl font-semibold">
            {template ? 'Edit Template' : 'New Template'}
          </h2>
        </div>
      </div>

      {/* Template Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Template Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter template name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description of this template"
          />
        </div>
      </div>

      {/* Two-pane editor */}
      <div className="grid grid-cols-2 gap-6 h-[600px]">
        {/* Left Pane: Editor */}
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="text-lg font-medium">Email Editor</h3>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="Enter email subject"
            />
          </div>

          <div className="space-y-2 flex-1">
            <Label>Email Body</Label>
            <RichTextEditor
              value={formData.body}
              onChange={(value) => setFormData(prev => ({ ...prev, body: value }))}
            />
          </div>
        </div>

        {/* Right Pane: Preview */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Live Preview</h3>
          <EmailPreview subject={formData.subject} body={formData.body} />
        </div>
      </div>

      {/* Save Controls */}
      <div className="flex justify-center space-x-3 pt-4">
        <Button 
          variant="outline" 
          onClick={() => handleSave(false)}
          disabled={!isValid}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button 
          onClick={() => handleSave(true)}
          disabled={!isValid}
        >
          <Save className="w-4 h-4 mr-2" />
          Save & Publish
        </Button>
      </div>
    </div>
  );
};
