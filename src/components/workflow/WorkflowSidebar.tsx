
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useWorkflow, type WorkflowBlock, type TriggerEvent, type ActionType, type ConditionalBranch } from '@/contexts/WorkflowContext';

interface WorkflowSidebarProps {
  mode: 'template' | 'scratch';
  currentStep: 'trigger' | 'actions';
  triggerBlock: WorkflowBlock | null;
  onSaveTrigger: (block: WorkflowBlock) => void;
  onAddAction: (block: WorkflowBlock) => void;
  onStepChange: (step: 'trigger' | 'actions') => void;
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  mode,
  currentStep,
  triggerBlock,
  onSaveTrigger,
  onAddAction,
  onStepChange,
}) => {
  const { triggerEvents, actionTypes, conditionalBranches, getTriggerEvent } = useWorkflow();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerEvent | null>(null);
  const [triggerConfig, setTriggerConfig] = useState<Record<string, any>>({});

  // Filter triggers based on search term
  const filteredTriggers = useMemo(() => {
    return triggerEvents.filter(trigger =>
      trigger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trigger.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [triggerEvents, searchTerm]);

  const handleTriggerSelect = (triggerId: string) => {
    const trigger = triggerEvents.find(t => t.id === triggerId);
    setSelectedTrigger(trigger || null);
    setTriggerConfig({});
  };

  const handleConfigChange = (paramId: string, value: any) => {
    setTriggerConfig(prev => ({ ...prev, [paramId]: value }));
  };

  const isConfigValid = () => {
    if (!selectedTrigger) return false;
    return selectedTrigger.parameters.every(param => 
      !param.required || (triggerConfig[param.id] !== undefined && triggerConfig[param.id] !== '')
    );
  };

  const handleAddTrigger = () => {
    if (!selectedTrigger || !isConfigValid()) return;

    const triggerBlock: WorkflowBlock = {
      id: `trigger_${Date.now()}`,
      type: 'trigger',
      eventType: selectedTrigger.id,
      config: triggerConfig,
      position: { x: 250, y: 100 },
      isConfigured: true,
    };

    onSaveTrigger(triggerBlock);
  };

  const handleActionDragStart = (action: ActionType, e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'action',
      ...action,
    }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleBranchDragStart = (branch: ConditionalBranch, e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'branch',
      ...branch,
    }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const renderParameterField = (param: any, value: any) => {
    switch (param.type) {
      case 'select':
        return (
          <Select value={value || ''} onValueChange={(v) => handleConfigChange(param.id, v)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${param.name}`} />
            </SelectTrigger>
            <SelectContent>
              {param.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => handleConfigChange(param.id, e.target.value)}
            placeholder={param.placeholder}
            rows={3}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => handleConfigChange(param.id, e.target.value)}
            placeholder={param.placeholder}
          />
        );
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleConfigChange(param.id, e.target.value)}
            placeholder={param.placeholder}
          />
        );
    }
  };

  const renderTriggerStep = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="trigger-search">Search Triggers</Label>
        <Input
          id="trigger-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search triggers..."
          className="mb-3"
        />
        
        <Label htmlFor="trigger-select">Select Trigger Event</Label>
        <Select onValueChange={handleTriggerSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a trigger event" />
          </SelectTrigger>
          <SelectContent>
            {filteredTriggers.map((trigger) => (
              <SelectItem key={trigger.id} value={trigger.id}>
                <div>
                  <div className="font-medium">{trigger.name}</div>
                  <div className="text-xs text-muted-foreground">{trigger.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTrigger && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="font-medium">Configure {selectedTrigger.name}</h4>
            {selectedTrigger.parameters.map((param) => (
              <div key={param.id}>
                <Label htmlFor={param.id}>
                  {param.name} {param.required && <span className="text-red-500">*</span>}
                </Label>
                {renderParameterField(param, triggerConfig[param.id])}
              </div>
            ))}
            <Button 
              onClick={handleAddTrigger}
              disabled={!isConfigValid()}
              className="w-full"
            >
              Add Trigger
            </Button>
          </div>
        </>
      )}
    </div>
  );

  const renderActionsStep = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Button variant="ghost" size="sm" onClick={() => onStepChange('trigger')}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <span className="text-sm text-muted-foreground">to Trigger</span>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Actions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag actions to the canvas to add them to your workflow
        </p>
        <div className="space-y-2">
          {actionTypes.map((action) => (
            <div
              key={action.id}
              draggable
              onDragStart={(e) => handleActionDragStart(action, e)}
              className="p-3 border rounded-md cursor-move hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="text-xs">{action.icon}</Badge>
                <div>
                  <div className="font-medium text-sm">{action.name}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-3">Conditional Branches</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag branches to create conditional logic
        </p>
        <div className="space-y-2">
          {conditionalBranches.map((branch) => (
            <div
              key={branch.id}
              draggable
              onDragStart={(e) => handleBranchDragStart(branch, e)}
              className="p-3 border rounded-md cursor-move hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-xs">◊</Badge>
                <div>
                  <div className="font-medium text-sm">{branch.name}</div>
                  <div className="text-xs text-muted-foreground">{branch.description}</div>
                </div>
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
            {currentStep === 'trigger' ? 'Trigger Configuration' : 'Actions & Branches'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 'trigger' ? renderTriggerStep() : renderActionsStep()}
        </CardContent>
      </Card>
    </div>
  );
};
