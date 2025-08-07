import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ActivityType {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

interface ActivityTypesContextType {
  activityTypes: ActivityType[];
  allActivityTypes: ActivityType[];
  enabledTypes: string[];
  toggleActivityType: (id: string) => void;
}

const ActivityTypesContext = createContext<ActivityTypesContextType | undefined>(undefined);

const allActivityTypes: ActivityType[] = [
  { id: 'overview', name: 'Overview', icon: 'Building' },
  { id: 'notes', name: 'Notes', icon: 'FileText' },
  { id: 'emails', name: 'Emails', icon: 'Mail' },
  { id: 'meetings', name: 'Meetings', icon: 'Calendar' },
  { id: 'calls', name: 'Calls', icon: 'Phone' },
  { id: 'whatsapp-log', name: 'WhatsApp Log', icon: 'MessageSquare' },
  { id: 'linkedin-message-log', name: 'LinkedIn Message Log', icon: 'MessageSquare' },
  { id: 'sms-log', name: 'SMS Log', icon: 'MessageSquare' },
  { id: 'facebook-message-log', name: 'Facebook Message Log', icon: 'MessageSquare' },
];

const defaultEnabledTypes = ['overview', 'notes', 'emails', 'meetings', 'calls'];

export const ActivityTypesProvider = ({ children }: { children: ReactNode }) => {
  const [enabledTypes, setEnabledTypes] = useState<string[]>(defaultEnabledTypes);

  const toggleActivityType = (id: string) => {
    // Don't allow disabling overview
    if (id === 'overview') return;
    
    setEnabledTypes(prev => 
      prev.includes(id) 
        ? prev.filter(typeId => typeId !== id)
        : [...prev, id]
    );
  };

  const activityTypes = allActivityTypes.filter(type => enabledTypes.includes(type.id));

  return (
    <ActivityTypesContext.Provider value={{
      activityTypes,
      allActivityTypes,
      enabledTypes,
      toggleActivityType,
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