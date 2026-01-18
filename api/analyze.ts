/**
 * Vercel Serverless Function: Job Analysis
 * Runtime: Node.js 20.x via @vercel/node@3.2.21
 *
 * This function:
 * 1. Accepts either a job URL or job description text
 * 2. Uses Claude to analyze job fit against resume + stories
 * 3. Returns structured analysis with match score, strengths, gaps, and relevant stories
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";

// Import resume and stories (in production, these would be in a database)
import { stories, resumeData } from "./lib/data.js";
import type { IJobAnalysisRequest, IJobAnalysisResponse } from "./lib/types.js";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { jobUrl, jobDescription: providedJobDescription } =
      req.body as IJobAnalysisRequest;

    if (!jobUrl && !providedJobDescription) {
      return res
        .status(400)
        .json({ error: "Either Job URL or Job Description is required" });
    }

    // Determine job description source
    let jobDescription: string;

    if (providedJobDescription) {
      // User provided direct job description text
      jobDescription = providedJobDescription;
    } else {
      // TODO: Fetch job posting content from URL
      // For now, we'll use a placeholder
      jobDescription = `
        [Job posting content will be fetched from: ${jobUrl}]
        
        For testing purposes, using placeholder job description.
        This would normally be scraped from the provided URL.
      `;
    }

    // Construct the analysis prompt
    const systemPrompt = `You are an expert career advisor analyzing job fit. 
You will be provided with:
1. A resume
2. A collection of personal stories demonstrating competencies
3. A job description

Your task is to analyze the candidate's fit for the role and return a structured JSON response.

Response format:
{
  "jobTitle": "<extracted job title if clearly identifiable, otherwise omit>",
  "matchScore": <number 0-100>,
  "strengths": [<array of specific strengths with examples>],
  "gaps": [<array of skill/experience gaps>],
  "relevantStories": [<array of story IDs that are most relevant>],
  "recommendation": "<overall recommendation paragraph>"
}

Be specific and reference actual skills, experiences, and requirements.`;

    const userPrompt = `# Resume
${resumeData.fullText}

# Personal Stories
${JSON.stringify(stories, null, 2)}

# Job Description
${jobDescription}

Please analyze this candidate's fit for the role and provide your assessment in JSON format.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    // Parse Claude's response
    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON from response (Claude might wrap it in markdown)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    // Enrich with full story objects
    const relevantStoryIds = analysis.relevantStories || [];
    const enrichedStories = stories.filter((story) =>
      relevantStoryIds.includes(story.id)
    );

    const response: IJobAnalysisResponse = {
      jobTitle: analysis.jobTitle,
      matchScore: analysis.matchScore,
      strengths: analysis.strengths,
      gaps: analysis.gaps || [],
      relevantStories: enrichedStories,
      recommendation: analysis.recommendation,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Analysis error:", error);
    return res.status(500).json({
      error: "Failed to analyze job",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
