/**
 * Domain types for AI Resume Analyzer
 */

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
  skills: string[];
  experience: string[];
  education: string[];
}

export interface IJobAnalysisRequest {
  jobUrl?: string;
  jobDescription?: string; // Either jobUrl or jobDescription must be provided
}

export interface IJobAnalysisResponse {
  matchScore: number; // 0-100
  strengths: string[];
  gaps: string[];
  relevantStories: IStory[];
  recommendation: string;
  reasoning?: string; // Optional: Claude's extended thinking
}

export interface IAnalysisState {
  status: "idle" | "loading" | "streaming" | "complete" | "error";
  data: IJobAnalysisResponse | null;
  error: string | null;
}
