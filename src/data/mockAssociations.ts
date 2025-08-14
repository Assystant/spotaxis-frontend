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
  department?: string;
  startDate?: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  applicants?: number;
  expiryDate?: string;
  pipelineId?: string;
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
    name: "Acme Corp",
    industry: "Manufacturing",
    location: "New York, NY",
    mission: "Delivering innovative manufacturing solutions that drive efficiency and quality across industries",
    vision: "To be the global leader in sustainable manufacturing technology and processes",
    size: "500-1000",
    website: "https://acmecorp.com"
  },
  {
    id: "comp2",
    name: "Brightside Tech",
    industry: "Software",
    location: "San Francisco, CA",
    mission: "Creating cutting-edge software solutions that empower businesses to achieve their full potential",
    vision: "Building the future through intelligent, user-centered technology",
    size: "200-500",
    website: "https://brightsidetech.com"
  },
  {
    id: "comp3",
    name: "GreenFields Inc.",
    industry: "Agriculture",
    location: "Chicago, IL",
    mission: "Revolutionizing agriculture through sustainable farming practices and innovative technology",
    vision: "Feeding the world while protecting our planet for future generations",
    size: "100-200",
    website: "https://greenfields.com"
  },
  {
    id: "comp4",
    name: "AgriTech Labs",
    industry: "AgriTech",
    location: "Denver, CO",
    mission: "Advancing agriculture with data-driven insights and IoT",
    vision: "A resilient, data-powered food system",
    size: "50-200",
    website: "https://agritechlabs.example.com"
  },
  {
    id: "comp5",
    name: "Nimbus Health",
    industry: "Healthcare",
    location: "Austin, TX",
    mission: "Improving patient outcomes with modern technology",
    vision: "Accessible healthcare for everyone",
    size: "200-500",
    website: "https://nimbushealth.example.com"
  }
];

// Mock Contacts (both clients and candidates)
export const mockContacts: Contact[] = [
  // Client Contacts
  {
    id: "contact1",
    name: "Alice Smith",
    email: "alice.smith@acmecorp.com",
    phone: "(555) 123-4567",
    role: "Hiring Manager",
    company: "Acme Corp",
    companyId: "comp1",
    location: "New York, NY",
    type: 'client'
  },
  {
    id: "contact2",
    name: "Bob Patel",
    email: "bob.patel@brightsidetech.com",
    phone: "(555) 234-5678",
    role: "Team Lead",
    company: "Brightside Tech",
    companyId: "comp2",
    location: "San Francisco, CA",
    type: 'client'
  },
  {
    id: "contact3",
    name: "Cara Lee",
    email: "cara.lee@greenfields.com",
    phone: "(555) 345-6789",
    role: "Recruiter",
    company: "GreenFields Inc.",
    companyId: "comp3",
    location: "Chicago, IL",
    type: 'client'
  },
  // Candidates
  {
    id: "contact4",
    name: "Daniel Wong",
    email: "daniel.wong@email.com",
    phone: "(555) 456-7890",
    role: "Manufacturing Engineer",
    company: "Previous Company",
    companyId: "",
    location: "Detroit, MI",
    source: "LinkedIn",
    type: 'candidate'
  },
  {
    id: "contact5",
    name: "Eva Johnson",
    email: "eva.johnson@email.com",
    phone: "(555) 567-8901",
    role: "Frontend Developer",
    company: "Freelance",
    companyId: "",
    location: "Portland, OR",
    source: "Company Website",
    type: 'candidate'
  },
  {
    id: "contact6",
    name: "Frank Müller",
    email: "frank.muller@email.com",
    phone: "(555) 678-9012",
    role: "Agricultural Analyst",
    company: "Previous Employer",
    companyId: "",
    location: "Madison, WI",
    source: "Indeed",
    type: 'candidate'
  }
];

