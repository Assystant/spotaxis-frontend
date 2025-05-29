
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageContainer } from "@/components/layout/PageContainer";
import { JobPromotionDialog } from "@/components/jobs/JobPromotionDialog";
import { AddApplicantDialog } from "@/components/applicants/AddApplicantDialog";
import {
  ArrowLeft,
  Edit,
  Copy,
  ChevronDown,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Users,
  Plus,
  Search,
  GraduationCap,
  Briefcase,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "sonner";

const Ats1JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPromoteDialogOpen, setIsPromoteDialogOpen] = useState(false);
  const [isAddApplicantDialogOpen, setIsAddApplicantDialogOpen] = useState(false);
  const [jobStatus, setJobStatus] = useState("Active");

  // Mock job data
  const job = {
    id: id || "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    status: jobStatus,
    description: `We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using modern frontend technologies.

Key Responsibilities:
• Develop and maintain responsive web applications
• Collaborate with designers and backend developers
• Optimize applications for maximum speed and scalability
• Mentor junior developers

Requirements:
• 5+ years of experience with React and TypeScript
• Strong understanding of modern CSS and HTML
• Experience with testing frameworks
• Excellent communication skills`,
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Modern CSS/HTML",
      "Testing frameworks",
      "Team collaboration"
    ]
  };

  // Mock applicants data for the pipeline
  const pipelineStages = [
    {
      id: "applied",
      title: "Applied",
      applicants: [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "+1 (555) 123-4567",
          experience: "5 years",
          skills: ["React", "TypeScript", "Node.js"],
          appliedDate: "2024-01-15"
        },
        {
          id: "2", 
          name: "Sarah Johnson",
          email: "sarah.j@email.com",
          phone: "+1 (555) 987-6543",
          experience: "3 years",
          skills: ["Vue.js", "JavaScript", "CSS"],
          appliedDate: "2024-01-14"
        }
      ]
    },
    {
      id: "screening",
      title: "Screening",
      applicants: [
        {
          id: "3",
          name: "Mike Chen",
          email: "mike.chen@email.com", 
          phone: "+1 (555) 456-7890",
          experience: "7 years",
          skills: ["React", "Angular", "Python"],
          appliedDate: "2024-01-12"
        }
      ]
    },
    {
      id: "interview",
      title: "Interview",
      applicants: [
        {
          id: "4",
          name: "Lisa Anderson",
          email: "lisa.a@email.com",
          phone: "+1 (555) 321-0987", 
          experience: "4 years",
          skills: ["React", "TypeScript", "GraphQL"],
          appliedDate: "2024-01-10"
        }
      ]
    },
    {
      id: "offer",
      title: "Offer",
      applicants: []
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job link copied to clipboard!");
  };

  const handleStatusChange = (newStatus: string) => {
    setJobStatus(newStatus);
    toast.success(`Job status changed to ${newStatus}`);
  };

  const handleEditJob = () => {
    navigate(`/ats1/jobs/${id}/edit`);
  };

  const ApplicantCard = ({ applicant }: { applicant: any }) => (
    <Card className="mb-3 p-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm">{applicant.name}</h4>
          <Badge variant="secondary" className="text-xs">
            {applicant.experience}
          </Badge>
        </div>
        
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail size={10} />
            <span className="truncate">{applicant.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone size={10} />
            <span>{applicant.phone}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {applicant.skills.slice(0, 2).map((skill: string) => (
            <Badge key={skill} variant="outline" className="text-xs px-1 py-0">
              {skill}
            </Badge>
          ))}
          {applicant.skills.length > 2 && (
            <Badge variant="outline" className="text-xs px-1 py-0">
              +{applicant.skills.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
        </div>
      </div>
    </Card>
  );

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/ats1/jobs")}>
            <ArrowLeft size={16} className="mr-2" />
            Back to ATS1 Jobs
          </Button>
        </div>

        {/* Job Header */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building size={16} />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {job.type}
                  </div>
                </div>
              </div>
              <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                {job.status}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <DollarSign size={16} />
                {job.salary}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={16} />
                Posted {job.posted}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleEditJob}>
                <Edit size={16} className="mr-2" />
                Edit
              </Button>
              
              <Button variant="outline" onClick={() => setIsPromoteDialogOpen(true)}>
                Promote Job
              </Button>
              
              <Button variant="outline" onClick={handleCopyLink}>
                <Copy size={16} className="mr-2" />
                Copy Link
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Status <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleStatusChange("Active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("Paused")}>
                    Paused
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("Closed")}>
                    Closed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Applicant Pipeline</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Search size={16} className="mr-2" />
                  Search Candidates
                </Button>
                <Button size="sm" onClick={() => setIsAddApplicantDialogOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Add Applicant
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pipelineStages.map((stage) => (
                <Card key={stage.id} className="h-fit">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium">{stage.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {stage.applicants.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {stage.applicants.map((applicant) => (
                        <ApplicantCard key={applicant.id} applicant={applicant} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {job.description}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Job Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Applicants</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">In Progress</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Offers Extended</span>
                      <span className="font-medium">0</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <JobPromotionDialog 
          open={isPromoteDialogOpen} 
          onOpenChange={setIsPromoteDialogOpen}
        />
        
        <AddApplicantDialog
          open={isAddApplicantDialogOpen}
          onOpenChange={setIsAddApplicantDialogOpen}
        />
      </div>
    </PageContainer>
  );
};

export default Ats1JobDetail;
