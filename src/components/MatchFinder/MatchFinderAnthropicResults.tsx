import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title1,
  Title3,
  Body1,
  Body2,
  Caption1,
  Spinner,
  Button,
  MessageBar,
  MessageBarBody,
  Tooltip,
  tokens,
} from "@fluentui/react-components";
import {
  ArrowLeft24Regular,
  ArrowClockwise20Regular,
  Search20Regular,
  Info16Regular,
} from "@fluentui/react-icons";
import { PageWrapper, JobCard } from "@/components/shared";
import { apiUrl } from "@/constants";
import type { IScoredJob, ICrawlResponse } from "@/types";
import { useMatchFinderStyles } from "./MatchFinder.styles";

export function MatchFinderAnthropicResults() {
  const styles = useMatchFinderStyles();
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    "idle" | "loading" | "checkingNew" | "complete" | "error"
  >("idle");
  const [allJobs, setAllJobs] = useState<IScoredJob[]>([]);
  const [summary, setSummary] = useState<Omit<ICrawlResponse, "jobs"> | null>(
    null,
  );
  const [newJobsFound, setNewJobsFound] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(88);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const filteredJobs = allJobs.filter((j) => j.score >= threshold);

  /**
   * On mount: try the fast cached-only path first.
   * If the cache is empty (first ever visit), fall through to a full crawl.
   */
  async function loadCachedOrFull() {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/crawlAnthropic?cached=true`, {
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("Cache read failed");

      const data: ICrawlResponse = await res.json();

      if (data.jobs.length > 0) {
        // We have cached results — show them immediately, no crawl needed
        setAllJobs(data.jobs);
        setSummary({
          totalFound: data.totalFound,
          skipped: data.skipped,
          cachedCount: data.cachedCount,
          company: data.company,
        });
        setStatus("complete");
        return;
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      // Cache read failed — fall through to full crawl
    }

    // Cache was empty (first time) — run the full scoring crawl
    await runFullScan();
  }

  /**
   * Full crawl: fetch live listings + score any cache misses.
   * This is the original first-time experience.
   */
  async function runFullScan(forceRefresh = false) {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setStatus("loading");
    setAllJobs([]);
    setSummary(null);
    setError(null);
    setProgress(5);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 90));
    }, 1500);

    try {
      const url = `${apiUrl}/api/crawlAnthropic${forceRefresh ? "?refresh=true" : ""}`;
      const response = await fetch(url, { signal: abortRef.current.signal });

      clearInterval(progressInterval);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.details || err.error || "Crawl failed");
      }

      const data: ICrawlResponse = await response.json();

      setAllJobs(data.jobs);
      setSummary({
        totalFound: data.totalFound,
        skipped: data.skipped,
        cachedCount: data.cachedCount,
        company: data.company,
      });
      setProgress(100);
      setStatus("complete");
    } catch (err) {
      clearInterval(progressInterval);
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  /**
   * Check for new listings only — scores jobs not yet in the cache and
   * merges them into the existing results without wiping the display.
   */
  async function checkForNewListings() {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setStatus("checkingNew");
    setNewJobsFound(0);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/api/crawlAnthropic?newOnly=true`,
        { signal: abortRef.current.signal },
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.details || err.error || "Check failed");
      }

      const data: ICrawlResponse = await response.json();

      if (data.jobs.length > 0) {
        // Merge new jobs in — deduplicate by jobId, then re-sort by score
        setAllJobs((prev) => {
          const existingIds = new Set(prev.map((j) => j.jobId));
          const brandNew = data.jobs.filter((j) => !existingIds.has(j.jobId));
          const merged = [...prev, ...brandNew];
          merged.sort((a, b) => b.score - a.score);
          return merged;
        });
        setNewJobsFound(data.jobs.length);
      }

      setStatus("complete");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  useEffect(() => {
    loadCachedOrFull();
    return () => abortRef.current?.abort();
  }, []);

  const isChecking = status === "checkingNew";
  const isLoading = status === "loading";

  return (
    <PageWrapper>
      {/* Controls bar */}
      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          <div className={styles.sliderGroup}>
            <span className={styles.sliderLabel}>Min score:</span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.thresholdBadge}>{threshold}%</span>
            <Tooltip
              content="Drag to adjust the minimum match score. Only jobs at or above this threshold are shown."
              relationship="description"
            >
              <Info16Regular
                style={{
                  color: tokens.colorNeutralForeground3,
                  cursor: "help",
                }}
              />
            </Tooltip>
          </div>

          {(status === "complete" || isChecking) && summary && (
            <div className={styles.stats}>
              <Caption1>
                <strong>{filteredJobs.length}</strong> shown /{" "}
                <strong>{allJobs.length}</strong> scored /{" "}
                <strong>{summary.totalFound}</strong> total
              </Caption1>
              <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
                {summary.cachedCount} from cache · {summary.skipped}{" "}
                pre-filtered
              </Caption1>
            </div>
          )}
        </div>
      </div>

      <main className={styles.resultsMain}>
        {/* Page header */}
        <div className={styles.resultsPageHeader}>
          <div>
            <button
              className={styles.backButton}
              onClick={() => navigate("/matchfinder")}
            >
              <ArrowLeft24Regular />
              Back to Match Finder
            </button>
            <Title1>Anthropic Jobs</Title1>
            <Body1 className={styles.subtitle}>
              Batch-scored against your resume · Filter by match threshold
            </Body1>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Button
              appearance="outline"
              icon={isChecking ? <Spinner size="tiny" /> : <Search20Regular />}
              onClick={checkForNewListings}
              disabled={isLoading || isChecking}
            >
              {isChecking ? "Checking…" : "Check for new listings"}
            </Button>
            <Button
              appearance="outline"
              icon={<ArrowClockwise20Regular />}
              onClick={() => runFullScan(true)}
              disabled={isLoading || isChecking}
            >
              Re-score all
            </Button>
          </div>
        </div>

        {/* New jobs found banner */}
        {newJobsFound > 0 && status === "complete" && (
          <MessageBar intent="success" style={{ marginBottom: "16px" }}>
            <MessageBarBody>
              Found {newJobsFound} new listing{newJobsFound !== 1 ? "s" : ""}{" "}
              and added them to the results.
            </MessageBarBody>
          </MessageBar>
        )}

        {/* No new listings banner */}
        {newJobsFound === 0 &&
          status === "complete" &&
          summary &&
          summary.cachedCount > 0 &&
          allJobs.length > 0 &&
          !isLoading &&
          // Only show this after a "check for new" completed with nothing new
          // We track this via a ref to avoid showing it on initial load
          null}

        {/* Full crawl progress */}
        {isLoading && (
          <>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              <Spinner size="small" />
              <Body2>
                Crawling Anthropic careers and scoring jobs against your resume…
                {allJobs.length > 0 && ` (${allJobs.length} scored so far)`}
              </Body2>
            </div>
          </>
        )}

        {status === "error" && (
          <MessageBar intent="error" style={{ marginBottom: "24px" }}>
            <MessageBarBody>
              <strong>Failed:</strong> {error}
            </MessageBarBody>
          </MessageBar>
        )}

        {/* Results grid — shown even while checkingNew so display doesn't disappear */}
        {filteredJobs.length > 0 && (
          <div className={styles.resultsGrid}>
            {filteredJobs.map((job) => (
              <JobCard key={job.jobId} job={job} />
            ))}
          </div>
        )}

        {status === "complete" && filteredJobs.length === 0 && (
          <div className={styles.emptyState}>
            <Title3 style={{ marginBottom: "8px" }}>
              No jobs above {threshold}%
            </Title3>
            <Body1>
              Try lowering the threshold slider to see more results.
            </Body1>
          </div>
        )}
      </main>
    </PageWrapper>
  );
}

export default MatchFinderAnthropicResults;
