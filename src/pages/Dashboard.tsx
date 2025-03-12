
import { PageContainer } from "@/components/layout/PageContainer";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, Star, Users } from "lucide-react";

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1000 },
];

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard">
      <div className="space-y-8">
        <DashboardStats />
        
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2 p-6 shadow-subtle">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Applicants Overview</h3>
                <p className="text-muted-foreground text-sm">Applications received over time</p>
              </div>
              <select className="bg-muted px-3 py-1.5 rounded-md text-sm border-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card className="p-6 shadow-subtle flex flex-col">
            <h3 className="text-lg font-semibold mb-6">Top Talent</h3>
            
            <div className="space-y-4 flex-1">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-muted/70 flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="font-medium truncate">John Smith</p>
                      <div className="flex ml-2">
                        {[...Array(index + 2)].map((_, i) => (
                          <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">Senior Developer</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 text-sm text-primary font-medium flex items-center justify-center gap-1.5 hover:gap-2.5 transition-all">
              View all talent <ArrowRight size={14} />
            </button>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6 shadow-subtle">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="text-sm"><span className="font-medium">John Doe</span> applied for <span className="font-medium">Senior Developer</span></p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 shadow-subtle">
            <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex gap-4 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer">
                  <div className="bg-primary/10 rounded-md p-2.5 flex-shrink-0 text-primary">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="font-medium">Interview with Jane Smith</p>
                    <p className="text-xs text-muted-foreground">Today, 2:00 PM • UI/UX Designer</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
