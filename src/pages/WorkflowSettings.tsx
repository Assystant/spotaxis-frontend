
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { AutomationsList } from '@/components/workflow/AutomationsList';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { WorkflowProvider } from '@/contexts/WorkflowContext';

export type WorkflowMode = 'list' | 'template' | 'scratch';

const WorkflowSettings = () => {
  const [mode, setMode] = useState<WorkflowMode>('list');
  const [editingAutomation, setEditingAutomation] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleNewAutomation = (mode: 'template' | 'scratch', templateId?: string) => {
    setMode(mode);
    setEditingAutomation(null);
    setSelectedTemplate(templateId || null);
  };

  const handleEditAutomation = (id: string) => {
    setEditingAutomation(id);
    setMode('scratch');
    setSelectedTemplate(null);
  };

  const handleBackToList = () => {
    setMode('list');
    setEditingAutomation(null);
    setSelectedTemplate(null);
  };

  return (
    <WorkflowProvider>
      <div className="h-full">
        {mode === 'list' ? (
          <PageContainer 
            title="Workflow Automations" 
            description="Automate your recruitment processes with custom workflows"
          >
            <AutomationsList 
              onNewAutomation={handleNewAutomation}
              onEditAutomation={handleEditAutomation}
            />
          </PageContainer>
        ) : (
          <WorkflowCanvas 
            mode={mode}
            automationId={editingAutomation}
            templateId={selectedTemplate}
            onBack={handleBackToList}
          />
        )}
      </div>
    </WorkflowProvider>
  );
};

export default WorkflowSettings;
