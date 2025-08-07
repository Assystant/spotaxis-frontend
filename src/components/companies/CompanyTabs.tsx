import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Globe, MapPin, Users, Plus, Calendar, Mail, Phone, FileText, Activity, Video, MessageSquare, Clock, Briefcase, Target, TrendingUp, Send, Menu, ChevronDown } from "lucide-react";
import { Company } from "@/data/mockAssociations";
import { useActivityTypes } from "@/contexts/ActivityTypesContext";
import { ActivityTypeDropdown } from "./ActivityTypeDropdown";
import { getActivitiesForType, getAllActivities } from "@/data/mockActivities";
import { ActivityCard } from "./ActivityCard";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(activityTypes[0]?.id || 'overview');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkOverflow = () => {
      if (tabsContainerRef.current && !isMobile) {
        const container = tabsContainerRef.current;
        const containerWidth = container.offsetWidth;
        const manageButtonWidth = 120; // Approximate width of manage button
        const tabsWidth = Array.from(container.querySelectorAll('[role="tab"]')).reduce((total, tab) => {
          return total + ((tab as HTMLElement).offsetWidth || 0);
        }, 0);
        
        setShowHamburgerMenu(tabsWidth + manageButtonWidth > containerWidth);
      } else {
        setShowHamburgerMenu(isMobile);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [activityTypes.length, isMobile]);
  const renderTabContent = (activityType: any) => {
    const IconComponent = iconMap[activityType.icon as keyof typeof iconMap] || FileText;
    
    if (activityType.id === 'overview') {
      return (
        <Card>
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

    if (activityType.id === 'activities') {
      const allActivities = getAllActivities();
      
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">All Activities</h3>
            <Button size="sm">Add Activity</Button>
          </div>
          
          {allActivities.length > 0 ? (
            <div className="space-y-4">
              {allActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">
                    {activity.type}
                  </Badge>
                  <div className="flex-1">
                    <ActivityCard activity={activity} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No activities yet</h3>
              <p className="text-muted-foreground mb-4">Start tracking activities for this company</p>
              <Button>Add First Activity</Button>
            </div>
          )}
        </div>
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
      <Card>
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
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
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

  const currentActivity = activityTypes.find(at => at.id === activeTab) || activityTypes[0];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6" ref={tabsContainerRef}>
          {showHamburgerMenu ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Menu className="h-4 w-4" />
                  {currentActivity?.name || 'Select Tab'}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background border shadow-lg z-50">
                {activityTypes.map((activityType) => {
                  const IconComponent = iconMap[activityType.icon as keyof typeof iconMap] || FileText;
                  return (
                    <DropdownMenuItem
                      key={activityType.id}
                      onClick={() => setActiveTab(activityType.id)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <IconComponent className="h-4 w-4" />
                      {activityType.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <TabsList className="grid w-auto grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
              {activityTypes.map((activityType) => {
                const IconComponent = iconMap[activityType.icon as keyof typeof iconMap] || FileText;
                return (
                  <TabsTrigger 
                    key={activityType.id} 
                    value={activityType.id}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {activityType.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          )}
          <ActivityTypeDropdown />
        </div>

        {activityTypes.map((activityType) => (
          <TabsContent key={activityType.id} value={activityType.id}>
            {renderTabContent(activityType)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};