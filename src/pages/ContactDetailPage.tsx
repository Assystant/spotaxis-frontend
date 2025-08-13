import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TwoPanelDetailLayout } from "@/components/common/TwoPanelDetailLayout";
import { Button } from "@/components/ui/button";
import { AssociationCards } from "@/components/common/AssociationCards";
import { mockCompanies, mockContacts, type Contact } from "@/data/mockAssociations";
import { associationManager } from "@/services/associationService";
import { getContactDeals } from "@/data/mockDeals";
import { ContactTabs } from "@/components/contacts/ContactTabs";

const ContactDetailPage = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contactId) {
      const contactData = mockContacts.find((c) => c.id === contactId) || null;
      setContact(contactData);
      setLoading(false);
    }
  }, [contactId]);

  const rightAssociations = useMemo(() => {
    if (!contact) return [] as any[];

    const companyRecords: Array<{ id: string; name: string; subtitle?: string; route: string }> = [];

    if (contact.companyId) {
      const primary = mockCompanies.find((c) => c.id === contact.companyId);
      if (primary) {
        companyRecords.push({
          id: primary.id,
          name: primary.name,
          subtitle: "Primary company",
          route: `/companies/${primary.id}`,
        });
      }
    }

    const associatedCompanyIds = associationManager.getAssociations(contact.id, "companies");
    const otherCompanies = mockCompanies
      .filter((c) => associatedCompanyIds.includes(c.id) && c.id !== contact.companyId)
      .map((c) => ({ id: c.id, name: c.name, subtitle: c.location, route: `/companies/${c.id}` }));

    const deals = getContactDeals(contact.name).map((d) => ({
      id: d.id,
      name: d.title,
      subtitle: `${d.company} • ${d.stage}`,
      route: "/deals",
    }));

    return [
      {
        id: "companies",
        title: "Companies",
        records: [...companyRecords, ...otherCompanies],
      },
      {
        id: "deals",
        title: "Deals",
        records: deals,
      },
    ];
  }, [contact]);

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
          <Button onClick={() => navigate("/contacts")}>Back to Contacts</Button>
        </div>
      </PageContainer>
    );
  }

  const leftPanel = <ContactTabs contact={contact} />;

  const rightPanel = (
    <AssociationCards title="Related Records" associations={rightAssociations} />
  );

  return (
    <PageContainer title={contact.name}>
      <TwoPanelDetailLayout leftPanel={leftPanel} rightPanel={rightPanel}>
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/contacts")} className="gap-2">
            <ArrowLeft size={16} />
            Back to Contacts
          </Button>
        </div>
      </TwoPanelDetailLayout>
    </PageContainer>
  );
};

export default ContactDetailPage;
