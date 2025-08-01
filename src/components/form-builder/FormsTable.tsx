import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Filter,
  Edit,
  Copy
} from "lucide-react";
import { FormData, FormType } from "./types";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FormsTableProps {
  forms: FormData[];
  onEdit: (form: FormData) => void;
  onDuplicate: (form: FormData) => void;
}

type SortField = "name" | "type" | "lastModified" | "fieldsCount" | "tags";
type SortOrder = "asc" | "desc" | null;

export const FormsTable = ({ forms, onEdit, onDuplicate }: FormsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<FormType | "all">("all");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc");
      if (sortOrder === "desc") setSortField(null);
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    if (sortOrder === "asc") return <ArrowUp className="ml-2 h-4 w-4" />;
    if (sortOrder === "desc") return <ArrowDown className="ml-2 h-4 w-4" />;
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const filteredAndSortedForms = forms
    .filter((form) => {
      const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || form.type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (!sortField || !sortOrder) return 0;
      
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === "tags") {
        aValue = a.tags.join(", ");
        bValue = b.tags.join(", ");
      }
      
      if (sortField === "lastModified") {
        aValue = new Date(a.lastModified).getTime();
        bValue = new Date(b.lastModified).getTime();
      }
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="p-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={(value: FormType | "all") => setTypeFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Scorecard">Scorecard</SelectItem>
            <SelectItem value="Applicant Form">Applicant Form</SelectItem>
            <SelectItem value="Feedback Form">Feedback Form</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="h-auto p-0 font-medium"
                >
                  Name
                  {getSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("type")}
                  className="h-auto p-0 font-medium"
                >
                  Form Type
                  {getSortIcon("type")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("lastModified")}
                  className="h-auto p-0 font-medium"
                >
                  Last Modified
                  {getSortIcon("lastModified")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("fieldsCount")}
                  className="h-auto p-0 font-medium"
                >
                  Fields Count
                  {getSortIcon("fieldsCount")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("tags")}
                  className="h-auto p-0 font-medium"
                >
                  Tags
                  {getSortIcon("tags")}
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedForms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="text-muted-foreground">
                    {searchTerm || typeFilter !== "all" 
                      ? "No forms match your criteria" 
                      : "No forms created yet"}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedForms.map((form) => (
                <TableRow key={form.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{form.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{form.type}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(form.lastModified)}
                  </TableCell>
                  <TableCell>{form.fieldsCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {form.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          aria-label={`Actions for ${form.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(form)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicate(form)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};