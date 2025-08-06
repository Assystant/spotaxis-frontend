import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Globe, Building, Users, Plus, Edit } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TwoPanelDetailLayout } from "@/components/common/TwoPanelDetailLayout";
import { AssociationPanel } from "@/components/common/AssociationPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  mockCompanies, 
  mockContacts, 
  mockJobsData, 
  mockApplications,
  type Company 
} from "@/data/mockAssociations";
import {
  searchJobs,
  searchContacts,
  searchApplications,
  associationManager,
  contactToSearchResult,
  jobToSearchResult,
  applicationToSearchResult
} from "@/services/associationService";

const CompanyDetailPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companyId) {
      const companyData = mockCompanies.find(c => c.id === companyId);
      setCompany(companyData || null);
      setLoading(false);
    }
  }, [companyId]);

  if (loading) {
    return (
      <PageContainer title="Loading...">
        <div className="flex items-center justify-center h-64">
          <p>Loading company details...</p>
        </div>
      </PageContainer>
    );
  }

  if (!company) {
    return (
      <PageContainer title="Company Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Company not found</p>
          <Button onClick={() => navigate("/companies")}>
            Back to Companies
          </Button>
        </div>
      </PageContainer>
    );
  }

  const getAssociatedRecords = (companyId: string, entityType: string) => {
    const associatedIds = associationManager.getAssociations(companyId, entityType);
    
    switch (entityType) {
      case 'contacts':
        return mockContacts
          .filter(contact => associatedIds.includes(contact.id) && contact.type === 'client')
          .map(contactToSearchResult);
      case 'jobs':
        return mockJobsData
          .filter(job => associatedIds.includes(job.id))
          .map(jobToSearchResult);
      case 'candidates':
        return mockContacts
          .filter(contact => associatedIds.includes(contact.id) && contact.type === 'candidate')
          .map(contactToSearchResult);
      case 'applications':
        return mockApplications
          .filter(app => associatedIds.includes(app.id))
          .map(applicationToSearchResult);
      default:
        return [];
    }
  };

  const getEntityName = (entityType: string, entityId: string): string => {
    switch (entityType) {
      case 'contacts':
        return mockContacts.find(c => c.id === entityId)?.name || 'Contact';
      case 'jobs':
        return mockJobsData.find(j => j.id === entityId)?.title || 'Job';
      case 'candidates':
        return mockContacts.find(c => c.id === entityId)?.name || 'Candidate';
      case 'applications':
        return mockApplications.find(a => a.id === entityId)?.candidateName || 'Application';
      default:
        return 'Entity';
    }
  };

  const handleLinkEntity = (entityType: string, entity: any) => {
    if (!company) return;
    
    associationManager.addAssociation(company.id, entityType, entity.id);
    
    toast({
      title: "Association Added",
      description: `Linked ${entity.name} to ${company.name}`,
    });
    
    setAssociations(prev => prev.map(assoc => 
      assoc.id === entityType 
        ? { ...assoc, records: getAssociatedRecords(company.id, entityType) }
        : assoc
    ));
  };

  const handleUnlinkEntity = (entityType: string, entityId: string) => {
    if (!company) return;
    
    associationManager.removeAssociation(company.id, entityType, entityId);
    
    const entityName = getEntityName(entityType, entityId);
    
    toast({
      title: "Association Removed",
      description: `Unlinked ${entityName} from ${company.name}`,
    });
    
    setAssociations(prev => prev.map(assoc => 
      assoc.id === entityType 
        ? { ...assoc, records: getAssociatedRecords(company.id, entityType) }
        : assoc
    ));
  };

  const [associations, setAssociations] = useState(() => {
    if (!company) return [];
    
    return [
      {
        id: "jobs",
        title: "Jobs",
        records: getAssociatedRecords(company.id, "jobs"),
        searchPlaceholder: "Search jobs...",
        onSearch: searchJobs,
        onLink: (entity: any) => handleLinkEntity("jobs", entity),
        onUnlink: (entityId: string) => handleUnlinkEntity("jobs", entityId),
        defaultOpen: true
      },
      {
        id: "contacts",
        title: "Client Contacts",
        records: getAssociatedRecords(company.id, "contacts"),
        searchPlaceholder: "Search client contacts...",
        onSearch: (query: string) => searchContacts(query, 'client'),
        onLink: (entity: any) => handleLinkEntity("contacts", entity),
        onUnlink: (entityId: string) => handleUnlinkEntity("contacts", entityId),
        defaultOpen: true
      },
      {
        id: "candidates",
        title: "Candidates",
        records: getAssociatedRecords(company.id, "candidates"),
        searchPlaceholder: "Search candidates...",
        onSearch: (query: string) => searchContacts(query, 'candidate'),
        onLink: (entity: any) => handleLinkEntity("candidates", entity),
        onUnlink: (entityId: string) => handleUnlinkEntity("candidates", entityId),
        defaultOpen: false
      },
      {
        id: "applications",
        title: "Applications",
        records: getAssociatedRecords(company.id, "applications"),
        searchPlaceholder: "Search applications...",
        onSearch: searchApplications,
        onLink: (entity: any) => handleLinkEntity("applications", entity),
        onUnlink: (entityId: string) => handleUnlinkEntity("applications", entityId),
        defaultOpen: false
      }
    ];
  });

  useEffect(() => {
    if (company) {
      setAssociations([
        {
          id: "jobs",
          title: "Jobs",
          records: getAssociatedRecords(company.id, "jobs"),
          searchPlaceholder: "Search jobs...",
          onSearch: searchJobs,
          onLink: (entity: any) => handleLinkEntity("jobs", entity),
          onUnlink: (entityId: string) => handleUnlinkEntity("jobs", entityId),
          defaultOpen: true
        },
        {
          id: "contacts",
          title: "Client Contacts",
          records: getAssociatedRecords(company.id, "contacts"),
          searchPlaceholder: "Search client contacts...",
          onSearch: (query: string) => searchContacts(query, 'client'),
          onLink: (entity: any) => handleLinkEntity("contacts", entity),
          onUnlink: (entityId: string) => handleUnlinkEntity("contacts", entityId),
          defaultOpen: true
        },
        {
          id: "candidates",
          title: "Candidates",
          records: getAssociatedRecords(company.id, "candidates"),
          searchPlaceholder: "Search candidates...",
          onSearch: (query: string) => searchContacts(query, 'candidate'),
          onLink: (entity: any) => handleLinkEntity("candidates", entity),
          onUnlink: (entityId: string) => handleUnlinkEntity("candidates", entityId),
          defaultOpen: false
        },
        {
          id: "applications",
          title: "Applications",
          records: getAssociatedRecords(company.id, "applications"),
          searchPlaceholder: "Search applications...",
          onSearch: searchApplications,
          onLink: (entity: any) => handleLinkEntity("applications", entity),
          onUnlink: (entityId: string) => handleUnlinkEntity("applications", entityId),
          defaultOpen: false
        }
      ]);
    }
  }, [company]);

  const leftPanel = (
    <div className="space-y-6">
      {/* Company Info Card */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{company.name}</CardTitle>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
                {company.website && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {company.website}
                    </a>
                  </div>
                )}
                {company.size && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{company.size} employees</span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <Badge variant="default">{company.industry}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {company.mission && (
            <div className="mb-4">
              <h4 className="font-medium mb-2">Mission</h4>
              <p className="text-muted-foreground">{company.mission}</p>
            </div>
          )}
          {company.vision && (
            <div>
              <h4 className="font-medium mb-2">Vision</h4>
              <p className="text-muted-foreground">{company.vision}</p>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Note
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Company
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Job
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const rightPanel = (
    <AssociationPanel
      title="Associations"
      associations={associations}
    />
  );

  return (
    <PageContainer title={company.name}>
      <TwoPanelDetailLayout
        leftPanel={leftPanel}
        rightPanel={rightPanel}
      >
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/companies")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back to Companies
          </Button>
        </div>
      </TwoPanelDetailLayout>
    </PageContainer>
  );
};

export default CompanyDetailPage;