
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Sidebar } from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import AddJob from "./pages/AddJob";
import Applicants from "./pages/Applicants";
import TalentPool from "./pages/TalentPool";
import Contacts from "./pages/Contacts";
import Companies from "./pages/Companies";
import Deals from "./pages/Deals";
import FormBuilders from "./pages/FormBuilders";
import FormBuilder from "./pages/FormBuilder";
import Settings, { SettingsDefault } from "./pages/Settings";
import PipelineSettings from "./pages/PipelineSettings";
import CareerSiteGenerator from "./pages/CareerSiteGenerator";
import UserRoleSettings from "./pages/UserRoleSettings";
import SystemSettings from "./pages/SystemSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 transition-all duration-300">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/add" element={<AddJob />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/applicants" element={<Applicants />} />
                <Route path="/talent-pool" element={<TalentPool />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/form-builders" element={<FormBuilders />} />
                <Route path="/form-builder" element={<FormBuilder />} />
                <Route path="/settings" element={<Settings />}>
                  <Route index element={<SettingsDefault />} />
                  <Route path="pipeline" element={<PipelineSettings />} />
                  <Route path="user-roles" element={<UserRoleSettings />} />
                  <Route path="system" element={<SystemSettings />} />
                  {/* Add other settings routes as needed */}
                </Route>
                <Route path="/career-site" element={<CareerSiteGenerator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
