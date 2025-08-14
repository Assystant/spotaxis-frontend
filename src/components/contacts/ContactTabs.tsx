import React, { useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, User, Briefcase, Users, Plus, Send, Calendar } from "lucide-react";
import { Contact, getCandidateApplications, getCompanyJobs, mockCompanies } from "@/data/mockAssociations";

interface ContactTabsProps {
  contact: Contact;
}

export const ContactTabs: React.FC<ContactTabsProps> = ({ contact }) => {
  type TabDef = { id: string; name: string; icon: React.ComponentType<any> };
  const baseTabs: TabDef[] = [
    { id: "overview", name: "Overview", icon: User },
    ...(contact.type === "client"
      ? [{ id: "jobs", name: "Jobs", icon: Briefcase }]
      : [{ id: "applications", name: "Applications", icon: Users }]),
  ];

  const [activeTab, setActiveTab] = useState<string>(baseTabs[0].id);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [visibleCount, setVisibleCount] = useState<number>(baseTabs.length);

  useEffect(() => {
    const recalc = () => {
      if (!tabsContainerRef.current) return;
      const containerWidth = tabsContainerRef.current.offsetWidth;
      const gap = 4; // matches gap-1
      let used = 0;
      let count = 0;
      for (const t of baseTabs) {
        const w = triggerRefs.current[t.id]?.offsetWidth ?? 0;
        const space = count > 0 ? gap : 0;
        if (used + w + space <= containerWidth) {
          used += w + space;
          count++;
        } else {
          break;
        }
      }
      setVisibleCount(Math.max(1, count));
    };

    const ro = new ResizeObserver(recalc);
    if (tabsContainerRef.current) ro.observe(tabsContainerRef.current);
    window.addEventListener("resize", recalc);
    setTimeout(recalc, 0);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, [baseTabs]);

  const visibleTabs = useMemo(() => baseTabs.slice(0, visibleCount), [baseTabs, visibleCount]);
  const overflowTabs = useMemo(() => baseTabs.slice(visibleCount), [baseTabs, visibleCount]);

  const renderOverview = () => {
    const company = contact.companyId ? mockCompanies.find((c) => c.id === contact.companyId) : undefined;
    return (
      <Card className="shadow-none rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{contact.name}</CardTitle>
          <CardDescription>{contact.type === "client" ? "Client Contact" : "Candidate"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Role:</span>
                <span>{contact.role}</span>
              </div>
              {company && (
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Company:</span>
                  <span>{company.name}</span>
                </div>
              )}
              {contact.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span>{contact.location}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button size="sm">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            {contact.type === "candidate" && (
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderJobs = () => {
    const jobs = contact.companyId ? getCompanyJobs(contact.companyId) : [];
    return (
      <Card className="shadow-none rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            <CardTitle>Jobs</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {jobs.length ? (
            <ul className="space-y-3">
              {jobs.map((j) => (
                <li key={j.id} className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium">{j.title}</div>
                    <div className="text-xs text-muted-foreground">{j.location} • {j.type}</div>
                  </div>
                  <Badge variant="outline">{j.status}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground">No jobs found.</div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderApplications = () => {
    const applications = getCandidateApplications(contact.id);
    return (
      <Card className="shadow-none rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>Applications</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {applications.length ? (
            <ul className="space-y-3">
              {applications.map((a) => (
                <li key={a.id} className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <div className="font-medium">{a.candidateName}</div>
                    <div className="text-xs text-muted-foreground">{a.jobTitle}</div>
                  </div>
                  <Badge variant="outline">{a.status}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground">No applications found.</div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderContent = (tabId: string) => {
    if (tabId === "overview") return renderOverview();
    if (tabId === "jobs") return renderJobs();
    if (tabId === "applications") return renderApplications();
    return null;
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-4 relative">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div ref={tabsContainerRef} className="flex-1 min-w-0">
            <TabsList className="flex w-full gap-1 overflow-hidden justify-start">
              {visibleTabs.map((t) => (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className="flex items-center gap-1 px-3 py-2 justify-start text-left"
                  ref={(el) => (triggerRefs.current[t.id] = el)}
                >
                  <t.icon className="h-4 w-4" />
                  {t.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {overflowTabs.length > 0 && (
            <div className="text-sm text-muted-foreground shrink-0">
              +{overflowTabs.length} more
            </div>
          )}
        </div>
        {/* Hidden measurement container */}
        <div className="absolute left-0 top-0 -z-50 opacity-0 pointer-events-none" aria-hidden>
          <div className="inline-flex gap-1">
            {baseTabs.map((t) => (
              <button
                key={`measure-${t.id}`}
                ref={(el) => (triggerRefs.current[t.id] = el)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium"
              >
                <t.icon className="h-4 w-4 mr-1" />
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {baseTabs.map((t) => (
        <TabsContent key={t.id} value={t.id}>
          {renderContent(t.id)}
        </TabsContent>
      ))}
    </Tabs>
  );
};
