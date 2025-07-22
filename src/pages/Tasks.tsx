
import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search, MoreVertical, CheckCircle2, Clock, AlertTriangle, Calendar, User, Link as LinkIcon, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type TaskStatus = 'pending' | 'completed' | 'overdue';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: TaskStatus;
  associatedType: 'job' | 'candidate' | 'company' | 'deal';
  associatedItem: string;
  assignee: {
    name: string;
    avatar?: string;
  };
  hasReminder: boolean;
  createdAt: Date;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review John Doe\'s Portfolio',
    description: 'Review the submitted portfolio and technical samples',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: 'pending',
    associatedType: 'candidate',
    associatedItem: 'John Doe - Senior Developer',
    assignee: { name: 'Sarah Wilson' },
    hasReminder: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    title: 'Schedule Final Interview',
    description: 'Coordinate with team leads for final round interview',
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'overdue',
    associatedType: 'job',
    associatedItem: 'Product Manager Position',
    assignee: { name: 'Mike Chen' },
    hasReminder: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'Update Job Description',
    description: 'Revise requirements based on team feedback',
    dueDate: new Date(),
    status: 'pending',
    associatedType: 'job',
    associatedItem: 'UI/UX Designer Role',
    assignee: { name: 'Lisa Park' },
    hasReminder: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    id: '4',
    title: 'Send Offer Letter',
    description: 'Prepare and send offer letter to selected candidate',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'completed',
    associatedType: 'candidate',
    associatedItem: 'Alice Johnson - Product Manager',
    assignee: { name: 'Sarah Wilson' },
    hasReminder: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    id: '5',
    title: 'Follow up with References',
    description: 'Contact references provided by candidate',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: 'pending',
    associatedType: 'candidate',
    associatedItem: 'Bob Smith - Senior Developer',
    assignee: { name: 'Mike Chen' },
    hasReminder: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
];

type FilterType = 'all' | 'overdue' | 'due-today' | 'completed';

