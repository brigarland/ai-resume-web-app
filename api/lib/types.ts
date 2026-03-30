export type TSkillRating = 1 | 2 | 3 | 4 | 5;

export interface ISkill {
  value: string;
  rating: TSkillRating;
}

export interface IStory {
  id: string;
  title: string;
  context: string;
  skills: string[];
  outcomes: string[];
  categories: string[];
  icon: string;
}

export interface IResumeData {
  fullText: string;
  skills: ISkill[];
  experience: string[];
  education: string[];
}

export interface IJobAnalysisRequest {
  jobUrl: string;
  jobDescription?: string;
}

export interface IJobAnalysisResponse {
  jobTitle?: string;
  hiringOrganization?: string;
  matchScore: number;
  strengths: string[];
  gaps: string[];
  relevantStories: IStory[];
  relevantSkills: ISkill[];
  recommendation: string;
  reasoning?: string;
  jobDescription?: string;
}

// =============================================================================
// MatchFinder
// =============================================================================

export interface IJobListing {
  /** Numeric Greenhouse job ID — used as the KV cache key */
  jobId: string;
  title: string;
  location: string;
  /** Direct link to the job posting on Greenhouse */
  jobUrl: string;
  /** Pre-built brigarland.com URL that triggers full analysis for this job */
  analyzeUrl: string;
}

export interface IScoredJob extends IJobListing {
  score: number;
  /** True if this score was served from Vercel KV cache */
  fromCache: boolean;
}

export interface ICrawlResponse {
  jobs: IScoredJob[];
  /** Total jobs found on the listing page before any filtering */
  totalFound: number;
  /** Jobs skipped by the title pre-filter (Sales, Finance, Legal, etc.) */
  skipped: number;
  /** Jobs whose score came from KV cache, not a fresh Claude call */
  cachedCount: number;
  company: string;
}

export interface ICachedJobScore {
  score: number;
  title: string;
  location: string;
  jobUrl: string;
  cachedAt: number; // unix ms
}

/** Company card metadata for the /matchfinder landing grid */
export interface ICompanyCard {
  id: string;
  name: string;
  description: string;
  logoInitials: string;
  color: string;
  path: string;
  isAvailable: boolean;
}
