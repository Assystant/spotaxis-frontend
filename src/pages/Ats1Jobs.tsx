
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";
import { JobsTable } from "@/components/jobs/JobsTable";
import { KanbanBoard } from "@/components/jobs/KanbanBoard";
import { PageContainer } from "@/components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Ats1Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  return (
    <PageContainer title="ATS1 Jobs">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-1 gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setViewMode("table")}>
                  Table View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("kanban")}>
                  Kanban View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/ats1/jobs/add">
              <Button>
                <Plus size={16} className="mr-2" />
                Add Job
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "table" | "kanban")}>
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="kanban">Kanban View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table" className="space-y-4">
            <JobsTable />
          </TabsContent>
          
          <TabsContent value="kanban" className="space-y-4">
            <KanbanBoard />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Ats1Jobs;
