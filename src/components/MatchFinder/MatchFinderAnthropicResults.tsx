import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title1,
  Title3,
  Body1,
  Caption1,
  Body2,
  Spinner,
  Button,
  MessageBar,
  MessageBarBody,
  Badge,
  Tooltip,
  tokens,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import {
  ArrowLeft24Regular,
  ArrowClockwise20Regular,
  Open16Regular,
  ChartMultiple16Regular,
  Info16Regular,
  Checkmark16Regular,
} from "@fluentui/react-icons";
import { apiUrl } from "@/constants";
import type { IScoredJob, ICrawlResponse } from "./MatchFinder.types";

// ─── Styles ──────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    ...shorthands.padding("24px", "32px"),
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow4,
  },

  headerInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
  },

  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    ...shorthands.gap("16px"),
  },

  backButton: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    color: tokens.colorBrandForeground1,
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
    ":hover": { textDecoration: "underline" },
  },

  subtitle: {
    color: tokens.colorNeutralForeground3,
  },

  controls: {
    ...shorthands.padding("20px", "32px"),
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    justifyContent: "center",
  },

  controlsInner: {
    maxWidth: "1400px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    ...shorthands.gap("24px"),
  },

  sliderGroup: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("16px"),
    flexWrap: "wrap",
  },

  sliderLabel: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    whiteSpace: "nowrap",
  },

  slider: {
    width: "220px",
    accentColor: tokens.colorBrandBackground,
    cursor: "pointer",
    "@media (max-width: 600px)": {
      width: "140px",
    },
  },

  thresholdBadge: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorBrandForeground1,
    minWidth: "52px",
    textAlign: "center",
  },

  stats: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("16px"),
    flexWrap: "wrap",
  },

  main: {
    flex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    ...shorthands.padding("32px"),
    "@media (max-width: 768px)": {
      ...shorthands.padding("24px", "16px"),
    },
  },

  progressBar: {
    width: "100%",
    height: "4px",
    backgroundColor: tokens.colorNeutralBackground4,
    ...shorthands.borderRadius("2px"),
    overflow: "hidden",
    marginBottom: "24px",
  },

  progressFill: {
    height: "100%",
    backgroundColor: tokens.colorBrandBackground,
    transitionProperty: "width",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    ...shorthands.gap("20px"),
  },

  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding("20px"),
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("12px"),
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    transitionProperty: "box-shadow",
    transitionDuration: "150ms",
    ":hover": {
      boxShadow: tokens.shadow8,
    },
  },

  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    ...shorthands.gap("12px"),
  },

  scoreRing: {
    position: "relative",
    width: "64px",
    height: "64px",
    flexShrink: 0,
  },

  scoreRingSvg: {
    width: "100%",
    height: "100%",
    transform: "rotate(-90deg)",
  },

  scoreRingBg: {
    fill: "none",
    stroke: tokens.colorNeutralBackground4,
    strokeWidth: "6",
  },

  scoreRingFg: {
    fill: "none",
    strokeWidth: "6",
    strokeLinecap: "round",
    transitionProperty: "stroke-dashoffset, stroke",
    transitionDuration: "600ms",
    transitionTimingFunction: "ease-out",
  },

  scoreText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "15px",
    fontWeight: tokens.fontWeightBold,
    lineHeight: "1",
  },

  cardTitle: {
    flex: 1,
    lineHeight: "1.3",
  },

  location: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },

  cardActions: {
    display: "flex",
    ...shorthands.gap("8px"),
    marginTop: "auto",
  },

  actionButton: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  emptyState: {
    textAlign: "center",
    ...shorthands.padding("80px", "32px"),
    color: tokens.colorNeutralForeground3,
  },

  footer: {
    textAlign: "center",
    ...shorthands.padding("24px"),
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    marginTop: "auto",
  },

  footerLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    fontWeight: tokens.fontWeightSemibold,
    ":hover": { textDecoration: "underline" },
  },

  cacheTag: {
    marginLeft: "4px",
  },
});

// ─── Score ring color ─────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 80) return tokens.colorPaletteGreenForeground1;
  if (score >= 60) return tokens.colorBrandBackground;
  if (score >= 40) return tokens.colorPaletteYellowForeground2;
  return tokens.colorNeutralForeground3;
}

function ScoreRing({
  score,
  styles,
}: {
  score: number;
  styles: ReturnType<typeof useStyles>;
}) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className={styles.scoreRing}>
      <svg className={styles.scoreRingSvg} viewBox="0 0 64 64">
        <circle className={styles.scoreRingBg} cx="32" cy="32" r={radius} />
        <circle
          className={styles.scoreRingFg}
          cx="32"
          cy="32"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={styles.scoreText} style={{ color }}>
        {score}
      </span>
    </div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({
  job,
  styles,
}: {
  job: IScoredJob;
  styles: ReturnType<typeof useStyles>;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Title3 className={styles.cardTitle}>{job.title}</Title3>
        <ScoreRing score={job.score} styles={styles} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <Caption1 className={styles.location}>{job.location}</Caption1>
        {job.fromCache && (
          <Tooltip content="Score loaded from cache" relationship="description">
            <Badge
              appearance="outline"
              color="informative"
              size="small"
              className={styles.cacheTag}
              icon={<Checkmark16Regular />}
            >
              Cached
            </Badge>
          </Tooltip>
        )}
      </div>

      <div className={styles.cardActions}>
        <div className={styles.actionButton}>
          <Button
            as="a"
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            appearance="outline"
            size="small"
            icon={<Open16Regular />}
          >
            Job Posting
          </Button>
        </div>
        <div className={styles.actionButton}>
          <Button
            as="a"
            href={job.analyzeUrl}
            target="_blank"
            rel="noopener noreferrer"
            appearance="primary"
            size="small"
            icon={<ChartMultiple16Regular />}
          >
            Full Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MatchFinderAnthropicResults() {
  const styles = useStyles();
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
  const [progress, setProgress] = useState(0); // 0-100 for the progress bar estimate
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

    // Simulate progress while waiting (we don't have streaming yet)
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

  // Auto-run on mount
  useEffect(() => {
    runScan();
    return () => abortRef.current?.abort();
  }, []);

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/matchfinder")}
          >
            <ArrowLeft24Regular />
            Back to Match Finder
          </button>
          <div className={styles.headerRow}>
            <div>
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
        </div>
      </header>

      {/* Controls */}
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

      <main className={styles.main}>
        {/* Progress bar */}
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
          <div className={styles.grid}>
            {filteredJobs.map((job) => (
              <JobCard key={job.jobId} job={job} styles={styles} />
            ))}
          </div>
        )}

        {/* Empty state after load */}
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

      <footer className={styles.footer}>
        <Caption1>
          <a href="/" className={styles.footerLink}>
            brigarland.com
          </a>{" "}
          · Match Finder · Anthropic
        </Caption1>
      </footer>
    </div>
  );
}

export default MatchFinderAnthropicResults;
