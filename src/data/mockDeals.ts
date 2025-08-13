export interface Deal {
  id: string;
  title: string;
  companyId: string;
  company: string;
  contactName: string;
  value: number;
  currency: string;
  stage: string;
  progress: number;
  probability: number;
  closeDate: string;
  createdDate: string;
}

export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Enterprise Software License",
    companyId: "comp1",
    company: "Acme Corp",
    contactName: "Alice Smith",
    value: 75000,
    currency: "USD",
    stage: "Proposal",
    progress: 40,
    probability: 60,
    closeDate: "2025-07-15",
    createdDate: "2025-04-10",
  },
  {
    id: "2",
    title: "IT Staffing Project",
    companyId: "comp2",
    company: "Brightside Tech",
    contactName: "Bob Patel",
    value: 120000,
    currency: "USD",
    stage: "Negotiation",
    progress: 70,
    probability: 80,
    closeDate: "2025-06-30",
    createdDate: "2025-03-22",
  },
  {
    id: "3",
    title: "Recruitment Services",
    companyId: "comp3",
    company: "GreenFields Inc.",
    contactName: "Cara Lee",
    value: 45000,
    currency: "USD",
    stage: "Discovery",
    progress: 20,
    probability: 40,
    closeDate: "2025-08-10",
    createdDate: "2025-05-05",
  },
  {
    id: "4",
    title: "Contract Placement",
    companyId: "comp1",
    company: "Acme Corp",
    contactName: "Alice Smith",
    value: 30000,
    currency: "USD",
    stage: "Closed Won",
    progress: 100,
    probability: 100,
    closeDate: "2025-05-01",
    createdDate: "2025-02-15",
  },
  {
    id: "5",
    title: "Executive Search Package",
    companyId: "comp2",
    company: "Brightside Tech",
    contactName: "Sarah Johnson",
    value: 200000,
    currency: "USD",
    stage: "Qualification",
    progress: 30,
    probability: 50,
    closeDate: "2025-09-22",
    createdDate: "2025-05-01",
  },
];

export const dealStages = [
  { id: "discovery", name: "Discovery", color: "bg-blue-100 text-blue-800" },
  { id: "qualification", name: "Qualification", color: "bg-purple-100 text-purple-800" },
  { id: "proposal", name: "Proposal", color: "bg-amber-100 text-amber-800" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-100 text-orange-800" },
  { id: "closed-won", name: "Closed Won", color: "bg-green-100 text-green-800" },
  { id: "closed-lost", name: "Closed Lost", color: "bg-red-100 text-red-800" },
];

export const getCompanyDeals = (companyId: string): Deal[] =>
  mockDeals.filter((d) => d.companyId === companyId);

export const getContactDeals = (contactName: string): Deal[] =>
  mockDeals.filter((d) => d.contactName === contactName);
