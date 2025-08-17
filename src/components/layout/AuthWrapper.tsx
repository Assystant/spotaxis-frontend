import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const currentUser = localStorage.getItem('current_user');
    const prototypeMode = localStorage.getItem('prototype_mode') === 'true';
    
    if (!currentUser && !prototypeMode) {
      navigate('/auth/login');
    }
  }, [navigate]);

  const currentUser = localStorage.getItem('current_user');
  const prototypeMode = localStorage.getItem('prototype_mode') === 'true';
  
  if (!currentUser && !prototypeMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Redirecting to login...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};