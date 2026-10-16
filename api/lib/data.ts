import type { IStory, IResumeData } from "./types";

/**
 * Personal stories that demonstrate competencies beyond the resume.
 * These are used by the AI to find relevant examples when analyzing job fit.
 */
export const stories: IStory[] = [
  {
    id: "story-001",
    title: "Live Animal Presentations",
    icon: "frog",
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
    title: "Fluent UI Contribution",
    icon: "github",
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
  {
    id: "story-003",
    title: "Training Video Production",
    icon: "video",
    context:
      "Career in technical communication began with producing an award-winning public service announcement for Willie Nelson's Hepatitis C awareness campaign, followed by creating training videos for the American Heart Association and Alaska State Troopers. This foundation in translating complex information into accessible visual content evolved throughout career into software documentation, technical training materials, and most importantly, effective human-centered communication in technology environments. The core skill remains constant: understanding the audience, breaking down complexity, and delivering information in the most digestible format.",
    skills: [
      "video production",
      "technical communication",
      "instructional design",
      "audience analysis",
      "content creation",
      "documentation",
      "training development",
    ],
    outcomes: [
      "Produced award-winning PSA for national health campaign",
      "Created training materials for healthcare and law enforcement organizations",
      "Applied video production expertise to software training and technical documentation throughout career",
      "Developed ability to translate complex technical concepts for diverse audiences",
    ],
    categories: ["communication", "content-creation", "education"],
  },
  {
    id: "story-004",
    title: "Summiting Mt. Rainier",
    icon: "mountain",
    context:
      "When faced with summiting Mt. Rainier and feeling overwhelmed by the enormity of the challenge, a guide shared transformative advice: don't look up at the peak, just focus on taking the next single step. Can you take one more step? Of course. Then do it. And again. And again. This experience fundamentally changed approach to daunting challenges, embodying principles later recognized as Stoic philosophy - focus only on what you can control in this moment, break overwhelming problems into manageable actions, and trust that consistent small steps lead to remarkable outcomes. This mindset has been applied throughout career when facing complex technical projects, tight deadlines, and seemingly impossible requirements.",
    skills: [
      "perseverance",
      "incremental progress",
      "focus management",
      "stress management",
      "goal decomposition",
      "resilience",
      "strategic thinking",
    ],
    outcomes: [
      "Successfully summited Mt. Rainier by focusing on incremental progress",
      "Developed mental framework for breaking down overwhelming challenges",
      "Applied 'next step' methodology to complex software projects and tight deadlines",
      "Internalized principles later recognized as Stoic philosophy: control what you can control, focus on the present moment",
    ],
    categories: ["personal-growth", "problem-solving", "resilience"],
  },
  {
    id: "story-005",
    title: "Firefly Launch: Blank Canvas to Production in Two Days",
    icon: "rocket",
    context:
      "Launched Firefly in the Dark from a blank canvas to a production website in two days using an iterative AI-assisted workflow. Started by asking AI tools for rough first drafts, then critiqued exactly what was wrong with each one and revised, again and again, until the work became a brand guideline, then a style guide, then a working Next.js and React codebase on Vercel with a SQL database. The AI produced volume; the judgment about what was good, what was off-brand, and what was production-ready stayed human. The site has since grown to include a Resend newsletter pipeline and an RSS feed that distributes the podcast to every major platform.",
    skills: [
      "AI-assisted development",
      "rapid prototyping",
      "Next.js",
      "React",
      "brand and style guide development",
      "design systems",
      "full-stack ownership",
      "critical evaluation of AI output",
    ],
    outcomes: [
      "Went from blank canvas to production website in two days",
      "Produced brand guidelines, a style guide, and a full codebase through iterative critique-and-revise cycles with AI",
      "Own the full stack in production: Next.js, React, Vercel, SQL database, Resend newsletter, podcast RSS feed",
      "Demonstrates directing AI tools toward a quality bar rather than accepting first output",
    ],
    categories: ["technical", "ai", "prototyping", "leadership"],
  },
  {
    id: "story-006",
    title: "Building a Tech Community and Media Platform",
    icon: "users",
    context:
      "Founded Firefly in the Dark, a community, events, and content organization built around seeing technology clearly, as it is rather than as we wish it to be. Organize and host weekly tech networking events across the greater Seattle area, growing a local community with hundreds of members. Write a weekly column and long-form essays on technology, culture, and the industry. Host an interview podcast with long-time practitioners, and produce and edit all Firefly media, including long-form YouTube video, podcast audio, and short-form social clips. Every part of it depends on the same skill used in engineering leadership: understanding the audience and making complex ideas land.",
    skills: [
      "community building",
      "event organization",
      "public speaking",
      "podcast hosting",
      "technical writing",
      "video and audio editing",
      "content strategy",
      "venue and partner relationships",
    ],
    outcomes: [
      "Grew a local tech community with hundreds of members through weekly in-person events",
      "Publish a weekly column plus long-form essays",
      "Host and produce an interview podcast and all supporting video and social content",
      "Built venue partnerships across multiple Seattle-area locations",
    ],
    categories: [
      "communication",
      "leadership",
      "content-creation",
      "community",
    ],
  },
];

/**
 * Resume content - structured for AI consumption
 */
export const resumeData: IResumeData = {
  fullText: `
BRIAN GARLAND
Front End Engineer - Prototyping & AI

Front end engineer with 18 years building for the web. Expert in React and TypeScript, with a focus on turning new concepts into production applications - AI tools, data visualization, and rapid prototypes. Writer, podcast host, and founder of Seattle-area tech meetups. Fluent with executives, product managers, and developers, translating between all three.

CONTACT
Email: bri.garland@gmail.com
AI Portfolio App: brigarland.com
Location: Seattle, WA

TECH EXPERTISE
- React
- TypeScript
- Next.js
- JavaScript
- HTML & CSS
- Fluent UI
- GenAI / LLM Integration
- Design Systems
- Azure

EMPLOYMENT HISTORY

Founder & President | January 2026 - Present
Firefly in the Dark | fireflyinthedark.com

- Launched Firefly from blank canvas to production in two days - brand, style guide, and website - using an iterative AI-assisted workflow
- Maintain and extend fireflyinthedark.com in Next.js and React on Vercel, with a SQL database, a Resend newsletter pipeline, and an RSS feed that distributes the podcast to every major platform
- Produce and edit all Firefly media - long-form YouTube video, podcast audio, and short-form social clips
- Write a weekly column and long-form essays on technology, culture, and the industry; host an interview podcast with long-time practitioners
- Organize and host weekly tech networking events across the greater Seattle area, growing a local community with hundreds of members

UX Software Engineer, Lead | September 2018 - January 2026
Blueprint Technologies

- Led front end development on enterprise AI and data visualization products for Fortune 500 clients, from first prototype to production release
- Built React, TypeScript, and Fluent UI interfaces on C# and FastAPI services backed by Databricks, Neo4j, and Azure
- Prototyped AI agent and graph-based tools for supply chain automation, then took the ones that worked to production
- Led and mentored development teams; set front end standards, ran code review, and wrote onboarding docs for new developers
- Partnered with UX designers and business stakeholders to turn research findings into shipped UI changes
- Served as SME providing strategic recommendations when technical constraints or deadlines required solution pivots
- Created software training videos and documentation to support user onboarding and product adoption

UX Engineer | January 2018 - August 2018
Microsoft (Contract through Aquent)

- Shipped features and fixes to Office UI Fabric React (now Fluent UI), an open-source TypeScript component library with 180K+ weekly downloads
- Triaged 500+ GitHub issues and brought community feedback to the product team
- Implemented an email pipeline in C# to improve product quality control

Senior Web Application Developer | January 2017 - January 2018
Champagne Solutions

- Built full-stack web apps for multiple clients; led front end work and mentored a junior developer
- Developed custom CRUD admin interfaces using Laravel and modern PHP practices

Lead Front-End Web Developer | July 2013 - January 2017
efelle creative

- Led front end development on 200+ client websites, with primary ownership of 20
- Wrote the team's front end coding standards and onboarding process
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
- Technical Writing
- Public Speaking & Hosting
- Rapid Prototyping
- Code Review & Mentorship
- Documentation & Onboarding
- Cross-functional Collaboration
- Community Building
- Agile (Scrum & Kanban)

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
    { value: "Next.js", rating: 4 },
    { value: "HTML5/CSS3", rating: 5 },
    { value: "Sass/SCSS", rating: 5 },
    { value: "RESTful APIs", rating: 4 },
    { value: "SQL", rating: 2 },
    { value: "Azure", rating: 3 },
    { value: "Vercel", rating: 4 },
    { value: "Python", rating: 3 },
    { value: "FastAPI", rating: 3 },
    { value: "Neo4j", rating: 3 },
    { value: "C#", rating: 1 },
    { value: "C++", rating: 2 },
    { value: "Bash/Shell", rating: 4 },
    { value: "Fluent UI", rating: 5 },
    { value: "Fluent UI React", rating: 5 },
    { value: "Design Systems", rating: 4 },
    { value: "Agile (Scrum & Kanban)", rating: 4 },
    { value: "UX Engineering", rating: 5 },
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
    "Firefly in the Dark - Founder & President (Jan 2026 - Present)",
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
