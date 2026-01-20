import type { IStory, IResumeData } from "./types";

/**
 * Personal stories that demonstrate competencies beyond the resume.
 * These are used by the AI to find relevant examples when analyzing job fit.
 */
export const stories: IStory[] = [
  {
    id: "story-001",
    title: "Museum Live Animal Presentations",
    context:
      "Volunteered at natural history museum in high school, delivering live animal presentations to diverse audiences (children and adults) focused on conservation and education.",
    skills: [
      "public speaking",
      "education",
      "audience adaptation",
      "communication",
      "presentation skills",
    ],
    outcomes: [
      "Delivered 50+ presentations to audiences of 10-100 people",
      "Received positive feedback from museum staff and visitors",
      "Developed ability to explain complex topics to varied audiences",
    ],
    categories: ["communication", "education", "public-speaking"],
  },
  {
    id: "story-002",
    title: "Office UI Fabric React Contribution",
    context:
      "During Microsoft contract, contributed to Office UI Fabric React (now Fluent UI), an open-source TypeScript framework with 180K+ weekly downloads. Organized triage of 500+ GitHub issues and implemented automated testing pipelines.",
    skills: [
      "open source contribution",
      "TypeScript",
      "React",
      "community engagement",
      "automated testing",
      "technical leadership",
    ],
    outcomes: [
      "Improved project maintainability through systematic issue triage",
      "Enhanced product quality with C# automated testing pipeline",
      "Contributed to a library used by millions of developers weekly",
    ],
    categories: ["technical", "leadership", "open-source"],
  },
];

/**
 * Resume content - structured for AI consumption
 */
export const resumeData: IResumeData = {
  fullText: `
BRIAN GARLAND
AI Prototype Technologist

Innovative technologist specializing in rapid AI prototyping and user-centered design. Expert in leveraging GenAI and modern web frameworks to transform concepts into production-ready applications. Proven track record leading development teams at Fortune 500 clients, with deep expertise in React and TypeScript. Passionate about bridging the gap between cutting-edge AI capabilities and intuitive user experiences.

CONTACT
Email: bri.garland@gmail.com
AI Portfolio App: brigarland.com
Location: Seattle, WA

TECH EXPERTISE
• React
• TypeScript
• Fluent UI
• GenAI
• JavaScript
• UX Design
• Azure
• Python
• Agile (Scrum & Kanban)

EMPLOYMENT HISTORY

UX Software Engineer, Lead | September 2018 - January 2026
Blueprint Technologies

- Lead development teams building cutting edge visualization and GenAI applications for Fortune 500 clients, managing full project lifecycle from ideation through production release
- Architect and implement customer-facing UI/UX solutions using React, Fluent UI, and C# APIs integrated with Databricks and Azure services
- Leverage AI acceleration tools and GenAI capabilities to rapidly prototype and deploy production-ready applications, reducing development cycles while maintaining high quality standards
- Drive innovation by conducting user research, collecting feedback, and iterating on experimental concepts to deliver maximum business impact
- Mentor development teams and provide technical guidance throughout the development cycle, improving team cohesion and productivity
- Serve as SME providing strategic recommendations when technical constraints or deadlines require solution pivots
- Create software training videos and documentation to facilitate user onboarding and product adoption

UX Engineer | January 2018 - August 2018
Microsoft (Contract through Aquent)

- Contributed features and bug fixes to Office UI Fabric React (now Fluent UI), an open-source TypeScript framework with 180K+ weekly downloads
- Organized triage of 500+ GitHub issues to improve project maintainability and community engagement
- Implemented email pipeline in C# to enhance product quality control

Senior Web Application Developer | January 2017 - January 2018
Champagne Solutions

- Managed full-stack web application projects from specification to deployment for multiple clients
- Developed custom CRUD admin interfaces using Laravel framework and modern PHP practices

Lead Front-End Web Developer | July 2013 - January 2017
efelle creative

- Directed construction of 200+ client websites, leading a front-end development team with 20 primary ownership projects
- Mentored developers to establish best practices as corporate standards, improving code quality and team efficiency
- Evaluated and implemented automation strategies with executive leadership, balancing security and performance

Web Developer / Founder | June 2012 - July 2013
Adaptive Logix

- Founded consulting company; secured The Seattle Times as first client, building SharePoint, ASP.NET, and Drupal applications for customer management
- Learned critical lessons in business development, client relationships, and balancing growth with operational capacity

Early Career Experience | 2008 - 2013
- The Seattle Times - Customer Service (2012): Supported mobile app launch
- Amazon - Digital Media Ingestion Specialist (2011): Media-On-Demand
- Lighthouse Document Technologies - IQC (2010): Data QA for legal discovery
- Tocrok Productions - Associate Producer (2009): Digital and interactive production projects

PERSONAL SKILLS
• Technical Leadership
• Rapid Prototyping
• Cross-functional Collaboration
• Mentorship & Teaching
• User Research & Feedback Integration
• Strategic Problem Solving
• Innovation & Experimentation

EDUCATION

B.A. Cinema/Television & Computer Engineering Minor
Southern Methodist University
2004 - 2008

HONORS & AWARDS

Eagle Scout (2004)
Anniston Museum of Natural History Volunteer of the Year (2004)
Blueprint Technologies Core Value Award (2019)
  `,
  skills: [
    { value: "React", rating: 5 },
    { value: "TypeScript", rating: 5 },
    { value: "JavaScript", rating: 5 },
    { value: "HTML5/CSS3", rating: 5 },
    { value: "Sass/SCSS", rating: 5 },
    { value: "RESTful APIs", rating: 4 },
    { value: "SQL", rating: 2 },
    { value: "Azure", rating: 3 },
    { value: "Python", rating: 3 },
    { value: "C#", rating: 1 },
    { value: "C++", rating: 2 },
    { value: "Bash/Shell", rating: 4 },
    { value: "Fluent UI", rating: 5 },
    { value: "Fluent UI React", rating: 5 },
    { value: "Agile (Scrum & Kanban)", rating: 4 },
    { value: "User Experience Design", rating: 5 },
    { value: "Project Management", rating: 4 },
    { value: "SEO", rating: 4 },
    { value: "E-Commerce", rating: 4 },
    { value: "Highcharts", rating: 4 },
    { value: "D3", rating: 2 },
    { value: "Figma", rating: 3 },
    { value: "Photoshop", rating: 4 },
    { value: "DaVinci Resolve", rating: 4 },
    { value: "PHP", rating: 3 },
    { value: "Databricks", rating: 3 },
    { value: "GenAI", rating: 5 },
  ],
  experience: [
    "Blueprint Technologies - UX Software Engineer, Lead (Sept 2018 - Jan 2026)",
    "Microsoft (Contract through Aquent) - UX Engineer (Jan 2018 - Aug 2018)",
    "Champagne Solutions - Senior Web Application Developer (Jan 2017 - Jan 2018)",
    "efelle creative - Lead Front-End Web Developer (Jul 2013 - Jan 2017)",
    "Adaptive Logix - Web Developer / Founder (Jun 2012 - Jul 2013)",
    "The Seattle Times - Customer Service (2012)",
    "Amazon - Digital Media Ingestion Specialist (2011)",
    "Lighthouse Document Technologies - IQC (2010)",
    "Tocrok Productions - Associate Producer (2009)",
  ],
  education: [
    "Southern Methodist University - Bachelor of Arts (2004-2008)",
    "Cinema/Television Major, Computer Engineering Minor",
  ],
};
