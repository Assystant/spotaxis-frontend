import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ActivityType {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export type ListFilter = 'all' | 'active';
export interface SavedList {
  id: string;
  type: 'jobs' | 'applications';
  name: string;
  filter: ListFilter;
}

interface ActivityTypesContextType {
  activityTypes: ActivityType[];
  allActivityTypes: ActivityType[];
  enabledTypes: string[];
  toggleActivityType: (id: string) => void;
  // Lists and custom types for related records
  lists: SavedList[];
  addList: (type: 'jobs' | 'applications', name: string, filter: ListFilter) => SavedList;
  addActivityType: (type: ActivityType) => void;
}

const ActivityTypesContext = createContext<ActivityTypesContextType | undefined>(undefined);

const baseActivityTypes: ActivityType[] = [
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

const defaultLists: SavedList[] = [
  { id: 'jobs_all', type: 'jobs', name: 'All Jobs', filter: 'all' },
  { id: 'jobs_active', type: 'jobs', name: 'Open Jobs', filter: 'active' },
  { id: 'apps_all', type: 'applications', name: 'All Applications', filter: 'all' },
  { id: 'apps_active', type: 'applications', name: 'Active Applications', filter: 'active' },
];

export const ActivityTypesProvider = ({ children }: { children: ReactNode }) => {
  const [enabledTypes, setEnabledTypes] = useState<string[]>(defaultEnabledTypes);
  const [customTypes, setCustomTypes] = useState<ActivityType[]>([]);
  const [lists, setLists] = useState<SavedList[]>(defaultLists);

  const toggleActivityType = (id: string) => {
    if (id === 'overview') return; // Don't allow disabling overview
    setEnabledTypes((prev) =>
      prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
    );
  };

  const addActivityType = (type: ActivityType) => {
    setCustomTypes((prev) => {
      if (prev.find((t) => t.id === type.id)) return prev; // de-dup
      return [...prev, type];
    });
    setEnabledTypes((prev) => (prev.includes(type.id) ? prev : [...prev, type.id]));
  };

  const addList = (type: 'jobs' | 'applications', name: string, filter: ListFilter): SavedList => {
    const id = `${type}_${name.toLowerCase().replace(/\s+/g, '-')}_${Date.now().toString(36)}`;
    const newList: SavedList = { id, type, name, filter };
    setLists((prev) => [...prev, newList]);
    return newList;
  };

  const allActivityTypes = [...baseActivityTypes, ...customTypes];
  const activityTypes = allActivityTypes.filter((type) => enabledTypes.includes(type.id));

  return (
    <ActivityTypesContext.Provider
      value={{
        activityTypes,
        allActivityTypes,
        enabledTypes,
        toggleActivityType,
        lists,
        addList,
        addActivityType,
      }}
    >
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