// Mock Jobs
export const mockJobsData: Job[] = [
  {
    id: "job1",
    title: "Manufacturing Engineer",
    companyId: "comp1",
    company: "Acme Corp",
    description: "Join our manufacturing team to design and optimize production processes. We're looking for an experienced engineer to help modernize our manufacturing operations and implement lean manufacturing principles.",
    location: "New York, NY",
    type: "Full-time",
    salary: "$85,000 - $115,000",
    skills: ["Lean Manufacturing", "CAD", "Process Optimization", "Quality Control"],
    status: "Active",
    postedDate: "2024-01-15"
  },
  {
    id: "job2",
    title: "Frontend Developer",
    companyId: "comp2",
    company: "Brightside Tech",
    description: "We're seeking a talented Frontend Developer to join our growing team. You'll be working on cutting-edge web applications using modern technologies and frameworks.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    status: "Active",
    postedDate: "2024-01-20"
  },
  {
    id: "job3",
    title: "Agricultural Analyst",
    companyId: "comp3",
    company: "GreenFields Inc.",
    description: "Looking for an Agricultural Analyst to help optimize farming operations and analyze crop data. You'll work with farmers and technology teams to improve agricultural productivity.",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$70,000 - $95,000",
    skills: ["Data Analysis", "Agricultural Science", "GIS", "Statistical Modeling"],
    status: "Active",
    postedDate: "2024-01-25"
  },
  {
    id: "job4",
    title: "Process Engineer",
    companyId: "comp1",
    company: "Acme Corp",
    description: "Optimize and improve production lines using lean methodologies.",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    skills: ["Lean", "Six Sigma", "Process Engineering"],
    status: "Active",
    postedDate: "2024-02-01"
  },
  {
    id: "job6",
    title: "UI Engineer",
    companyId: "comp2",
    company: "Brightside Tech",
    description: "Build delightful UI experiences with React and TypeScript.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    skills: ["React", "Design Systems", "TypeScript"],
    status: "Active",
    postedDate: "2024-02-05"
  },
  {
    id: "job7",
    title: "Frontend Engineer",
    companyId: "comp5",
    company: "Nimbus Health",
    description: "Healthtech product UI and frontend architecture.",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$118,000 - $155,000",
    skills: ["React", "TypeScript", "Accessibility"],
    status: "Active",
    postedDate: "2024-02-07"
  },
  {
    id: "job8",
    title: "Crop Data Analyst",
    companyId: "comp3",
    company: "GreenFields Inc.",
    description: "Analyze crop yield data and build predictive models.",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$75,000 - $100,000",
    skills: ["Python", "GIS", "Statistics"],
    status: "Active",
    postedDate: "2024-02-09"
  },
  {
    id: "job9",
    title: "Agricultural Data Scientist",
    companyId: "comp4",
    company: "AgriTech Labs",
    description: "Develop ML models on agricultural datasets.",
    location: "Denver, CO",
    type: "Full-time",
    salary: "$95,000 - $130,000",
    skills: ["ML", "Python", "Agronomy"],
    status: "Active",
    postedDate: "2024-02-12"
  },
  {
    id: "job10",
    title: "Operations Engineer",
    companyId: "comp5",
    company: "Nimbus Health",
    description: "Ensure reliable operations for medical devices production.",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$100,000 - $135,000",
    skills: ["Operations", "Lean", "Manufacturing"],
    status: "Active",
    postedDate: "2024-02-15"
  }
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: "app1",
    candidateId: "contact4",
    candidateName: "Daniel Wong",
    jobId: "job1",
    jobTitle: "Manufacturing Engineer",
    companyId: "comp1",
    appliedDate: "2024-01-20",
    status: "Active",
    stage: "interview",
    resumeLink: "/resumes/daniel_wong.pdf"
  },
  {
    id: "app2",
    candidateId: "contact5",
    candidateName: "Eva Johnson",
    jobId: "job2",
    jobTitle: "Frontend Developer",
    companyId: "comp2",
    appliedDate: "2024-01-22",
    status: "Active",
    stage: "screening",
    resumeLink: "/resumes/eva_johnson.pdf"
  },
  {
    id: "app3",
    candidateId: "contact6",
    candidateName: "Frank Müller",
    jobId: "job3",
    jobTitle: "Agricultural Analyst",
    companyId: "comp3",
    appliedDate: "2024-01-28",
    status: "Active",
    stage: "new",
    resumeLink: "/resumes/frank_muller.pdf"
  },
  // Additional applications per candidate (same and different companies)
  {
    id: "app4",
    candidateId: "contact4",
    candidateName: "Daniel Wong",
    jobId: "job4",
    jobTitle: "Process Engineer",
    companyId: "comp1",
    appliedDate: "2024-02-03",
    status: "Active",
    stage: "screening",
    resumeLink: "/resumes/daniel_wong.pdf"
  },
  {
    id: "app5",
    candidateId: "contact4",
    candidateName: "Daniel Wong",
    jobId: "job10",
    jobTitle: "Operations Engineer",
    companyId: "comp5",
    appliedDate: "2024-02-16",
    status: "Active",
    stage: "new",
    resumeLink: "/resumes/daniel_wong.pdf"
  },
  {
    id: "app6",
    candidateId: "contact5",
    candidateName: "Eva Johnson",
    jobId: "job6",
    jobTitle: "UI Engineer",
    companyId: "comp2",
    appliedDate: "2024-02-06",
    status: "Active",
    stage: "interview",
    resumeLink: "/resumes/eva_johnson.pdf"
  },
  {
    id: "app7",
    candidateId: "contact5",
    candidateName: "Eva Johnson",
    jobId: "job7",
    jobTitle: "Frontend Engineer",
    companyId: "comp5",
    appliedDate: "2024-02-10",
    status: "Active",
    stage: "screening",
    resumeLink: "/resumes/eva_johnson.pdf"
  },
  {
    id: "app8",
    candidateId: "contact6",
    candidateName: "Frank Müller",
    jobId: "job8",
    jobTitle: "Crop Data Analyst",
    companyId: "comp3",
    appliedDate: "2024-02-11",
    status: "Active",
    stage: "interview",
    resumeLink: "/resumes/frank_muller.pdf"
  },
  {
    id: "app9",
    candidateId: "contact6",
    candidateName: "Frank Müller",
    jobId: "job9",
    jobTitle: "Agricultural Data Scientist",
    companyId: "comp4",
    appliedDate: "2024-02-14",
    status: "Active",
    stage: "screening",
    resumeLink: "/resumes/frank_muller.pdf"
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