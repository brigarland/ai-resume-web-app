/**
 * Web scraper for job postings
 * Extracts job title and description from job posting URLs
 */

import * as cheerio from "cheerio";

export interface IScrapedJobPosting {
  title: string;
  description: string;
  url: string;
  hiringOrganization?: string;
}

/**
 * Normalize URL to ensure it has a protocol
 */
function normalizeUrl(url: string): string {
  const trimmed = url.trim();

  // If URL already has a protocol, return as-is
  if (trimmed.match(/^https?:\/\//i)) {
    return trimmed;
  }

  // Add https:// if missing
  return `https://${trimmed}`;
}

/**
 * Fetch and parse a job posting from a URL
 */
export async function scrapeJobPosting(
  url: string
): Promise<IScrapedJobPosting> {
  try {
    // Normalize the URL to ensure it has a protocol
    const normalizedUrl = normalizeUrl(url);

    // Validate URL format
    try {
      new URL(normalizedUrl);
    } catch (urlError) {
      throw new Error(`Invalid URL format: ${url}`);
    }

    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://www.google.com/",
        DNT: "1",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
        "Cache-Control": "max-age=0",
      },
    });

    if (!response.ok) {
      // Handle common bot detection / access denied status codes
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          `BOT_DETECTED: The website blocked our request (${response.status} ${response.statusText}). This site does not allow automated scraping. Try copying the job description directly instead.`
        );
      }
      // 429 = Rate limited
      if (response.status === 429) {
        throw new Error(
          `BOT_DETECTED: Too many requests (429). This site has rate limiting. Try copying the job description directly instead.`
        );
      }
      throw new Error(
        `Failed to fetch URL: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // PRIORITY 1: Try JSON-LD structured data (cleanest approach)
    const jsonLdData = extractFromJsonLd($, normalizedUrl);
    if (jsonLdData) {
      console.log("Using JSON-LD structured data");
      return jsonLdData;
    }

    // PRIORITY 2: Fall back to HTML scraping
    console.log("JSON-LD not found, falling back to HTML scraping");
    const title = extractJobTitle($);
    const description = extractJobDescription($);

    return { title, description, url: normalizedUrl };
  } catch (error) {
    throw new Error(
      `Scraping failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Extract job data from JSON-LD structured data (schema.org JobPosting)
 * This is the cleanest method - many sites include this metadata
 */
function extractFromJsonLd(
  $: cheerio.CheerioAPI,
  normalizedUrl: string
): IScrapedJobPosting | null {
  const jsonLdScripts = $('script[type="application/ld+json"]');

  for (let i = 0; i < jsonLdScripts.length; i++) {
    try {
      const jsonText = $(jsonLdScripts[i]).html();
      if (!jsonText) continue;

      const data = JSON.parse(jsonText);

      // Check if it's a JobPosting schema
      if (data["@type"] === "JobPosting") {
        const title = data.title || "Job Posting";
        const description = data.description || "";
        // Use the job's own URL if available, otherwise use the normalized fetched URL
        const url = data.url || normalizedUrl;
        const hiringOrganization = data.hiringOrganization?.name || undefined;

        if (description.length > 0) {
          return { title, description, url, hiringOrganization };
        }
      }
    } catch (e) {
      // Skip invalid JSON
      continue;
    }
  }

  return null;
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
 * Extract visible text content - less aggressive approach
 */
function extractJobDescription($: cheerio.CheerioAPI): string {
  // Clone to avoid modifying original
  const $clone = $.root().clone();

  // Remove only truly non-content elements
  $clone.find("script").remove();
  $clone.find("style").remove();
  $clone.find("noscript").remove();

  // Remove navigation - but be careful not to remove main content areas
  $clone.find('nav[role="navigation"]').remove();
  $clone.find('[role="banner"]').remove(); // header
  $clone.find('[role="contentinfo"]').remove(); // footer

  // Try to find main content area - prioritize these selectors
  const contentSelectors = [
    "main",
    '[role="main"]',
    ".job-description",
    ".job-details",
    "#job-description",
    "#job-details",
    "article",
    ".content",
    "#content",
  ];

  let $content = null;
  for (const selector of contentSelectors) {
    const $found = $clone.find(selector);
    if ($found.length > 0 && $found.text().trim().length > 100) {
      $content = $found.first();
      console.log(`Found content using selector: ${selector}`);
      break;
    }
  }

  // Fallback to body if no main content found
  if (!$content) {
    console.log("Using body as fallback");
    $content = $clone.find("body");
  }

  // Get text
  let text = $content.text();

  console.log("Raw text length before cleaning:", text.length);

  // Clean up the text
  text = cleanText(text);

  console.log("Text length after cleaning:", text.length);

  // Limit to 3000 characters to avoid rate limits
  if (text.length > 3000) {
    text = text.substring(0, 3000);
  }

  return text;
}

/**
 * Clean extracted text by removing CSS, JSON, and other non-content
 */
function cleanText(text: string): string {
  // Remove anything that looks like CSS or JSON (contains curly braces)
  text = text.replace(/\{[^}]*\}/g, " ");

  // Remove multiple sequential opening/closing braces
  text = text.replace(/[{}[\]]+/g, " ");

  // Remove common CSS/JS patterns
  text = text.replace(/:\s*#[0-9a-fA-F]{3,6}/g, " "); // color codes
  text = text.replace(/\d+px/g, " "); // pixel values
  text = text.replace(/rgba?\([^)]+\)/g, " "); // rgba colors

  // Remove URLs (but keep the domain for context)
  text = text.replace(/https?:\/\/[^\s]+/g, " ");

  // Remove common noise words/patterns
  text = text.replace(/\bvar[A-Z][a-zA-Z]+\b/g, " "); // variable names like varTheme
  text = text.replace(/\b[a-z]+-[a-z]+-[a-z]+-[a-z]+\b/g, " "); // long kebab-case identifiers

  // Collapse multiple spaces
  text = text.replace(/\s+/g, " ");

  // Remove leading/trailing whitespace
  text = text.trim();

  return text;
}
