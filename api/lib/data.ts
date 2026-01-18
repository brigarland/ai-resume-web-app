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
      "During Microsoft contract, contributed to Office UI Fabric React (now Fluent UI), an open-source TypeScript framework with 1M+ weekly downloads. Organized triage of 500+ GitHub issues and implemented automated testing pipelines.",
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
Bellevue, WA 98005 | 256.453.2749 | bri.garland@gmail.com

TECHNOLOGY EXPERTISE

Web Development
React • TypeScript • JavaScript • HTML5/CSS3 • Sass/SCSS • RESTful APIs • SQL • Azure • Webpack

Methodologies & Practices
Agile (Scrum & Kanban) • User Experience Design • Project Management • SEO • E-Commerce

Data Visualization
KeyLines • Highcharts • D3

Software Development & Tools
Python • C#/C++ • Bash/Shell • Fluent UI / Office UI Fabric React • Figma • Photoshop • DaVinci Resolve

EXPERIENCE

Blueprint Consulting Services | Seattle, WA
UX Software Engineer, Lead | September 2018 - Present
React • TypeScript • JavaScript • C# • Azure • GenAI

- Lead development teams building cutting-edge data visualization and GenAI applications for Fortune 500 clients, managing full project lifecycle from ideation through production release
- Architect and implement customer-facing UI/UX solutions using React, Fluent UI, and C# APIs integrated with Databricks and Azure services
- Drive innovation by conducting user research, collecting feedback, and iterating on experimental concepts to deliver maximum business impact
- Mentor development teams and provide technical guidance throughout the development cycle, improving team cohesion and productivity
- Serve as SME providing strategic recommendations when technical constraints or deadlines require solution pivots
- Create software training videos and documentation to facilitate user onboarding and product adoption

Microsoft | Redmond, WA
UX Engineer (Contract via Aquent) | January 2018 - August 2018
React • TypeScript • JavaScript • C#

- Contributed features and bug fixes to Office UI Fabric React, an open-source TypeScript framework with 1M+ weekly downloads
- Organized triage of 500+ GitHub issues to improve project maintainability and community engagement
- Implemented automated design/dev/testing email pipeline in C# to enhance product quality control

Champagne Solutions | Seattle, WA
Senior Web Application Developer | January 2017 - January 2018
PHP • Laravel • JavaScript • SCSS

- Managed full-stack web application projects from specification to deployment for multiple clients
- Developed custom CRUD admin interfaces using Laravel framework and modern PHP practices

efelle creative | Seattle, WA
Lead Front-End Web Developer | July 2013 - January 2017
PHP • JavaScript • SCSS • Python • Bash • C++

- Directed construction of 200+ client websites, leading a front-end development team with 20 primary ownership projects
- Mentored developers to establish best practices as corporate standards, improving code quality and team efficiency
- Evaluated and implemented automation strategies with executive leadership, balancing security and performance
- Elevated proprietary CMS capabilities by creating Hydrogen, a custom front-end framework
- Engineered interactive nutrient calculator for Dutch Master Nutrients using JavaScript, JSON, and AJAX

Earlier Experience (2008-2013)
- Adaptive Logix - Web Developer (2012-2013): SharePoint, ASP.NET, Drupal development for enterprise clients
- The Seattle Times - Digital Customer Service (Contract, 2012): Supported mobile app launch
- Amazon - Digital Media Ingestion Specialist (Contract, 2011-2012): Media-On-Demand processing
- Lighthouse Document Technologies - IQC Specialist (2010-2011): Database QA for legal discovery
- Tocrok Productions - Associate Producer (2009-2010): Digital and interactive production projects
- Cupcake Mission - Web Design & Marketing Consultant (2009): Website, SEO, video production

EDUCATION

Southern Methodist University | Dallas, TX
Bachelor of Arts | 2004 - 2008
Cinema/Television Major • Computer Engineering Minor

HONORS & RECOGNITION

Eagle Scout • Anniston Museum of Natural History Volunteer of the Year • Blueprint Technologies Core Values Award (2019)
  `,
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML5/CSS3",
    "Sass/SCSS",
    "RESTful APIs",
    "SQL",
    "Azure",
    "Webpack",
    "Python",
    "C#",
    "C++",
    "Bash/Shell",
    "Fluent UI",
    "Office UI Fabric React",
    "Agile (Scrum & Kanban)",
    "User Experience Design",
    "Project Management",
    "SEO",
    "E-Commerce",
    "KeyLines",
    "Highcharts",
    "D3",
    "Figma",
    "Photoshop",
    "DaVinci Resolve",
    "PHP",
    "Laravel",
    "Databricks",
    "GenAI",
  ],
  experience: [
    "Blueprint Consulting Services - UX Software Engineer, Lead (Sept 2018 - Present)",
    "Microsoft - UX Engineer, Contract (Jan 2018 - Aug 2018)",
    "Champagne Solutions - Senior Web Application Developer (Jan 2017 - Jan 2018)",
    "efelle creative - Lead Front-End Web Developer (Jul 2013 - Jan 2017)",
    "Adaptive Logix - Web Developer (2012-2013)",
    "The Seattle Times - Digital Customer Service (2012)",
    "Amazon - Digital Media Ingestion Specialist (2011-2012)",
    "Lighthouse Document Technologies - IQC Specialist (2010-2011)",
    "Tocrok Productions - Associate Producer (2009-2010)",
    "Cupcake Mission - Web Design & Marketing Consultant (2009)",
  ],
  education: [
    "Southern Methodist University - Bachelor of Arts (2004-2008)",
    "Cinema/Television Major, Computer Engineering Minor",
  ],
};
