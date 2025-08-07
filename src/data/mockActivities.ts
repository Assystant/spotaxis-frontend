export interface Activity {
  id: string;
  type: string;
  title: string;
  description?: string;
  date: string;
  status?: 'completed' | 'pending' | 'scheduled';
  participants?: string[];
  metadata?: Record<string, any>;
}

export const mockActivities: Record<string, Activity[]> = {
  emails: [
    {
      id: '1',
      type: 'emails',
      title: 'Follow-up on Partnership Discussion',
      description: 'Sent detailed proposal for Q1 2024 collaboration',
      date: '2024-01-15T10:30:00Z',
      status: 'completed',
      participants: ['john@company.com'],
      metadata: { subject: 'Partnership Proposal - Q1 2024', attachments: 2 }
    },
    {
      id: '2',
      type: 'emails',
      title: 'Meeting Confirmation',
      description: 'Confirmed next week meeting schedule',
      date: '2024-01-14T14:15:00Z',
      status: 'completed',
      participants: ['sarah@company.com'],
      metadata: { subject: 'Re: Weekly Sync Meeting' }
    }
  ],
  meetings: [
    {
      id: '3',
      type: 'meetings',
      title: 'Partnership Strategy Meeting',
      description: 'Quarterly review and planning session',
      date: '2024-01-20T09:00:00Z',
      status: 'scheduled',
      participants: ['John Smith', 'Sarah Johnson'],
      metadata: { duration: '60 minutes', location: 'Conference Room A' }
    },
    {
      id: '4',
      type: 'meetings',
      title: 'Product Demo',
      description: 'Showcase new features to potential client',
      date: '2024-01-12T15:30:00Z',
      status: 'completed',
      participants: ['Mike Wilson'],
      metadata: { duration: '45 minutes', location: 'Virtual' }
    }
  ],
  calls: [
    {
      id: '5',
      type: 'calls',
      title: 'Discovery Call',
      description: 'Initial consultation about project requirements',
      date: '2024-01-16T11:00:00Z',
      status: 'completed',
      participants: ['Lisa Chen'],
      metadata: { duration: '30 minutes', callType: 'Inbound' }
    },
    {
      id: '6',
      type: 'calls',
      title: 'Technical Support',
      description: 'Assisted with API integration issues',
      date: '2024-01-13T16:45:00Z',
      status: 'completed',
      participants: ['David Park'],
      metadata: { duration: '25 minutes', callType: 'Support' }
    }
  ],
  notes: [
    {
      id: '7',
      type: 'notes',
      title: 'Client Requirements Analysis',
      description: 'Detailed notes from requirement gathering session with stakeholders',
      date: '2024-01-18T13:20:00Z',
      status: 'completed',
      metadata: { tags: ['requirements', 'stakeholders', 'analysis'] }
    },
    {
      id: '8',
      type: 'notes',
      title: 'Competitive Analysis',
      description: 'Market research and competitor feature comparison',
      date: '2024-01-17T10:15:00Z',
      status: 'completed',
      metadata: { tags: ['research', 'competitors', 'market'] }
    }
  ],
  activities: [
    {
      id: '9',
      type: 'activities',
      title: 'Contract Negotiation',
      description: 'Ongoing discussions about terms and pricing',
      date: '2024-01-19T14:00:00Z',
      status: 'pending',
      participants: ['Legal Team'],
      metadata: { priority: 'high', category: 'legal' }
    },
    {
      id: '10',
      type: 'activities',
      title: 'Onboarding Preparation',
      description: 'Setting up systems and processes for new client',
      date: '2024-01-16T09:30:00Z',
      status: 'completed',
      metadata: { priority: 'medium', category: 'onboarding' }
    }
  ]
};

export const getActivitiesForType = (activityType: string): Activity[] => {
  return mockActivities[activityType] || [];
};