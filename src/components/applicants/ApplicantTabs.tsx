import { useEffect, useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, FileText, Activity, MessageSquare, PhoneCall, ClipboardList, ClipboardCheck } from "lucide-react";

type ApplicantTabsProps = {
  applicant: any;
  resumeLink?: string;
};

export const ApplicantTabs = ({ applicant, resumeLink }: ApplicantTabsProps) => {
  const [active, setActive] = useState<string>("profile");

  const tabs = useMemo(
    () => [
      { id: "profile", label: "Profile", icon: Activity },
      { id: "resume", label: "Resume", icon: FileText },
      { id: "notes", label: "Notes", icon: MessageSquare },
      { id: "activities", label: "Activities", icon: Activity },
      { id: "emails", label: "Emails", icon: Mail },
      { id: "calls", label: "Calls", icon: PhoneCall },
      { id: "assessments", label: "Assessments", icon: ClipboardList },
      { id: "scorecards", label: "Scorecards", icon: ClipboardCheck },
    ],
    []
  );

  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(tabs.length);

  useEffect(() => {
    const recalc = () => {
      if (!measureRef.current) return;
      // Simple responsive: leave all visible; TabsList is scrollable and left-aligned
      setVisibleCount(tabs.length);
    };
    const ro = new ResizeObserver(recalc);
    if (measureRef.current) ro.observe(measureRef.current);
    recalc();
    return () => ro.disconnect();
  }, [tabs.length]);

  const visibleTabs = tabs.slice(0, visibleCount);

  return (
    <Tabs value={active} onValueChange={setActive} className="w-full">
      <div className="mb-4" ref={measureRef}>
        <TabsList className="flex w-full gap-1 overflow-x-auto justify-start">
          {visibleTabs.map((t) => {
            const Icon = t.icon;
            return (
              <TabsTrigger key={t.id} value={t.id} className="flex items-center gap-2 px-3 py-2 whitespace-nowrap">
                <Icon className="h-4 w-4" />
                {t.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Candidate overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /><span>{applicant.email}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /><span>{applicant.phone}</span></div>
              </div>
              {Array.isArray(applicant.skills) && applicant.skills.length > 0 && (
                <div>
                  <div className="font-medium mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((s: string, i: number) => (
                      <Badge key={i} variant="outline">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="resume">
        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>Uploaded resume</CardDescription>
          </CardHeader>
          <CardContent>
            {resumeLink ? (
              <a href={resumeLink} className="text-primary underline" target="_blank" rel="noreferrer">View resume</a>
            ) : (
              <div className="text-sm text-muted-foreground">No resume uploaded</div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notes">
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.isArray(applicant.notes) && applicant.notes.length > 0 ? (
              applicant.notes.map((n: any, idx: number) => (
                <div key={idx} className="text-sm">
                  <div className="font-medium">{n.author} • {n.date}</div>
                  <div className="text-muted-foreground">{n.content}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No notes yet</div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activities">
        <Card>
          <CardHeader>
            <CardTitle>Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.isArray(applicant.activity) && applicant.activity.length > 0 ? (
              applicant.activity.map((a: any, idx: number) => (
                <div key={idx} className="text-sm">
                  <div className="font-medium">{a.title}</div>
                  <div className="text-muted-foreground">{a.description}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No activities logged</div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="emails">
        <Card>
          <CardHeader>
            <CardTitle>Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">No emails to show</div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="calls">
        <Card>
          <CardHeader>
            <CardTitle>Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">No calls logged</div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="assessments">
        <Card>
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">No assessments yet</div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="scorecards">
        <Card>
          <CardHeader>
            <CardTitle>Scorecards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">No scorecards yet</div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
