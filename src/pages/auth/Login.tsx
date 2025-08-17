import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const getAccounts = () => {
    const accounts = localStorage.getItem('prototype_accounts');
    return accounts ? JSON.parse(accounts) : [];
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const accounts = getAccounts();
    const account = accounts.find((acc: any) => acc.email === loginData.email);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!account) {
      setErrors({ email: 'No account found with that email.' });
      setIsLoading(false);
      return;
    }

    if (!account.verified) {
      toast({
        title: "Account not verified",
        description: `Your account isn't verified yet. We sent a link to ${loginData.email}.`,
        variant: "destructive"
      });
      navigate(`/auth/check-email?email=${encodeURIComponent(loginData.email)}`);
      setIsLoading(false);
      return;
    }

    if (account.password !== loginData.password) {
      setErrors({ password: 'Incorrect password.' });
      setIsLoading(false);
      return;
    }

    // Successful login
    localStorage.setItem('current_user', JSON.stringify(account));
    toast({
      title: "Welcome back!",
      description: "You've been successfully signed in."
    });
    navigate('/dashboard');
    setIsLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!magicLinkEmail) {
      setErrors({ magicEmail: 'Please enter your email address.' });
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(magicLinkEmail)) {
      setErrors({ magicEmail: 'Please enter a valid email address.' });
      setIsLoading(false);
      return;
    }

    const accounts = getAccounts();
    const account = accounts.find((acc: any) => acc.email === magicLinkEmail);

    if (!account) {
      setErrors({ magicEmail: 'No account found with that email.' });
      setIsLoading(false);
      return;
    }

    // Create magic link email
    const emails = JSON.parse(localStorage.getItem('simulated_emails') || '[]');
    const magicLinkEmailData = {
      id: Date.now().toString(),
      to: magicLinkEmail,
      subject: 'Sign in to SpotAxis',
      sender: 'SpotAxis',
      timestamp: new Date().toISOString(),
      type: 'magic-link',
      token: `magic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      body: `Click the link below to sign in to your SpotAxis account.`
    };
    
    localStorage.setItem('simulated_emails', JSON.stringify([magicLinkEmailData, ...emails]));

    toast({
      title: "Sign-in link sent",
      description: "Check your email for the sign-in link."
    });

    navigate(`/auth/check-email?email=${encodeURIComponent(magicLinkEmail)}`);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your SpotAxis account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email + Password Login */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                className={errors.email ? 'border-destructive' : ''}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !loginData.email || !loginData.password}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Magic Link Login */}
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="magicEmail">Email for magic link</Label>
              <Input
                id="magicEmail"
                type="email"
                placeholder="Enter your email"
                value={magicLinkEmail}
                onChange={(e) => setMagicLinkEmail(e.target.value)}
                className={errors.magicEmail ? 'border-destructive' : ''}
                disabled={isLoading}
              />
              {errors.magicEmail && (
                <p className="text-sm text-destructive">{errors.magicEmail}</p>
              )}
            </div>

            <Button 
              type="submit" 
              variant="outline"
              className="w-full"
              disabled={isLoading || !magicLinkEmail}
            >
              <Mail className="h-4 w-4 mr-2" />
              {isLoading ? 'Sending link...' : 'Send sign-in link'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal text-primary"
                onClick={() => navigate('/auth/signup')}
              >
                Sign up
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;