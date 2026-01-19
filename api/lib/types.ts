export interface IStory {
  id: string;
  title: string;
  context: string;
  skills: string[];
  outcomes: string[];
  categories: string[];
}

export interface IResumeData {
  fullText: string;
  skills: string[];
  experience: string[];
  education: string[];
}

export interface IJobAnalysisRequest {
  jobUrl: string;
  jobDescription?: string;
}

export interface IJobAnalysisResponse {
  jobTitle?: string;
  matchScore: number;
  strengths: string[];
  gaps: string[];
  relevantStories: IStory[];
  recommendation: string;
  reasoning?: string;
  jobDescription?: string;
}
