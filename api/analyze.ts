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
    let hiringOrganization: string | undefined;
    let scrapedData: any = null;

    if (providedJobDescription) {
      // User provided text directly
      jobDescription = providedJobDescription;
      jobTitle = undefined; // Claude will extract from text
      hiringOrganization = undefined;
    } else if (jobUrl) {
      // Scrape the job posting
      try {
        scrapedData = await scrapeJobPosting(jobUrl);
        jobDescription = scrapedData.description;
        jobTitle = scrapedData.title;
        hiringOrganization = scrapedData.hiringOrganization;

        // Debug logging
        console.log("=== SCRAPED DATA ===");
        console.log("URL:", scrapedData.url);
        console.log("Title:", scrapedData.title);
        console.log("Hiring Org:", scrapedData.hiringOrganization);
        console.log("Description length:", scrapedData.description.length);
        console.log(
          "Description preview:",
          scrapedData.description.substring(0, 500)
        );
        console.log("===================");
      } catch (scrapeError) {
        console.error("Scraping error:", scrapeError);

        // Check error type
        const errorMessage =
          scrapeError instanceof Error ? scrapeError.message : "Unknown error";
        const isInvalidJobDescription = errorMessage.includes(
          "INVALID_JOB_DESCRIPTION"
        );
        const isBotDetected = errorMessage.includes("BOT_DETECTED");

        // Determine error type and message
        let errorType = "Failed to fetch job posting from URL";
        if (isInvalidJobDescription) {
          errorType = "INVALID_JOB_DESCRIPTION";
        } else if (isBotDetected) {
          errorType = "BOT_DETECTED";
        }

        return res.status(400).json({
          error: errorType,
          details: errorMessage
            .replace("INVALID_JOB_DESCRIPTION: ", "")
            .replace("BOT_DETECTED: ", ""),
        });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Either Job URL or Job Description is required" });
    }

    // Build the system prompt with strict JSON instruction
    const systemPrompt = `You are an expert career advisor analyzing job fit for Brian Garland. 

IMPORTANT: You must respond with ONLY valid JSON. No explanatory text before or after. Just the JSON object.

You will be provided with:
1. A resume with a list of skills (each skill has a value and rating 1-5)
2. A collection of personal stories demonstrating competencies
3. A job description${jobTitle ? " (job title: " + jobTitle + ")" : ""}

Return this exact JSON structure:
{
  "jobTitle": "${jobTitle || "extracted job title"}",
  "matchScore": 85,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "gaps": ["gap 1", "gap 2"],
  "relevantStories": ["story-001", "story-002"],
  "relevantSkills": [{"value": "React", "rating": 5}, {"value": "TypeScript", "rating": 4}],
  "recommendation": "Your overall recommendation here"
}

Rules:
- matchScore must be a number 0-100
- strengths must be an array of strings
- gaps must be an array of strings
- relevantStories must be an array of story IDs from the provided stories
- relevantSkills must be an array of 6-12 skill objects selected from the resume's skills list that are most relevant to this job. Keep the original rating values from the resume.
- recommendation must be a string written in third person, referring to the candidate as "Brian" (e.g., "Brian has excellent skills..." instead of "You have excellent skills...")`;

    const userPrompt = `# Resume
${resumeData.fullText}

# Skills (with ratings 1-5)
${JSON.stringify(resumeData.skills, null, 2)}

# Personal Stories
${JSON.stringify(stories, null, 2)}

# Job Description
${jobDescription}

Analyze this candidate's fit and respond with ONLY the JSON object, no other text.`;

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

    console.log("=== CLAUDE RAW RESPONSE ===");
    console.log(responseText);
    console.log("===========================");

    // Try multiple JSON extraction methods
    let analysis;
    try {
      // Method 1: Try parsing directly
      analysis = JSON.parse(responseText);
      console.log("Parsed via Method 1 (direct parse)");
    } catch (e1) {
      try {
        // Method 2: Extract from markdown code block
        const codeBlockMatch = responseText.match(
          /```(?:json)?\s*([\s\S]*?)```/
        );
        if (codeBlockMatch) {
          analysis = JSON.parse(codeBlockMatch[1]);
          console.log("Parsed via Method 2 (code block)");
        } else {
          // Method 3: Find first { to last }
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            throw new Error("No JSON found in response");
          }
          analysis = JSON.parse(jsonMatch[0]);
          console.log("Parsed via Method 3 (regex extract)");
        }
      } catch (e2) {
        console.error("JSON Parse Error:", e2);
        console.error("Response was:", responseText);
        throw new Error(
          `Failed to parse AI response. Response: ${responseText.substring(
            0,
            200
          )}...`
        );
      }
    }

    // Log what we got
    console.log("=== PARSED ANALYSIS ===");
    console.log("jobTitle:", analysis.jobTitle);
    console.log(
      "matchScore:",
      analysis.matchScore,
      "Type:",
      typeof analysis.matchScore
    );
    console.log(
      "strengths:",
      analysis.strengths,
      "Is Array:",
      Array.isArray(analysis.strengths)
    );
    console.log(
      "gaps:",
      analysis.gaps,
      "Is Array:",
      Array.isArray(analysis.gaps)
    );
    console.log("relevantStories:", analysis.relevantStories);
    console.log(
      "recommendation:",
      analysis.recommendation ? "Present" : "MISSING"
    );
    console.log("All keys:", Object.keys(analysis));
    console.log("======================");

    // Validate the response has required fields
    if (typeof analysis.matchScore !== "number") {
      throw new Error(
        `matchScore is missing or not a number. Got: ${typeof analysis.matchScore}`
      );
    }
    if (!Array.isArray(analysis.strengths)) {
      throw new Error(
        `strengths is missing or not an array. Got: ${typeof analysis.strengths}`
      );
    }
    if (!analysis.recommendation) {
      throw new Error(
        `recommendation is missing. Got: ${typeof analysis.recommendation}`
      );
    }

    // Check if Claude detected an invalid job description
    const invalidJobDescriptionIndicators = [
      "without a valid job description",
      "not a valid job description",
      "sign-in page",
      "login page",
      "appears to be a",
      "doesn't appear to be a job",
    ];
    const recommendationLower = analysis.recommendation.toLowerCase();
    const seemsInvalid = invalidJobDescriptionIndicators.some((indicator) =>
      recommendationLower.includes(indicator)
    );

    if (seemsInvalid || analysis.matchScore < 10) {
      return res.status(400).json({
        error: "INVALID_JOB_DESCRIPTION",
        message:
          "Unable to extract a valid job description from the provided URL",
        details: analysis.recommendation,
      });
    }

    // Enrich with full story objects
    const relevantStoryIds = analysis.relevantStories || [];
    const enrichedStories = stories.filter((story) =>
      relevantStoryIds.includes(story.id)
    );

    const response: IJobAnalysisResponse = {
      jobTitle: analysis.jobTitle || jobTitle || "Job Posting",
      hiringOrganization: hiringOrganization,
      matchScore: analysis.matchScore,
      strengths: analysis.strengths,
      gaps: analysis.gaps || [],
      relevantStories: enrichedStories,
      relevantSkills: analysis.relevantSkills || [],
      recommendation: analysis.recommendation,
      jobDescription: jobDescription,
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
