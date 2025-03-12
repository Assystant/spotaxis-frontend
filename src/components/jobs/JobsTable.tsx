
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Plus, 
  Filter, 
  Clock, 
  MapPin, 
  Briefcase, 
  ChevronDown,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  status: "Active" | "Paused" | "Closed";
  applicants: number;
  postedDate: string;
};

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    status: "Active",
    applicants: 32,
    postedDate: "2023-07-15"
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Remote",
    type: "Remote",
    status: "Active",
    applicants: 18,
    postedDate: "2023-07-20"
  },
  {
    id: "3",
    title: "Product Manager",
    company: "SaaS Inc.",
    location: "New York, NY",
    type: "Full-time",
    status: "Paused",
    applicants: 24,
    postedDate: "2023-06-30"
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Full-time",
    status: "Active",
    applicants: 15,
    postedDate: "2023-07-25"
  },
  {
    id: "5",
    title: "Content Writer",
    company: "MediaCo",
    location: "Chicago, IL",
    type: "Part-time",
    status: "Active",
    applicants: 42,
    postedDate: "2023-07-10"
  }
];

const StatusBadge = ({ status }: { status: Job["status"] }) => {
  let bgColor = "";
  let textColor = "";
  
  switch (status) {
    case "Active":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "Paused":
      bgColor = "bg-amber-100";
      textColor = "text-amber-800";
      break;
    case "Closed":
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      break;
  }
  
  return (
    <span className={cn("status-badge", bgColor, textColor)}>
      {status}
    </span>
  );
};

export const JobsTable = () => {
  return (
    <div className="bg-white rounded-xl border border-border shadow-subtle overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Jobs</h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={14} />
            Filter
          </Button>
          <Button size="sm" className="gap-2">
            <Plus size={14} />
            Add Job
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header text-left pl-6">Job Title</th>
              <th className="table-header text-left">Status</th>
              <th className="table-header text-left">Type</th>
              <th className="table-header text-left">Location</th>
              <th className="table-header text-right">Applicants</th>
              <th className="table-header text-right pr-6">Posted Date</th>
              <th className="table-header w-10"></th>
            </tr>
          </thead>
          <tbody>
            {mockJobs.map((job) => (
              <tr key={job.id} className="table-row">
                <td className="table-cell pl-6">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-muted-foreground text-xs">{job.company}</p>
                  </div>
                </td>
                <td className="table-cell">
                  <StatusBadge status={job.status} />
                </td>
                <td className="table-cell">
                  <div className="flex items-center">
                    <Briefcase size={14} className="mr-1.5 text-muted-foreground" />
                    {job.type}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1.5 text-muted-foreground" />
                    {job.location}
                  </div>
                </td>
                <td className="table-cell text-right">
                  <div className="flex items-center justify-end">
                    <Users size={14} className="mr-1.5 text-muted-foreground" />
                    {job.applicants}
                  </div>
                </td>
                <td className="table-cell text-right pr-6">
                  <div className="flex items-center justify-end">
                    <Clock size={14} className="mr-1.5 text-muted-foreground" />
                    {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="table-cell w-10 pr-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
