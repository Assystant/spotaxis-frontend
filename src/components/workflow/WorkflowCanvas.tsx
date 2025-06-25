
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { WorkflowSidebar } from './WorkflowSidebar';
import { CanvasArea } from './CanvasArea';
import { useWorkflow, type WorkflowBlock, type Automation } from '@/contexts/WorkflowContext';

interface WorkflowCanvasProps {
  mode: 'template' | 'scratch';
  automationId?: string | null;
  onBack: () => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  mode,
  automationId,
  onBack,
}) => {
  const { automations, saveAutomation } = useWorkflow();
  const [currentStep, setCurrentStep] = useState<'trigger' | 'actions'>('trigger');
  const [triggerBlock, setTriggerBlock] = useState<WorkflowBlock | null>(null);
  const [actionBlocks, setActionBlocks] = useState<WorkflowBlock[]>([]);
  const [automationName, setAutomationName] = useState('Untitled Automation');

  const existingAutomation = automationId ? automations.find(a => a.id === automationId) : null;

  const handleSaveTrigger = (block: WorkflowBlock) => {
    setTriggerBlock(block);
    setCurrentStep('actions');
  };

  const handleAddAction = (block: WorkflowBlock) => {
    setActionBlocks(prev => [...prev, block]);
  };

  const handleSaveAutomation = () => {
    if (!triggerBlock) return;

    const automation: Automation = {
      id: automationId || `automation_${Date.now()}`,
      name: automationName,
      description: `Automation triggered by ${triggerBlock.eventType}`,
      enabled: true,
      trigger: triggerBlock,
      actions: actionBlocks,
      created: existingAutomation?.created || new Date(),
      modified: new Date(),
    };

    saveAutomation(automation);
    onBack();
  };

  const canSave = triggerBlock && triggerBlock.isConfigured;

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-background border-b p-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h2 className="text-xl font-semibold">{automationName}</h2>
            <p className="text-sm text-muted-foreground">
              {mode === 'template' ? 'Template Mode' : 'Custom Automation'}
            </p>
          </div>
        </div>
        <Button onClick={handleSaveAutomation} disabled={!canSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Automation
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex w-full pt-20">
        {/* Left Sidebar - 30% */}
        <div className="w-[30%] border-r bg-muted/20">
          <WorkflowSidebar
            mode={mode}
            currentStep={currentStep}
            triggerBlock={triggerBlock}
            onSaveTrigger={handleSaveTrigger}
            onAddAction={handleAddAction}
          />
        </div>

        {/* Canvas Area - 70% */}
        <div className="w-[70%] bg-background">
          <CanvasArea
            triggerBlock={triggerBlock}
            actionBlocks={actionBlocks}
            onUpdateActionBlocks={setActionBlocks}
          />
        </div>
      </div>
    </div>
  );
};
