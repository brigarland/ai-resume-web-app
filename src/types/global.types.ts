/**
 * Domain types for AI Resume Analyzer
 */

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
  jobUrl?: string;
  jobDescription?: string; // Either jobUrl or jobDescription must be provided
}

export interface IJobAnalysisResponse {
  jobTitle?: string;
  hiringOrganization?: string;
  matchScore: number; // 0-100
  strengths: string[];
  gaps: string[];
  relevantStories: IStory[];
  relevantSkills: ISkill[]; // AI-selected relevant skills
  recommendation: string;
  reasoning?: string; // Optional: Claude's extended thinking
  jobDescription?: string;
}

export interface IAnalysisState {
  status: "idle" | "loading" | "streaming" | "complete" | "error";
  data: IJobAnalysisResponse | null;
  error: string | null;
  errorType?: string;
}

/**
 * Types for the MatchFinder crawler and results pages.
 * Lives in src/types/ alongside global_types.ts
 */

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

/** Company card metadata for the /matchfinder landing grid */
export interface ICompanyCard {
  id: string;
  name: string;
  description: string;
  logo?: string;
  logoInitials: string;
  color: string;
  path: string;
  isAvailable: boolean;
}
