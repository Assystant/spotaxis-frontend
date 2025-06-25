
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { NewAutomationDialog } from './NewAutomationDialog';

interface AutomationsListProps {
  onNewAutomation: (mode: 'template' | 'scratch', templateId?: string) => void;
  onEditAutomation: (id: string) => void;
}

export const AutomationsList: React.FC<AutomationsListProps> = ({ 
  onNewAutomation, 
  onEditAutomation 
}) => {
  const { automations, toggleAutomation, deleteAutomation } = useWorkflow();
  const [showNewDialog, setShowNewDialog] = useState(false);

  const handleNewAutomation = (mode: 'template' | 'scratch', templateId?: string) => {
    setShowNewDialog(false);
    onNewAutomation(mode, templateId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getTriggerSummary = (automation: any) => {
    if (!automation.trigger) return 'No trigger configured';
    return automation.trigger.eventType?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown trigger';
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Workflow Automations</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Automate repetitive tasks in your recruitment process
            </p>
          </div>
          <Button onClick={() => setShowNewDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Automation
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Name</TableHead>
                <TableHead>Trigger Summary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead className="w-12 pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automations.map((automation) => (
                <TableRow key={automation.id}>
                  <TableCell className="pl-6">
                    <div>
                      <div className="font-medium">{automation.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {automation.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {getTriggerSummary(automation)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={automation.enabled}
                        onCheckedChange={(checked) => 
                          toggleAutomation(automation.id, checked)
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {automation.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(automation.created)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(automation.modified)}
                  </TableCell>
                  <TableCell className="pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditAutomation(automation.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteAutomation(automation.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {automations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No automations created yet. 
                      <Button 
                        variant="link" 
                        onClick={() => setShowNewDialog(true)}
                        className="ml-1 p-0 h-auto"
                      >
                        Create your first automation
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewAutomationDialog 
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onSelect={handleNewAutomation}
      />
    </div>
  );
};
