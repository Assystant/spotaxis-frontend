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
    id: 'job_created',
    name: 'Job Created',
    description: 'When a new job position is created',
    category: 'Jobs',
    parameters: [
      { id: 'department', name: 'Department', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Department' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' }
      ]}
    ]
  },
  {
    id: 'job_updated',
    name: 'Job Updated',
    description: 'When a job position is modified',
    category: 'Jobs',
    parameters: [
      { id: 'field_changed', name: 'Field Changed', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Field' },
        { value: 'title', label: 'Job Title' },
        { value: 'description', label: 'Description' },
        { value: 'requirements', label: 'Requirements' }
      ]}
    ]
  },
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
    id: 'interview_completed',
    name: 'Interview Completed',
    description: 'When an interview is marked as completed',
    category: 'Interviews',  
    parameters: [
      { id: 'outcome', name: 'Interview Outcome', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Outcome' },
        { value: 'positive', label: 'Positive' },
        { value: 'negative', label: 'Negative' }
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
  },
  {
    id: 'offer_accepted',
    name: 'Offer Accepted',
    description: 'When a candidate accepts an offer',
    category: 'Offers',
    parameters: [
      { id: 'start_date', name: 'Start Date', type: 'datetime', required: false }
    ]
  },
  {
    id: 'offer_declined',
    name: 'Offer Declined',
    description: 'When a candidate declines an offer',
    category: 'Offers',
    parameters: [
      { id: 'reason', name: 'Decline Reason', type: 'text', required: false, placeholder: 'Optional reason' }
    ]
  },
  {
    id: 'application_withdrawn',
    name: 'Application Withdrawn',
    description: 'When a candidate withdraws their application',
    category: 'Applications',
    parameters: [
      { id: 'reason', name: 'Withdrawal Reason', type: 'text', required: false, placeholder: 'Optional reason' }
    ]
  },
  {
    id: 'candidate_rejected',
    name: 'Candidate Rejected',
    description: 'When a candidate is rejected',
    category: 'Pipeline',
    parameters: [
      { id: 'stage', name: 'Stage of Rejection', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Stage' },
        { value: 'screening', label: 'Screening' },
        { value: 'interview', label: 'Interview' },
        { value: 'final', label: 'Final Review' }
      ]}
    ]
  },
  {
    id: 'assessment_completed',
    name: 'Assessment Completed',
    description: 'When a candidate completes an assessment',
    category: 'Assessments',
    parameters: [
      { id: 'assessment_type', name: 'Assessment Type', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Assessment' },
        { value: 'technical', label: 'Technical' },
        { value: 'personality', label: 'Personality' },
        { value: 'cognitive', label: 'Cognitive' }
      ]}
    ]
  },
  {
    id: 'document_uploaded',
    name: 'Document Uploaded',
    description: 'When a document is uploaded to a candidate profile',
    category: 'Documents',
    parameters: [
      { id: 'document_type', name: 'Document Type', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Document' },
        { value: 'resume', label: 'Resume' },
        { value: 'cover_letter', label: 'Cover Letter' },
        { value: 'certificate', label: 'Certificate' }
      ]}
    ]
  },
  {
    id: 'new_comment_added',
    name: 'New Comment Added',
    description: 'When a comment is added to a candidate',
    category: 'Communication',
    parameters: [
      { id: 'author_role', name: 'Author Role', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Role' },
        { value: 'recruiter', label: 'Recruiter' },
        { value: 'hiring_manager', label: 'Hiring Manager' }
      ]}
    ]
  },
  {
    id: 'pipeline_created_deleted',
    name: 'Pipeline Created or Deleted',
    description: 'When a pipeline is created or deleted',
    category: 'System',
    parameters: [
      { id: 'action', name: 'Action', type: 'select', required: true, options: [
        { value: 'created', label: 'Created' },
        { value: 'deleted', label: 'Deleted' }
      ]}
    ]
  },
  {
    id: 'permissions_changed',
    name: 'Permissions Changed',
    description: 'When user permissions are modified',
    category: 'System',
    parameters: [
      { id: 'user_role', name: 'User Role', type: 'select', required: false, options: [
        { value: 'any', label: 'Any Role' },
        { value: 'admin', label: 'Admin' },
        { value: 'recruiter', label: 'Recruiter' },
        { value: 'hiring_manager', label: 'Hiring Manager' }
      ]}
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
  },
  {
    id: 'add_to_talent_pool',
    name: 'Add to Talent Pool',
    description: 'Add candidate to talent pool',
    icon: '👥',
    category: 'Talent',
    parameters: [
      { id: 'pool_type', name: 'Pool Type', type: 'select', required: true, options: [
        { value: 'general', label: 'General Pool' },
        { value: 'senior', label: 'Senior Candidates' },
        { value: 'junior', label: 'Junior Candidates' }
      ]},
      { id: 'tags', name: 'Tags', type: 'text', required: false, placeholder: 'Comma-separated tags' }
    ]
  },
  {
    id: 'update_candidate_status',
    name: 'Update Candidate Status',
    description: 'Update the candidate status',
    icon: '🔄',
    category: 'Pipeline',
    parameters: [
      { id: 'status', name: 'New Status', type: 'select', required: true, options: [
        { value: 'active', label: 'Active' },
        { value: 'on_hold', label: 'On Hold' },
        { value: 'blacklisted', label: 'Blacklisted' }
      ]},
      { id: 'note', name: 'Status Note', type: 'textarea', required: false, placeholder: 'Optional note about status change' }
    ]
  },
  {
    id: 'post_slack_notification',
    name: 'Post Slack Notification',
    description: 'Send a notification to Slack',
    icon: '💬',
    category: 'Communication',
    parameters: [
      { id: 'channel', name: 'Slack Channel', type: 'select', required: true, options: [
        { value: 'general', label: '#general' },
        { value: 'recruiting', label: '#recruiting' },
        { value: 'hiring-updates', label: '#hiring-updates' }
      ]},
      { id: 'message', name: 'Message', type: 'textarea', required: true, placeholder: 'Slack message content' }
    ]
  },
  {
    id: 'generate_offer_letter',
    name: 'Generate Offer Letter',
    description: 'Create an offer letter document',
    icon: '📄',
    category: 'Documents',
    parameters: [
      { id: 'template', name: 'Template', type: 'select', required: true, options: [
        { value: 'standard', label: 'Standard Offer' },
        { value: 'senior', label: 'Senior Position' },
        { value: 'contractor', label: 'Contractor' }
      ]},
      { id: 'salary', name: 'Salary Amount', type: 'number', required: true, placeholder: 'Annual salary' }
    ]
  },
  {
    id: 'schedule_interview',
    name: 'Schedule Interview',
    description: 'Schedule an interview automatically',
    icon: '📅',
    category: 'Interviews',
    parameters: [
      { id: 'interviewer', name: 'Interviewer', type: 'select', required: true, options: [
        { value: 'john_doe', label: 'John Doe' },
        { value: 'jane_smith', label: 'Jane Smith' },
        { value: 'hiring_manager', label: 'Hiring Manager' }
      ]},
      { id: 'duration', name: 'Duration', type: 'select', required: true, options: [
        { value: '30', label: '30 minutes' },
        { value: '60', label: '1 hour' },
        { value: '90', label: '1.5 hours' }
      ]},
      { id: 'type', name: 'Interview Type', type: 'select', required: false, options: [
        { value: 'phone', label: 'Phone' },
        { value: 'video', label: 'Video Call' },
        { value: 'in_person', label: 'In Person' }
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

const mockTemplates: WorkflowTemplate[] = [
  {
    id: 'new_applicant_workflow',
    name: 'New Applicant Workflow',
    description: 'Automated welcome process for new candidates',
    trigger: {
      id: 'template_trigger_1',
      type: 'trigger',
      eventType: 'candidate_applies',
      config: {},
      position: { x: 250, y: 100 },
      isConfigured: false,
    },
    actions: [
      {
        id: 'template_action_1',
        type: 'action',
        actionType: 'send_email',
        config: {},
        position: { x: 250, y: 250 },
        isConfigured: false,
      },
      {
        id: 'template_action_2',
        type: 'action',
        actionType: 'add_to_talent_pool',
        config: {},
        position: { x: 250, y: 400 },
        isConfigured: false,
      },
      {
        id: 'template_action_3',
        type: 'action',
        actionType: 'post_slack_notification',
        config: {},
        position: { x: 250, y: 550 },
        isConfigured: false,
      }
    ]
  },
  {
    id: 'interview_reminder',
    name: 'Interview Reminder',
    description: 'Automated interview scheduling and reminders',
    trigger: {
      id: 'template_trigger_2',
      type: 'trigger',
      eventType: 'interview_scheduled',
      config: {},
      position: { x: 250, y: 100 },
      isConfigured: false,
    },
    actions: [
      {
        id: 'template_action_4',
        type: 'action',
        actionType: 'send_email',
        config: {},
        position: { x: 250, y: 250 },
        isConfigured: false,
      },
      {
        id: 'template_action_5',
        type: 'action',
        actionType: 'create_task',
        config: {},
        position: { x: 250, y: 400 },
        isConfigured: false,
      }
    ]
  },
  {
    id: 'offer_follow_up',
    name: 'Offer Follow-Up',
    description: 'Automated offer process with follow-up reminders',
    trigger: {
      id: 'template_trigger_3',
      type: 'trigger',
      eventType: 'offer_extended',
      config: {},
      position: { x: 250, y: 100 },
      isConfigured: false,
    },
    actions: [
      {
        id: 'template_action_6',
        type: 'action',
        actionType: 'generate_offer_letter',
        config: {},
        position: { x: 250, y: 250 },
        isConfigured: false,
      },
      {
        id: 'template_action_7',
        type: 'action',
        actionType: 'send_email',
        config: {},
        position: { x: 250, y: 400 },
        isConfigured: false,
      },
      {
        id: 'template_action_8',
        type: 'action',
        actionType: 'create_task',
        config: {},
        position: { x: 250, y: 550 },
        isConfigured: false,
      }
    ]
  }
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
    templates: mockTemplates,
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
