
import { useState } from "react";
import { 
  ArrowLeft, 
  SendHorizontal, 
  Paperclip, 
  Trash2, 
  X,
  Mail 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

interface ComposeEmailProps {
  recipient: {
    id: string;
    name: string;
    email: string;
  };
  onCancel: () => void;
  onSend: (emailData: any) => void;
  replyToEmail?: {
    id: string;
    subject: string;
  };
}

export const ComposeEmail = ({ recipient, onCancel, onSend, replyToEmail }: ComposeEmailProps) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState(replyToEmail ? `Re: ${replyToEmail.subject}` : "");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(true);

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!subject.trim()) {
      toast({
        title: "Subject Required",
        description: "Please enter an email subject",
        variant: "destructive"
      });
      return;
    }

    if (!body.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter an email message",
        variant: "destructive"
      });
      return;
    }
    
    const emailData = {
      to: recipient.email,
      subject,
      body,
      attachments
    };
    
    toast({
      title: "Email Sent",
      description: `Your email to ${recipient.name} has been sent.`
    });
    
    onSend(emailData);
  };

  const handleIntegration = (provider: 'google' | 'microsoft') => {
    toast({
      title: "Email Integration",
      description: `Integration with ${provider === 'google' ? 'Google' : 'Microsoft'} would be initiated here.`
    });
    setShowIntegrationDialog(false);
  };

  const skipIntegration = () => {
    setShowIntegrationDialog(false);
  };

  if (showIntegrationDialog) {
    return (
      <Dialog open={showIntegrationDialog} onOpenChange={skipIntegration}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Integration</DialogTitle>
            <DialogDescription>
              For seamless email communication, integrate with your email provider. This allows you to send and receive emails directly within the application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 gap-2"
                onClick={() => handleIntegration('google')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                  <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                  <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.0011 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                  <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                </svg>
                <span>Connect with Google</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col h-auto py-4 gap-2"
                onClick={() => handleIntegration('microsoft')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4 2H2V11.4H11.4V2Z" fill="#F25022"/>
                  <path d="M11.4 12.6H2V22H11.4V12.6Z" fill="#00A4EF"/>
                  <path d="M22 2H12.6V11.4H22V2Z" fill="#7FBA00"/>
                  <path d="M22 12.6H12.6V22H22V12.6Z" fill="#FFB900"/>
                </svg>
                <span>Connect with Microsoft</span>
              </Button>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="ghost" onClick={skipIntegration}>Skip for Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="border">
      <CardHeader className="p-4 border-b">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={onCancel} className="gap-1">
            <ArrowLeft size={16} />
            Back
          </Button>
          <CardTitle className="text-base font-medium">New Email</CardTitle>
          <Button size="sm" onClick={handleSend} className="gap-1">
            <SendHorizontal size={16} />
            Send
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="to" className="text-sm font-medium">To:</label>
            <Input 
              id="to" 
              value={recipient.name + " <" + recipient.email + ">"}
              disabled
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject:</label>
            <Input 
              id="subject" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="text-sm font-medium">Message:</label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-[200px]"
            />
          </div>
          
          {attachments.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Attachments:</label>
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-1 bg-muted rounded text-sm">
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto" 
                      onClick={() => removeAttachment(index)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <label>
                <Paperclip size={16} />
                Attach Files
                <input 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={handleAttachment}
                />
              </label>
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
              <Trash2 size={16} />
              Discard
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
