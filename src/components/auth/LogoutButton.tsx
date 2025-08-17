import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogOut } from 'lucide-react';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('current_user');
    toast({
      title: "Signed out",
      description: "You've been successfully signed out."
    });
    navigate('/auth/login');
  };

  return (
    <Button onClick={handleLogout} variant="ghost" size="sm">
      <LogOut className="h-4 w-4 mr-2" />
      Sign out
    </Button>
  );
};