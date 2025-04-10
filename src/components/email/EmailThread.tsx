
import { useState, useEffect } from "react";
import { Mail, Clock, Download, Reply, ReplyAll, Forward, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface Email {
  id: string;
  from: { name: string; email: string; avatar?: string };
  to: { name: string; email: string }[];
  subject: string;
  body: string;
  timestamp: string;
  attachments?: { name: string; size: string; type: string }[];
  read: boolean;
}

interface EmailThreadProps {
  applicantId: string;
}

export const EmailThread = ({ applicantId }: EmailThreadProps) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to get emails for this applicant
    setTimeout(() => {
      const mockEmails = [
        {
          id: "email1",
          from: { name: "John Smith", email: "john@example.com" },
          to: [{ name: "Recruiter", email: "recruiter@company.com" }],
          subject: "Application for Software Developer Position",
          body: `<p>Dear Hiring Manager,</p>
                <p>I am writing to express my interest in the Software Developer position at your company.</p>
                <p>I have 5 years of experience in web development using React and Node.js, and I believe my skills would be a great fit for your team.</p>
                <p>Please find my resume attached. I look forward to discussing my application further.</p>
                <p>Best regards,<br>John Smith</p>`,
          timestamp: "2023-05-15T10:30:00",
          attachments: [
            { name: "John_Smith_Resume.pdf", size: "1.2MB", type: "application/pdf" }
          ],
          read: true
        },
        {
          id: "email2",
          from: { name: "Recruiter", email: "recruiter@company.com", avatar: "/placeholder.svg" },
          to: [{ name: "John Smith", email: "john@example.com" }],
          subject: "Re: Application for Software Developer Position",
          body: `<p>Hello John,</p>
                <p>Thank you for your interest in the Software Developer position.</p>
                <p>I've reviewed your application and would like to schedule an initial interview. Are you available this Thursday or Friday afternoon?</p>
                <p>Regards,<br>Recruitment Team</p>`,
          timestamp: "2023-05-16T09:15:00",
          read: true
        }
      ];

      setEmails(mockEmails);
      setLoading(false);
    }, 500);
  }, [applicantId]);

  if (loading) {
    return <p>Loading emails...</p>;
  }

  if (emails.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Mail size={40} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No Email History</h3>
        <p className="text-muted-foreground mb-4">
          There are no emails associated with this applicant yet.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {emails.map((email) => (
        <Card key={email.id} className="border">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <Avatar className="h-10 w-10">
                  {email.from.avatar ? 
                    <img src={email.from.avatar} alt={email.from.name} /> : 
                    <div className="bg-primary/10 h-full w-full flex items-center justify-center text-primary font-medium">
                      {email.from.name.charAt(0)}
                    </div>
                  }
                </Avatar>
                <div>
                  <div className="font-medium">{email.from.name}</div>
                  <div className="text-xs text-muted-foreground">{email.from.email}</div>
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock size={12} className="mr-1" />
                {new Date(email.timestamp).toLocaleString()}
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="font-medium">{email.subject}</h4>
              <div 
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: email.body }}
              />
            </div>
            
            {email.attachments && email.attachments.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Attachments</div>
                <div className="flex flex-wrap gap-2">
                  {email.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 bg-muted rounded">
                      <FileText size={14} />
                      <span className="text-sm">{attachment.name}</span>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Download size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Reply size={14} />
                Reply
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <ReplyAll size={14} />
                Reply All
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Forward size={14} />
                Forward
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
