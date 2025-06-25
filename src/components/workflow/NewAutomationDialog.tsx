
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Code, Mail, ArrowRight, CheckSquare } from 'lucide-react';

interface NewAutomationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (mode: 'template' | 'scratch', templateId?: string) => void;
}

const templates = [
  {
    id: 'welcome_applicant',
    name: 'Welcome New Applicants',
    description: 'Send welcome email when candidate applies',
    icon: Mail,
  },
  {
    id: 'interview_reminder',
    name: 'Interview Reminders',
    description: 'Send reminder emails 24h before interviews',
    icon: CheckSquare,
  },
  {
    id: 'stage_notification',
    name: 'Stage Change Notifications',
    description: 'Notify hiring managers of candidate progress',
    icon: ArrowRight,
  },
];

export const NewAutomationDialog: React.FC<NewAutomationDialogProps> = ({
  open,
  onOpenChange,
  onSelect,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Automation</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
            onClick={() => onSelect('template')}
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
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                    <template.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{template.name}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={() => onSelect('template')}>
                Browse Templates
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
            onClick={() => onSelect('scratch')}
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
              <Button className="w-full" onClick={() => onSelect('scratch')}>
                Start Building
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
