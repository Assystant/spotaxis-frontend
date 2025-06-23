
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useThemeToggle } from '../../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { isNotionTheme, toggleTheme } = useThemeToggle();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {isNotionTheme ? 'Notion' : 'Default'}
      </span>
      <Switch
        checked={isNotionTheme}
        onCheckedChange={toggleTheme}
        aria-label="Toggle Notion theme"
      />
    </div>
  );
};
