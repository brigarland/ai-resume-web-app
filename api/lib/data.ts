import type { IStory, IResumeData } from './types';

/**
 * Personal stories that demonstrate competencies beyond the resume.
 * These are used by the AI to find relevant examples when analyzing job fit.
 * 
 * TODO: Replace with real stories
 */
export const stories: IStory[] = [
  {
    id: 'story-001',
    title: 'Museum Live Animal Presentations',
    context: 'Volunteered at natural history museum in high school, delivering live animal presentations to diverse audiences (children and adults) focused on conservation and education.',
    skills: [
      'public speaking',
      'education',
      'audience adaptation',
      'communication',
      'presentation skills'
    ],
    outcomes: [
      'Delivered 50+ presentations to audiences of 10-100 people',
      'Received positive feedback from museum staff and visitors',
      'Developed ability to explain complex topics to varied audiences'
    ],
    categories: ['communication', 'education', 'public-speaking']
  },
  {
    id: 'story-002',
    title: 'Example Technical Project',
    context: 'Placeholder for a technical project story...',
    skills: ['problem-solving', 'technical', 'leadership'],
    outcomes: ['Outcome 1', 'Outcome 2'],
    categories: ['technical', 'leadership']
  }
];

/**
 * Resume content - structured for AI consumption
 * TODO: Replace with actual resume data
 */
export const resumeData: IResumeData = {
  fullText: `
    [Your full resume text here - this will be cached by Claude]
    
    EXPERIENCE:
    - Current role and responsibilities
    - Previous roles
    
    SKILLS:
    - Technical skills
    - Soft skills
    
    EDUCATION:
    - Degrees and certifications
  `,
  skills: [
    'React',
    'TypeScript',
    'AI Integration',
    'Rapid Prototyping'
  ],
  experience: [],
  education: []
};