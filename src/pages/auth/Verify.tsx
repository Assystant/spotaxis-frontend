import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error'>('loading');
  const [userEmail, setUserEmail] = useState('');
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setVerificationState('error');
      return;
    }

    // Simulate verification process
    const verifyToken = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Loading simulation

      const emails = JSON.parse(localStorage.getItem('simulated_emails') || '[]');
      const verificationEmail = emails.find((email: any) => email.token === token);
      
      if (!verificationEmail) {
        setVerificationState('error');
        return;
      }

      // Check if token is expired (more than 24 hours old)
      const emailTimestamp = new Date(verificationEmail.timestamp).getTime();
      const now = Date.now();
      const hoursSinceEmail = (now - emailTimestamp) / (1000 * 60 * 60);
      
      if (hoursSinceEmail > 24) {
        setVerificationState('error');
        setUserEmail(verificationEmail.to);
        return;
      }

      // Verify the account
      const accounts = JSON.parse(localStorage.getItem('prototype_accounts') || '[]');
      const accountIndex = accounts.findIndex((acc: any) => acc.email === verificationEmail.to);
      
      if (accountIndex === -1) {
        setVerificationState('error');
        return;
      }

      // Update account verification status
      accounts[accountIndex].verified = true;
      localStorage.setItem('prototype_accounts', JSON.stringify(accounts));
      
      // Sign in the user
      localStorage.setItem('current_user', JSON.stringify(accounts[accountIndex]));
      
      setVerificationState('success');
      setUserEmail(verificationEmail.to);
      
      // Show success message
      toast({
        title: "Email verified — you're signed in.",
        description: "Welcome to SpotAxis!"
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    };

    verifyToken();
  }, [token, navigate, toast]);

  const handleResendVerification = () => {
    if (!userEmail) return;
    
    // Create new verification email
    const emails = JSON.parse(localStorage.getItem('simulated_emails') || '[]');
    const verificationEmail = {
      id: Date.now().toString(),
      to: userEmail,
      subject: 'Verify your email',
      sender: 'SpotAxis',
      timestamp: new Date().toISOString(),
      type: 'verification',
      token: `verify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      body: `Welcome to SpotAxis! Please verify your email address by clicking the link below.`
    };
    
    localStorage.setItem('simulated_emails', JSON.stringify([verificationEmail, ...emails]));
    
    toast({
      title: "New verification email sent",
      description: "Check your simulated inbox for the fresh verification link."
    });
    
    navigate(`/auth/check-email?email=${encodeURIComponent(userEmail)}`);
  };

  const renderContent = () => {
    switch (verificationState) {
      case 'loading':
        return (
          <CardContent className="text-center space-y-6">
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Verifying your email</h2>
              <p className="text-muted-foreground">
                Please wait while we verify your email address...
              </p>
            </div>
          </CardContent>
        );
      
      case 'success':
        return (
          <CardContent className="text-center space-y-6">
            <div className="mx-auto p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">
                Email verified — you're signed in.
              </h2>
              <p className="text-muted-foreground">
                Redirecting you to the dashboard...
              </p>
            </div>
          </CardContent>
        );
      
      case 'error':
        return (
          <CardContent className="text-center space-y-6">
            <div className="mx-auto p-3 bg-red-100 dark:bg-red-900/20 rounded-full w-fit">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
                Verification link expired or invalid.
              </h2>
              <p className="text-muted-foreground">
                This link has expired or is not valid. Please request a new verification email.
              </p>
            </div>
            
            <div className="space-y-3">
              {userEmail && (
                <Button onClick={handleResendVerification} className="w-full">
                  Resend verification email
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth/signup')}
                className="w-full"
              >
                Back to sign up
              </Button>
            </div>
          </CardContent>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Email Verification</CardTitle>
        </CardHeader>
        {renderContent()}
      </Card>
    </div>
  );
};

export default Verify;