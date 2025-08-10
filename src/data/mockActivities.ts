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
      title: 'Follow-up: Partnership Proposal Q1 2024',
      description: 'Sent detailed proposal and timelines for collaboration',
      date: '2024-01-15T10:30:00Z',
      status: 'completed',
      participants: ['John Doe <john@acme.com>', 'Partnerships <partners@client.com>'],
      metadata: {
        from: { name: 'John Doe', email: 'john@acme.com' },
        to: [{ name: 'Sarah Johnson', email: 'sarah@client.com' }],
        cc: [{ name: 'Partnerships', email: 'partners@client.com' }],
        subject: 'Partnership Proposal - Q1 2024',
        bodyHtml: '<p>Hi Sarah,</p><p>Sharing our proposal for the Q1 partnership. Please find the attached deck and budget.</p><p>Best,<br/>John</p>',
        attachments: [
          { name: 'Acme_Q1_Proposal.pdf', size: '1.2 MB', type: 'application/pdf' },
          { name: 'Budget.xlsx', size: '340 KB', type: 'application/vnd.ms-excel' }
        ],
        read: true,
        threadId: 'thread-1001'
      }
    },
    {
      id: '2',
      type: 'emails',
      title: 'Re: Weekly Sync Meeting',
      description: 'Confirmed next week meeting schedule',
      date: '2024-01-14T14:15:00Z',
      status: 'completed',
      participants: ['Sarah Johnson <sarah@client.com>'],
      metadata: {
        from: { name: 'Sarah Johnson', email: 'sarah@client.com' },
        to: [{ name: 'John Doe', email: 'john@acme.com' }],
        subject: 'Re: Weekly Sync Meeting',
        bodyHtml: '<p>Hi John,</p><p>Next Tuesday 2pm works great. Let\'s use the usual Zoom link.</p><p>Thanks,<br/>Sarah</p>',
        attachments: [],
        read: true,
        threadId: 'thread-1002'
      }
    },
    {
      id: '3',
      type: 'emails',
      title: 'Intro: Platform Capabilities Overview',
      description: 'Shared overview deck and case studies',
      date: '2024-01-12T09:05:00Z',
      status: 'completed',
      participants: ['John Doe <john@acme.com>', 'Mike Wilson <mike@client.com>'],
      metadata: {
        from: { name: 'John Doe', email: 'john@acme.com' },
        to: [{ name: 'Mike Wilson', email: 'mike@client.com' }],
        subject: 'Platform Capabilities Overview',
        bodyHtml: '<p>Hey Mike,</p><p>As discussed, here is our capabilities overview and case studies.</p><ul><li>Scalable APIs</li><li>Advanced analytics</li><li>24/7 support</li></ul><p>Cheers,<br/>John</p>',
        attachments: [
          { name: 'Capabilities_Overview.pptx', size: '4.5 MB', type: 'application/vnd.ms-powerpoint' }
        ],
        read: false,
        threadId: 'thread-1003'
      }
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