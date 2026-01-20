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
