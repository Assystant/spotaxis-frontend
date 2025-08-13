import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCandidateApplications, getJobCompany, mockApplications, mockJobsData } from "@/data/mockAssociations";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface RelatedApplicationsCardProps {
  currentApplicationId?: string;
  candidateId?: string;
}

export const RelatedApplicationsCard = ({ currentApplicationId, candidateId }: RelatedApplicationsCardProps) => {
  const navigate = useNavigate();

  const apps = useMemo(() => {
    const current = currentApplicationId
      ? mockApplications.find((a) => a.id === currentApplicationId)
      : undefined;
    const candId = candidateId || current?.candidateId;
    if (!candId) return [];
    return getCandidateApplications(candId).filter((a) => a.id !== currentApplicationId);
  }, [candidateId, currentApplicationId]);

  if (!apps.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Other Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">No other applications found for this candidate.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Other Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {apps.map((a) => {
            const job = mockJobsData.find((j) => j.id === a.jobId);
            const company = job ? getJobCompany(job.id) : undefined;
            return (
              <li key={a.id} className="flex items-center justify-between border rounded-md p-3 cursor-pointer hover:bg-accent" onClick={() => navigate(`/applicants/${a.id}`)}>
                <div>
                  <div className="font-medium">{a.jobTitle}</div>
                  <div className="text-xs text-muted-foreground">{company?.name || ""}</div>
                </div>
                <Badge variant="outline">{a.stage}</Badge>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};
