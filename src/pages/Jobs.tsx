
import { PageContainer } from "@/components/layout/PageContainer";
import { JobsTable } from "@/components/jobs/JobsTable";
import { Button } from "@/components/ui/button";
import { DownloadIcon, UploadIcon } from "lucide-react";

const Jobs = () => {
  return (
    <PageContainer title="Jobs">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Jobs</h2>
            <p className="text-muted-foreground">Manage your job postings and vacancies</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <DownloadIcon size={14} />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <UploadIcon size={14} />
              Import
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-border shadow-subtle">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">Active Jobs</h3>
              <div className="p-2 rounded-md bg-green-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#22C55E" strokeWidth="2" />
                  <path d="M9 12L11 14L15 10" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-semibold mt-2">28</p>
            <p className="text-sm text-muted-foreground mt-1">4 new this week</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-border shadow-subtle">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">Paused Jobs</h3>
              <div className="p-2 rounded-md bg-amber-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#F59E0B" strokeWidth="2" />
                  <path d="M12 8V12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="15" r="1" fill="#F59E0B" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-semibold mt-2">8</p>
            <p className="text-sm text-muted-foreground mt-1">2 paused this week</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-border shadow-subtle">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium">Closed Jobs</h3>
              <div className="p-2 rounded-md bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#6B7280" strokeWidth="2" />
                  <path d="M9 15L15 9" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                  <path d="M15 15L9 9" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-semibold mt-2">15</p>
            <p className="text-sm text-muted-foreground mt-1">3 closed this month</p>
          </div>
        </div>
        
        <JobsTable />
      </div>
    </PageContainer>
  );
};

export default Jobs;
