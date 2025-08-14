import React, { useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Building, Globe, MapPin, Users, Plus, Calendar, Mail, Phone, FileText, Activity, Video, MessageSquare, Clock, Briefcase, Target, TrendingUp, Send, ChevronDown } from "lucide-react";
import { Company } from "@/data/mockAssociations";
import { useActivityTypes } from "@/contexts/ActivityTypesContext";
import { ActivityTypeDropdown } from "./ActivityTypeDropdown";
import { getActivitiesForType } from "@/data/mockActivities";
import { ActivityCard } from "./ActivityCard";
import { EmailActivityCard } from "./EmailActivityCard";
import { getCompanyJobs, getCompanyApplications } from "@/data/mockAssociations";

interface CompanyTabsProps {
  company: Company;
}

// Icon mapping for dynamic rendering
const iconMap = {
  Building,
  Mail,
  Phone,
  Activity,
  FileText,
  Video,
  MessageSquare,
  Calendar,
  Clock,
  Users,
  Briefcase,
  Target,
  TrendingUp,
};

export const CompanyTabs = ({ company }: CompanyTabsProps) => {
  const { activityTypes } = useActivityTypes();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [visibleCount, setVisibleCount] = useState<number>(activityTypes.length);

  useEffect(() => {
    const recalc = () => {
      if (!tabsContainerRef.current) return;
      const containerWidth = tabsContainerRef.current.offsetWidth;
      const gap = 4; // matches gap-1 (0.25rem)
      let used = 0;
      let count = 0;
      for (const t of activityTypes) {
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
    window.addEventListener('resize', recalc);
    setTimeout(recalc, 0);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recalc);
    };
  }, [activityTypes]);

  const visibleTypes = useMemo(
    () => activityTypes.slice(0, visibleCount),
    [activityTypes, visibleCount]
  );
  const overflowTypes = useMemo(
    () => activityTypes.slice(visibleCount),
    [activityTypes, visibleCount]
  );

  const renderTabContent = (activityType: any) => {
    const IconComponent = iconMap[activityType.icon as keyof typeof iconMap] || FileText;
    
    if (activityType.id === 'overview') {
      return (
        <Card className="shadow-none rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {company.name}
            </CardTitle>
            <CardDescription>Company Overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Industry:</span>
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Website:</span>
                  <a href={company.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Size:</span>
                  <Badge variant="secondary">{company.size}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Industry:</span>
                  <Badge variant="outline">{company.industry}</Badge>
                </div>
              </div>
            </div>

            {company.mission && (
              <div className="space-y-2">
                <h4 className="font-medium">Mission</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {company.mission}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button size="sm">
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Log Call
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Handle Related Records tabs for Jobs and Applications
    if (activityType.id.startsWith('related_jobs:')) {
      const listId = activityType.id.split(':')[1];
      const jobs = getCompanyJobs(company.id);
      // Basic filter handling (default lists)
      const filtered = activityType.name.includes('Open')
        ? jobs.filter((j) => j.status === 'Active')
        : jobs;

      return (
        <Card className="shadow-none rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <CardTitle>{activityType.name}</CardTitle>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Job
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {filtered.length > 0 ? (
              <ul className="space-y-3">
                {filtered.map((j) => (
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
              <div className="text-sm text-muted-foreground">No jobs match this list.</div>
            )}
          </CardContent>
        </Card>
      );
    }

    if (activityType.id.startsWith('related_applications:')) {
      const applications = getCompanyApplications(company.id);
      const filtered = activityType.name.includes('Active')
        ? applications.filter((a) => a.status === 'Active')
        : applications;

      return (
        <Card className="shadow-none rounded-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <CardTitle>{activityType.name}</CardTitle>
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Application
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {filtered.length > 0 ? (
              <ul className="space-y-3">
                {filtered.map((a) => (
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
              <div className="text-sm text-muted-foreground">No applications match this list.</div>
            )}
          </CardContent>
        </Card>
      );
    }

    const activities = getActivitiesForType(activityType.id);
    
    const getAddButtonText = (typeId: string) => {
      switch (typeId) {
        case 'notes': return 'Add Note';
        case 'emails': return 'Compose Email';
        case 'meetings': return 'Schedule Meeting';
        case 'calls': return 'Log Call';
        case 'whatsapp-log': return 'Add WhatsApp Message';
        case 'linkedin-message-log': return 'Add LinkedIn Message';
        case 'sms-log': return 'Add SMS';
        case 'facebook-message-log': return 'Add Facebook Message';
        default: return `Add ${activityType.name}`;
      }
    };
    
    return (
      <Card className="shadow-none rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconComponent className="h-5 w-5" />
              <CardTitle>{activityType.name}</CardTitle>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              {getAddButtonText(activityType.id)}
            </Button>
          </div>
          {activityType.description && (
            <CardDescription>{activityType.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity) =>
                activityType.id === 'emails' ? (
                  <EmailActivityCard key={activity.id} activity={activity} />
                ) : (
                  <ActivityCard key={activity.id} activity={activity} />
                )
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <IconComponent className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No {activityType.name.toLowerCase()} yet</p>
              <p className="text-sm mb-4">Activities will appear here when added</p>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                {getAddButtonText(activityType.id)}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-4 relative">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div ref={tabsContainerRef} className="flex-1 min-w-0">
            <TabsList className="flex w-full gap-1 overflow-hidden justify-start">
              {visibleTypes.map((activityType) => {
                const IconComponent = iconMap[activityType.icon as keyof typeof iconMap] || FileText;
                return (
                  <TabsTrigger key={activityType.id} value={activityType.id} className="flex items-center gap-1 px-3 py-2 justify-start text-left">
                    <IconComponent className="h-4 w-4" />
                    {activityType.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {overflowTypes.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  +{overflowTypes.length} more
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50">
                {overflowTypes.map((t) => {
                  const IconComponent = iconMap[t.icon as keyof typeof iconMap] || FileText;
                  return (
                    <DropdownMenuItem key={t.id} onClick={() => setActiveTab(t.id)} className="cursor-pointer">
                      <IconComponent className="h-4 w-4 mr-2" />
                      {t.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <ActivityTypeDropdown />

        {/* Hidden measurement container for accurate tab widths */}
        <div className="absolute left-0 top-0 -z-50 opacity-0 pointer-events-none" aria-hidden>
          <div className="inline-flex gap-1">
            {activityTypes.map((t) => {
              const IconComponent = iconMap[t.icon as keyof typeof iconMap] || FileText;
              return (
                <button
                  key={`measure-${t.id}`}
                  ref={(el) => (triggerRefs.current[t.id] = el)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium"
                >
                  <IconComponent className="h-4 w-4 mr-1" />
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activityTypes.map((activityType) => (
        <TabsContent key={activityType.id} value={activityType.id}>
          {renderTabContent(activityType)}
        </TabsContent>
      ))}
    </Tabs>
  );
};