export default function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState(mockTasks);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const filters = [
    { id: 'all', label: 'All', count: tasks.length },
    { id: 'overdue', label: 'Overdue', count: tasks.filter(t => t.status === 'overdue').length },
    { id: 'due-today', label: 'Due Today', count: tasks.filter(t => 
      t.dueDate.toDateString() === new Date().toDateString() && t.status !== 'completed'
    ).length },
    { id: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length }
  ];

  const stats = [
    { 
      label: 'Total Tasks', 
      value: tasks.length, 
      icon: CheckCircle2, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50' 
    },
    { 
      label: 'Overdue', 
      value: tasks.filter(t => t.status === 'overdue').length, 
      icon: AlertTriangle, 
      color: 'text-red-600',
      bgColor: 'bg-red-50' 
    },
    { 
      label: 'Due Today', 
      value: tasks.filter(t => 
        t.dueDate.toDateString() === new Date().toDateString() && t.status !== 'completed'
      ).length, 
      icon: Clock, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50' 
    },
    { 
      label: 'Completed', 
      value: tasks.filter(t => t.status === 'completed').length, 
      icon: CheckCircle2, 
      color: 'text-green-600',
      bgColor: 'bg-green-50' 
    }
  ];

  const applyFilters = (filter: FilterType, search: string) => {
    let filtered = tasks;
    
    // Apply status filter
    switch (filter) {
      case 'overdue':
        filtered = filtered.filter(t => t.status === 'overdue');
        break;
      case 'due-today':
        filtered = filtered.filter(t => 
          t.dueDate.toDateString() === new Date().toDateString() && t.status !== 'completed'
        );
        break;
      case 'completed':
        filtered = filtered.filter(t => t.status === 'completed');
        break;
      default:
        break;
    }
    
    // Apply search
    if (search) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredTasks(filtered);
  };

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    applyFilters(filter, searchQuery);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    applyFilters(currentFilter, search);
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
    applyFilters(currentFilter, searchQuery);
  };

  const handleSelectTask = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(filteredTasks.map(t => t.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleBulkComplete = () => {
    setTasks(prev => prev.map(task => 
      selectedTasks.includes(task.id) ? { ...task, status: 'completed' as TaskStatus } : task
    ));
    setSelectedTasks([]);
    applyFilters(currentFilter, searchQuery);
    toast({
      title: "Tasks Updated",
      description: `${selectedTasks.length} tasks marked as completed.`
    });
  };

  const handleBulkDelete = () => {
    setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
    applyFilters(currentFilter, searchQuery);
    toast({
      title: "Tasks Deleted",
      description: `${selectedTasks.length} tasks have been deleted.`
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    applyFilters(currentFilter, searchQuery);
    setTaskToDelete(null);
    toast({
      title: "Task Deleted",
      description: "The task has been removed."
    });
  };

  const handleCreateTask = () => {
    setIsCreateModalOpen(false);
    toast({
      title: "Task Created",
      description: "Your new task has been added."
    });
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'overdue':
        return 'text-red-600';
      default:
        return 'text-orange-600';
    }
  };

  const formatDueDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <PageContainer
      title="Tasks"
      description="Manage your recruitment tasks and deadlines"
      actionButton={
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Task title" />
              <Textarea placeholder="Description (optional)" />
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" />
                <Input type="time" placeholder="Due time" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Associated with" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job-1">Senior Developer Position</SelectItem>
                  <SelectItem value="candidate-1">John Doe</SelectItem>
                  <SelectItem value="company-1">Tech Corp Inc.</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Wilson</SelectItem>
                  <SelectItem value="mike">Mike Chen</SelectItem>
                  <SelectItem value="lisa">Lisa Park</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTask}>Create Task</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <Button
                key={filter.id}
                variant={currentFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange(filter.id as FilterType)}
                className="text-xs"
              >
                {filter.label} ({filter.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions Bar */}
        {selectedTasks.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleBulkComplete}>
                Mark Completed
              </Button>
              <Button size="sm" variant="outline" onClick={handleBulkDelete}>
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {/* Header */}
          <div className="border-b p-4">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <div className="grid grid-cols-12 gap-4 flex-1 text-sm font-medium text-muted-foreground">
                <div className="col-span-4">Task</div>
                <div className="col-span-2 hidden md:block">Due Date</div>
                <div className="col-span-3 hidden lg:block">Associated</div>
                <div className="col-span-2 hidden sm:block">Assignee</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>
          </div>

          {/* Task Rows */}
          <div className="divide-y">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className={cn(
                  "p-4 hover:bg-muted/30 transition-colors",
                  task.status === 'completed' && "opacity-60"
                )}
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    onCheckedChange={(checked) => handleSelectTask(task.id, checked as boolean)}
                  />
                  
                  <div className="grid grid-cols-12 gap-4 flex-1 items-center">
                    {/* Task Title */}
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={task.status === 'completed'}
                          onCheckedChange={() => toggleTaskComplete(task.id)}
                          className="w-4 h-4"
                        />
                        <div className="min-w-0">
                          <h4 className={cn(
                            "font-medium text-sm",
                            task.status === 'completed' && "line-through text-muted-foreground"
                          )}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="col-span-2 hidden md:block">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className={cn(
                          "text-xs",
                          getStatusColor(task.status)
                        )}>
                          {formatDueDate(task.dueDate)}
                        </span>
                      </div>
                    </div>

                    {/* Associated Item */}
                    <div className="col-span-3 hidden lg:block">
                      <div className="flex items-center gap-1">
                        <LinkIcon className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-blue-600 hover:underline cursor-pointer">
                          {task.associatedItem}
                        </span>
                      </div>
                    </div>

                    {/* Assignee */}
                    <div className="col-span-2 hidden sm:block">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {task.assignee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{task.assignee.name}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setTaskToDelete(task.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No tasks found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Task</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this task? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => taskToDelete && handleDeleteTask(taskToDelete)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageContainer>
  );
}
