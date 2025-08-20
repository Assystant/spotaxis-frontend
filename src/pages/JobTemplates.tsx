import React, { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Trash2, 
  Edit, 
  Calendar,
  MapPin,
  Briefcase,
  DollarSign
} from "lucide-react";
import { jobTemplateService, JobTemplate } from "@/services/jobTemplateService";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function JobTemplates() {
  const [templates, setTemplates] = useState<JobTemplate[]>(jobTemplateService.getTemplates());

  const handleDeleteTemplate = (templateId: string, templateName: string) => {
    const success = jobTemplateService.deleteTemplate(templateId);
    if (success) {
      setTemplates(jobTemplateService.getTemplates());
      toast.success(`Template "${templateName}" deleted successfully`);
    } else {
      toast.error("Failed to delete template");
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      "Full-time": "bg-green-100 text-green-800",
      "Part-time": "bg-blue-100 text-blue-800", 
      "Contract": "bg-orange-100 text-orange-800",
      "Remote": "bg-purple-100 text-purple-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <PageContainer title="Job Templates">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Job Templates</h1>
            <p className="text-muted-foreground">
              Manage reusable job templates to speed up job creation
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Template
          </Button>
        </div>

        {templates.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No templates yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first job template to speed up future job postings
              </p>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Template
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Templates ({templates.length})</CardTitle>
              <CardDescription>
                Click on a template to view details or use the actions to manage them
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Job Details</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{template.name}</div>
                          {template.description && (
                            <div className="text-sm text-muted-foreground">
                              {template.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Briefcase className="w-3 h-3" />
                            {template.template.title}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {template.template.location}
                          </div>
                          {template.template.salary && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <DollarSign className="w-3 h-3" />
                              {template.template.salary}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={getTypeColor(template.template.employmentType)}
                        >
                          {template.template.employmentType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDistanceToNow(new Date(template.createdAt), { addSuffix: true })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(template.updatedAt), { addSuffix: true })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: Implement edit functionality
                              toast.info("Edit functionality coming soon");
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Template</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{template.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDeleteTemplate(template.id, template.name)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}