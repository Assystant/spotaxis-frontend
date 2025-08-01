
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { WorkflowSidebar } from './WorkflowSidebar';
import { CanvasArea } from './CanvasArea';
import { useWorkflow, type WorkflowBlock, type Automation } from '@/contexts/WorkflowContext';

interface WorkflowCanvasProps {
  mode: 'template' | 'scratch';
  automationId?: string | null;
  templateId?: string | null;
  onBack: () => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  mode,
  automationId,
  templateId,
  onBack,
}) => {
  const { automations, saveAutomation, getTemplate } = useWorkflow();
  const [currentStep, setCurrentStep] = useState<'trigger' | 'actions'>('trigger');
  const [triggerBlock, setTriggerBlock] = useState<WorkflowBlock | null>(null);
  const [actionBlocks, setActionBlocks] = useState<WorkflowBlock[]>([]);
  const [automationName, setAutomationName] = useState('Untitled Automation');

  const existingAutomation = automationId ? automations.find(a => a.id === automationId) : null;

  // Load existing automation or template on mount
  useEffect(() => {
    if (existingAutomation) {
      setAutomationName(existingAutomation.name);
      if (existingAutomation.trigger) {
        setTriggerBlock(existingAutomation.trigger);
        setCurrentStep('actions');
      }
      setActionBlocks(existingAutomation.actions);
    } else if (mode === 'template' && templateId) {
      const template = getTemplate(templateId);
      if (template) {
        setAutomationName(template.name);
        if (template.trigger) {
          const emptyTrigger = {
            ...template.trigger,
            id: `trigger_${Date.now()}`,
            config: {},
            isConfigured: false,
          };
          setTriggerBlock(emptyTrigger);
          setCurrentStep('actions');
        }
        const emptyActions = template.actions.map((action, index) => ({
          ...action,
          id: `action_${Date.now()}_${index}`,
          config: {},
          isConfigured: false,
        }));
        setActionBlocks(emptyActions);
      }
    }
  }, [existingAutomation, mode, templateId, getTemplate]);

  const handleSaveTrigger = (block: WorkflowBlock) => {
    setTriggerBlock(block);
    setCurrentStep('actions');
  };

  const handleAddAction = (block: WorkflowBlock) => {
    setActionBlocks(prev => [...prev, block]);
  };

  const handleUpdateActionBlocks = (blocks: WorkflowBlock[]) => {
    setActionBlocks(blocks);
  };

  const handleTriggerEdit = () => {
    setCurrentStep('trigger');
  };

  const canSave = triggerBlock && triggerBlock.isConfigured && 
    actionBlocks.every(action => action.isConfigured);

  const canLaunch = canSave;

  const handleSaveFlow = () => {
    if (!triggerBlock) return;

    const automation: Automation = {
      id: automationId || `automation_${Date.now()}`,
      name: automationName,
      description: `Automation triggered by ${triggerBlock.eventType?.replace('_', ' ')}`,
      enabled: false, // Save as draft
      trigger: triggerBlock,
      actions: actionBlocks,
      created: existingAutomation?.created || new Date(),
      modified: new Date(),
      runsSucceeded: existingAutomation?.runsSucceeded || 0,
      runsFailed: existingAutomation?.runsFailed || 0,
    };

    saveAutomation(automation);
    onBack();
  };

  const handleSaveAndLaunch = () => {
    if (!triggerBlock) return;

    const automation: Automation = {
      id: automationId || `automation_${Date.now()}`,
      name: automationName,
      description: `Automation triggered by ${triggerBlock.eventType?.replace('_', ' ')}`,
      enabled: true, // Save and activate
      trigger: triggerBlock,
      actions: actionBlocks,
      created: existingAutomation?.created || new Date(),
      modified: new Date(),
      runsSucceeded: existingAutomation?.runsSucceeded || 0,
      runsFailed: existingAutomation?.runsFailed || 0,
    };

    saveAutomation(automation);
    onBack();
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-background border-b p-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div className="flex items-center space-x-4">
            <div>
              <Input
                value={automationName}
                onChange={(e) => setAutomationName(e.target.value)}
                className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                placeholder="Enter automation name"
              />
              <p className="text-sm text-muted-foreground">
                {mode === 'template' ? 'Template Mode' : 'Custom Automation'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - 30% */}
        <div className="w-[30%] border-r bg-muted/20 overflow-y-auto">
          <WorkflowSidebar
            mode={mode}
            currentStep={currentStep}
            triggerBlock={triggerBlock}
            onSaveTrigger={handleSaveTrigger}
            onAddAction={handleAddAction}
            onStepChange={setCurrentStep}
          />
        </div>

        {/* Canvas Area - 70% */}
        <div className="w-[70%] bg-background flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <CanvasArea
              triggerBlock={triggerBlock}
              actionBlocks={actionBlocks}
              onUpdateActionBlocks={handleUpdateActionBlocks}
              onTriggerDoubleClick={handleTriggerEdit}
            />
          </div>
          
          {/* Bottom controls - moved outside of CanvasArea */}
          <div className="border-t bg-background p-6">
            <div className="flex justify-center space-x-3">
              <Button 
                variant="outline" 
                onClick={handleSaveFlow}
                disabled={!canSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Flow
              </Button>
              <Button 
                onClick={handleSaveAndLaunch}
                disabled={!canLaunch}
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Launch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
