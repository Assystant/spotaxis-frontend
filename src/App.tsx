
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
import ApplicantDetailPage from '@/pages/ApplicantDetailPage';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import AddJob from '@/pages/AddJob';
import TalentPool from '@/pages/TalentPool';
import Contacts from '@/pages/Contacts';
import ContactDetailPage from '@/pages/ContactDetailPage';
import CompanyDetailPage from '@/pages/CompanyDetailPage';
import Deals from '@/pages/Deals';
import FormBuilders from '@/pages/FormBuilders';
import FormBuilder from '@/pages/FormBuilder';
import JobBoardManager from '@/pages/JobBoardManager';
import Emails from '@/pages/Emails';
import WorkflowSettings from '@/pages/WorkflowSettings';
import Tasks from '@/pages/Tasks';
import Calendar from '@/pages/Calendar';
import NotFound from '@/pages/NotFound';
import Logs from '@/pages/Logs';
import Meetings from '@/pages/Meetings';
import Reports from '@/pages/Reports';
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
                  <Route path="contacts/:contactId" element={<ContactDetailPage />} />
                  <Route path="companies" element={<Companies />} />
                  <Route path="companies/:companyId" element={<CompanyDetailPage />} />
                  <Route path="deals" element={<Deals />} />
                  
                  {/* ATS Routes */}
                  <Route path="jobs" element={<Jobs />} />
                  <Route path="jobs/add" element={<AddJob />} />
                  <Route path="jobs/:id" element={<JobDetail />} />
                   <Route path="applicants" element={<Applicants />} />
                   <Route path="applicants/:applicantId" element={<ApplicantDetailPage />} />
                  <Route path="talent-pool" element={<TalentPool />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="calendar" element={<Calendar />} />
                  
                  {/* Email Module */}
                  <Route path="emails" element={<Emails />} />

                  {/* Logs & Meetings */}
                  <Route path="logs" element={<Logs />} />
                  <Route path="meetings" element={<Meetings />} />
                  
                  {/* Marketing & Other Routes */}
                  <Route path="form-builders" element={<FormBuilders />} />
                  <Route path="form-builder" element={<FormBuilder />} />
                  <Route path="job-board" element={<JobBoardManager />} />
                  <Route path="forms" element={<FormBuilders />} />
                  <Route path="websites" element={<JobBoardManager />} />
                  <Route path="reports" element={<Reports />} />
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
