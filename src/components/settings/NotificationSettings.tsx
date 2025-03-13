
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Mail, Bell, MessageSquare } from "lucide-react";

// Mock data for notification events
const notificationEvents = {
  system: [
    { id: 1, name: "New user registration", email: true, push: true, inApp: true },
    { id: 2, name: "Password reset", email: true, push: false, inApp: true },
    { id: 3, name: "System maintenance", email: true, push: true, inApp: true },
    { id: 4, name: "Account lockout", email: true, push: true, inApp: true }
  ],
  jobs: [
    { id: 1, name: "New job posting", email: true, push: true, inApp: true },
    { id: 2, name: "Job application submitted", email: true, push: true, inApp: true },
    { id: 3, name: "Job posting expired", email: true, push: false, inApp: true },
    { id: 4, name: "Job posting edited", email: false, push: false, inApp: true }
  ],
  crm: [
    { id: 1, name: "New contact created", email: false, push: false, inApp: true },
    { id: 2, name: "Deal stage changed", email: true, push: true, inApp: true },
    { id: 3, name: "Deal closed", email: true, push: true, inApp: true },
    { id: 4, name: "Task due date approaching", email: true, push: true, inApp: true }
  ]
};

// Notification channels
const channels = [
  { id: "email", name: "Email", icon: Mail },
  { id: "push", name: "Push Notifications", icon: Bell },
  { id: "inApp", name: "In-App Notifications", icon: MessageSquare }
];

export const NotificationSettings = () => {
  const [selectedTab, setSelectedTab] = useState("system");
  const [events, setEvents] = useState(notificationEvents);

  const toggleNotification = (category: string, eventId: number, channel: string) => {
    setEvents({
      ...events,
      [category]: events[category as keyof typeof events].map(event => 
        event.id === eventId 
          ? { ...event, [channel]: !event[channel as keyof typeof event] } 
          : event
      )
    });
  };

  const enableAllForChannel = (category: string, channel: string) => {
    setEvents({
      ...events,
      [category]: events[category as keyof typeof events].map(event => 
        ({ ...event, [channel]: true })
      )
    });
  };

  const disableAllForChannel = (category: string, channel: string) => {
    setEvents({
      ...events,
      [category]: events[category as keyof typeof events].map(event => 
        ({ ...event, [channel]: false })
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <Button size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
        </TabsList>

        {Object.keys(events).map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-end gap-2 mb-4">
                  {channels.map(channel => (
                    <div key={channel.id} className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => enableAllForChannel(category, channel.id)}
                        className="h-8 text-xs"
                      >
                        Enable all {channel.name}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => disableAllForChannel(category, channel.id)}
                        className="h-8 text-xs"
                      >
                        Disable all {channel.name}
                      </Button>
                    </div>
                  ))}
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      {channels.map(channel => (
                        <TableHead key={channel.id} className="text-center">
                          <div className="flex items-center justify-center">
                            <channel.icon className="h-4 w-4 mr-2" />
                            {channel.name}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events[category as keyof typeof events].map(event => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        {channels.map(channel => (
                          <TableCell key={channel.id} className="text-center">
                            <Switch
                              checked={event[channel.id as keyof typeof event] as boolean}
                              onCheckedChange={() => toggleNotification(category, event.id, channel.id)}
                              className="mx-auto"
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
