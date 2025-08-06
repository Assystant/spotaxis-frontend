import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { TwoPanelDetailLayout } from "@/components/common/TwoPanelDetailLayout";
import { AssociationPanel } from "@/components/common/AssociationPanel";
import { KanbanBoard } from "@/components/jobs/KanbanBoard";
import { ArrowLeft, Edit, Link, Share, Archive, Clock, ChevronDown, MapPin, DollarSign, Calendar, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { mockJobs } from "@/components/jobs/JobsTable";
import { JobPromotionDialog } from "@/components/jobs/JobPromotionDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddApplicantDialog } from "@/components/applicants/AddApplicantDialog";
import { JobPreviewModal } from "@/components/jobs/JobPreviewModal";
import { MoreVertical, Eye } from "lucide-react";
import { 
  mockContacts, 
  mockCompanies, 
  mockJobsData, 
  mockApplications 
} from "@/data/mockAssociations";
import {
  searchCompanies,
  searchContacts,
  searchApplications,
  associationManager,
  companyToSearchResult,
  contactToSearchResult,
  applicationToSearchResult
} from "@/services/associationService";

// Example stages for the job applicants
const applicantStages = [
  { id: "new", name: "New", color: "bg-blue-500", order: 0 },
  { id: "screening", name: "Screening", color: "bg-purple-500", order: 1 },
  { id: "interview", name: "Interview", color: "bg-amber-500", order: 2 },
  { id: "offer", name: "Offer", color: "bg-green-500", order: 3 },
  { id: "rejected", name: "Rejected", color: "bg-red-500", order: 4 }
];

// Enhanced mock applicants data
const mockApplicants = [
  {
    id: "app1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    stage: "new",
    appliedDate: "2023-05-10",
    jobId: "job1",
    photo: "",
    resume: "resume_john_doe.pdf"
  },
  {
    id: "app2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "123-456-7891",
    stage: "screening",
    appliedDate: "2023-05-12",
    jobId: "job1",
    photo: "",
    resume: "resume_jane_smith.pdf"
  },
  {
    id: "app3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "123-456-7892",
    stage: "interview",
    appliedDate: "2023-05-15",
    jobId: "job2",
    photo: "",
    resume: "resume_bob_johnson.pdf"
  },
  {
    id: "app4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "123-456-7893",
    stage: "new",
    appliedDate: "2023-05-16",
    jobId: "job1",
    photo: "",
    resume: "resume_sarah_williams.pdf"
  },
  {
    id: "app5",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "123-456-7894",
    stage: "offer",
    appliedDate: "2023-05-08",
    jobId: "job1",
    photo: "",
    resume: "resume_michael_brown.pdf"
  }
];

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [showAddApplicantDialog, setShowAddApplicantDialog] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [associations, setAssociations] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch the job from an API
    const jobData = mockJobs.find(j => j.id === id);
    setJob(jobData);
    
    // Filter applicants based on the job ID
    const jobApplicants = mockApplicants.filter(a => a.jobId === id);
    setApplicants(jobApplicants);
    
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (job) {
      const newAssociations = [
        {
          id: "company",
          title: "Company",
          records: [{
            id: job.company,
            name: job.company,
            subtitle: "Hiring company",
            route: `/companies/${job.company}`
          }],
          searchPlaceholder: "Search companies...",
          onSearch: searchCompanies,
          onLink: (entity: any) => handleLinkEntity("company", entity),
          onUnlink: (entityId: string) => handleUnlinkEntity("company", entityId),
          defaultOpen: true
        },
        {
          id: "candidates",
          title: "Candidates",
          records: getAssociatedRecords(job.id, "candidates"),
          searchPlaceholder: "Search candidates...",
          onSearch: (query: string) => searchContacts(query, 'candidate'),
          onLink: (entity: any) => handleLinkEntity("candidates", entity),
          onUnlink: (entityId: string) => handleUnlinkEntity("candidates", entityId),
          defaultOpen: true
        },
        {
          id: "applications",
          title: "Applications",
          records: getAssociatedRecords(job.id, "applications"),
          searchPlaceholder: "Search applications...",
          onSearch: searchApplications,
          onLink: (entity: any) => handleLinkEntity("applications", entity),
          onUnlink: (entityId: string) => handleUnlinkEntity("applications", entityId),
          defaultOpen: true
        },
        {
          id: "contacts",
          title: "Client Contacts",
          records: getAssociatedRecords(job.id, "contacts"),
          searchPlaceholder: "Search client contacts...",
          onSearch: (query: string) => searchContacts(query, 'client'),
          onLink: (entity: any) => handleLinkEntity("contacts", entity),
          onUnlink: (entityId: string) => handleUnlinkEntity("contacts", entityId),
          defaultOpen: false
        }
      ];
      setAssociations(newAssociations);
    }
  }, [job]);

  const handleStatusChange = (status: string) => {
    setJob(prev => ({...prev, status}));
    // In a real app, this would be an API call to update the job status
  };

  const handleEditJob = () => {
    // In a real app, redirect to edit page or open a modal with the job form
    // For now, we'll just log the action
    console.log("Edit job", job.id);
    window.location.href = `/jobs/edit/${job.id}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // In a real app, you'd show a toast notification
    console.log("Link copied to clipboard");
  };

  const getStatusButtonStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Paused":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleAddApplicant = (applicant: any) => {
    // Add the new applicant to the list with the current job ID
    const newApplicant = {
      ...applicant,
      id: `app${Date.now()}`, // Generate a unique ID
      jobId: id,
      stage: "new", // New applicants start in the "new" stage
      appliedDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    };
    
    setApplicants((prev) => [...prev, newApplicant]);
    setShowAddApplicantDialog(false);
  };

  // Handle applicant stage change in kanban board
  const handleStageChange = (applicantId: string, newStageId: string) => {
    setApplicants(prev => 
      prev.map(applicant => 
        applicant.id === applicantId 
          ? { ...applicant, stage: newStageId } 
          : applicant
      )
    );
    // In a real app, this would be an API call to update the applicant stage
  };

  if (loading) {
    return (
      <PageContainer title="Job Detail">
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </PageContainer>
    );
  }

  if (!job) {
    return (
      <PageContainer title="Job Detail">
        <div className="flex items-center justify-center h-64">
          <p>Job not found</p>
        </div>
      </PageContainer>
    );
  }

  const getAssociatedRecords = (jobId: string, entityType: string) => {
    const associatedIds = associationManager.getAssociations(jobId, entityType);
    
    switch (entityType) {
      case 'companies':
        return mockCompanies
          .filter(company => associatedIds.includes(company.id))
          .map(companyToSearchResult);
      case 'candidates':
        return mockContacts
          .filter(contact => associatedIds.includes(contact.id) && contact.type === 'candidate')
          .map(contactToSearchResult);
      case 'applications':
        return mockApplications
          .filter(app => associatedIds.includes(app.id))
          .map(applicationToSearchResult);
      case 'contacts':
        return mockContacts
          .filter(contact => associatedIds.includes(contact.id) && contact.type === 'client')
          .map(contactToSearchResult);
      default:
        return [];
    }
  };

  const getEntityName = (entityType: string, entityId: string): string => {
    switch (entityType) {
      case 'companies':
        return mockCompanies.find(c => c.id === entityId)?.name || 'Company';
      case 'candidates':
      case 'contacts':
        return mockContacts.find(c => c.id === entityId)?.name || 'Contact';
      case 'applications':
        return mockApplications.find(a => a.id === entityId)?.candidateName || 'Application';
      default:
        return 'Entity';
    }
  };

  const handleLinkEntity = (entityType: string, entity: any) => {
    if (!job) return;
    
    associationManager.addAssociation(job.id, entityType, entity.id);
    
    toast({
      title: "Association Added",
      description: `Linked ${entity.name} to ${job.title}`,
    });
    
    setAssociations(prev => prev.map(assoc => 
      assoc.id === entityType 
        ? { ...assoc, records: getAssociatedRecords(job.id, entityType) }
        : assoc
    ));
  };

  const handleUnlinkEntity = (entityType: string, entityId: string) => {
    if (!job) return;
    
    associationManager.removeAssociation(job.id, entityType, entityId);
    
    const entityName = getEntityName(entityType, entityId);
    
    toast({
      title: "Association Removed",
      description: `Unlinked ${entityName} from ${job.title}`,
    });
    
    setAssociations(prev => prev.map(assoc => 
      assoc.id === entityType 
        ? { ...assoc, records: getAssociatedRecords(job.id, entityType) }
        : assoc
    ));
  };


  const leftPanel = (
    <div className="space-y-6">
      {/* Job Info Card */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                  {job.status}
                </Badge>
                <Badge variant="outline">{job.type}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`gap-2 ${getStatusButtonStyle(job.status)}`}
                  >
                    <Archive size={14} />
                    {job.status}
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleStatusChange("Active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("Paused")}>
                    Paused
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("Closed")}>
                    Closed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MoreVertical size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEditJob}>
                    <Edit size={14} className="mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyLink}>
                    <Link size={14} className="mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowPromotionDialog(true)}>
                    <Share size={14} className="mr-2" />
                    Promote
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowPreviewModal(true)}>
                    <Eye size={14} className="mr-2" />
                    Preview
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {job.skills && job.skills.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          )}
          {job.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">{job.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleEditJob}>
              <Edit className="h-4 w-4" />
              Edit Job
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => handleStatusChange("Closed")}>
              <Archive className="h-4 w-4" />
              Archive Job
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Applicant Pipeline */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-xl font-semibold">Applicant Pipeline</h2>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setShowAddApplicantDialog(true)}
          >
            Add Applicant
          </Button>
        </div>
        <KanbanBoard 
          stages={applicantStages} 
          items={applicants}
          entityType="applicant"
          onStageChange={handleStageChange}
          jobId={id}
        />
      </div>
    </div>
  );

  const rightPanel = (
    <AssociationPanel
      title="Associations"
      associations={associations}
    />
  );

  return (
    <div className="overflow-x-hidden">
      <PageContainer title={job.title}>
        <TwoPanelDetailLayout
          leftPanel={leftPanel}
          rightPanel={rightPanel}
        >
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              Back to Jobs
            </Button>
          </div>
        </TwoPanelDetailLayout>
      </PageContainer>

      {/* Job Promotion Dialog */}
      <JobPromotionDialog
        open={showPromotionDialog}
        onOpenChange={setShowPromotionDialog}
        jobTitle={job.title}
        companyName={job.company}
      />

      {/* Add Applicant Dialog */}
      <AddApplicantDialog
        open={showAddApplicantDialog}
        onOpenChange={setShowAddApplicantDialog}
        onAddApplicant={handleAddApplicant}
        jobId={id}
        jobTitle={job.title}
      />

      {/* Job Preview Modal */}
      <JobPreviewModal
        open={showPreviewModal}
        onOpenChange={setShowPreviewModal}
        job={{
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          salary: job.salary || "$80,000 - $120,000",
          description: "This is a placeholder for the job description. In a real application, this would contain the full job details, requirements, responsibilities, and other information.",
          requirements: [
            "Bachelor's degree in relevant field",
            "3+ years of experience",
            "Strong communication skills",
            "Team player with leadership qualities"
          ]
        }}
      />
    </div>
  );
};

export default JobDetail;