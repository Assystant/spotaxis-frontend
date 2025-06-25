
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TriggerEvent {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface ActionType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface WorkflowBlock {
  id: string;
  type: 'trigger' | 'action';
  eventType?: string;
  actionType?: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  isConfigured: boolean;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  trigger: WorkflowBlock | null;
  actions: WorkflowBlock[];
  created: Date;
  modified: Date;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowBlock | null;
  actions: WorkflowBlock[];
}

interface WorkflowContextType {
  automations: Automation[];
  currentAutomation: Automation | null;
  triggerEvents: TriggerEvent[];
  actionTypes: ActionType[];
  templates: WorkflowTemplate[];
  setCurrentAutomation: (automation: Automation | null) => void;
  saveAutomation: (automation: Automation) => void;
  deleteAutomation: (id: string) => void;
  toggleAutomation: (id: string, enabled: boolean) => void;
  getTemplate: (id: string) => WorkflowTemplate | undefined;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

const mockTriggerEvents: TriggerEvent[] = [
  { id: 'job_created', name: 'Job Created', description: 'When a new job posting is created', category: 'Jobs' },
  { id: 'job_updated', name: 'Job Updated', description: 'When a job posting is modified', category: 'Jobs' },
  { id: 'candidate_applies', name: 'Candidate Applies', description: 'When a candidate submits an application', category: 'Applications' },
  { id: 'candidate_stage_change', name: 'Candidate Stage Change', description: 'When a candidate moves between pipeline stages', category: 'Pipeline' },
  { id: 'interview_scheduled', name: 'Interview Scheduled', description: 'When an interview is scheduled', category: 'Interviews' },
  { id: 'interview_completed', name: 'Interview Completed', description: 'When an interview is marked as completed', category: 'Interviews' },
  { id: 'offer_extended', name: 'Offer Extended', description: 'When an offer is sent to a candidate', category: 'Offers' },
  { id: 'offer_accepted', name: 'Offer Accepted', description: 'When a candidate accepts an offer', category: 'Offers' },
  { id: 'offer_declined', name: 'Offer Declined', description: 'When a candidate declines an offer', category: 'Offers' },
  { id: 'application_withdrawn', name: 'Application Withdrawn', description: 'When a candidate withdraws their application', category: 'Applications' },
];

const mockActionTypes: ActionType[] = [
  { id: 'send_email', name: 'Send Email', description: 'Send an email notification', icon: '✉️', category: 'Communication' },
  { id: 'move_candidate', name: 'Move Candidate', description: 'Move candidate to a different stage', icon: '➡️', category: 'Pipeline' },
  { id: 'create_task', name: 'Create Task', description: 'Create a follow-up task', icon: '✅', category: 'Tasks' },
  { id: 'schedule_interview', name: 'Schedule Interview', description: 'Automatically schedule an interview', icon: '📅', category: 'Interviews' },
  { id: 'send_sms', name: 'Send SMS', description: 'Send SMS notification', icon: '💬', category: 'Communication' },
  { id: 'update_field', name: 'Update Field', description: 'Update a candidate or job field', icon: '📝', category: 'Data' },
  { id: 'create_note', name: 'Create Note', description: 'Add a note to the candidate profile', icon: '📄', category: 'Notes' },
  { id: 'webhook', name: 'Send Webhook', description: 'Send data to external system', icon: '🔗', category: 'Integration' },
];

const mockTemplates: WorkflowTemplate[] = [
  {
    id: 'welcome_applicant',
    name: 'Welcome New Applicants',
    description: 'Send welcome email when candidate applies',
    trigger: {
      id: 'trigger_template_1',
      type: 'trigger',
      eventType: 'candidate_applies',
      config: {},
      position: { x: 100, y: 100 },
      isConfigured: false,
    },
    actions: [
      {
        id: 'action_template_1',
        type: 'action',
        actionType: 'send_email',
        config: {},
        position: { x: 100, y: 250 },
        isConfigured: false,
      },
    ],
  },
  {
    id: 'interview_reminder',
    name: 'Interview Reminders',
    description: 'Send reminder emails 24h before interviews',
    trigger: {
      id: 'trigger_template_2',
      type: 'trigger',
      eventType: 'interview_scheduled',
      config: {},
      position: { x: 100, y: 100 },
      isConfigured: false,
    },
    actions: [
      {
        id: 'action_template_2',
        type: 'action',
        actionType: 'send_email',
        config: {},
        position: { x: 100, y: 250 },
        isConfigured: false,
      },
    ],
  },
];

const mockAutomations: Automation[] = [
  {
    id: '1',
    name: 'Welcome New Applicants',
    description: 'Send welcome email when candidate applies',
    enabled: true,
    trigger: {
      id: 'trigger_1',
      type: 'trigger',
      eventType: 'candidate_applies',
      config: { name: 'New Application Received' },
      position: { x: 100, y: 100 },
      isConfigured: true,
    },
    actions: [
      {
        id: 'action_1',
        type: 'action',
        actionType: 'send_email',
        config: {
          to: 'candidate',
          subject: 'Welcome to our team!',
          body: 'Thank you for your application...',
        },
        position: { x: 100, y: 250 },
        isConfigured: true,
      },
    ],
    created: new Date('2024-01-15'),
    modified: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Interview Reminders',
    description: 'Send reminder emails 24h before interviews',
    enabled: false,
    trigger: null,
    actions: [],
    created: new Date('2024-01-10'),
    modified: new Date('2024-01-12'),
  },
];

export const WorkflowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);
  const [currentAutomation, setCurrentAutomation] = useState<Automation | null>(null);

  const saveAutomation = (automation: Automation) => {
    setAutomations(prev => {
      const existing = prev.find(a => a.id === automation.id);
      if (existing) {
        return prev.map(a => a.id === automation.id ? automation : a);
      }
      return [...prev, automation];
    });
  };

  const deleteAutomation = (id: string) => {
    setAutomations(prev => prev.filter(a => a.id !== id));
  };

  const toggleAutomation = (id: string, enabled: boolean) => {
    setAutomations(prev => prev.map(a => 
      a.id === id ? { ...a, enabled, modified: new Date() } : a
    ));
  };

  const getTemplate = (id: string) => {
    return mockTemplates.find(t => t.id === id);
  };

  const value: WorkflowContextType = {
    automations,
    currentAutomation,
    triggerEvents: mockTriggerEvents,
    actionTypes: mockActionTypes,
    templates: mockTemplates,
    setCurrentAutomation,
    saveAutomation,
    deleteAutomation,
    toggleAutomation,
    getTemplate,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};
