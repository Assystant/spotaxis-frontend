import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WorkflowProvider } from './contexts/WorkflowContext';
import Dashboard from './pages/Dashboard';
import Automations from './pages/Automations';
import Templates from './pages/Templates';
import Settings, { SettingsDefault } from './pages/Settings';
import GeneralSettings from './pages/GeneralSettings';
import TeamSettings from './pages/TeamSettings';
import BillingSettings from './pages/BillingSettings';
import AppearanceSettings from './pages/AppearanceSettings';
import NotificationsSettings from './pages/NotificationsSettings';
import { NewAutomationDialog } from './components/workflow/NewAutomationDialog';
import { WorkflowCanvas } from './components/workflow/WorkflowCanvas';
import SettingsSidebar from './components/layout/SettingsSidebar';
import { SiteLayout } from './components/layout/SiteLayout';
import { ToastProvider } from './contexts/ToastContext';
import { EmailTemplatesProvider } from '@/contexts/EmailTemplatesContext';
import EmailTemplates from '@/pages/EmailTemplates';

function App() {
  return (
    <Router>
      <EmailTemplatesProvider>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <WorkflowProvider>
                <div className="min-h-screen bg-background">
                  <Routes>
                    <Route path="/" element={<SiteLayout />} >
                      <Route index element={<Dashboard />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="automations" element={<Automations />} />
                      <Route path="templates" element={<Templates />} />
                      <Route path="templates/new" element={<WorkflowCanvas mode="template" onBack={() => { }} />} />
                      <Route path="templates/:templateId/edit" element={<WorkflowCanvas mode="template" onBack={() => { }} />} />
                      <Route path="automations/new" element={<WorkflowCanvas mode="scratch" onBack={() => { }} />} />
                      <Route path="automations/:automationId/edit" element={<WorkflowCanvas automationId={''} mode="scratch" onBack={() => { }} />} />

                      <Route path="settings" element={<Settings />} >
                        <Route index element={<SettingsDefault />} />
                        <Route path="general" element={<GeneralSettings />} />

                        <Route element={<SettingsSidebar />} >
                          <Route path="team" element={<TeamSettings />} />
                          <Route path="billing" element={<BillingSettings />} />
                          <Route path="appearance" element={<AppearanceSettings />} />
                          <Route path="notifications" element={<NotificationsSettings />} />
                        </Route>
                      </Route>
                    </Route>
                    <Route path="/settings/email-templates" element={<EmailTemplates />} />
                  </Routes>
                </div>
              </WorkflowProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </EmailTemplatesProvider>
    </Router>
  );
}

export default App;
