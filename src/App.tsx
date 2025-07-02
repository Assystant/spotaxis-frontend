
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
import Companies from '@/pages/Companies';
import Applicants from '@/pages/Applicants';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import AddJob from '@/pages/AddJob';
import TalentPool from '@/pages/TalentPool';
import Contacts from '@/pages/Contacts';
import Deals from '@/pages/Deals';
import FormBuilders from '@/pages/FormBuilders';
import FormBuilder from '@/pages/FormBuilder';
import JobBoardManager from '@/pages/JobBoardManager';
import Ats1Jobs from '@/pages/Ats1Jobs';
import Ats1AddJob from '@/pages/Ats1AddJob';
import Ats1JobDetail from '@/pages/Ats1JobDetail';
import Ats1Applicants from '@/pages/Ats1Applicants';
import Ats1TalentPool from '@/pages/Ats1TalentPool';
import WorkflowSettings from '@/pages/WorkflowSettings';
import NotFound from '@/pages/NotFound';

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
                  
                  {/* CRM Routes */}
                  <Route path="contacts" element={<Contacts />} />
                  <Route path="companies" element={<Companies />} />
                  <Route path="deals" element={<Deals />} />
                  
                  {/* ATS Routes */}
                  <Route path="jobs" element={<Jobs />} />
                  <Route path="jobs/add" element={<AddJob />} />
                  <Route path="jobs/:id" element={<JobDetail />} />
                  <Route path="applicants" element={<Applicants />} />
                  <Route path="talent-pool" element={<TalentPool />} />
                  
                  {/* ATS1 Routes */}
                  <Route path="ats1/jobs" element={<Ats1Jobs />} />
                  <Route path="ats1/jobs/add" element={<Ats1AddJob />} />
                  <Route path="ats1/jobs/:id" element={<Ats1JobDetail />} />
                  <Route path="ats1/applicants" element={<Ats1Applicants />} />
                  <Route path="ats1/talent-pool" element={<Ats1TalentPool />} />
                  
                  {/* Marketing Routes */}
                  <Route path="form-builders" element={<FormBuilders />} />
                  <Route path="form-builder" element={<FormBuilder />} />
                  <Route path="job-board" element={<JobBoardManager />} />
                  
                  {/* Settings Routes */}
                  <Route path="settings" element={<Settings />} >
                    <Route index element={<SettingsDefault />} />
                    <Route path="email-templates" element={<EmailTemplates />} />
                    <Route path="notifications" element={<SystemSettings />} />
                    <Route path="system" element={<SystemSettings />} />
                    <Route path="user-roles" element={<UserRoleSettings />} />
                    <Route path="pipeline" element={<PipelineSettings />} />
                    <Route path="workflow" element={<WorkflowSettings />} />
                    <Route path="profile" element={<SettingsDefault />} />
                    <Route path="security" element={<SettingsDefault />} />
                    <Route path="career-site" element={<SettingsDefault />} />
                    <Route path="billing" element={<SettingsDefault />} />
                  </Route>
                  
                  {/* Catch all route for 404 */}
                  <Route path="*" element={<NotFound />} />
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
