
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { defaultTheme } from '../themes/defaultTheme';
import { notionTheme } from '../themes/notionTheme';

type ThemeMode = 'default' | 'notion';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isNotionTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeToggle must be used within a ThemeToggleProvider');
  }
  return context;
};

interface ThemeToggleProviderProps {
  children: ReactNode;
}

export const ThemeToggleProvider: React.FC<ThemeToggleProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    return (savedTheme as ThemeMode) || 'default';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'default' ? 'notion' : 'default');
  };

  const currentTheme = themeMode === 'notion' ? notionTheme : defaultTheme;
  const isNotionTheme = themeMode === 'notion';

  const value = {
    themeMode,
    toggleTheme,
    isNotionTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
