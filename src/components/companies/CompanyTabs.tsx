import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Globe, MapPin, Users, Plus, Calendar, Mail, Phone, FileText } from "lucide-react";
import { Company } from "@/data/mockAssociations";

interface CompanyTabsProps {
  company: Company;
}

export const CompanyTabs = ({ company }: CompanyTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
        <TabsTrigger value="emails">Emails</TabsTrigger>
        <TabsTrigger value="meetings">Meetings</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Company Info Card */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{company.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{company.location}</span>
                  </div>
                  {company.website && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                  {company.size && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{company.size} employees</span>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <Badge variant="default">{company.industry}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {company.mission && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Mission</h4>
                <p className="text-muted-foreground">{company.mission}</p>
              </div>
            )}
            {company.vision && (
              <div>
                <h4 className="font-medium mb-2">Vision</h4>
                <p className="text-muted-foreground">{company.vision}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Note
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activities" className="space-y-4">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activities</CardTitle>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Activity
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <div className="text-center py-8 text-muted-foreground">
                No activities recorded yet
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="emails" className="space-y-4">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Email Communications</CardTitle>
            <Button size="sm" className="gap-2">
              <Mail className="h-4 w-4" />
              Compose Email
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <div className="text-center py-8 text-muted-foreground">
                No emails found
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="meetings" className="space-y-4">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Meetings</CardTitle>
            <Button size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Meeting
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <div className="text-center py-8 text-muted-foreground">
                No meetings scheduled
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notes" className="space-y-4">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Notes</CardTitle>
            <Button size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              Add Note
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <div className="text-center py-8 text-muted-foreground">
                No notes added yet
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};