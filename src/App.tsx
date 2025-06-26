
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeToggleProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Settings, { SettingsDefault } from './pages/Settings';
import { WorkflowProvider } from './contexts/WorkflowContext';
import { NewAutomationDialog } from './components/workflow/NewAutomationDialog';
import { WorkflowCanvas } from './components/workflow/WorkflowCanvas';
import { SiteLayout } from './components/layout/SiteLayout';
import { EmailTemplatesProvider } from '@/contexts/EmailTemplatesContext';
import EmailTemplates from '@/pages/EmailTemplates';

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
