# AI Resume Analyzer

An AI-powered web application that analyzes job fit by matching your resume and personal stories against job postings using Claude AI.

**Live Demo:** [brigarland.com](https://brigarland.com) *(coming soon)*

## Overview

This portfolio project demonstrates:
- **AI Integration**: Anthropic Claude API with Sonnet 4.5 for intelligent analysis
- **Modern Web Stack**: React + TypeScript + Vite for fast, type-safe development
- **Serverless Architecture**: Vercel Functions for scalable, cost-effective API calls
- **Clean Code**: SCSS modules for maintainable styling
- **Cost Optimization**: Prompt caching and structured outputs

## Features

- 📊 **Job Fit Analysis**: Get a 0-100 match score based on job requirements
- 💪 **Strengths Identification**: See what makes you a strong candidate
- 📈 **Gap Analysis**: Identify areas for growth
- 📖 **Story Matching**: AI selects relevant personal stories beyond your resume
- 🎯 **Smart Recommendations**: Get actionable advice for your application

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast builds and HMR
- **SCSS Modules** for scoped, maintainable styles
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
│   ├── constants/       # Constants, Enums, etc
│   ├── styles/          # Shared SCSS elements
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   └── main.tsx         # React entry point
├── api/
│   └── analyze.ts       # Vercel serverless function
│   ├── lib/             # Resume and stories data
├── public/              # Static assets
└── dist/                # Build output (gitignored)
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
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
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
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

Edit these files to add your information:

- **`src/api.lib/stories.ts`**: Add your personal stories and experiences
- **`src/api/lib/stories.ts`**: Update the `resumeData` object with your resume

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

This is a portfolio project, but feedback and suggestions are welcome! Feel free to open issues or submit PRs.

## License

MIT License - feel free to use this as a template for your own projects.

## Author

**Brian Garland**
- Portfolio: [brigarland.com](https://brigarland.com)
- GitHub: [@brigarland](https://github.com/brigarland)
