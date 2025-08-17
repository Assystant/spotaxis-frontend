import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Clock } from 'lucide-react';
import { SimulatedInbox } from '@/components/auth/SimulatedInbox';

const CheckEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showInbox, setShowInbox] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [lastResendTime, setLastResendTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const email = searchParams.get('email') || '';
  const MAX_RESENDS = 3;
  const RESEND_COOLDOWN = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (lastResendTime && resendCount >= MAX_RESENDS) {
      interval = setInterval(() => {
        const elapsed = Date.now() - lastResendTime;
        const remaining = Math.max(0, RESEND_COOLDOWN - elapsed);
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          setResendCount(0);
          setLastResendTime(null);
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [lastResendTime, resendCount]);

  const handleResendEmail = () => {
    if (resendCount >= MAX_RESENDS && timeRemaining > 0) {
      return;
    }
    
    // Create new verification email
    const emails = JSON.parse(localStorage.getItem('simulated_emails') || '[]');
    const verificationEmail = {
      id: Date.now().toString(),
      to: email,
      subject: 'Verify your email',
      sender: 'SpotAxis',
      timestamp: new Date().toISOString(),
      type: 'verification',
      token: `verify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      body: `Welcome to SpotAxis! Please verify your email address by clicking the link below.`
    };
    
    localStorage.setItem('simulated_emails', JSON.stringify([verificationEmail, ...emails]));
    
    setResendCount(prev => prev + 1);
    setLastResendTime(Date.now());
    
    toast({
      title: "Verification email sent",
      description: "Check your simulated inbox for the new verification link."
    });
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const canResend = resendCount < MAX_RESENDS || timeRemaining === 0;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check your email</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                We sent a verification link to{' '}
                <span className="font-medium text-foreground">{email}</span>.
                Click the link in that email to verify your account.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full"
                disabled={!canResend}
              >
                {!canResend && timeRemaining > 0 ? (
                  <>
                    <Clock className="h-4 w-4 mr-2" />
                    Try again in {formatTime(timeRemaining)}
                  </>
                ) : (
                  'Resend verification email'
                )}
              </Button>

              <Button
                onClick={() => setShowInbox(true)}
                variant="secondary"
                className="w-full"
              >
                Open Simulated Inbox
              </Button>
            </div>

            {resendCount >= MAX_RESENDS && timeRemaining > 0 && (
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-md">
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  You've reached the resend limit. Try again in {formatTime(timeRemaining)}.
                </p>
              </div>
            )}

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Wrong email address?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal text-primary"
                  onClick={() => navigate('/auth/signup')}
                >
                  Try a different email
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <SimulatedInbox 
        open={showInbox}
        onClose={() => setShowInbox(false)}
        userEmail={email}
      />
    </>
  );
};

export default CheckEmail;