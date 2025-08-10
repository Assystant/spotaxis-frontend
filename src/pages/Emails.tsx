import React, { useEffect, useMemo, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Inbox, Send, FileText, Plus, Settings, Paperclip } from "lucide-react";
import { ComposeEmail } from "@/components/email/ComposeEmail";

interface MailItem {
  id: string;
  folder: "inbox" | "sent" | "drafts";
  from: { name: string; email: string };
  to: { name: string; email: string }[];
  subject: string;
  preview: string;
  bodyHtml: string;
  date: string;
  attachments?: { name: string; size: string; type: string }[];
  read?: boolean;
}

const sampleMessages: MailItem[] = [
  {
    id: "m1",
    folder: "inbox",
    from: { name: "Sarah Johnson", email: "sarah@client.com" },
    to: [{ name: "John Doe", email: "john@acme.com" }],
    subject: "Re: Weekly Sync Meeting",
    preview: "Next Tuesday 2pm works great. Let's use the usual Zoom link...",
    bodyHtml: "<p>Hi John,</p><p>Next Tuesday 2pm works great. Let's use the usual Zoom link.</p><p>Thanks,<br/>Sarah</p>",
    date: "2024-01-14T14:15:00Z",
    attachments: [],
    read: false,
  },
  {
    id: "m2",
    folder: "sent",
    from: { name: "John Doe", email: "john@acme.com" },
    to: [{ name: "Mike Wilson", email: "mike@client.com" }],
    subject: "Platform Capabilities Overview",
    preview: "As discussed, here is our capabilities overview and case studies...",
    bodyHtml: "<p>Hey Mike,</p><p>As discussed, here is our capabilities overview and case studies.</p><ul><li>Scalable APIs</li><li>Advanced analytics</li><li>24/7 support</li></ul><p>Cheers,<br/>John</p>",
    date: "2024-01-12T09:05:00Z",
    attachments: [
      { name: "Capabilities_Overview.pptx", size: "4.5 MB", type: "application/vnd.ms-powerpoint" },
    ],
    read: true,
  },
  {
    id: "m3",
    folder: "drafts",
    from: { name: "John Doe", email: "john@acme.com" },
    to: [{ name: "Partnerships", email: "partners@client.com" }],
    subject: "Draft: Partnership Proposal - Q1 2024",
    preview: "Sharing our proposal for the Q1 partnership. Please find the attached deck...",
    bodyHtml: "<p>Hi team,</p><p>Drafting proposal for Q1 partnership. Feedback welcome.</p>",
    date: "2024-01-10T11:20:00Z",
    attachments: [
      { name: "Acme_Q1_Proposal.pdf", size: "1.2 MB", type: "application/pdf" },
    ],
    read: true,
  },
];

const Emails: React.FC = () => {
  const [configured, setConfigured] = useState<boolean>(() => localStorage.getItem("emailConfigured") === "true");
  const [folder, setFolder] = useState<"inbox" | "sent" | "drafts">("inbox");
  const [messages, setMessages] = useState<MailItem[]>(sampleMessages);
  const [selectedId, setSelectedId] = useState<string | null>(messages.find(m => m.folder === "inbox")?.id || null);
  const [composeOpen, setComposeOpen] = useState(false);

  useEffect(() => {
    document.title = configured ? "Emails | Inbox" : "Emails | Setup";
  }, [configured]);

  const folderCounts = useMemo(() => ({
    inbox: messages.filter(m => m.folder === "inbox").length,
    sent: messages.filter(m => m.folder === "sent").length,
    drafts: messages.filter(m => m.folder === "drafts").length,
  }), [messages]);

  const currentList = messages.filter(m => m.folder === folder);
  const selected = messages.find(m => m.id === selectedId) || null;

  const handleConfigure = () => {
    localStorage.setItem("emailConfigured", "true");
    setConfigured(true);
  };

  const handleSend = (data: any) => {
    // Simulate sending by adding to Sent
    const newItem: MailItem = {
      id: `m${Date.now()}`,
      folder: "sent",
      from: { name: "You", email: "you@example.com" },
      to: [{ name: data.to?.name || data.to?.email || "Recipient", email: data.to?.email || "recipient@example.com" }],
      subject: data.subject || "(no subject)",
      preview: (data.body || "").replace(/<[^>]+>/g, "").slice(0, 120),
      bodyHtml: data.body || "",
      date: new Date().toISOString(),
      attachments: data.attachments || [],
      read: true,
    };
    setMessages(prev => [newItem, ...prev]);
    setFolder("sent");
    setSelectedId(newItem.id);
    setComposeOpen(false);
  };

  if (!configured) {
    return (
      <PageContainer title="Emails" description="Centralized email hub">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Connect your inbox</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Send, receive and track emails directly in the CRM. Connect your email provider to get started.</p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleConfigure}>Connect Google</Button>
                <Button variant="outline" onClick={handleConfigure}>Connect Microsoft</Button>
                <Button variant="ghost" onClick={handleConfigure}>Skip for now</Button>
                <Button variant="outline" className="ml-auto"><Settings className="h-4 w-4 mr-2" /> Advanced setup</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Emails" description="Centralized email hub">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Folders */}
        <Card className="md:col-span-3">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2"><Inbox className="h-4 w-4" /> Folders</CardTitle>
            <Button size="sm" onClick={() => setComposeOpen(true)} className="gap-1"><Plus className="h-4 w-4" /> Compose</Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {(["inbox", "sent", "drafts"] as const).map((f) => (
              <button
                key={f}
                onClick={() => { setFolder(f); const first = messages.find(m => m.folder === f); setSelectedId(first?.id || null); }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${folder === f ? 'bg-muted' : 'hover:bg-muted/50'}`}
              >
                <div className="flex items-center gap-2">
                  {f === "inbox" && <Inbox className="h-4 w-4" />}
                  {f === "sent" && <Send className="h-4 w-4" />}
                  {f === "drafts" && <FileText className="h-4 w-4" />}
                  <span className="capitalize">{f}</span>
                  <Badge variant="secondary" className="ml-auto">{folderCounts[f]}</Badge>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* List */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="text-base">{folder.charAt(0).toUpperCase()+folder.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {currentList.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`w-full text-left p-3 rounded-md border transition-colors ${selectedId === m.id ? 'bg-muted' : 'hover:bg-muted/50'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">{m.subject}</div>
                  <div className="text-xs text-muted-foreground">{new Date(m.date).toLocaleDateString()}</div>
                </div>
                <div className="text-xs text-muted-foreground truncate">From: {m.from.name} &lt;{m.from.email}&gt;</div>
                <div className="text-sm text-muted-foreground line-clamp-2">{m.preview}</div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Thread */}
        <Card className="md:col-span-5">
          {selected ? (
            <>
              <CardHeader>
                <CardTitle className="text-base">{selected.subject}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs text-muted-foreground">From: {selected.from.name} &lt;{selected.from.email}&gt;</div>
                <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: selected.bodyHtml }} />
                {selected.attachments && selected.attachments.length > 0 && (
                  <div>
                    <div className="text-xs font-medium mb-1">Attachments</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {selected.attachments.map((a, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Paperclip className="h-3 w-3" />
                          <span>{a.name}</span>
                          <span className="ml-auto">{a.size}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </>
          ) : (
            <div className="p-6 text-sm text-muted-foreground">Select an email to view the thread.</div>
          )}
        </Card>
      </div>

      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose Email</DialogTitle>
          </DialogHeader>
          <ComposeEmail
            recipient={{ id: "new", name: "", email: "" }}
            onCancel={() => setComposeOpen(false)}
            onSend={handleSend}
          />
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Emails;
