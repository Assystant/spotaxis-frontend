
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { EmailTemplatesList } from '@/components/email-templates/EmailTemplatesList';
import { EmailTemplateEditor } from '@/components/email-templates/EmailTemplateEditor';
import { useEmailTemplates, type EmailTemplate } from '@/contexts/EmailTemplatesContext';

const EmailTemplates = () => {
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  const handleAddNew = () => {
    setEditingTemplate(null);
    setCurrentView('editor');
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setCurrentView('editor');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingTemplate(null);
  };

  const actionButton = currentView === 'list' ? (
    <Button onClick={handleAddNew}>
      <Plus className="w-4 h-4 mr-2" />
      Add New Template
    </Button>
  ) : null;

  return (
    <PageContainer 
      title="Email Templates" 
      description="Create and manage email templates for your recruitment workflows"
      actionButton={actionButton}
    >
      {currentView === 'list' ? (
        <EmailTemplatesList onEdit={handleEdit} />
      ) : (
        <EmailTemplateEditor 
          template={editingTemplate}
          onBack={handleBackToList}
        />
      )}
    </PageContainer>
  );
};

export default EmailTemplates;
