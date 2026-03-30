/**
 * KV cache utility for job match scores.
 *
 * Uses Vercel KV (backed by Upstash Redis) to persist scores by job ID so we
 * never re-score the same job posting twice.
 *
 * Env vars (auto-injected by Vercel, prefix set to RESUME during setup):
 *   RESUME_KV_REST_API_URL
 *   RESUME_KV_REST_API_TOKEN
 *   RESUME_KV_REST_API_READ_ONLY_TOKEN
 */

import { createClient } from "@vercel/kv";
import type { ICachedJobScore } from "./types.js";

const KEY_PREFIX = "job:";

// Instantiate with explicit env var names since we used a custom RESUME prefix
const kv = createClient({
  url: process.env.RESUME_KV_REST_API_URL || "",
  token: process.env.RESUME_KV_REST_API_TOKEN || "",
});

export async function getCachedScore(
  jobId: string,
): Promise<ICachedJobScore | null> {
  try {
    const result = await kv.get<ICachedJobScore>(`${KEY_PREFIX}${jobId}`);
    return result ?? null;
  } catch (err) {
    console.warn("KV get failed:", err);
    return null;
  }
}

export async function setCachedScore(
  jobId: string,
  data: ICachedJobScore,
): Promise<void> {
  try {
    // No TTL — job descriptions don't change, so we cache indefinitely
    await kv.set(`${KEY_PREFIX}${jobId}`, data);
  } catch (err) {
    console.warn("KV set failed:", err);
  }
}

/**
 * Extract the numeric Greenhouse job ID from a Greenhouse URL.
 * e.g. https://job-boards.greenhouse.io/anthropic/jobs/5026097008 -> "5026097008"
 */
export function extractJobId(jobUrl: string): string {
  const match = jobUrl.match(/\/jobs\/(\d+)/);
  return match ? match[1] : jobUrl;
}
