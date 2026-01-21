# AI Resume Analyzer

An AI-powered web application that analyzes job fit by matching your resume and personal stories against job postings using Claude AI.

**Live Demo:** [brigarland.com](https://brigarland.com)

## Overview

This portfolio project demonstrates:

- **AI Integration**: Anthropic Claude API with Sonnet 4.5 for intelligent analysis
- **Modern Web Stack**: React + TypeScript + Vite for fast, type-safe development
- **Serverless Architecture**: Vercel Functions for scalable, cost-effective API calls
- **Clean Code**: Fluent UI makeStyles for maintainable, type-safe styling
- **Cost Optimization**: Prompt caching and structured outputs

## Features

- 📊 **Job Fit Analysis**: Get a 0-100 match score based on job requirements
- 💪 **Strengths Identification**: See what makes you a strong candidate
- 📈 **Gap Analysis**: Identify areas for growth
- 📖 **Story Matching**: AI selects relevant personal stories beyond your resume
- 🎯 **Smart Recommendations**: Get actionable advice for your application

## Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for fast builds and HMR
- **Fluent UI** (Microsoft's design system with makeStyles for styling)
- **Font Awesome** for brand icons (GitHub, LinkedIn)
- **Modern ES6+** features

### Backend

- **Vercel Serverless Functions** (Node.js runtime)
- **Anthropic Claude API** (Sonnet 4.5)
- **TypeScript** for type safety across the stack

### Deployment

- **Vercel** for hosting and CI/CD
- **Namecheap** for domain management

## Project Structure

```
ai-resume-analyzer/
├── src/
│   ├── components/      # React components
│   ├── constants/       # Constants, Enums, strings
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── assets/          # Images (headshot, backgrounds)
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.tsx         # React entry point
├── api/
│   ├── analyze.ts       # Vercel serverless function
│   └── lib/             # Backend utilities
│       ├── data.ts      # Resume and stories data
│       ├── scraper.ts   # Job posting web scraper
│       └── types.ts     # Shared type definitions
├── public/              # Static assets (uncompiled)
└── dist/                # Build output (gitignored)
```

## Getting Started

### Prerequisites

- Node.js 20 and npm (nvm recommended for version management: [OSX/Linux](https://github.com/nvm-sh/nvm) | [Windows](https://github.com/coreybutler/nvm-windows))
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/brigarland/ai-resume-web-app.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:

   ```bash
   # Backend - Anthropic API Key (used in api/analyze.ts)
   # Get your key from: https://console.anthropic.com/
   ANTHROPIC_API_KEY=your_api_key_here

   # Frontend - API Base URL (used in React)
   VITE_API_URL=your_vercel_api_url
   # VITE_DEBUG_MODE=true
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Customize Your Data

Edit this file to add your information:

- **`api/lib/data.ts`**: Contains two exports - `stories` array for your personal experiences and `resumeData` object for your resume content

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (optional)

   ```bash
   npm i -g vercel
   ```

2. **Connect to Vercel**

   - Push code to GitHub
   - Import project at [vercel.com](https://vercel.com)
   - Add `ANTHROPIC_API_KEY` to environment variables

3. **Configure custom domain**

   - In Vercel dashboard: Settings → Domains
   - Add your domain (e.g., brigarland.com)
   - Update DNS records in Namecheap

4. **Deploy to production**
   - Push changes to your main branch on GitHub
   - Vercel will automatically build and deploy
   - Or use the Vercel CLI: `vercel --prod`

## API Usage & Costs

### Anthropic API Pricing (as of Jan 2025)

- **Input**: ~$3 per million tokens
- **Output**: ~$15 per million tokens
- **With caching**: 90% discount on cached content

### Estimated Costs Per Analysis

- Without caching: ~$0.05-0.10
- With caching: ~$0.01-0.02

### Cost Optimization Strategies

- ✅ Prompt caching for resume + stories
- ✅ Structured JSON output (no wasted tokens)
- ✅ Efficient prompts
- 🔜 Streaming responses (future enhancement)

## Future Enhancements

- [ ] Add streaming AI responses for real-time feedback
- [ ] Implement web scraping for job posting URLs
- [ ] Add prompt caching for cost optimization
- [ ] Create comparison mode (analyze multiple jobs)
- [ ] Add PDF export of analysis results
- [ ] Implement user authentication for saving analyses
- [ ] Add analytics dashboard

## Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:

- Fork this repo to build your own AI-powered resume analyzer
- Open issues for bugs or feature requests
- Submit PRs for improvements
- Give us a ⭐ on GitHub if you find this useful!

## License

MIT License - feel free to use this as a template for your own projects.

## Author

**Brian Garland**

- Portfolio: [brigarland.com](https://brigarland.com)
- GitHub: [@brigarland](https://github.com/brigarland)
