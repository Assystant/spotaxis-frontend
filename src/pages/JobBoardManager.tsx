
import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Globe, Plus, Upload, Layout, LayoutGrid } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const JobBoardManager = () => {
  const [activeTab, setActiveTab] = useState("job-boards");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [templateType, setTemplateType] = useState<"template" | "upload" | null>(null);
  
  const jobBoards = [
    { id: 1, name: "Main Career Site", url: "careers.example.com", type: "Multi-page", status: "Active" },
    { id: 2, name: "Engineering Jobs", url: "engineering.example.com", type: "One-page", status: "Active" }
  ];
  
  const websites = [
    { id: 1, name: "Company Website", url: "www.example.com", type: "Multi-page", status: "Active" },
    { id: 2, name: "Product Landing Page", url: "product.example.com", type: "One-page", status: "Draft" }
  ];
  
  const templates = [
    { id: 1, name: "Modern Career Site", type: "job-board", pages: "Multi-page" },
    { id: 2, name: "Tech Startup", type: "job-board", pages: "One-page" },
    { id: 3, name: "Corporate Site", type: "website", pages: "Multi-page" },
    { id: 4, name: "Product Landing", type: "website", pages: "One-page" }
  ];
  
  const handleCreateWebsite = (type: "template" | "upload") => {
    setTemplateType(type);
    setCreateDialogOpen(true);
  };
  
  return (
    <PageContainer title="Job Board Manager">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="job-boards" className="px-6">Job Boards</TabsTrigger>
            <TabsTrigger value="websites" className="px-6">Websites</TabsTrigger>
          </TabsList>
          
          <div>
            {activeTab === "job-boards" && (
              <Button className="gap-2">
                <Plus size={16} /> Create Job Board
              </Button>
            )}
            
            {activeTab === "websites" && (
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={() => handleCreateWebsite("upload")}>
                  <Upload size={16} /> Upload Website
                </Button>
                <Button className="gap-2" onClick={() => handleCreateWebsite("template")}>
                  <Plus size={16} /> Create Website
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <TabsContent value="job-boards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Job Board</h3>
              <p className="text-muted-foreground mb-4">
                Build a custom career site to showcase your job openings and company culture.
              </p>
              <Button className="w-full gap-2">
                <Plus size={16} /> Create Job Board
              </Button>
            </Card>
            
            {jobBoards.map(board => (
              <Card key={board.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Layout className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-1">{board.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{board.url}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{board.type}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{board.status}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1">Preview</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="websites">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <LayoutGrid className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Website</h3>
              <p className="text-muted-foreground mb-4">
                Build a custom website using templates or upload your own design.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleCreateWebsite("upload")}>
                  <Upload size={16} /> Upload
                </Button>
                <Button className="flex-1 gap-2" onClick={() => handleCreateWebsite("template")}>
                  <Plus size={16} /> Create
                </Button>
              </div>
            </Card>
            
            {websites.map(site => (
              <Card key={site.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-1">{site.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{site.url}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{site.type}</span>
                  <span className={`text-xs ${site.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} px-2 py-1 rounded-full`}>{site.status}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1">Preview</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Template Selection Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {templateType === "template" ? "Choose a Website Template" : "Upload Website"}
            </DialogTitle>
          </DialogHeader>
          
          {templateType === "template" ? (
            <div className="py-4">
              <div className="mb-6">
                <Input placeholder="Search templates..." className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map(template => (
                    <Card key={template.id} className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
                      <div className="h-32 bg-muted flex items-center justify-center">
                        {template.type === "job-board" ? (
                          <Layout size={32} className="text-muted-foreground" />
                        ) : (
                          <Globe size={32} className="text-muted-foreground" />
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">{template.name}</h4>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{template.pages}</span>
                          <span className="text-xs text-primary">{template.type === "job-board" ? "Job Board" : "Website"}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Select Template</Button>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-12 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Drop your files here</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  or browse to upload
                </p>
                <Button className="mt-4">Upload Files</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default JobBoardManager;
