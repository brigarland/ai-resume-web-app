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
  categories: string[]; // e.g., ["leadership", "technical", "communication"]
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
}
