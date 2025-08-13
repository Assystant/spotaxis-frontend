import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockApplicants } from "@/data/mockApplicants";
import { Search } from "lucide-react";

export const ApplicantsTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(mockApplicants);

  useEffect(() => {
    if (!searchTerm) {
      setData(mockApplicants);
    } else {
      const q = searchTerm.toLowerCase();
      setData(
        mockApplicants.filter((a) =>
          [a.name, a.email, a.phone, a.jobTitle, a.stage]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q))
        )
      );
    }
  }, [searchTerm]);

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="p-4">
        <div className="relative">
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
        <Table>
          <TableCaption>Applicants in your pipeline</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((a) => (
              <TableRow key={a.id} className="cursor-pointer" onClick={() => navigate(`/applicants/${a.id}`)}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell className="truncate max-w-[240px]">{a.email}</TableCell>
                <TableCell>{a.phone}</TableCell>
                <TableCell>{a.stage}</TableCell>
                <TableCell>{new Date(a.appliedDate).toLocaleDateString()}</TableCell>
                <TableCell>{a.jobTitle || "—"}</TableCell>
                <TableCell>{a.source || "—"}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">No applicants found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
