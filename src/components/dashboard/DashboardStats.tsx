
import { ArrowUpRight, ArrowDownRight, Users, Briefcase, BuildingIcon, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
};

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="p-6 rounded-xl bg-white border border-border shadow-subtle hover:shadow-glass transition-all duration-300 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-md bg-secondary/50">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className={cn(
          "flex items-center text-xs font-medium rounded-full px-2 py-1",
          isPositive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
};

export const DashboardStats = () => {
  const stats = [
    { title: "Total Applicants", value: "1,234", change: 12, icon: Users },
    { title: "Open Jobs", value: "42", change: 8, icon: Briefcase },
    { title: "Companies", value: "86", change: -3, icon: BuildingIcon },
    { title: "Revenue", value: "$32,450", change: 24, icon: DollarSign },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};
