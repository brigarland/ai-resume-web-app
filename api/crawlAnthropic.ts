/**
 * Vercel Serverless Function: Anthropic Job Crawler + Scorer
 *
 * Pipeline:
 * 1. Fetch https://www.anthropic.com/careers/jobs — pure SSR HTML, no JS needed
 * 2. Parse all job listings with Cheerio (title, Greenhouse URL, location)
 * 3. Pre-filter obviously non-relevant roles (Sales, Finance, Legal, etc.)
 *    to avoid burning Claude tokens on clear mismatches
 * 4. For each remaining job:
 *    a. Check Vercel KV cache by Greenhouse job ID — if hit, use cached score
 *    b. If miss: fetch the Greenhouse job page, extract description, call Claude
 *       for a score-only response (lean prompt, ~200 tokens output vs 2000)
 *    c. Write score to KV cache (no TTL — job descriptions don't change)
 * 5. Return all scored jobs sorted by score descending
 *
 * Requires env vars:
 *   ANTHROPIC_API_KEY
 *   KV_REST_API_URL, KV_REST_API_TOKEN  (Vercel KV — link store in dashboard)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";
import * as cheerio from "cheerio";
import type { Element } from "domhandler";
import {
  getCachedScore,
  setCachedScore,
  extractJobId,
  getAllCachedJobs,
} from "./lib/jobCache.js";
import { resumeData } from "./lib/data.js";
import type { IJobListing, IScoredJob, ICrawlResponse } from "./lib/types.js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

const ANTHROPIC_CAREERS_URL = "https://www.anthropic.com/careers/jobs";

/**
 * Role categories to skip before scoring — clear mismatches for Brian's profile.
 * We match against lowercase job title.
 */
const SKIP_TITLE_PATTERNS = [
  /\bsales\b/,
  /account executive/,
  /account manager/,
  /\bfinance\b/,
  /\bfinancial\b/,
  /\blegal\b/,
  /\bcounsel\b/,
  /\brecruiter\b/,
  /\brecruiting\b/,
  /payroll/,
  /accountant/,
  /\bhr\b/,
  /people partner/,
  /real estate/,
  /business development representative/,
  /\bmarketing\b(?!.*engineer)/, // skip marketing UNLESS it has "engineer"
  /\bpr\b/,
  /communications lead/,
  /policy manager/,
  /policy analyst/,
  /\bpublic policy\b/,
  /\bbiological safety\b/,
  /data center (?!.*engineer)/, // skip data center ops, keep data center engineer
  /supply chain/,
  /transaction (manager|principal)/,
  /\bprocurement\b/,
];

/**
 * Fetch the Anthropic careers listing and extract all job entries.
 */
