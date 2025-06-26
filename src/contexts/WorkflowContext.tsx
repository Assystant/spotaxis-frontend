
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TriggerEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  parameters: TriggerParameter[];
}

export interface TriggerParameter {
  id: string;
  name: string;
  type: 'select' | 'text' | 'datetime' | 'number';
  required: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface ActionType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  parameters: ActionParameter[];
}

export interface ActionParameter {
  id: string;
  name: string;
  type: 'select' | 'text' | 'textarea' | 'number' | 'email';
  required: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface ConditionalBranch {
  id: string;
  name: string;
  description: string;
  parameters: BranchParameter[];
}

export interface BranchParameter {
  id: string;
  name: string;
  type: 'select' | 'text' | 'number';
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface WorkflowBlock {
  id: string;
  type: 'trigger' | 'action' | 'branch';
  eventType?: string;
  actionType?: string;
  branchType?: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  isConfigured: boolean;
  connections?: string[];
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
  runsSucceeded: number;
  runsFailed: number;
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
  conditionalBranches: ConditionalBranch[];
  templates: WorkflowTemplate[];
  setCurrentAutomation: (automation: Automation | null) => void;
  saveAutomation: (automation: Automation) => void;
  deleteAutomation: (id: string) => void;
  toggleAutomation: (id: string, enabled: boolean) => void;
  getTemplate: (id: string) => WorkflowTemplate | undefined;
  getTriggerEvent: (id: string) => TriggerEvent | undefined;
  getActionType: (id: string) => ActionType | undefined;
  getConditionalBranch: (id: string) => ConditionalBranch | undefined;
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
  {
    id: 'candidate_applies',
    name: 'Candidate Applies',
    description: 'When a candidate submits an application',
    category: 'Applications',
    parameters: [
      { id: 'job_id', name: 'Job Position', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Position' },
        { value: 'developer', label: 'Software Developer' },
        { value: 'designer', label: 'UI/UX Designer' }
      ]}
    ]
  },
  {
    id: 'candidate_stage_change',
    name: 'Candidate Stage Change',
    description: 'When a candidate moves between pipeline stages',
    category: 'Pipeline',
    parameters: [
      { id: 'from_stage', name: 'From Stage', type: 'select', required: true, options: [
        { value: 'applied', label: 'Applied' },
        { value: 'screening', label: 'Screening' },
        { value: 'interview', label: 'Interview' }
      ]},
      { id: 'to_stage', name: 'To Stage', type: 'select', required: true, options: [
        { value: 'screening', label: 'Screening' },
        { value: 'interview', label: 'Interview' },
        { value: 'offer', label: 'Offer' }
      ]}
    ]
  },
  {
    id: 'interview_scheduled',
    name: 'Interview Scheduled',
    description: 'When an interview is scheduled',
    category: 'Interviews',
    parameters: [
      { id: 'interviewer', name: 'Interviewer', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Interviewer' },
        { value: 'john_doe', label: 'John Doe' },
        { value: 'jane_smith', label: 'Jane Smith' }
      ]}
    ]
  },
  {
    id: 'offer_extended',
    name: 'Offer Extended',
    description: 'When an offer is sent to a candidate',
    category: 'Offers',
    parameters: [
      { id: 'min_amount', name: 'Minimum Offer Amount', type: 'number', required: false, placeholder: 'e.g. 50000' }
    ]
  }
];

const mockActionTypes: ActionType[] = [
  {
    id: 'send_email',
    name: 'Send Email',
    description: 'Send an email notification',
    icon: '✉️',
    category: 'Communication',
    parameters: [
      { id: 'to', name: 'Recipient', type: 'select', required: true, options: [
        { value: 'candidate', label: 'Candidate' },
        { value: 'hiring_manager', label: 'Hiring Manager' },
        { value: 'recruiter', label: 'Recruiter' }
      ]},
      { id: 'subject', name: 'Subject', type: 'text', required: true, placeholder: 'Email subject' },
      { id: 'body', name: 'Message', type: 'textarea', required: true, placeholder: 'Email message...' }
    ]
  },
  {
    id: 'move_candidate',
    name: 'Move Candidate',
    description: 'Move candidate to a different stage',
    icon: '➡️',
    category: 'Pipeline',
    parameters: [
      { id: 'stage', name: 'Target Stage', type: 'select', required: true, options: [
        { value: 'screening', label: 'Screening' },
        { value: 'interview', label: 'Interview' },
        { value: 'offer', label: 'Offer' },
        { value: 'hired', label: 'Hired' }
      ]},
      { id: 'reason', name: 'Reason', type: 'textarea', required: false, placeholder: 'Reason for moving candidate...' }
    ]
  },
  {
    id: 'create_task',
    name: 'Create Task',
    description: 'Create a follow-up task',
    icon: '✅',
    category: 'Tasks',
    parameters: [
      { id: 'title', name: 'Task Title', type: 'text', required: true, placeholder: 'Task title' },
      { id: 'assignee', name: 'Assign To', type: 'select', required: true, options: [
        { value: 'hiring_manager', label: 'Hiring Manager' },
        { value: 'recruiter', label: 'Recruiter' },
        { value: 'me', label: 'Me' }
      ]},
      { id: 'due_date', name: 'Due Date', type: 'select', required: false, options: [
        { value: '1_hour', label: '1 Hour' },
        { value: '1_day', label: '1 Day' },
        { value: '3_days', label: '3 Days' },
        { value: '1_week', label: '1 Week' }
      ]}
    ]
  }
];

const mockConditionalBranches: ConditionalBranch[] = [
  {
    id: 'experience_check',
    name: 'Years Experience Check',
    description: 'Check candidate years of experience',
    parameters: [
      { id: 'operator', name: 'Operator', type: 'select', required: true, options: [
        { value: 'gte', label: '>=' },
        { value: 'lte', label: '<=' },
        { value: 'eq', label: '=' }
      ]},
      { id: 'value', name: 'Years', type: 'number', required: true }
    ]
  },
  {
    id: 'salary_check',
    name: 'Salary Expectation Check',
    description: 'Check candidate salary expectations',
    parameters: [
      { id: 'operator', name: 'Operator', type: 'select', required: true, options: [
        { value: 'gte', label: '>=' },
        { value: 'lte', label: '<=' }
      ]},
      { id: 'value', name: 'Amount', type: 'number', required: true }
    ]
  }
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
      config: { job_id: 'any' },
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
    runsSucceeded: 142,
    runsFailed: 3,
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
    runsSucceeded: 0,
    runsFailed: 0,
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

  const getTriggerEvent = (id: string) => {
    return mockTriggerEvents.find(t => t.id === id);
  };

  const getActionType = (id: string) => {
    return mockActionTypes.find(a => a.id === id);
  };

  const getConditionalBranch = (id: string) => {
    return mockConditionalBranches.find(b => b.id === id);
  };

  const value: WorkflowContextType = {
    automations,
    currentAutomation,
    triggerEvents: mockTriggerEvents,
    actionTypes: mockActionTypes,
    conditionalBranches: mockConditionalBranches,
    templates: [],
    setCurrentAutomation,
    saveAutomation,
    deleteAutomation,
    toggleAutomation,
    getTemplate,
    getTriggerEvent,
    getActionType,
    getConditionalBranch,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};

const mockTemplates: WorkflowTemplate[] = [];
