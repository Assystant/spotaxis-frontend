import React, { useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, FileText, Users, Share2, BarChart3, Settings, Briefcase } from "lucide-react";
import { Job } from "@/data/mockAssociations";
import { JobDetailsTab } from "./JobDetailsTab";
import { JobPromotionsTab } from "./JobPromotionsTab";
import { JobAnalyticsTab } from "./JobAnalyticsTab";
import { JobSettingsTab } from "./JobSettingsTab";
import { JobApplicantPipelineTab } from "./JobApplicantPipelineTab";

interface JobTabsProps {
  job: Job;
  onJobUpdate?: (job: Job) => void;
}

// Tab configuration
const jobTabs = [
  { id: "pipeline", label: "Applicant Pipeline", icon: Users },
  { id: "details", label: "Job Details", icon: FileText },
  { id: "promotions", label: "Promotions", icon: Share2 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Job Settings", icon: Settings },
];

// Icon mapping for dynamic rendering
const iconMap = {
  Users,
  FileText,
  Share2,
  BarChart3,
  Settings,
  Briefcase,
};

export const JobTabs = ({ job, onJobUpdate }: JobTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('pipeline');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [visibleCount, setVisibleCount] = useState<number>(jobTabs.length);

  useEffect(() => {
    const recalc = () => {
      if (!tabsContainerRef.current) return;
      const containerWidth = tabsContainerRef.current.offsetWidth;
      const gap = 4; // matches gap-1 (0.25rem)
      let used = 0;
      let count = 0;
      for (const t of jobTabs) {
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
  }, []);

  const visibleTabs = useMemo(
    () => jobTabs.slice(0, visibleCount),
    [visibleCount]
  );
  const overflowTabs = useMemo(
    () => jobTabs.slice(visibleCount),
    [visibleCount]
  );

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'pipeline':
        return <JobApplicantPipelineTab job={job} />;
      case 'details':
        return <JobDetailsTab job={job} />;
      case 'promotions':
        return <JobPromotionsTab job={job} />;
      case 'analytics':
        return <JobAnalyticsTab job={job} />;
      case 'settings':
        return <JobSettingsTab job={job} onJobUpdate={onJobUpdate} />;
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4 relative">
          <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
            <div ref={tabsContainerRef} className="flex-1 min-w-0 overflow-hidden">
              <TabsList className="flex w-full gap-1 overflow-x-auto justify-start max-w-full">
              {visibleTabs.map((tab) => {
                const IconComponent = iconMap[tab.icon.name as keyof typeof iconMap] || FileText;
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1 px-3 py-2 justify-start text-left whitespace-nowrap flex-shrink-0">
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {overflowTabs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  +{overflowTabs.length} more
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="z-50">
                {overflowTabs.map((t) => {
                  const IconComponent = iconMap[t.icon.name as keyof typeof iconMap] || FileText;
                  return (
                    <DropdownMenuItem key={t.id} onClick={() => setActiveTab(t.id)} className="cursor-pointer">
                      <IconComponent className="h-4 w-4 mr-2" />
                      {t.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Hidden measurement container for accurate tab widths */}
        <div className="absolute left-0 top-0 -z-50 opacity-0 pointer-events-none" aria-hidden>
          <div className="inline-flex gap-1">
            {jobTabs.map((t) => {
              const IconComponent = iconMap[t.icon.name as keyof typeof iconMap] || FileText;
              return (
                <button
                  key={`measure-${t.id}`}
                  ref={(el) => (triggerRefs.current[t.id] = el)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium"
                >
                  <IconComponent className="h-4 w-4 mr-1" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {jobTabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="w-full max-w-full overflow-hidden">
          {renderTabContent(tab.id)}
        </TabsContent>
      ))}
    </Tabs>
    </div>
  );
};