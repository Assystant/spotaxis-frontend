import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Calendar, 
  Download, 
  Clock, 
  MessageSquare, 
  Edit3,
  Briefcase,
  Tag,
  ChevronsRight,
  SendHorizontal,
  ArrowLeft,
  Paperclip
} from "lucide-react";
import { mockApplicants } from "@/data/mockApplicants";
import { EmailThread } from "@/components/email/EmailThread";
import { ComposeEmail } from "@/components/email/ComposeEmail";

interface ApplicantDetailProps {
  id: string;
}

export const ApplicantDetail = ({ id }: ApplicantDetailProps) => {
  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const applicantData = mockApplicants.find(a => a.id === id);
    setApplicant(applicantData);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6 flex items-center justify-center h-full">
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!applicant) {
    return (
      <Card className="h-full">
        <CardContent className="p-6 flex items-center justify-center h-full">
          <p>Applicant not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 p-4 rounded-2xl shadow-md bg-card border">{/* Removed Card wrapper for page layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{applicant.name}</h1>
          <p className="text-muted-foreground">{applicant.jobTitle || "Multiple Positions"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit3 size={14} className="mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <ChevronsRight size={14} className="mr-1" />
            Move Stage
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <Tabs defaultValue="profile" className="w-full">
          <div className="border-b mb-6">
            <TabsList className="justify-start">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium text-lg">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <Mail size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div>{applicant.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <Phone size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <div>{applicant.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <MapPin size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div>{applicant.location || "Not specified"}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <Calendar size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Applied Date</div>
                        <div>{new Date(applicant.appliedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-4 mt-4">
                  <h3 className="font-medium text-lg">Skills & Experience</h3>
                  <div>
                    <div className="mb-2 font-medium">Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {applicant.skills?.map((skill: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-slate-100 rounded-md text-sm"
                        >
                          {skill}
                        </span>
                      )) || "No skills listed"}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-medium">Experience</div>
                    <div className="space-y-3">
                      {applicant.experience && applicant.experience.length > 0 ? (
                        applicant.experience.map((exp: any, index: number) => (
                          <div key={index} className="border-l-2 border-primary/20 pl-4">
                            <div className="font-medium">{exp.title}</div>
                            <div className="text-sm">{exp.company}</div>
                            <div className="text-sm text-muted-foreground">
                              {exp.start} - {exp.end || "Present"}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No experience listed</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1">
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium text-lg">Application Details</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Stage</div>
                      <div className="font-medium">{applicant.stage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Applied For</div>
                      <div className="font-medium">{applicant.jobTitle || "Multiple Positions"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Source</div>
                      <div className="font-medium">{applicant.source || "Direct"}</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full gap-2">
                      <FileText size={14} />
                      Download Resume
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-4 mt-4">
                  <h3 className="font-medium text-lg">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {applicant.tags?.map((tag: string, index: number) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    )) || "No tags"}
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 mt-2">
                    <Tag size={14} />
                    Add Tags
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resume">
            <div className="border rounded-lg p-6 text-center">
              <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Resume Preview</h3>
              <p className="text-muted-foreground mb-4">
                Preview and download the applicant's resume
              </p>
              <Button className="gap-2">
                <Download size={14} />
                Download Resume
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-4">Notes</h3>
              <div className="space-y-4">
                {applicant.notes?.map((note: any, index: number) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{note.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(note.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-2">{note.content}</p>
                  </div>
                )) || (
                  <div className="text-center p-6 text-muted-foreground">
                    No notes have been added yet
                  </div>
                )}
              </div>
              <Button className="w-full mt-4 gap-2">
                <MessageSquare size={14} />
                Add Note
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-4">Activity History</h3>
              <div className="space-y-4">
                {applicant.activity?.map((activity: any, index: number) => (
                  <div key={index} className="flex gap-3 border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="bg-primary/10 p-2 h-fit rounded">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">{activity.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.date).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center p-6 text-muted-foreground">
                    No activity recorded yet
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="emails">
            {isComposing ? (
              <ComposeEmail 
                recipient={applicant}
                onCancel={() => setIsComposing(false)}
                onSend={() => {
                  setIsComposing(false);
                  // In a real app, this would trigger an API call to send the email
                }}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Email Communication</h3>
                  <Button 
                    onClick={() => setIsComposing(true)}
                    className="gap-2"
                  >
                    <Mail size={14} />
                    Compose Email
                  </Button>
                </div>
                
                <EmailThread applicantId={applicant.id} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
