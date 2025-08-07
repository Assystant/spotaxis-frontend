import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Tag } from "lucide-react";
import { Activity } from "@/data/mockActivities";
import { formatDistanceToNow } from "date-fns";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const getStatusBadgeVariant = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'scheduled':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium leading-tight">
            {activity.title}
          </CardTitle>
          {activity.status && (
            <Badge variant={getStatusBadgeVariant(activity.status)} className="ml-2 text-xs">
              {activity.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {activity.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {activity.description}
          </p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(activity.date)}</span>
          </div>
          
          {activity.participants && activity.participants.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{activity.participants.join(', ')}</span>
            </div>
          )}
          
          {activity.metadata?.duration && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{activity.metadata.duration}</span>
            </div>
          )}
          
          {activity.metadata?.tags && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              <div className="flex gap-1">
                {activity.metadata.tags.slice(0, 2).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                    {tag}
                  </Badge>
                ))}
                {activity.metadata.tags.length > 2 && (
                  <span className="text-xs">+{activity.metadata.tags.length - 2} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};