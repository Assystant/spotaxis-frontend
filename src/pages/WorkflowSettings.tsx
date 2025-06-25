
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AutomationsList } from '@/components/workflow/AutomationsList';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { WorkflowProvider } from '@/contexts/WorkflowContext';

export type WorkflowMode = 'list' | 'template' | 'scratch';

const WorkflowSettings = () => {
  const [mode, setMode] = useState<WorkflowMode>('list');
  const [editingAutomation, setEditingAutomation] = useState<string | null>(null);

  const handleNewAutomation = (mode: 'template' | 'scratch') => {
    setMode(mode);
    setEditingAutomation(null);
  };

  const handleEditAutomation = (id: string) => {
    setEditingAutomation(id);
    setMode('scratch');
  };

  const handleBackToList = () => {
    setMode('list');
    setEditingAutomation(null);
  };

  return (
    <WorkflowProvider>
      <PageContainer 
        title="Workflow Automations" 
        description="Automate your recruitment processes with custom workflows"
      >
        {mode === 'list' ? (
          <AutomationsList 
            onNewAutomation={handleNewAutomation}
            onEditAutomation={handleEditAutomation}
          />
        ) : (
          <WorkflowCanvas 
            mode={mode}
            automationId={editingAutomation}
            onBack={handleBackToList}
          />
        )}
      </PageContainer>
    </WorkflowProvider>
  );
};

export default WorkflowSettings;
