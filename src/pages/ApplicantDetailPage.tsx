import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TwoPanelDetailLayout } from "@/components/common/TwoPanelDetailLayout";
import { AssociationPanel } from "@/components/common/AssociationPanel";
import { ApplicantDetail } from "@/components/applicants/ApplicantDetail";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin, MoveRight, Calendar, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { mockApplicants } from "@/data/mockApplicants";
import { 
  mockContacts, 
  mockCompanies, 
  mockJobsData, 
  mockApplications 
} from "@/data/mockAssociations";
import {
  searchJobs,
  searchCompanies,
  searchContacts,
  searchApplications,
  associationManager,
  companyToSearchResult,
  jobToSearchResult,
  applicationToSearchResult,
  contactToSearchResult
} from "@/services/associationService";

const ApplicantDetailPage = () => {
  const { applicantId } = useParams<{ applicantId: string }>();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (applicantId) {
      const applicantData = mockApplicants.find(a => a.id === applicantId);
      setApplicant(applicantData || null);
      setLoading(false);
    }
  }, [applicantId]);

  if (loading) {
    return (
      <PageContainer title="Loading...">
        <div className="flex items-center justify-center h-64">
          <p>Loading applicant details...</p>
        </div>
      </PageContainer>
    );
  }

  if (!applicantId || !applicant) {
    return (
      <PageContainer title="Applicant Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Applicant not found</p>
          <Button onClick={() => navigate("/applicants")}>
            Back to Applicants
          </Button>
        </div>
      </PageContainer>
    );
  }

  const getAssociatedRecords = (applicantId: string, entityType: string) => {
    const associatedIds = associationManager.getAssociations(applicantId, entityType);
    
    switch (entityType) {
      case 'companies':
        return mockCompanies
          .filter(company => associatedIds.includes(company.id))
          .map(companyToSearchResult);
      case 'jobs':
        return mockJobsData
          .filter(job => associatedIds.includes(job.id))
          .map(jobToSearchResult);
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
      case 'jobs':
        return mockJobsData.find(j => j.id === entityId)?.title || 'Job';
      case 'applications':
        return mockApplications.find(a => a.id === entityId)?.candidateName || 'Application';
      case 'contacts':
        return mockContacts.find(c => c.id === entityId)?.name || 'Contact';
      default:
        return 'Entity';
    }
  };

  const handleLinkEntity = (entityType: string, entity: any) => {
    if (!applicant) return;
    
    associationManager.addAssociation(applicant.id, entityType, entity.id);
    
    toast({
      title: "Association Added",
      description: `Linked ${entity.name} to ${applicant.name}`,
    });
    
    setAssociations(prev => prev.map(assoc => 
      assoc.id === entityType 
        ? { ...assoc, records: getAssociatedRecords(applicant.id, entityType) }
        : assoc
    ));
  };

  const handleUnlinkEntity = (entityType: string, entityId: string) => {
    if (!applicant) return;
    
    associationManager.removeAssociation(applicant.id, entityType, entityId);
    
    const entityName = getEntityName(entityType, entityId);
    
    toast({
      title: "Association Removed",
      description: `Unlinked ${entityName} from ${applicant.name}`,
    });
    
    setAssociations(prev => prev.map(assoc => 
      assoc.id === entityType 
        ? { ...assoc, records: getAssociatedRecords(applicant.id, entityType) }
        : assoc
    ));
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-purple-100 text-purple-800';
      case 'interview': return 'bg-amber-100 text-amber-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock associated data
  const [associations, setAssociations] = useState(() => {
    if (!applicant) return [];
    
    return [
    {
      id: "applications",
      title: "Applications",
      records: getAssociatedRecords(applicant.id, "applications"),
      searchPlaceholder: "Search applications...",
      onSearch: searchApplications,
      onLink: (entity: any) => handleLinkEntity("applications", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("applications", entityId),
      defaultOpen: true
    },
    {
      id: "jobs",
      title: "Jobs",
      records: getAssociatedRecords(applicant.id, "jobs"),
      searchPlaceholder: "Search jobs...",
      onSearch: searchJobs,
      onLink: (entity: any) => handleLinkEntity("jobs", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("jobs", entityId),
      defaultOpen: true
    },
    {
      id: "companies",
      title: "Companies",
      records: getAssociatedRecords(applicant.id, "companies"),
      searchPlaceholder: "Search companies...",
      onSearch: searchCompanies,
      onLink: (entity: any) => handleLinkEntity("companies", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("companies", entityId),
      defaultOpen: false
    },
    {
      id: "contacts",
      title: "Client Contacts",
      records: getAssociatedRecords(applicant.id, "contacts"),
      searchPlaceholder: "Search client contacts...",
      onSearch: (query: string) => searchContacts(query, 'client'),
      onLink: (entity: any) => handleLinkEntity("contacts", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("contacts", entityId),
      defaultOpen: false
    }
    ];
  });

  const leftPanel = (
    <div className="space-y-6">
      {/* Application Info Card */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{applicant.name}</CardTitle>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{applicant.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{applicant.phone}</span>
                </div>
                {applicant.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{applicant.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Applied {applicant.appliedDate}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge className={getStageColor(applicant.stage)}>
                  {applicant.stage}
                </Badge>
                {applicant.source && (
                  <Badge variant="outline">{applicant.source}</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="gap-2">
                <MoveRight className="h-4 w-4" />
                Move Stage
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {applicant.jobTitle && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Applied Position</h4>
              <p className="text-muted-foreground">{applicant.jobTitle}</p>
            </div>
          )}
          {applicant.skills && applicant.skills.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {applicant.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          )}
          {applicant.experience && (
            <div>
              <h4 className="font-medium mb-2">Experience</h4>
              <p className="text-muted-foreground">{applicant.experience}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Details - Use existing ApplicantDetail component */}
      <div className="rounded-2xl shadow-md">
        <ApplicantDetail id={applicantId} />
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
    <PageContainer title={applicant.name}>
      <TwoPanelDetailLayout
        leftPanel={leftPanel}
        rightPanel={rightPanel}
      >
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/applicants")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back to Applicants
          </Button>
        </div>
      </TwoPanelDetailLayout>
    </PageContainer>
  );
};

export default ApplicantDetailPage;