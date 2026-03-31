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
    "idle" | "loading" | "complete" | "error"
  >("idle");
  const [allJobs, setAllJobs] = useState<IScoredJob[]>([]);
  const [summary, setSummary] = useState<Omit<ICrawlResponse, "jobs"> | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(88);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const filteredJobs = allJobs.filter((j) => j.score >= threshold);

  async function runScan(forceRefresh = false) {
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

  useEffect(() => {
    runScan();
    return () => abortRef.current?.abort();
  }, []);

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

          {status === "complete" && summary && (
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
          <Button
            appearance="outline"
            icon={<ArrowClockwise20Regular />}
            onClick={() => runScan(true)}
            disabled={status === "loading"}
          >
            Re-scan (bypass cache)
          </Button>
        </div>

        {/* Progress */}
        {status === "loading" && (
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
              <strong>Scan failed:</strong> {error}
            </MessageBarBody>
          </MessageBar>
        )}

        {/* Results grid */}
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
