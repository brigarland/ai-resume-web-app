/**
 * Vercel Serverless Function: Job Analysis
 *
 * This function:
 * 1. Accepts either a job URL or job description text
 * 2. If URL: scrapes the job posting for title and description
 * 3. Uses Claude to analyze job fit against resume + stories
 * 4. Returns structured analysis with match score, strengths, gaps, and relevant stories
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";

// Import resume and stories
import { stories, resumeData } from "./lib/data.js";
import type { IJobAnalysisRequest, IJobAnalysisResponse } from "./lib/types.js";
import { scrapeJobPosting } from "./lib/scraper.js";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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

    // Scrape or use provided description
    let jobDescription: string;
    let jobTitle: string | undefined;
    let scrapedData: any = null;

    if (providedJobDescription) {
      // User provided text directly
      jobDescription = providedJobDescription;
      jobTitle = undefined; // Claude will extract from text
    } else if (jobUrl) {
      // Scrape the job posting
      try {
        scrapedData = await scrapeJobPosting(jobUrl);
        jobDescription = scrapedData.description;
        jobTitle = scrapedData.title;

        // Debug logging
        console.log("=== SCRAPED DATA ===");
        console.log("URL:", scrapedData.url);
        console.log("Title:", scrapedData.title);
        console.log("Description length:", scrapedData.description.length);
        console.log(
          "Description preview:",
          scrapedData.description.substring(0, 500)
        );
        console.log("===================");
      } catch (scrapeError) {
        console.error("Scraping error:", scrapeError);
        return res.status(400).json({
          error: "Failed to fetch job posting from URL",
          details:
            scrapeError instanceof Error
              ? scrapeError.message
              : "Unknown error",
        });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Either Job URL or Job Description is required" });
    }

    // Build the system prompt
    const systemPrompt = `You are an expert career advisor analyzing job fit. 
You will be provided with:
1. A resume
2. A collection of personal stories demonstrating competencies
3. A job description${jobTitle ? " (job title: " + jobTitle + ")" : ""}

Your task is to analyze the candidate's fit for the role and return a structured JSON response.

Response format:
{
  "jobTitle": "${
    jobTitle || "<extracted job title if clearly identifiable, otherwise omit>"
  }",
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

    // Extract JSON (Claude might wrap it in markdown)
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
      jobDescription: jobDescription, // Include the actual description used
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
