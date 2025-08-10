import React, { useEffect, useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Phone, FileText, CalendarDays, Tag } from "lucide-react";

interface LogEntry {
  id: string;
  type: "call" | "note" | "meeting" | "other";
  title: string;
  description?: string;
  createdAt: string; // ISO
  tags?: string[];
}

const loadLogs = (): LogEntry[] => {
  try {
    const raw = localStorage.getItem("logsData");
    if (raw) return JSON.parse(raw);
  } catch {}
  // sample
  return [
    {
      id: "l1",
      type: "call",
      title: "Intro call with ACME",
      description: "Discussed requirements and next steps.",
      createdAt: new Date().toISOString(),
      tags: ["acme", "sales"],
    },
    {
      id: "l2",
      type: "note",
      title: "Website feedback",
      description: "Client liked the new pricing page.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
};

const saveLogs = (logs: LogEntry[]) => {
  try {
    localStorage.setItem("logsData", JSON.stringify(logs));
  } catch {}
};

const typeBadge = (t: LogEntry["type"]) => {
  switch (t) {
    case "call":
      return <Badge variant="secondary" className="gap-1"><Phone className="h-3 w-3" /> Call</Badge>;
    case "meeting":
      return <Badge variant="secondary" className="gap-1"><CalendarDays className="h-3 w-3" /> Meeting</Badge>;
    case "note":
      return <Badge variant="outline" className="gap-1"><FileText className="h-3 w-3" /> Note</Badge>;
    default:
      return <Badge variant="outline">Other</Badge>;
  }
};

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(loadLogs());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<Partial<LogEntry>>({ type: "call" });
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Logs | Communications";
  }, []);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  const handleCreate = () => {
    if (!form.title || !form.type) return;
    const entry: LogEntry = {
      id: `log_${Date.now()}`,
      type: form.type!,
      title: form.title!,
      description: form.description || "",
      createdAt: new Date().toISOString(),
      tags: form.tags || [],
    };
    setLogs([entry, ...logs]);
    setDialogOpen(false);
    setForm({ type: form.type });
    toast({ title: "Log saved", description: `Added a ${entry.type} entry.` });
  };

  const grouped = useMemo(() => logs, [logs]);

  return (
    <PageContainer title="Logs" description="Log calls and other communications">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">Track notes, meetings and calls in one place.</div>
        <Button onClick={() => setDialogOpen(true)}>New log</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent entries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {grouped.length === 0 && (
            <div className="text-sm text-muted-foreground">No logs yet. Create your first entry.</div>
          )}
          {grouped.map((l) => (
            <div key={l.id} className="p-3 border rounded-md">
              <div className="flex items-center gap-2">
                {typeBadge(l.type)}
                <div className="font-medium">{l.title}</div>
                <div className="ml-auto text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleString()}</div>
              </div>
              {l.tags && l.tags.length > 0 && (
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Tag className="h-3 w-3" /> {l.tags.join(", ")}
                </div>
              )}
              {l.description && (
                <div className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{l.description}</div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New log</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Type</label>
                <Select value={form.type} onValueChange={(v: any) => setForm((f) => ({ ...f, type: v }))}>
                  <SelectTrigger className="h-9 mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Title</label>
                <Input className="h-9 mt-1" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Description</label>
              <Textarea className="mt-1" rows={4} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <Separator />
            <div className="text-xs text-muted-foreground">Calls are supported. Choose type "Call" to log a phone conversation.</div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!form.title}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Logs;
