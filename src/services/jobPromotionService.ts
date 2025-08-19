export interface ExternalJobLink {
  id: string;
  name: string; // Board name for tracking (e.g., "AngelList Campaign", "Tech Jobs Board")
  jobInfoUrl: string; // URL for job information page
  applyUrl: string; // URL for application page
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm?: string;
  utmContent?: string;
  createdAt: string;
}

export interface JobPromotion {
  jobId: string;
  jobTitle: string;
  companyName: string;
  integratedPromotions: string[]; // IDs of integrated job boards
  externalLinks: ExternalJobLink[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "jobPromotions";

export const jobPromotionService = {
  // Get promotion for a specific job
  getJobPromotion(jobId: string): JobPromotion | null {
    try {
      const promotions = this.getAllPromotions();
      return promotions.find(p => p.jobId === jobId) || null;
    } catch (error) {
      console.error("Error getting job promotion:", error);
      return null;
    }
  },

  // Get all promotions
  getAllPromotions(): JobPromotion[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading job promotions:", error);
      return [];
    }
  },

  // Save all promotions
  savePromotions(promotions: JobPromotion[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(promotions));
    } catch (error) {
      console.error("Error saving job promotions:", error);
    }
  },

  // Create or update job promotion
  updateJobPromotion(jobPromotion: JobPromotion): void {
    const promotions = this.getAllPromotions();
    const index = promotions.findIndex(p => p.jobId === jobPromotion.jobId);
    
    if (index >= 0) {
      promotions[index] = { ...jobPromotion, updatedAt: new Date().toISOString() };
    } else {
      promotions.push({
        ...jobPromotion,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    this.savePromotions(promotions);
  },

  // Add external link to job promotion
  addExternalLink(jobId: string, jobTitle: string, companyName: string, linkData: Omit<ExternalJobLink, "id" | "createdAt">): ExternalJobLink {
    let promotion = this.getJobPromotion(jobId);
    
    if (!promotion) {
      promotion = {
        jobId,
        jobTitle,
        companyName,
        integratedPromotions: [],
        externalLinks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    const newLink: ExternalJobLink = {
      ...linkData,
      id: `link-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    promotion.externalLinks.push(newLink);
    this.updateJobPromotion(promotion);
    
    return newLink;
  },

  // Remove external link
  removeExternalLink(jobId: string, linkId: string): boolean {
    const promotion = this.getJobPromotion(jobId);
    if (!promotion) return false;

    const initialLength = promotion.externalLinks.length;
    promotion.externalLinks = promotion.externalLinks.filter(link => link.id !== linkId);
    
    if (promotion.externalLinks.length < initialLength) {
      this.updateJobPromotion(promotion);
      return true;
    }
    
    return false;
  },

  // Update external link
  updateExternalLink(jobId: string, linkId: string, updates: Partial<Omit<ExternalJobLink, "id" | "createdAt">>): boolean {
    const promotion = this.getJobPromotion(jobId);
    if (!promotion) return false;

    const linkIndex = promotion.externalLinks.findIndex(link => link.id === linkId);
    if (linkIndex === -1) return false;

    promotion.externalLinks[linkIndex] = {
      ...promotion.externalLinks[linkIndex],
      ...updates
    };

    this.updateJobPromotion(promotion);
    return true;
  },

  // Generate final URLs with UTM parameters
  generateUrls(link: ExternalJobLink): { jobInfoUrl: string; applyUrl: string } {
    const utmParams = new URLSearchParams({
      utm_source: link.utmSource,
      utm_medium: link.utmMedium,
      utm_campaign: link.utmCampaign,
      ...(link.utmTerm && { utm_term: link.utmTerm }),
      ...(link.utmContent && { utm_content: link.utmContent })
    });

    const jobInfoUrl = `${link.jobInfoUrl}${link.jobInfoUrl.includes('?') ? '&' : '?'}${utmParams.toString()}`;
    const applyUrl = `${link.applyUrl}${link.applyUrl.includes('?') ? '&' : '?'}${utmParams.toString()}`;

    return { jobInfoUrl, applyUrl };
  }
};