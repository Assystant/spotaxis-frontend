import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const PrototypeToggle = () => {
  const [prototypeMode, setPrototypeMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('prototype_mode');
    setPrototypeMode(stored === 'true');
  }, []);

  const handleToggle = (checked: boolean) => {
    setPrototypeMode(checked);
    localStorage.setItem('prototype_mode', checked.toString());
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <div className="bg-background border rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <Switch
            id="prototype-mode"
            checked={prototypeMode}
            onCheckedChange={handleToggle}
          />
          <Label htmlFor="prototype-mode" className="text-sm">
            Prototype Mode — allow immediate sign in without verification (testing only)
          </Label>
        </div>
      </div>
      
      {prototypeMode && (
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-600 dark:text-orange-400">
            Prototype mode enabled — do not use in production
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};