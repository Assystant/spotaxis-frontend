
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Code, Mail, ArrowRight, CheckSquare, Users, Calendar, FileText } from 'lucide-react';
import { useWorkflow } from '@/contexts/WorkflowContext';

interface NewAutomationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (mode: 'template' | 'scratch', templateId?: string) => void;
}

export const NewAutomationDialog: React.FC<NewAutomationDialogProps> = ({
  open,
  onOpenChange,
  onSelect,
}) => {
  const [selectedView, setSelectedView] = useState<'choice' | 'templates'>('choice');
  const { templates } = useWorkflow();

  const handleTemplateChoice = () => {
    setSelectedView('templates');
  };

  const handleScratchChoice = () => {
    onSelect('scratch');
  };

  const handleTemplateSelect = (templateId: string) => {
    onSelect('template', templateId);
  };

  const handleBack = () => {
    setSelectedView('choice');
  };

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'new_applicant_workflow':
        return Users;
      case 'interview_reminder':
        return Calendar;
      case 'offer_follow_up':
        return FileText;
      default:
        return Mail;
    }
  };

  const renderChoiceView = () => (
    <div className="grid grid-cols-2 gap-6 mt-4">
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
        onClick={handleTemplateChoice}
      >
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-lg">Use Template</CardTitle>
          <CardDescription>
            Start with a pre-built automation template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">New Applicant Workflow</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Interview Reminder</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Offer Follow-Up</span>
            </div>
          </div>
          <Button className="w-full" onClick={handleTemplateChoice}>
            Browse Templates
          </Button>
        </CardContent>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
        onClick={handleScratchChoice}
      >
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Code className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-lg">Create from Scratch</CardTitle>
          <CardDescription>
            Build a custom automation from the ground up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1 mb-4">
            <li>• Choose your trigger event</li>
            <li>• Add custom actions</li>
            <li>• Configure conditions</li>
            <li>• Full customization</li>
          </ul>
          <Button className="w-full" onClick={handleScratchChoice}>
            Start Building
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderTemplateGallery = () => (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Choose a Template</h3>
        <Button variant="ghost" size="sm" onClick={handleBack}>
          ← Back to Options
        </Button>
      </div>
      <div className="grid gap-4">
        {templates.map((template) => {
          const IconComponent = getTemplateIcon(template.id);
          return (
            <Card 
              key={template.id}
              className="cursor-pointer hover:shadow-md transition-shadow border hover:border-primary/20"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {template.trigger?.eventType?.replace('_', ' ').toUpperCase() || 'TRIGGER'}
                  </Badge>
                  {template.actions.map((action, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {action.actionType?.replace('_', ' ').toUpperCase() || 'ACTION'}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" className="w-full">
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) setSelectedView('choice');
    }}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedView === 'choice' ? 'Create New Automation' : 'Template Gallery'}
          </DialogTitle>
        </DialogHeader>
        {selectedView === 'choice' ? renderChoiceView() : renderTemplateGallery()}
      </DialogContent>
    </Dialog>
  );
};
