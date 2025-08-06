// Service for managing associations between entities

import {
  mockCompanies,
  mockContacts,
  mockJobsData,
  mockApplications,
  type Company,
  type Contact,
  type Job,
  type Application
} from "@/data/mockAssociations";

export interface SearchResult {
  id: string;
  name: string;
  subtitle?: string;
  route: string;
}

// Search functions for each entity type
export const searchCompanies = async (query: string): Promise<SearchResult[]> => {
  return mockCompanies
    .filter(company => 
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.industry.toLowerCase().includes(query.toLowerCase())
    )
    .map(company => ({
      id: company.id,
      name: company.name,
      subtitle: company.industry,
      route: `/companies/${company.id}`
    }));
};

export const searchContacts = async (query: string, type?: 'client' | 'candidate'): Promise<SearchResult[]> => {
  return mockContacts
    .filter(contact => {
      const matchesQuery = contact.name.toLowerCase().includes(query.toLowerCase()) ||
                          contact.email.toLowerCase().includes(query.toLowerCase()) ||
                          contact.role.toLowerCase().includes(query.toLowerCase());
      const matchesType = !type || contact.type === type;
      return matchesQuery && matchesType;
    })
    .map(contact => ({
      id: contact.id,
      name: contact.name,
      subtitle: `${contact.role} at ${contact.company}`,
      route: `/contacts/${contact.id}`
    }));
};

export const searchCandidates = async (query: string): Promise<SearchResult[]> => {
  return searchContacts(query, 'candidate');
};

export const searchClientContacts = async (query: string): Promise<SearchResult[]> => {
  return searchContacts(query, 'client');
};

export const searchJobs = async (query: string): Promise<SearchResult[]> => {
  return mockJobsData
    .filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    )
    .map(job => ({
      id: job.id,
      name: job.title,
      subtitle: `${job.company} - ${job.location}`,
      route: `/jobs/${job.id}`
    }));
};

export const searchApplications = async (query: string): Promise<SearchResult[]> => {
  return mockApplications
    .filter(app => 
      app.candidateName.toLowerCase().includes(query.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(query.toLowerCase())
    )
    .map(app => ({
      id: app.id,
      name: `${app.candidateName} → ${app.jobTitle}`,
      subtitle: `Applied ${app.appliedDate}`,
      route: `/applicants/${app.id}`
    }));
};

// Association management functions
class AssociationManager {
  private associations: Map<string, Set<string>> = new Map();

  constructor() {
    // Initialize with sample associations
    this.initializeSampleAssociations();
  }

  // Get associations for an entity
  getAssociations(entityId: string, associationType: string): string[] {
    const key = `${entityId}:${associationType}`;
    return Array.from(this.associations.get(key) || new Set());
  }

  // Add an association
  addAssociation(entityId: string, associationType: string, targetId: string): void {
    const key = `${entityId}:${associationType}`;
    if (!this.associations.has(key)) {
      this.associations.set(key, new Set());
    }
    this.associations.get(key)!.add(targetId);

    // Add reverse association if needed
    this.addReverseAssociation(entityId, associationType, targetId);
  }

  // Remove an association
  removeAssociation(entityId: string, associationType: string, targetId: string): void {
    const key = `${entityId}:${associationType}`;
    this.associations.get(key)?.delete(targetId);

    // Remove reverse association if needed
    this.removeReverseAssociation(entityId, associationType, targetId);
  }

  // Initialize sample associations
  private initializeSampleAssociations(): void {
    // Company → Contact associations
    this.addAssociation('comp1', 'contacts', 'contact1'); // Acme Corp → Alice Smith
    this.addAssociation('comp2', 'contacts', 'contact2'); // Brightside Tech → Bob Patel
    this.addAssociation('comp3', 'contacts', 'contact3'); // GreenFields → Cara Lee

    // Company → Job associations
    this.addAssociation('comp1', 'jobs', 'job1'); // Acme Corp → Manufacturing Engineer
    this.addAssociation('comp2', 'jobs', 'job2'); // Brightside Tech → Frontend Developer
    this.addAssociation('comp3', 'jobs', 'job3'); // GreenFields → Agricultural Analyst

    // Job → Candidate associations
    this.addAssociation('job1', 'candidates', 'contact4'); // Manufacturing Engineer → Daniel Wong
    this.addAssociation('job2', 'candidates', 'contact5'); // Frontend Developer → Eva Johnson
    this.addAssociation('job3', 'candidates', 'contact6'); // Agricultural Analyst → Frank Müller

    // Job → Application associations
    this.addAssociation('job1', 'applications', 'app1'); // Manufacturing Engineer → Daniel's Application
    this.addAssociation('job2', 'applications', 'app2'); // Frontend Developer → Eva's Application
    this.addAssociation('job3', 'applications', 'app3'); // Agricultural Analyst → Frank's Application

    // Candidate → Application associations
    this.addAssociation('contact4', 'applications', 'app1'); // Daniel Wong → his application
    this.addAssociation('contact5', 'applications', 'app2'); // Eva Johnson → her application
    this.addAssociation('contact6', 'applications', 'app3'); // Frank Müller → his application
  }

  private addReverseAssociation(entityId: string, associationType: string, targetId: string): void {
    const reverseMap: Record<string, string> = {
      'companies': 'contacts',
      'contacts': 'companies',
      'jobs': 'companies',
      'candidates': 'applications',
      'applications': 'candidates'
    };

    const reverseType = reverseMap[associationType];
    if (reverseType) {
      const reverseKey = `${targetId}:${reverseType}`;
      if (!this.associations.has(reverseKey)) {
        this.associations.set(reverseKey, new Set());
      }
      this.associations.get(reverseKey)!.add(entityId);
    }
  }

  private removeReverseAssociation(entityId: string, associationType: string, targetId: string): void {
    const reverseMap: Record<string, string> = {
      'companies': 'contacts',
      'contacts': 'companies',
      'jobs': 'companies',
      'candidates': 'applications',
      'applications': 'candidates'
    };

    const reverseType = reverseMap[associationType];
    if (reverseType) {
      const reverseKey = `${targetId}:${reverseType}`;
      this.associations.get(reverseKey)?.delete(entityId);
    }
  }
}

export const associationManager = new AssociationManager();

// Helper functions to convert entity data to SearchResult format
export const companyToSearchResult = (company: Company): SearchResult => ({
  id: company.id,
  name: company.name,
  subtitle: company.industry,
  route: `/companies/${company.id}`
});

export const contactToSearchResult = (contact: Contact): SearchResult => ({
  id: contact.id,
  name: contact.name,
  subtitle: `${contact.role} at ${contact.company}`,
  route: `/contacts/${contact.id}`
});

export const jobToSearchResult = (job: Job): SearchResult => ({
  id: job.id,
  name: job.title,
  subtitle: `${job.company} - ${job.location}`,
  route: `/jobs/${job.id}`
});

export const applicationToSearchResult = (application: Application): SearchResult => ({
  id: application.id,
  name: `${application.candidateName} → ${application.jobTitle}`,
  subtitle: `Applied ${application.appliedDate}`,
  route: `/applicants/${application.id}`
});