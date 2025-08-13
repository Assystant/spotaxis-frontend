import React, { useEffect, useMemo, useState } from 'react';
import { useActivityTypes, type SavedList, type ListFilter } from '@/contexts/ActivityTypesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { Plus } from 'lucide-react';

const ListRow = ({ list }: { list: SavedList }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{list.name}</TableCell>
      <TableCell className="capitalize">{list.type}</TableCell>
      <TableCell className="capitalize">{list.filter}</TableCell>
    </TableRow>
  );
};

export default function Lists() {
  const { lists, addList } = useActivityTypes();
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');

  useEffect(() => {
    document.title = 'Lists | ATS';
    // Basic SEO meta description update
    const meta = document.querySelector('meta[name="description"]');
    const content = 'Central lists hub for jobs and applications. Create and manage ATS lists.';
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  const jobLists = useMemo(() => lists.filter((l) => l.type === 'jobs'), [lists]);
  const applicationLists = useMemo(() => lists.filter((l) => l.type === 'applications'), [lists]);

  const handleCreate = (type: 'jobs' | 'applications') => {
    const name = window.prompt(`Name your ${type === 'jobs' ? 'job' : 'application'} list`);
    if (!name) return;
    const filterInput = window.prompt('Filter (all or active)?', 'all');
    const filter = (filterInput === 'active' ? 'active' : 'all') as ListFilter;
    addList(type, name.trim(), filter);
  };

  const renderTable = (data: SavedList[]) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{activeTab === 'jobs' ? 'Job Lists' : 'Application Lists'}</CardTitle>
        <Button size="sm" onClick={() => handleCreate(activeTab)}>
          <Plus className="h-4 w-4 mr-2" /> Create list
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Filter</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((list) => (
                <ListRow key={list.id} list={list} />
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No lists yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lists</h1>
      </header>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'jobs' | 'applications')}>
        <TabsList>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs">{renderTable(jobLists)}</TabsContent>
        <TabsContent value="applications">{renderTable(applicationLists)}</TabsContent>
      </Tabs>

      <section>
        <p className="text-sm text-muted-foreground">
          These lists are shared across the ATS. They also appear in Companies → Manage Activity Types when adding Related Jobs or Related Applications tabs.
        </p>
      </section>
    </main>
  );
}
