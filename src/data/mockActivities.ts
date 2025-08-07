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
  'whatsapp-log': [
    {
      id: '9',
      type: 'whatsapp-log',
      title: 'Project Update Discussion',
      description: 'Shared latest project screenshots and discussed feedback',
      date: '2024-01-18T16:20:00Z',
      status: 'completed',
      participants: ['John Smith'],
      metadata: { platform: 'WhatsApp', messageCount: 12 }
    },
    {
      id: '10',
      type: 'whatsapp-log',
      title: 'Quick Check-in',
      description: 'Confirmed meeting time and shared agenda',
      date: '2024-01-17T09:45:00Z',
      status: 'completed',
      participants: ['Sarah Johnson'],
      metadata: { platform: 'WhatsApp', messageCount: 5 }
    }
  ],
  'linkedin-message-log': [
    {
      id: '11',
      type: 'linkedin-message-log',
      title: 'Connection Request Follow-up',
      description: 'Thanked for connection and introduced our services',
      date: '2024-01-16T14:30:00Z',
      status: 'completed',
      participants: ['Mike Wilson'],
      metadata: { platform: 'LinkedIn', connectionStatus: 'accepted' }
    }
  ],
  'sms-log': [
    {
      id: '12',
      type: 'sms-log',
      title: 'Meeting Reminder',
      description: 'Sent reminder about tomorrow\'s meeting with location details',
      date: '2024-01-19T17:00:00Z',
      status: 'completed',
      participants: ['Lisa Chen'],
      metadata: { platform: 'SMS', messageLength: 'short' }
    }
  ],
  'facebook-message-log': [
    {
      id: '13',
      type: 'facebook-message-log',
      title: 'Event Invitation Response',
      description: 'Responded to event invitation and confirmed attendance',
      date: '2024-01-15T20:15:00Z',
      status: 'completed',
      participants: ['David Park'],
      metadata: { platform: 'Facebook', eventType: 'business' }
    }
  ]
};

export const getActivitiesForType = (activityType: string): Activity[] => {
  return mockActivities[activityType] || [];
};

export const getAllActivities = (): Activity[] => {
  const allActivities: Activity[] = [];
  
  Object.entries(mockActivities).forEach(([type, activities]) => {
    activities.forEach(activity => {
      allActivities.push({
        ...activity,
        type: type as any // Add type information for filtering
      });
    });
  });
  
  // Sort by date, most recent first
  return allActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};