async function fetchJobListings(): Promise<IJobListing[]> {
  const response = await fetch(ANTHROPIC_CAREERS_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Anthropic careers: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const jobs: IJobListing[] = [];

  // Each job is an <a> tag pointing to job-boards.greenhouse.io/anthropic/jobs/<id>
  $('a[href*="greenhouse.io/anthropic/jobs"]').each((_, el) => {
    const href = $(el).attr("href") || "";
    if (!href) return;

    // Title is the text of the link, trimming "Apply" suffix that Anthropic appends
    const fullText = $(el).text().trim();
    const title = fullText.replace(/\s*Apply\s*$/, "").trim();
    if (!title) return;

    // Location: the element immediately before the <a> or a sibling text node.
    // On the Anthropic page the structure is:
    //   [title link row]
    //   [location text]
    //   [Apply link]
    // We grab the text node that precedes the Apply link inside the same row.
    const parentText = $(el).closest("li, tr, div").text() || "";
    // Pull location from sibling <p> or text that isn't the title/Apply
    const locationEl = $(el).prev();
    const location =
      locationEl.text().trim() || extractLocationFromContext($, el);

    const jobId = extractJobId(href);
    const analyzeUrl = `https://brigarland.com/?url=${encodeURIComponent(href)}`;

    jobs.push({ jobId, title, location, jobUrl: href, analyzeUrl });
  });

  // Deduplicate by jobId (same job may appear in multiple category sections)
  const seen = new Set<string>();
  return jobs.filter((j) => {
    if (seen.has(j.jobId)) return false;
    seen.add(j.jobId);
    return true;
  });
}

/**
 * Fallback location extractor — walks nearby DOM for location-like text.
 */
function extractLocationFromContext(
  $: cheerio.CheerioAPI,
  el: Element,
): string {
  // Try to find a text node near the link that looks like a location
  const siblings = $(el).parent().children();
  let locationText = "";
  siblings.each((_, sib) => {
    const text = $(sib).text().trim();
    if (text && text !== "Apply" && !$(sib).is("a")) {
      locationText = text;
    }
  });
  return locationText;
}

/**
 * Fetch a Greenhouse job page and extract the description text.
 */
async function fetchJobDescription(jobUrl: string): Promise<string> {
  const response = await fetch(jobUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch job page: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove noise
  $("script, style, noscript, form, footer, nav").remove();

  // Greenhouse job pages have the description in the main content area
  // between the header and the application form
  let description = "";
  const contentSelectors = ["#content", ".content", "main", '[role="main"]'];
  for (const sel of contentSelectors) {
    const el = $(sel);
    if (el.length && el.text().trim().length > 200) {
      description = el.text().trim();
      break;
    }
  }

  if (!description) {
    description = $("body").text().trim();
  }

  // Collapse whitespace
  description = description.replace(/\s+/g, " ").trim();

  // Trim to 4000 chars — enough for Claude to score accurately without wasting tokens
  return description.substring(0, 4000);
}

/**
 * Call Claude with a lean prompt that returns ONLY a match score (0-100).
 * This is ~10x cheaper than the full analysis prompt.
 */
async function scoreJobWithClaude(
  jobTitle: string,
  jobDescription: string,
): Promise<number> {
  const prompt = `You are evaluating job fit for Brian Garland, an AI Prototype Technologist with 7+ years of experience.

BRIAN'S PROFILE SUMMARY:
${resumeData.fullText.substring(0, 2000)}

KEY SKILLS (rated 1-5):
${resumeData.skills.map((s) => `${s.value}: ${s.rating}/5`).join(", ")}

JOB TITLE: ${jobTitle}

JOB DESCRIPTION:
${jobDescription}

Based on Brian's resume, skills, and experience, rate how well he matches this job on a scale of 0-100.
Consider: skill alignment, experience level match, role type fit, seniority match.

Respond with ONLY a JSON object, nothing else:
{"score": 85}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 50,
    messages: [{ role: "user", content: prompt }],
  });

  const responseText =
    message.content[0].type === "text"
      ? message.content[0].text
      : '{"score":0}';

  try {
    const parsed = JSON.parse(responseText.trim());
    const score = typeof parsed.score === "number" ? parsed.score : 0;
    return Math.min(100, Math.max(0, Math.round(score)));
  } catch {
    // Try regex fallback
    const match = responseText.match(/\d+/);
    return match ? Math.min(100, parseInt(match[0], 10)) : 0;
  }
}

/**
 * Determine if a job title should be skipped based on SKIP_TITLE_PATTERNS.
 */
function shouldSkipTitle(title: string): boolean {
  const lower = title.toLowerCase();
  return SKIP_TITLE_PATTERNS.some((pattern) => pattern.test(lower));
}

// ─── Main Handler ────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  // Query param modes:
  //   ?cached=true   — return only KV-cached scores, no live fetch (fast path)
  //   ?newOnly=true  — fetch live listings, score only jobs NOT in cache, return new ones
  //   ?refresh=true  — fetch live listings, re-score everything, bypass cache
  //   (default)      — fetch live listings, use cache where available (original behavior)
  const cachedOnly = req.query.cached === "true";
  const newOnly = req.query.newOnly === "true";
  const forceRefresh = req.query.refresh === "true";

  // ── Mode 1: cached=true — instant read from KV, no live fetch ──────────────
  if (cachedOnly) {
    try {
      console.log("Returning cached jobs only...");
      const cached = await getAllCachedJobs();

      const scoredJobs: IScoredJob[] = cached.map(({ jobId, data }) => ({
        jobId,
        title: data.title,
        location: data.location,
        jobUrl: data.jobUrl,
        analyzeUrl: `https://brigarland.com/?url=${encodeURIComponent(data.jobUrl)}`,
        score: data.score,
        fromCache: true,
      }));

      scoredJobs.sort((a, b) => b.score - a.score);

      return res.status(200).json({
        jobs: scoredJobs,
        totalFound: scoredJobs.length,
        skipped: 0,
        cachedCount: scoredJobs.length,
        company: "Anthropic",
      } as ICrawlResponse);
    } catch (error) {
      console.error("Cached-only read error:", error);
      return res.status(500).json({
        error: "Failed to read cache",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // ── Modes 2 / 3 / default: require fetching the live listings page ──────────
  try {
    console.log("Fetching Anthropic job listings...");
    const allJobs = await fetchJobListings();
    console.log(`Found ${allJobs.length} total job listings`);

    const scoredJobs: IScoredJob[] = [];
    let skipped = 0;
    let cachedCount = 0;

    for (const job of allJobs) {
      // Pre-filter non-relevant roles
      if (shouldSkipTitle(job.title)) {
        skipped++;
        continue;
      }

      // Check KV cache
      const cachedScore = forceRefresh ? null : await getCachedScore(job.jobId);

      if (cachedScore) {
        // newOnly mode: skip jobs already in cache — they'll be shown from the
        // existing frontend state; we only want to return genuinely new ones.
        if (newOnly) {
          continue;
        }

        console.log(`Cache hit: ${job.title} → ${cachedScore.score}`);
        scoredJobs.push({
          ...job,
          title: cachedScore.title,
          location: cachedScore.location,
          score: cachedScore.score,
          fromCache: true,
        });
        cachedCount++;
        continue;
      }

      // Cache miss (or forceRefresh) — fetch description and score with Claude
      try {
        console.log(`Scoring: ${job.title}`);
        const description = await fetchJobDescription(job.jobUrl);
        const score = await scoreJobWithClaude(job.title, description);

        await setCachedScore(job.jobId, {
          score,
          title: job.title,
          location: job.location,
          jobUrl: job.jobUrl,
          cachedAt: Date.now(),
        });

        scoredJobs.push({ ...job, score, fromCache: false });

        // Small delay between Claude calls to be kind to rate limits
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (jobError) {
        console.error(`Failed to score job ${job.title}:`, jobError);
      }
    }

    // Sort by score descending
    scoredJobs.sort((a, b) => b.score - a.score);

    return res.status(200).json({
      jobs: scoredJobs,
      totalFound: allJobs.length,
      skipped,
      cachedCount,
      company: "Anthropic",
    } as ICrawlResponse);
  } catch (error) {
    console.error("Crawler error:", error);
    return res.status(500).json({
      error: "Crawl failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
