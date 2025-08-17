import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, ExternalLink, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SimulatedInboxProps {
  open: boolean;
  onClose: () => void;
  userEmail: string;
}

interface SimulatedEmail {
  id: string;
  to: string;
  subject: string;
  sender: string;
  timestamp: string;
  type: 'verification' | 'magic-link';
  token: string;
  body: string;
}

export const SimulatedInbox: React.FC<SimulatedInboxProps> = ({
  open,
  onClose,
  userEmail
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const getEmailsForUser = (): SimulatedEmail[] => {
    const emails = JSON.parse(localStorage.getItem('simulated_emails') || '[]');
    return emails.filter((email: SimulatedEmail) => email.to === userEmail);
  };

  const handleEmailClick = (email: SimulatedEmail) => {
    if (email.type === 'verification') {
      onClose();
      navigate(`/auth/verify?token=${email.token}`);
    } else if (email.type === 'magic-link') {
      // Handle magic link login
      const accounts = JSON.parse(localStorage.getItem('prototype_accounts') || '[]');
      const account = accounts.find((acc: any) => acc.email === email.to);
      
      if (account && account.verified) {
        localStorage.setItem('current_user', JSON.stringify(account));
        toast({
          title: "Signed in successfully",
          description: "Welcome back to SpotAxis!"
        });
        onClose();
        navigate('/dashboard');
      } else if (account && !account.verified) {
        toast({
          title: "Account not verified",
          description: "Please verify your account first."
        });
        onClose();
        navigate(`/auth/check-email?email=${encodeURIComponent(email.to)}`);
      } else {
        toast({
          title: "Account not found",
          description: "No account found with this email.",
          variant: "destructive"
        });
      }
    }
  };

  const emails = getEmailsForUser();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <SheetTitle>Prototype Inbox — for testing only</SheetTitle>
          </div>
          <SheetDescription>
            Simulated emails for {userEmail}. This inbox is for prototype testing purposes only.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <p className="text-sm text-orange-600 dark:text-orange-400">
              This is a simulated inbox for prototype testing. Real emails are not sent.
            </p>
          </div>

          {emails.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No emails found for this address.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {emails.map((email) => (
                <Card key={email.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm">{email.sender}</CardTitle>
                          <Badge variant={email.type === 'verification' ? 'default' : 'secondary'}>
                            {email.type === 'verification' ? 'Verification' : 'Magic Link'}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{email.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(email.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      {email.body}
                    </p>
                    <Button
                      onClick={() => handleEmailClick(email)}
                      size="sm"
                      className="w-full"
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      {email.type === 'verification' ? 'Verify Email' : 'Sign In'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};