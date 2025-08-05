// Mock data for all entities and their associations

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  mission?: string;
  vision?: string;
  size?: string;
  website?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  companyId: string;
  location?: string;
  source?: string;
  type: 'client' | 'candidate';
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  company: string;
  description: string;
  location: string;
  type: string;
  salary?: string;
  skills: string[];
  status: string;
  postedDate: string;
}

export interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  appliedDate: string;
  status: string;
  stage: string;
  resumeLink?: string;
}

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: "comp1",
    name: "TechCorp Inc",
    industry: "Technology",
    location: "San Francisco, CA",
    mission: "To revolutionize technology solutions",
    vision: "Leading the future of innovation",
    size: "500-1000",
    website: "https://techcorp.com"
  },
  {
    id: "comp2",
    name: "Global Finance Ltd",
    industry: "Finance",
    location: "New York, NY",
    mission: "Providing world-class financial services",
    vision: "Empowering financial growth globally",
    size: "1000+",
    website: "https://globalfinance.com"
  },
  {
    id: "comp3",
    name: "HealthTech Solutions",
    industry: "Healthcare",
    location: "Boston, MA",
    mission: "Advancing healthcare through technology",
    vision: "Healthier communities through innovation",
    size: "100-500",
    website: "https://healthtech.com"
  }
];

// Mock Contacts (both clients and candidates)
export const mockContacts: Contact[] = [
  {
    id: "contact1",
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "(555) 123-4567",
    role: "Hiring Manager",
    company: "TechCorp Inc",
    companyId: "comp1",
    location: "San Francisco, CA",
    type: 'client'
  },
  {
    id: "contact2",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 234-5678",
    role: "Software Engineer",
    company: "Freelance",
    companyId: "",
    location: "Seattle, WA",
    source: "LinkedIn",
    type: 'candidate'
  },
  {
    id: "contact3",
    name: "Mike Wilson",
    email: "mike.wilson@globalfinance.com",
    phone: "(555) 345-6789",
    role: "HR Director",
    company: "Global Finance Ltd",
    companyId: "comp2",
    location: "New York, NY",
    type: 'client'
  },
  {
    id: "contact4",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "(555) 456-7890",
    role: "Data Scientist",
    company: "Previous Company",
    companyId: "",
    location: "Austin, TX",
    source: "Referral",
    type: 'candidate'
  }
];

// Mock Jobs
export const mockJobsData: Job[] = [
  {
    id: "job1",
    title: "Senior Software Engineer",
    companyId: "comp1",
    company: "TechCorp Inc",
    description: "We are looking for a senior software engineer...",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    skills: ["React", "TypeScript", "Node.js"],
    status: "Active",
    postedDate: "2024-01-15"
  },
  {
    id: "job2",
    title: "Financial Analyst",
    companyId: "comp2",
    company: "Global Finance Ltd",
    description: "Seeking an experienced financial analyst...",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80,000 - $110,000",
    skills: ["Excel", "SQL", "Financial Modeling"],
    status: "Active",
    postedDate: "2024-01-20"
  },
  {
    id: "job3",
    title: "Product Manager",
    companyId: "comp3",
    company: "HealthTech Solutions",
    description: "Looking for a product manager to lead our health platform...",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$100,000 - $140,000",
    skills: ["Product Strategy", "Agile", "Healthcare"],
    status: "Active",
    postedDate: "2024-01-25"
  }
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: "app1",
    candidateId: "contact2",
    candidateName: "Sarah Johnson",
    jobId: "job1",
    jobTitle: "Senior Software Engineer",
    companyId: "comp1",
    appliedDate: "2024-01-20",
    status: "Active",
    stage: "interview",
    resumeLink: "/resumes/sarah_johnson.pdf"
  },
  {
    id: "app2",
    candidateId: "contact4",
    candidateName: "Emily Davis",
    jobId: "job2",
    jobTitle: "Financial Analyst",
    companyId: "comp2",
    appliedDate: "2024-01-22",
    status: "Active",
    stage: "screening",
    resumeLink: "/resumes/emily_davis.pdf"
  },
  {
    id: "app3",
    candidateId: "contact2",
    candidateName: "Sarah Johnson",
    jobId: "job3",
    jobTitle: "Product Manager",
    companyId: "comp3",
    appliedDate: "2024-01-28",
    status: "Active",
    stage: "new",
    resumeLink: "/resumes/sarah_johnson.pdf"
  }
];

// Association mapping functions
export const getCompanyJobs = (companyId: string): Job[] => {
  return mockJobsData.filter(job => job.companyId === companyId);
};

export const getCompanyContacts = (companyId: string): Contact[] => {
  return mockContacts.filter(contact => contact.companyId === companyId);
};

export const getCompanyCandidates = (companyId: string): Contact[] => {
  const companyJobIds = getCompanyJobs(companyId).map(job => job.id);
  const candidateIds = mockApplications
    .filter(app => companyJobIds.includes(app.jobId))
    .map(app => app.candidateId);
  return mockContacts.filter(contact => candidateIds.includes(contact.id) && contact.type === 'candidate');
};

export const getCompanyApplications = (companyId: string): Application[] => {
  return mockApplications.filter(app => app.companyId === companyId);
};

export const getCandidateApplications = (candidateId: string): Application[] => {
  return mockApplications.filter(app => app.candidateId === candidateId);
};

export const getJobApplications = (jobId: string): Application[] => {
  return mockApplications.filter(app => app.jobId === jobId);
};

export const getJobCompany = (jobId: string): Company | undefined => {
  const job = mockJobsData.find(j => j.id === jobId);
  return job ? mockCompanies.find(c => c.id === job.companyId) : undefined;
};

export const getApplicationJob = (applicationId: string): Job | undefined => {
  const application = mockApplications.find(app => app.id === applicationId);
  return application ? mockJobsData.find(job => job.id === application.jobId) : undefined;
};

export const getApplicationCandidate = (applicationId: string): Contact | undefined => {
  const application = mockApplications.find(app => app.id === applicationId);
  return application ? mockContacts.find(contact => contact.id === application.candidateId) : undefined;
};