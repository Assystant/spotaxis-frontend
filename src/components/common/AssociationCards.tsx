import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Building, DollarSign, Plus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssociationCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  records: Array<{
    id: string;
    name: string;
    subtitle?: string;
    route: string;
  }>;
  onAdd?: () => void;
  color?: string;
}

const AssociationCard = ({ title, icon: Icon, count, records, onAdd, color = "primary" }: AssociationCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="rounded-lg shadow-none">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-${color}/10`}>
              <Icon className={`h-4 w-4 text-${color}`} />
            </div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {count}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          {records.length > 0 ? (
            <>
              {records.slice(0, 3).map((record) => (
                <div 
                  key={record.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => navigate(record.route)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{record.name}</div>
                    {record.subtitle && (
                      <div className="text-xs text-muted-foreground truncate">{record.subtitle}</div>
                    )}
                  </div>
                  <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-2" />
                </div>
              ))}
              {records.length > 3 && (
                <div className="text-center pt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View all {count} {title.toLowerCase()}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No {title.toLowerCase()} linked
            </div>
          )}
          {onAdd && (
            <div className="pt-2 border-t">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Plus className="h-3 w-3" />
                Add {title.slice(0, -1)}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface AssociationCardsProps {
  title: string;
  associations: Array<{
    id: string;
    title: string;
    records: Array<{
      id: string;
      name: string;
      subtitle?: string;
      route: string;
    }>;
    onAdd?: () => void;
  }>;
  className?: string;
}

export const AssociationCards = ({ title, associations, className }: AssociationCardsProps) => {
  const getIconAndColor = (associationType: string) => {
    switch (associationType.toLowerCase()) {
      case 'jobs':
        return { icon: Briefcase, color: 'blue' };
      case 'contacts':
      case 'client contacts':
        return { icon: Users, color: 'green' };
      case 'candidates':
        return { icon: Users, color: 'purple' };
      case 'companies':
        return { icon: Building, color: 'orange' };
      case 'deals':
        return { icon: DollarSign, color: 'emerald' };
      case 'applications':
        return { icon: Briefcase, color: 'indigo' };
      default:
        return { icon: Users, color: 'gray' };
    }
  };

  return (
    <div className={className}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-center">{title}</h2>
      </div>
      <div className="space-y-4">
        {associations.map((association) => {
          const { icon, color } = getIconAndColor(association.title);
          return (
            <AssociationCard
              key={association.id}
              title={association.title}
              icon={icon}
              count={association.records.length}
              records={association.records}
              onAdd={association.onAdd}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
};