
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWorkflow, type WorkflowBlock, type TriggerEvent, type ActionType } from '@/contexts/WorkflowContext';

interface WorkflowSidebarProps {
  mode: 'template' | 'scratch';
  currentStep: 'trigger' | 'actions';
  triggerBlock: WorkflowBlock | null;
  onSaveTrigger: (block: WorkflowBlock) => void;
  onAddAction: (block: WorkflowBlock) => void;
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  mode,
  currentStep,
  triggerBlock,
  onSaveTrigger,
  onAddAction,
}) => {
  const { triggerEvents, actionTypes } = useWorkflow();
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerEvent | null>(null);
  const [triggerConfig, setTriggerConfig] = useState<Record<string, any>>({});
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);

  // Group trigger events by category
  const triggerCategories = triggerEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, TriggerEvent[]>);

  // Group action types by category
  const actionCategories = actionTypes.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, ActionType[]>);

  const handleTriggerSelect = (trigger: TriggerEvent) => {
    setSelectedTrigger(trigger);
    setTriggerConfig({});
  };

  const handleSaveTrigger = () => {
    if (!selectedTrigger) return;

    const triggerBlock: WorkflowBlock = {
      id: `trigger_${Date.now()}`,
      type: 'trigger',
      eventType: selectedTrigger.id,
      config: triggerConfig,
      position: { x: 100, y: 100 },
      isConfigured: Object.keys(triggerConfig).length > 0,
    };

    onSaveTrigger(triggerBlock);
  };

  const handleActionDragStart = (action: ActionType) => {
    setSelectedAction(action);
  };

  const renderTriggerStep = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-3">Choose a Trigger Event</h3>
        <div className="space-y-4">
          {Object.entries(triggerCategories).map(([category, events]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
              <div className="space-y-1">
                {events.map((event) => (
                  <Button
                    key={event.id}
                    variant={selectedTrigger?.id === event.id ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => handleTriggerSelect(event)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{event.name}</div>
                      <div className="text-xs text-muted-foreground">{event.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTrigger && (
        <>
          <Separator />
          <div>
            <h4 className="font-medium mb-3">Configure Trigger</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="trigger-name">Trigger Name</Label>
                <Input
                  id="trigger-name"
                  value={triggerConfig.name || ''}
                  onChange={(e) => setTriggerConfig({ ...triggerConfig, name: e.target.value })}
                  placeholder="Enter trigger name"
                />
              </div>
              <div>
                <Label htmlFor="conditions">Conditions (Optional)</Label>
                <Textarea
                  id="conditions"
                  value={triggerConfig.conditions || ''}
                  onChange={(e) => setTriggerConfig({ ...triggerConfig, conditions: e.target.value })}
                  placeholder="Add any specific conditions..."
                  rows={3}
                />
              </div>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={handleSaveTrigger}
              disabled={!triggerConfig.name}
            >
              Save Trigger
            </Button>
          </div>
        </>
      )}
    </div>
  );

  const renderActionsStep = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-3">Add Actions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag actions to the canvas to add them to your workflow
        </p>
        <div className="space-y-4">
          {Object.entries(actionCategories).map(([category, actions]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
              <div className="space-y-1">
                {actions.map((action) => (
                  <div
                    key={action.id}
                    draggable
                    onDragStart={() => handleActionDragStart(action)}
                    className="p-3 border rounded-md cursor-move hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">{action.icon}</Badge>
                      <div>
                        <div className="font-medium text-sm">{action.name}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {currentStep === 'trigger' ? 'Trigger Configuration' : 'Action Palette'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 'trigger' ? renderTriggerStep() : renderActionsStep()}
        </CardContent>
      </Card>
    </div>
  );
};
