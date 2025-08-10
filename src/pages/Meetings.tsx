import React, { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Users } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO
  attendees?: string[];
}

const Meetings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: "m1", title: "Kickoff with Globex", date: new Date(Date.now() + 86400000).toISOString(), attendees: ["alice@globex.com"] },
  ]);
  const [form, setForm] = useState<Partial<Meeting>>({});

  useEffect(() => {
    document.title = "Meetings | Schedule & track";
  }, []);

  const create = () => {
    if (!form.title) return;
    const entry: Meeting = {
      id: `mtg_${Date.now()}`,
      title: form.title!,
      description: form.description || "",
      date: form.date || new Date().toISOString(),
      attendees: form.attendees || [],
    };
    setMeetings([entry, ...meetings]);
    setOpen(false);
    setForm({});
  };

  return (
    <PageContainer title="Meetings" description="Plan and track meetings">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">Lightweight placeholder you can build on later.</div>
        <Button onClick={() => setOpen(true)}>Schedule meeting</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {meetings.length === 0 && (
            <div className="text-sm text-muted-foreground">No meetings yet.</div>
          )}
          {meetings.map((m) => (
            <div key={m.id} className="p-3 border rounded-md">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <div className="font-medium">{m.title}</div>
                <div className="ml-auto text-xs text-muted-foreground">{new Date(m.date).toLocaleString()}</div>
              </div>
              {m.description && <div className="mt-1 text-sm text-muted-foreground">{m.description}</div>}
              {m.attendees && m.attendees.length > 0 && (
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" /> {m.attendees.join(", ")}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule meeting</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Title</label>
              <Input className="h-9 mt-1" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Date & time</label>
              <Input type="datetime-local" className="h-9 mt-1" onChange={(e) => setForm({ ...form, date: new Date(e.target.value).toISOString() })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Description</label>
              <Textarea className="mt-1" rows={4} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Attendees (comma separated)</label>
              <Input className="h-9 mt-1" value={(form.attendees || []).join(", ")}
                onChange={(e) => setForm({ ...form, attendees: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={create} disabled={!form.title}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Meetings;
