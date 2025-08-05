import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Globe, Building, Users, Plus, Edit } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TwoPanelDetailLayout } from "@/components/common/TwoPanelDetailLayout";
import { AssociationPanel } from "@/components/common/AssociationPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCompanies, type Company } from "@/data/mockAssociations";
import {
  searchJobs,
  searchContacts,
  searchApplications,
  associationManager
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

  const handleLinkEntity = (entityType: string, entity: any) => {
    associationManager.addAssociation(company.id, entityType, entity.id);
    console.log(`Linked ${entityType}:`, entity);
  };

  const handleUnlinkEntity = (entityType: string, entityId: string) => {
    associationManager.removeAssociation(company.id, entityType, entityId);
    console.log(`Unlinked ${entityType}:`, entityId);
  };

  // Mock associated data - in a real app, this would come from the association manager
  const associations = [
    {
      id: "jobs",
      title: "Jobs",
      records: [], // Would be populated from associations
      searchPlaceholder: "Search jobs...",
      onSearch: searchJobs,
      onLink: (entity: any) => handleLinkEntity("jobs", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("jobs", entityId),
      defaultOpen: true
    },
    {
      id: "contacts",
      title: "Client Contacts",
      records: [], // Would be populated from associations
      searchPlaceholder: "Search client contacts...",
      onSearch: (query: string) => searchContacts(query, 'client'),
      onLink: (entity: any) => handleLinkEntity("contacts", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("contacts", entityId),
      defaultOpen: true
    },
    {
      id: "candidates",
      title: "Candidates",
      records: [], // Would be populated from associations
      searchPlaceholder: "Search candidates...",
      onSearch: (query: string) => searchContacts(query, 'candidate'),
      onLink: (entity: any) => handleLinkEntity("candidates", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("candidates", entityId),
      defaultOpen: false
    },
    {
      id: "applications",
      title: "Applications",
      records: [], // Would be populated from associations
      searchPlaceholder: "Search applications...",
      onSearch: searchApplications,
      onLink: (entity: any) => handleLinkEntity("applications", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("applications", entityId),
      defaultOpen: false
    }
  ];

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