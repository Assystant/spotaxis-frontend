import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Globe, Building, Users, Plus, Edit } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TwoPanelDetailLayout } from "@/components/common/TwoPanelDetailLayout";
import { AssociationCards } from "@/components/common/AssociationCards";
import { CompanyTabs } from "@/components/companies/CompanyTabs";
import { Button } from "@/components/ui/button";
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
  const [associations, setAssociations] = useState<any[]>([]);

  useEffect(() => {
    if (companyId) {
      const companyData = mockCompanies.find(c => c.id === companyId);
      setCompany(companyData || null);
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (company) {
      const cardAssociations = [
        {
          id: "jobs",
          title: "Jobs",
          records: getAssociatedRecords(company.id, "jobs"),
          onAdd: () => console.log("Add job")
        },
        {
          id: "contacts",
          title: "Client Contacts",
          records: getAssociatedRecords(company.id, "contacts"),
          onAdd: () => console.log("Add contact")
        },
        {
          id: "candidates",
          title: "Candidates", 
          records: getAssociatedRecords(company.id, "candidates"),
          onAdd: () => console.log("Add candidate")
        },
        {
          id: "applications",
          title: "Applications",
          records: getAssociatedRecords(company.id, "applications"),
          onAdd: () => console.log("Add application")
        }
      ];
      setAssociations(cardAssociations);
    }
  }, [company]);

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



  const leftPanel = <CompanyTabs company={company} />;

  const rightPanel = (
    <AssociationCards
      title="Related Records"
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