import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, Users, Eye, Clock, Target } from "lucide-react";
import { Job } from "@/data/mockAssociations";

interface JobAnalyticsTabProps {
  job: Job;
}

// Mock analytics data
const applicationFunnelData = [
  { stage: "Views", count: 1500, percentage: 100 },
  { stage: "Applications", count: 85, percentage: 5.7 },
  { stage: "Screening", count: 45, percentage: 52.9 },
  { stage: "Interview", count: 22, percentage: 48.9 },
  { stage: "Offer", count: 8, percentage: 36.4 },
  { stage: "Hired", count: 6, percentage: 75.0 }
];

const applicationSourceData = [
  { name: "LinkedIn", value: 35, color: "#0077B5" },
  { name: "Indeed", value: 25, color: "#2164F3" },
  { name: "Company Website", value: 20, color: "#059669" },
  { name: "Referral", value: 15, color: "#DC2626" },
  { name: "Other", value: 5, color: "#6B7280" }
];

const weeklyApplicationsData = [
  { week: "Week 1", applications: 12 },
  { week: "Week 2", applications: 18 },
  { week: "Week 3", applications: 25 },
  { week: "Week 4", applications: 22 },
  { week: "Week 5", applications: 8 }
];

const COLORS = ['#0077B5', '#2164F3', '#059669', '#DC2626', '#6B7280'];

export const JobAnalyticsTab = ({ job }: JobAnalyticsTabProps) => {
  
  return (
    <Card className="shadow-none rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Job Performance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Eye className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-semibold">1,500</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-semibold">85</div>
            <div className="text-sm text-muted-foreground">Applications</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-semibold">5.7%</div>
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-semibold">14</div>
            <div className="text-sm text-muted-foreground">Avg. Days to Hire</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-semibold">6</div>
            <div className="text-sm text-muted-foreground">Hired</div>
          </div>
        </div>

        {/* Application Funnel Chart */}
        <div className="space-y-4">
          <h3 className="font-semibold">Application Funnel</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationFunnelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'count' ? `${value} candidates` : `${value}%`,
                    name === 'count' ? 'Count' : 'Conversion Rate'
                  ]}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Sources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Application Sources</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {applicationSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value} applications`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Applications Trend */}
          <div className="space-y-4">
            <h3 className="font-semibold">Weekly Applications</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyApplicationsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${value} applications`, 'Applications']} />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Table */}
        <div className="space-y-4">
          <h3 className="font-semibold">Stage Conversion Details</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Stage</th>
                  <th className="text-right p-3 font-medium">Count</th>
                  <th className="text-right p-3 font-medium">Conversion Rate</th>
                  <th className="text-right p-3 font-medium">Drop-off</th>
                </tr>
              </thead>
              <tbody>
                {applicationFunnelData.map((stage, index) => {
                  const previousStage = applicationFunnelData[index - 1];
                  const dropOff = previousStage ? previousStage.count - stage.count : 0;
                  
                  return (
                    <tr key={stage.stage} className="border-t">
                      <td className="p-3 font-medium">{stage.stage}</td>
                      <td className="p-3 text-right">{stage.count}</td>
                      <td className="p-3 text-right">{stage.percentage.toFixed(1)}%</td>
                      <td className="p-3 text-right">{index > 0 ? dropOff : '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};