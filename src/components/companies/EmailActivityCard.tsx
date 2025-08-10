import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp, Paperclip, Users } from "lucide-react";
import { Activity } from "@/data/mockActivities";
import { formatDistanceToNow } from "date-fns";

interface EmailActivityCardProps {
  activity: Activity;
}

export const EmailActivityCard = ({ activity }: EmailActivityCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) =>
    formatDistanceToNow(new Date(dateString), { addSuffix: true });

  const statusVariant = (status?: string) => {
    switch (status) {
      case "completed":
        return "default" as const;
      case "pending":
        return "secondary" as const;
      case "scheduled":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  };

  const meta = activity.metadata || {};

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-medium leading-tight">
              {meta.subject || activity.title}
            </CardTitle>
            {activity.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {activity.description}
              </p>
            )}
          </div>
          {activity.status && (
            <Badge variant={statusVariant(activity.status)} className="ml-2 text-xs">
              {activity.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(activity.date)}</span>
          </div>

          {(activity.participants && activity.participants.length > 0) || meta.from ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>
                {meta.from ? `${meta.from.name} <${meta.from.email}>` : activity.participants?.join(", ")}
              </span>
            </div>
          ) : null}

          {Array.isArray(meta.attachments) && meta.attachments.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Paperclip className="h-3 w-3" />
              <span>{meta.attachments.length} attachment{meta.attachments.length > 1 ? "s" : ""}</span>
            </div>
          )}

          <div className="pt-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setExpanded((e) => !e)}>
              {expanded ? (
                <>
                  Hide details <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  View details <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {expanded && (
            <div className="mt-3 space-y-3">
              <div className="text-xs text-muted-foreground">
                <div><span className="font-medium">From:</span> {meta.from ? `${meta.from.name} <${meta.from.email}>` : ""}</div>
                {Array.isArray(meta.to) && meta.to.length > 0 && (
                  <div><span className="font-medium">To:</span> {meta.to.map((p: any) => `${p.name} <${p.email}>`).join(", ")}</div>
                )}
                {Array.isArray(meta.cc) && meta.cc.length > 0 && (
                  <div><span className="font-medium">CC:</span> {meta.cc.map((p: any) => `${p.name} <${p.email}>`).join(", ")}</div>
                )}
              </div>

              {meta.bodyHtml && (
                <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: meta.bodyHtml }} />
              )}

              {Array.isArray(meta.attachments) && meta.attachments.length > 0 && (
                <div>
                  <div className="text-xs font-medium mb-1">Attachments</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {meta.attachments.map((att: any, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Paperclip className="h-3 w-3" />
                        <span>{att.name}</span>
                        <span className="ml-auto">{att.size}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};