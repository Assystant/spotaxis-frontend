import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ActivityType {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

interface ActivityTypesContextType {
  activityTypes: ActivityType[];
  addActivityType: (activityType: Omit<ActivityType, 'id'>) => void;
  removeActivityType: (id: string) => void;
  updateActivityType: (id: string, updates: Partial<ActivityType>) => void;
}

const ActivityTypesContext = createContext<ActivityTypesContextType | undefined>(undefined);

const defaultActivityTypes: ActivityType[] = [
  { id: 'overview', name: 'Overview', icon: 'Building' },
  { id: 'activities', name: 'Activities', icon: 'Activity' },
  { id: 'emails', name: 'Emails', icon: 'Mail' },
  { id: 'meetings', name: 'Meetings', icon: 'Calendar' },
  { id: 'calls', name: 'Calls', icon: 'Phone' },
  { id: 'notes', name: 'Notes', icon: 'FileText' },
];

export const ActivityTypesProvider = ({ children }: { children: ReactNode }) => {
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>(defaultActivityTypes);

  const addActivityType = (newActivityType: Omit<ActivityType, 'id'>) => {
    const id = newActivityType.name.toLowerCase().replace(/\s+/g, '-');
    const activityType: ActivityType = {
      ...newActivityType,
      id,
    };
    setActivityTypes(prev => [...prev, activityType]);
  };

  const removeActivityType = (id: string) => {
    // Don't allow removing core activity types
    if (['overview', 'activities'].includes(id)) return;
    setActivityTypes(prev => prev.filter(type => type.id !== id));
  };

  const updateActivityType = (id: string, updates: Partial<ActivityType>) => {
    setActivityTypes(prev => prev.map(type => 
      type.id === id ? { ...type, ...updates } : type
    ));
  };

  return (
    <ActivityTypesContext.Provider value={{
      activityTypes,
      addActivityType,
      removeActivityType,
      updateActivityType,
    }}>
      {children}
    </ActivityTypesContext.Provider>
  );
};

export const useActivityTypes = () => {
  const context = useContext(ActivityTypesContext);
  if (context === undefined) {
    throw new Error('useActivityTypes must be used within an ActivityTypesProvider');
  }
  return context;
};