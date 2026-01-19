/**
 * Web scraper for job postings
 * Extracts job title and description from job posting URLs
 */

import * as cheerio from "cheerio";

export interface IScrapedJobPosting {
  title: string;
  description: string;
  url: string;
}

/**
 * Fetch and parse a job posting from a URL
 */
export async function scrapeJobPosting(
  url: string
): Promise<IScrapedJobPosting> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract job title with h1 -> h2 -> h3 fallback
    const title = extractJobTitle($);

    // Extract job description
    const description = extractJobDescription($);

    return { title, description, url };
  } catch (error) {
    throw new Error(
      `Scraping failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Extract job title with h1 -> h2 -> h3 fallback logic
 */
function extractJobTitle($: cheerio.CheerioAPI): string {
  const candidates = [
    ...Array.from($("h1")).map((el) => $(el).text().trim()),
    ...Array.from($("h2")).map((el) => $(el).text().trim()),
    ...Array.from($("h3")).map((el) => $(el).text().trim()),
  ];

  for (const candidate of candidates) {
    if (isValidJobTitle(candidate)) {
      return candidate;
    }
  }

  return "Job Posting";
}

/**
 * Validate if text looks like a job title
 */
function isValidJobTitle(text: string): boolean {
  if (!text || text.length < 3 || text.length > 200) return false;

  const invalidPatterns = [
    /^(home|about|contact|search|menu|skip to|sign in|apply now)$/i,
    /^(jobs|careers|company)$/i,
    /^\d+$/,
  ];

  return !invalidPatterns.some((pattern) => pattern.test(text));
}

/**
 * Extract job description text
 */
function extractJobDescription($: cheerio.CheerioAPI): string {
  const $body = $("body").clone();
  $body.find("script, style, nav, header, footer, iframe").remove();

  let text = $body.text();
  text = text.replace(/\s+/g, " ").trim();

  // Limit to ~3000 characters to avoid rate limits
  return text.substring(0, 3000);
}
