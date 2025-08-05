import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Building, Send, Plus, Calendar, User } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TwoPanelDetailLayout } from "@/components/common/TwoPanelDetailLayout";
import { AssociationPanel } from "@/components/common/AssociationPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockContacts, type Contact } from "@/data/mockAssociations";
import {
  searchCompanies,
  searchJobs,
  searchApplications,
  searchContacts,
  associationManager
} from "@/services/associationService";

const ContactDetailPage = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contactId) {
      const contactData = mockContacts.find(c => c.id === contactId);
      setContact(contactData || null);
      setLoading(false);
    }
  }, [contactId]);

  if (loading) {
    return (
      <PageContainer title="Loading...">
        <div className="flex items-center justify-center h-64">
          <p>Loading contact details...</p>
        </div>
      </PageContainer>
    );
  }

  if (!contact) {
    return (
      <PageContainer title="Contact Not Found">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Contact not found</p>
          <Button onClick={() => navigate("/contacts")}>
            Back to Contacts
          </Button>
        </div>
      </PageContainer>
    );
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleLinkEntity = (entityType: string, entity: any) => {
    associationManager.addAssociation(contact.id, entityType, entity.id);
    // In a real app, this would trigger a state update or refetch
    console.log(`Linked ${entityType}:`, entity);
  };

  const handleUnlinkEntity = (entityType: string, entityId: string) => {
    associationManager.removeAssociation(contact.id, entityType, entityId);
    // In a real app, this would trigger a state update or refetch
    console.log(`Unlinked ${entityType}:`, entityId);
  };

  // Mock associated data - in a real app, this would come from the association manager
  const associations = [
    {
      id: "company",
      title: "Company",
      records: contact.companyId ? [{
        id: contact.companyId,
        name: contact.company,
        subtitle: "Primary company",
        route: `/companies/${contact.companyId}`
      }] : [],
      searchPlaceholder: "Search companies...",
      onSearch: searchCompanies,
      onLink: (entity: any) => handleLinkEntity("company", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("company", entityId),
      defaultOpen: true
    },
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
      id: "applications",
      title: "Applications",
      records: [], // Would be populated from associations
      searchPlaceholder: "Search applications...",
      onSearch: searchApplications,
      onLink: (entity: any) => handleLinkEntity("applications", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity("applications", entityId),
      defaultOpen: true
    },
    {
      id: contact.type === 'client' ? "candidates" : "contacts",
      title: contact.type === 'client' ? "Candidates" : "Client Contacts",
      records: [], // Would be populated from associations
      searchPlaceholder: contact.type === 'client' ? "Search candidates..." : "Search client contacts...",
      onSearch: contact.type === 'client' ? 
        (query: string) => searchContacts(query, 'candidate') :
        (query: string) => searchContacts(query, 'client'),
      onLink: (entity: any) => handleLinkEntity(contact.type === 'client' ? "candidates" : "contacts", entity),
      onUnlink: (entityId: string) => handleUnlinkEntity(contact.type === 'client' ? "candidates" : "contacts", entityId),
      defaultOpen: false
    }
  ];

  const leftPanel = (
    <div className="space-y-6">
      {/* Contact Info Card */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{contact.name}</CardTitle>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{contact.role}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>{contact.company}</span>
                </div>
                {contact.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{contact.location}</span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <Badge variant={contact.type === 'client' ? 'default' : 'secondary'}>
                  {contact.type === 'client' ? 'Client Contact' : 'Candidate'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                {contact.phone}
              </a>
            </div>
          </div>
          {contact.source && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Source: <span className="font-medium">{contact.source}</span>
              </div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Send className="h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Note
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Meeting
            </Button>
            {contact.type === 'candidate' && (
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Schedule Interview
              </Button>
            )}
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
    <PageContainer title={contact.name}>
      <TwoPanelDetailLayout
        leftPanel={leftPanel}
        rightPanel={rightPanel}
      >
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/contacts")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back to Contacts
          </Button>
        </div>
      </TwoPanelDetailLayout>
    </PageContainer>
  );
};

export default ContactDetailPage;