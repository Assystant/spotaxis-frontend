import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, MapPin, Globe, Building, Users, Plus, Edit } from "lucide-react";
import { TwoPanelDetailLayout } from "@/components/common/TwoPanelDetailLayout";
import { AssociationCards } from "@/components/common/AssociationCards";
import { CompanyTabs } from "@/components/companies/CompanyTabs";
import { ActivityTypesProvider } from "@/contexts/ActivityTypesContext";
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
  const location = useLocation();
  
  // Try to get company data from navigation state first (for instant loading)
  const preloadedCompany = location.state?.company as Company | undefined;
  
  const [company, setCompany] = useState<Company | null>(preloadedCompany || null);
  const [loading, setLoading] = useState(!preloadedCompany);

  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  
  // Memoize expensive operations
  const getAssociatedRecords = useCallback((companyId: string, entityType: string) => {
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
  }, []);

  const getEntityName = useCallback((entityType: string, entityId: string): string => {
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
  }, []);

  const handleLinkEntity = useCallback((entityType: string, entity: any) => {
    if (!company) return;
    
    associationManager.addAssociation(company.id, entityType, entity.id);
    
    toast({
      title: "Association Added",
      description: `Linked ${entity.name} to ${company.name}`,
    });
    
    // Force re-render by updating company state
    setCompany(prev => ({ ...prev! }));
  }, [company]);

  const handleUnlinkEntity = useCallback((entityType: string, entityId: string) => {
    if (!company) return;
    
    associationManager.removeAssociation(company.id, entityType, entityId);
    
    const entityName = getEntityName(entityType, entityId);
    
    toast({
      title: "Association Removed",
      description: `Unlinked ${entityName} from ${company.name}`,
    });
    
    // Force re-render by updating company state
    setCompany(prev => ({ ...prev! }));
  }, [company, getEntityName]);

  // Memoize associations to prevent unnecessary recalculation
  const associations = useMemo(() => {
    if (!company) return [];
    
    return [
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
  }, [company, getAssociatedRecords]);

  // Memoize expensive components
  const leftPanel = useMemo(() => company ? <CompanyTabs company={company} /> : null, [company]);

  const rightPanel = useMemo(() => (
    <AssociationCards
      title="Related Records"
      associations={associations}
    />
  ), [associations]);

  useEffect(() => {
    if (companyId && !company) {
      // Only fetch if we don't have preloaded data
      const companyData = mockCompanies.find(c => c.id === companyId);
      setCompany(companyData || null);
      setLoading(false);
    } else if (preloadedCompany) {
      // We have preloaded data, no loading needed
      setLoading(false);
    }
  }, [companyId, company, preloadedCompany]);

  // NOW SAFE TO HAVE EARLY RETURNS AFTER ALL HOOKS ARE CALLED

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/companies")}
            className="p-2"
          >
            <ArrowLeft size={16} />
          </Button>
          <div className="h-8 bg-muted animate-pulse rounded w-48"></div>
        </div>
        <div className="h-96 bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/companies")}
            className="p-2"
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-semibold">Company Not Found</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Company not found</p>
          <Button onClick={() => navigate("/companies")}>
            Back to Companies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ActivityTypesProvider>
      <div className="space-y-4">
        {/* Header with back button and company name */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/companies")}
            className="p-2"
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-semibold">{company.name}</h1>
        </div>
        
        <TwoPanelDetailLayout
          leftPanel={leftPanel}
          rightPanel={rightPanel}
        >
          {null}
        </TwoPanelDetailLayout>
      </div>
    </ActivityTypesProvider>
  );
};

export default CompanyDetailPage;