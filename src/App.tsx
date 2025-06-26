
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeToggleProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Settings, { SettingsDefault } from './pages/Settings';
import { WorkflowProvider } from './contexts/WorkflowContext';
import { SiteLayout } from './components/layout/SiteLayout';
import { EmailTemplatesProvider } from '@/contexts/EmailTemplatesContext';
import EmailTemplates from '@/pages/EmailTemplates';
import SystemSettings from '@/pages/SystemSettings';
import UserRoleSettings from '@/pages/UserRoleSettings';

function App() {
  return (
    <Router>
      <EmailTemplatesProvider>
        <ThemeToggleProvider>
          <WorkflowProvider>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<SiteLayout />} >
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="settings" element={<Settings />} >
                    <Route index element={<SettingsDefault />} />
                  </Route>
                  <Route path="settings/email-templates" element={<EmailTemplates />} />
                  <Route path="settings/notifications" element={<SystemSettings />} />
                  <Route path="settings/system" element={<SystemSettings />} />
                  <Route path="settings/user-roles" element={<UserRoleSettings />} />
                  <Route path="settings/profile" element={<SettingsDefault />} />
                  <Route path="settings/security" element={<SettingsDefault />} />
                  <Route path="settings/career-site" element={<SettingsDefault />} />
                  <Route path="settings/billing" element={<SettingsDefault />} />
                  <Route path="settings/pipeline" element={<SettingsDefault />} />
                  <Route path="settings/workflow" element={<SettingsDefault />} />
                </Route>
              </Routes>
            </div>
          </WorkflowProvider>
        </ThemeToggleProvider>
      </EmailTemplatesProvider>
    </Router>
  );
}

export default App;
