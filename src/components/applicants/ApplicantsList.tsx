
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { mockApplicants } from "@/data/mockApplicants";

export const ApplicantsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [applicants, setApplicants] = useState(mockApplicants);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = mockApplicants.filter(
        app => 
          app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setApplicants(filtered);
    } else {
      setApplicants(mockApplicants);
    }
  }, [searchTerm]);

  const handleApplicantClick = (applicantId: string) => {
    navigate(`/applicants/${applicantId}`);
  };

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Applicants</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applicants..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleApplicantClick(applicant.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full rounded-full text-sm">
                      {applicant.name.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="font-medium">{applicant.name}</div>
                    <div className="text-sm text-muted-foreground truncate">{applicant.email}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {applicant.stage}
                    </span>
                    <div className="text-xs text-muted-foreground">
                      {new Date(applicant.appliedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Applied for: <span className="font-medium">{applicant.jobTitle || "Multiple Positions"}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No applicants found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
