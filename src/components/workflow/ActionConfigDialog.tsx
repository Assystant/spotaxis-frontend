
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type WorkflowBlock } from '@/contexts/WorkflowContext';

interface ActionConfigDialogProps {
  block: WorkflowBlock;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (config: Record<string, any>) => void;
}

export const ActionConfigDialog: React.FC<ActionConfigDialogProps> = ({
  block,
  open,
  onOpenChange,
  onSave,
}) => {
  const [config, setConfig] = useState<Record<string, any>>(block.config || {});

  const handleSave = () => {
    onSave(config);
    onOpenChange(false);
  };

  const renderConfigFields = () => {
    switch (block.actionType) {
      case 'send_email':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-to">To</Label>
              <Select value={config.to || ''} onValueChange={(value) => setConfig({ ...config, to: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candidate">Candidate</SelectItem>
                  <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="custom">Custom Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={config.subject || ''}
                onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                placeholder="Email subject"
              />
            </div>
            <div>
              <Label htmlFor="email-body">Message</Label>
              <Textarea
                id="email-body"
                value={config.body || ''}
                onChange={(e) => setConfig({ ...config, body: e.target.value })}
                placeholder="Email message..."
                rows={4}
              />
            </div>
          </div>
        );

      case 'move_candidate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="stage">Move to Stage</Label>
              <Select value={config.stage || ''} onValueChange={(value) => setConfig({ ...config, stage: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reason">Reason (Optional)</Label>
              <Textarea
                id="reason"
                value={config.reason || ''}
                onChange={(e) => setConfig({ ...config, reason: e.target.value })}
                placeholder="Reason for moving candidate..."
                rows={3}
              />
            </div>
          </div>
        );

      case 'create_task':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={config.title || ''}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                placeholder="Task title"
              />
            </div>
            <div>
              <Label htmlFor="task-assignee">Assign To</Label>
              <Select value={config.assignee || ''} onValueChange={(value) => setConfig({ ...config, assignee: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="me">Me</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={config.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                placeholder="Task description..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="task-due">Due Date</Label>
              <Select value={config.dueDate || ''} onValueChange={(value) => setConfig({ ...config, dueDate: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_hour">1 Hour</SelectItem>
                  <SelectItem value="1_day">1 Day</SelectItem>
                  <SelectItem value="3_days">3 Days</SelectItem>
                  <SelectItem value="1_week">1 Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="action-name">Action Name</Label>
              <Input
                id="action-name"
                value={config.name || ''}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                placeholder="Enter action name"
              />
            </div>
            <div>
              <Label htmlFor="action-description">Description</Label>
              <Textarea
                id="action-description"
                value={config.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                placeholder="Describe this action..."
                rows={3}
              />
            </div>
          </div>
        );
    }
  };

  const isValid = () => {
    switch (block.actionType) {
      case 'send_email':
        return config.to && config.subject && config.body;
      case 'move_candidate':
        return config.stage;
      case 'create_task':
        return config.title && config.assignee;
      default:
        return config.name;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Configure {block.actionType?.replace('_', ' ').toUpperCase()} Action
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {renderConfigFields()}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid()}>
            Save Action
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
