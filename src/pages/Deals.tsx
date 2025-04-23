import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download, Upload, Search, MoreHorizontal, DollarSign, Calendar, Building2, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { KanbanBoard } from "@/components/jobs/KanbanBoard";

const mockDeals = [
  {
    id: "1",
    title: "Enterprise Software License",
    company: "Acme Inc.",
    contactName: "John Smith",
    value: 75000,
    currency: "USD",
    stage: "Proposal",
    progress: 40,
    probability: 60,
    closeDate: "2023-07-15",
    createdDate: "2023-04-10"
  },
  {
    id: "2",
    title: "IT Staffing Project",
    company: "TechCorp",
    contactName: "Sarah Johnson",
    value: 120000,
    currency: "USD",
    stage: "Negotiation",
    progress: 70,
    probability: 80,
    closeDate: "2023-06-30",
    createdDate: "2023-03-22"
  },
  {
    id: "3",
    title: "Recruitment Services",
    company: "Global Solutions",
    contactName: "Michael Chen",
    value: 45000,
    currency: "USD",
    stage: "Discovery",
    progress: 20,
    probability: 40,
    closeDate: "2023-08-10",
    createdDate: "2023-05-05"
  },
  {
    id: "4",
    title: "Contract Placement",
    company: "Startup Hub",
    contactName: "Emily Rodriguez",
    value: 30000,
    currency: "USD",
    stage: "Closed Won",
    progress: 100,
    probability: 100,
    closeDate: "2023-05-01",
    createdDate: "2023-02-15"
  },
  {
    id: "5",
    title: "Executive Search Package",
    company: "Enterprise Ltd.",
    contactName: "David Wilson",
    value: 200000,
    currency: "USD",
    stage: "Qualification",
    progress: 30,
    probability: 50,
    closeDate: "2023-09-22",
    createdDate: "2023-05-01"
  }
];

const dealStages = [
  { id: "discovery", name: "Discovery", color: "bg-blue-100 text-blue-800" },
  { id: "qualification", name: "Qualification", color: "bg-purple-100 text-purple-800" },
  { id: "proposal", name: "Proposal", color: "bg-amber-100 text-amber-800" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-100 text-orange-800" },
  { id: "closed-won", name: "Closed Won", color: "bg-green-100 text-green-800" },
  { id: "closed-lost", name: "Closed Lost", color: "bg-red-100 text-red-800" }
];

const formattedDealStages = dealStages.map((stage, idx) => ({
  id: stage.id,
  name: stage.name,
  color: stage.color.replace("text-", "").replace("bg-", "bg-"),
  order: idx,
}));

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeals = mockDeals.filter((deal) =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dealsByStage = dealStages.reduce((acc, stage) => {
    acc[stage.id] = filteredDeals.filter(
      (deal) => deal.stage.toLowerCase().replace(' ', '-') === stage.id
    );
    return acc;
  }, {} as Record<string, typeof mockDeals>);

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <PageContainer
      title="Deals"
      description="Manage your sales pipeline and revenue opportunities"
      actionButton={
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add Deal
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pipeline Value</p>
                <h3 className="text-2xl font-semibold mt-1">$470,000</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">12% increase from last month</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Won Deals (YTD)</p>
                <h3 className="text-2xl font-semibold mt-1">$230,000</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">3 deals closed this quarter</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                <h3 className="text-2xl font-semibold mt-1">15</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">5 closing this month</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deals..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Upload className="h-4 w-4" />
              Import
            </Button>
          </div>
        </div>
      </div>

      <Card className="border shadow-sm">
        <Tabs defaultValue="list">
          <div className="border-b px-4">
            <TabsList className="ml-1 my-1">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="kanban">Kanban View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list" className="p-0">
            <div className="rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deal</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Close Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{deal.title}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <User2 className="h-3 w-3" />
                            {deal.contactName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {deal.company}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          deal.stage === 'Closed Won' ? 'bg-green-100 text-green-800' :
                          deal.stage === 'Closed Lost' ? 'bg-red-100 text-red-800' :
                          deal.stage === 'Negotiation' ? 'bg-orange-100 text-orange-800' :
                          deal.stage === 'Proposal' ? 'bg-amber-100 text-amber-800' :
                          deal.stage === 'Qualification' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }>
                          {deal.stage}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(deal.value, deal.currency)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(deal.closeDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={deal.progress} className="h-2" />
                          <div className="text-xs text-muted-foreground text-right">
                            {deal.probability}% probability
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Deal</DropdownMenuItem>
                            <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                            <DropdownMenuItem>Update Stage</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete Deal
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="kanban" className="p-4">
            <KanbanBoard
              stages={formattedDealStages}
              items={filteredDeals.map((deal) => ({
                ...deal,
                stage: deal.stage.toLowerCase().replace(' ', '-'),
              }))}
              entityType="deal"
            />
          </TabsContent>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default Deals;
