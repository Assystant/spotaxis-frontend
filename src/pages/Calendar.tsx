
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar as CalendarIcon, Plus, Bell, ChevronLeft, ChevronRight, Clock, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type CalendarView = 'day' | 'week' | 'month' | 'agenda';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'interview' | 'meeting' | 'deadline' | 'other';
  participants: string[];
  location?: string;
  hasReminder: boolean;
  job?: string;
  candidate?: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Technical Interview - John Doe',
    date: new Date(),
    startTime: '09:00',
    endTime: '10:00',
    type: 'interview',
    participants: ['John Doe', 'Sarah Wilson'],
    location: 'Conference Room A',
    hasReminder: true,
    job: 'Senior Developer',
    candidate: 'John Doe'
  },
  {
    id: '2',
    title: 'Team Standup',
    date: new Date(),
    startTime: '14:00',
    endTime: '14:30',
    type: 'meeting',
    participants: ['Development Team'],
    location: 'Virtual',
    hasReminder: false
  },
  {
    id: '3',
    title: 'Resume Review - Alice Johnson',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    startTime: '11:00',
    endTime: '11:30',
    type: 'interview',
    participants: ['Alice Johnson', 'Mike Chen'],
    hasReminder: true,
    job: 'Product Manager',
    candidate: 'Alice Johnson'
  }
];

export default function Calendar() {
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [filters, setFilters] = useState({
    job: '',
    candidate: '',
    interviewer: ''
  });
  const { toast } = useToast();

  const viewButtons = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'agenda', label: 'Agenda' }
  ];

  const handleCreateEvent = () => {
    setIsCreateModalOpen(false);
    toast({
      title: "Event Created",
      description: "Your event has been added to the calendar."
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDetailOpen(true);
  };

  const EventCard = ({ event, className }: { event: CalendarEvent; className?: string }) => (
    <div
      className={cn(
        "bg-white rounded-2xl p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4",
        event.type === 'interview' && "border-l-blue-500",
        event.type === 'meeting' && "border-l-green-500",
        event.type === 'deadline' && "border-l-red-500",
        event.type === 'other' && "border-l-gray-500",
        className
      )}
      onClick={() => handleEventClick(event)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{event.title}</h4>
          <p className="text-xs text-muted-foreground">
            {event.startTime} - {event.endTime}
          </p>
        </div>
        <div className="flex items-center gap-1 ml-2">
          {event.hasReminder && <Bell className="w-3 h-3 text-muted-foreground" />}
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs">
              {event.participants[0]?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );

  const renderCalendarView = () => {
    switch (currentView) {
      case 'day':
        return (
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <div className="space-y-2">
              {events
                .filter(event => event.date.toDateString() === selectedDate.toDateString())
                .map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>
        );

      case 'agenda':
        return (
          <div className="space-y-4">
            {events
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map(event => (
                <div key={event.id} className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">
                    {event.date.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <EventCard event={event} />
                </div>
              ))}
          </div>
        );

      case 'month':
      default:
        const today = new Date();
        const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        const daysInMonth = [];

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
          daysInMonth.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
        }

        return (
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {daysInMonth.map(date => {
              const dayEvents = events.filter(event => 
                event.date.toDateString() === date.toDateString()
              );
              const isToday = date.toDateString() === today.toDateString();
              
              return (
                <div
                  key={date.getDate()}
                  className={cn(
                    "min-h-[100px] p-1 border border-border",
                    isToday && "bg-primary/5 border-primary/20"
                  )}
                >
                  <div className={cn(
                    "text-sm font-medium mb-1",
                    isToday && "text-primary"
                  )}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className="text-xs p-1 bg-primary/10 rounded truncate cursor-pointer hover:bg-primary/20"
                        onClick={() => handleEventClick(event)}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
    }
  };

  return (
    <PageContainer
      title="Calendar"
      description="Manage interviews, meetings, and deadlines"
      actionButton={
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Event title" />
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" />
                <Input type="time" placeholder="Start time" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" placeholder="End time" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Location or meeting link" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select participants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="sarah">Sarah Wilson</SelectItem>
                  <SelectItem value="mike">Mike Chen</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Header with View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            {viewButtons.map(view => (
              <Button
                key={view.id}
                variant={currentView === view.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView(view.id as CalendarView)}
                className="px-3"
              >
                {view.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <h3 className="font-medium mb-4">Filters</h3>
              <div className="space-y-3">
                <Select value={filters.job} onValueChange={(value) => setFilters(prev => ({ ...prev, job: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="senior-dev">Senior Developer</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                    <SelectItem value="designer">UI/UX Designer</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filters.candidate} onValueChange={(value) => setFilters(prev => ({ ...prev, candidate: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="alice-johnson">Alice Johnson</SelectItem>
                    <SelectItem value="bob-smith">Bob Smith</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filters.interviewer} onValueChange={(value) => setFilters(prev => ({ ...prev, interviewer: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Interviewer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                    <SelectItem value="mike-chen">Mike Chen</SelectItem>
                    <SelectItem value="lisa-park">Lisa Park</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Active Filters */}
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => 
                  value && (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {value}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Calendar Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 shadow-sm border min-h-[600px]">
              {renderCalendarView()}
            </div>
          </div>
        </div>

        {/* Event Detail Sheet */}
        <Sheet open={isEventDetailOpen} onOpenChange={setIsEventDetailOpen}>
          <SheetContent className="w-[400px] sm:w-[540px]">
            {selectedEvent && (
              <>
                <SheetHeader>
                  <SheetTitle>{selectedEvent.title}</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {selectedEvent.date.toLocaleDateString()} at {selectedEvent.startTime} - {selectedEvent.endTime}
                      </p>
                    </div>
                  </div>
                  
                  {selectedEvent.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {selectedEvent.participants.map((participant, idx) => (
                        <Badge key={idx} variant="outline">{participant}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedEvent.hasReminder && (
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <span>Reminder set for 10 minutes before</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </PageContainer>
  );
}
