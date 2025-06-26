
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface EmailPreviewProps {
  subject: string;
  body: string;
}

const sampleData = {
  'candidate.name': 'Jane Doe',
  'candidate.email': 'jane.doe@email.com',
  'job.title': 'Senior Software Engineer',
  'company.name': 'Tech Solutions Inc.',
  'recruiter.name': 'Sarah Johnson',
  'interview.date': 'March 15, 2024',
  'interview.time': '2:00 PM',
  'interview.link': 'https://meet.example.com/interview-123',
  'application.link': 'https://app.example.com/application/456',
  'offer.amount': '$95,000',
  'offer.link': 'https://app.example.com/offer/789',
};

export const EmailPreview: React.FC<EmailPreviewProps> = ({ subject, body }) => {
  const replacePlaceholders = (text: string) => {
    let result = text;
    Object.entries(sampleData).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });
    return result;
  };

  const formatBody = (text: string) => {
    const processedText = replacePlaceholders(text);
    
    // Convert markdown-style formatting to HTML
    return processedText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/\n• /g, '\n• ')
      .replace(/\n(\d+)\. /g, '\n$1. ')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #2563eb; text-decoration: underline;">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
      .replace(/\n/g, '<br />');
  };

  const previewSubject = replacePlaceholders(subject) || 'Subject line will appear here...';
  const previewBody = formatBody(body) || 'Email content will appear here as you type...';

  return (
    <Card className="h-full">
      <CardHeader className="bg-muted/50 py-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>From: sarah.johnson@company.com</span>
            <span>To: jane.doe@email.com</span>
          </div>
          <div className="text-base font-semibold text-foreground">
            {previewSubject}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div 
          className="prose prose-sm max-w-none text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: previewBody }}
        />
      </CardContent>
    </Card>
  );
};
