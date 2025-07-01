
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
import PipelineSettings from '@/pages/PipelineSettings';

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
                    <Route path="email-templates" element={<EmailTemplates />} />
                    <Route path="notifications" element={<SystemSettings />} />
                    <Route path="system" element={<SystemSettings />} />
                    <Route path="user-roles" element={<UserRoleSettings />} />
                    <Route path="pipeline" element={<PipelineSettings />} />
                    <Route path="profile" element={<SettingsDefault />} />
                    <Route path="security" element={<SettingsDefault />} />
                    <Route path="career-site" element={<SettingsDefault />} />
                    <Route path="billing" element={<SettingsDefault />} />
                    <Route path="workflow" element={<SettingsDefault />} />
                  </Route>
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
