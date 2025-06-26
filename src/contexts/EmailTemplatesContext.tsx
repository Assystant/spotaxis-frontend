
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
  lastUsed: Date | null;
  lastEdited: Date;
  created: Date;
}

interface EmailTemplatesContextType {
  templates: EmailTemplate[];
  saveTemplate: (template: Omit<EmailTemplate, 'id' | 'created' | 'lastEdited'> & { id?: string }) => void;
  deleteTemplate: (id: string) => void;
  getTemplate: (id: string) => EmailTemplate | undefined;
}

const EmailTemplatesContext = createContext<EmailTemplatesContextType | undefined>(undefined);

const starterTemplates: EmailTemplate[] = [
  {
    id: 'new_application_received',
    name: 'New Application Received',
    description: 'Notifies recruiter of a new candidate application.',
    subject: 'New Application for {{job.title}}',
    body: 'Hello {{recruiter.name}},\n\nYou have received a new application from {{candidate.name}}. View it here: {{application.link}}\n\nBest,\nTeam',
    lastUsed: null,
    lastEdited: new Date(),
    created: new Date(),
  },
  {
    id: 'interview_invitation',
    name: 'Interview Invitation',
    description: 'Invites candidate to schedule an interview.',
    subject: 'Interview Invitation for {{job.title}}',
    body: 'Hi {{candidate.name}},\n\nWe\'d like to invite you to interview for the {{job.title}} position on {{interview.date}} at {{interview.time}}.\n\nPlease confirm or reschedule here: {{interview.link}}\n\nThanks,\n{{recruiter.name}}',
    lastUsed: null,
    lastEdited: new Date(),
    created: new Date(),
  },
  {
    id: 'offer_letter',
    name: 'Offer Letter',
    description: 'Sends the formal offer letter to the candidate.',
    subject: 'Your Offer for {{job.title}}',
    body: 'Congratulations {{candidate.name}}!\n\nWe are pleased to offer you the {{job.title}} position at {{company.name}} with a starting salary of {{offer.amount}}. See the full details here: {{offer.link}}\n\nWelcome aboard!\n{{recruiter.name}}',
    lastUsed: null,
    lastEdited: new Date(),
    created: new Date(),
  },
];

export const EmailTemplatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('emailTemplates');
    if (stored) {
      const parsedTemplates = JSON.parse(stored).map((template: any) => ({
        ...template,
        lastUsed: template.lastUsed ? new Date(template.lastUsed) : null,
        lastEdited: new Date(template.lastEdited),
        created: new Date(template.created),
      }));
      setTemplates(parsedTemplates);
    } else {
      setTemplates(starterTemplates);
      localStorage.setItem('emailTemplates', JSON.stringify(starterTemplates));
    }
  }, []);

  const saveTemplate = (templateData: Omit<EmailTemplate, 'id' | 'created' | 'lastEdited'> & { id?: string }) => {
    const now = new Date();
    let updatedTemplate: EmailTemplate;

    if (templateData.id) {
      // Update existing template
      updatedTemplate = {
        ...templateData,
        id: templateData.id,
        lastEdited: now,
        created: templates.find(t => t.id === templateData.id)?.created || now,
      };
      setTemplates(prev => prev.map(t => t.id === templateData.id ? updatedTemplate : t));
    } else {
      // Create new template
      updatedTemplate = {
        ...templateData,
        id: `template_${Date.now()}`,
        created: now,
        lastEdited: now,
      };
      setTemplates(prev => [...prev, updatedTemplate]);
    }

    // Update localStorage
    const updatedTemplates = templateData.id 
      ? templates.map(t => t.id === templateData.id ? updatedTemplate : t)
      : [...templates, updatedTemplate];
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    const updatedTemplates = templates.filter(t => t.id !== id);
    localStorage.setItem('emailTemplates', JSON.stringify(updatedTemplates));
  };

  const getTemplate = (id: string) => {
    return templates.find(t => t.id === id);
  };

  return (
    <EmailTemplatesContext.Provider value={{
      templates,
      saveTemplate,
      deleteTemplate,
      getTemplate,
    }}>
      {children}
    </EmailTemplatesContext.Provider>
  );
};

export const useEmailTemplates = () => {
  const context = useContext(EmailTemplatesContext);
  if (!context) {
    throw new Error('useEmailTemplates must be used within EmailTemplatesProvider');
  }
  return context;
};
