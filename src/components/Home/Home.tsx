import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Input,
  Textarea,
  Button,
  Text,
  Title2,
  Title3,
  Body1,
  Caption1,
  Badge,
  MessageBar,
  MessageBarBody,
  Spinner,
  Tab,
  TabList,
  Tooltip,
  tokens,
} from "@fluentui/react-components";
import {
  ChartMultiple24Regular,
  Checkmark24Regular,
  Warning24Regular,
  Book24Regular,
  Link24Regular,
  Mail24Regular,
  Location24Regular,
  Video24Regular,
  DocumentText24Regular,
  Info16Regular,
  Link20Regular,
  Mail20Regular,
  ShareAndroid20Regular,
} from "@fluentui/react-icons";
import { apiUrl, isDebugMode } from "@/constants";
import bgAvatarImg from "@/assets/brian-garland-headshot.jpeg";
import type { IJobAnalysisRequest, IAnalysisState } from "@/types";
import { useStyles } from "./Home.styles";

type TInputMode = "url" | "description";

function Home() {
  const styles = useStyles();

  const [inputMode, setInputMode] = useState<TInputMode>("url");
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisState, setAnalysisState] = useState<IAnalysisState>({
    status: "idle",
    data: null,
    error: null,
  });
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [nativeShareAvailable, setNativeShareAvailable] = useState(false);

  // Check if native share is available
  useEffect(() => {
    setNativeShareAvailable(!!navigator.share);
  }, []);

  // Extracted analysis function that can be called with any URL or description
  const performAnalysis = async (
    urlToAnalyze?: string,
    descriptionToAnalyze?: string
  ) => {
    if (!urlToAnalyze?.trim() && !descriptionToAnalyze?.trim()) {
      return;
    }

    setAnalysisState({ status: "loading", data: null, error: null });

    try {
      const requestBody: IJobAnalysisRequest = urlToAnalyze
        ? { jobUrl: urlToAnalyze }
        : { jobDescription: descriptionToAnalyze };

      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();

      // DEBUG LOGGING
      if (isDebugMode) {
        console.log("=== ANALYSIS RESPONSE ===");
        console.log("Job Title:", data.jobTitle);
        console.log("Match Score:", data.matchScore);
        console.log("Job Description Length:", data.jobDescription?.length);
        console.log(
          "Job Description Preview:",
          data.jobDescription?.substring(0, 500)
        );
        console.log("========================");
      }

      setAnalysisState({ status: "complete", data, error: null });
    } catch (error) {
      setAnalysisState({
        status: "error",
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // Check for URL parameter and auto-submit on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get("url");

    if (urlParam) {
      const decodedUrl = decodeURIComponent(urlParam);
      setJobUrl(decodedUrl);
      setInputMode("url");
      setAutoLoaded(true);

      // Auto-submit after setting the URL
      // Small delay to ensure state is updated and UI has rendered
      setTimeout(() => {
        performAnalysis(decodedUrl);
        // Clear the URL parameter after auto-submit to avoid confusion
        clearUrlParameter();
      }, 100);
    }
  }, []);

  // Clear the URL parameter from the address bar
  const clearUrlParameter = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("url");
    window.history.replaceState({}, "", url.pathname);
  };

  const handleAnalyze = async () => {
    // Clear URL parameter if present (user is manually submitting a new analysis)
    clearUrlParameter();
    setAutoLoaded(false);

    if (inputMode === "url") {
      performAnalysis(jobUrl);
    } else {
      performAnalysis(undefined, jobDescription);
    }
  };

  // Generate shareable URL
  const getShareUrl = () => {
    if (inputMode === "url" && jobUrl) {
      const baseUrl = window.location.origin;
      return `${baseUrl}?url=${encodeURIComponent(jobUrl)}`;
    }
    return window.location.href;
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Could add a toast notification here
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // Share via email
  const handleShareEmail = () => {
    const shareUrl = getShareUrl();
    const jobTitleText = analysisState.data?.jobTitle
      ? `${analysisState.data.jobTitle} - `
      : "";
    const subject = encodeURIComponent(
      `${jobTitleText}Job Analysis from Brian Garland`
    );
    const body = encodeURIComponent(
      `Check out this job analysis:\n\n${shareUrl}\n\nMatch Score: ${analysisState.data?.matchScore}%`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Native share (if available)
  const handleNativeShare = async () => {
    if (navigator.share) {
      const shareUrl = getShareUrl();
      const jobTitleText = analysisState.data?.jobTitle
        ? `${analysisState.data.jobTitle} - `
        : "";
      try {
        await navigator.share({
          title: `${jobTitleText}Job Analysis`,
          text: `Match Score: ${analysisState.data?.matchScore}%`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    }
  };

  // Calculate circular progress for score gauge
  const calculateCircleProgress = (score: number) => {
    const radius = 84; // Half of 180 - stroke width
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    return { circumference, offset };
  };

  const scoreData = analysisState.data?.matchScore
    ? calculateCircleProgress(analysisState.data.matchScore)
    : { circumference: 527.79, offset: 527.79 };

  const isFormValid =
    inputMode === "url" ? jobUrl.trim() : jobDescription.trim();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headshotSection}>
            <img
              src={bgAvatarImg}
              alt="Brian Garland"
              className={styles.headshot}
            />
            <div className={styles.headerInfo}>
              <h1 className={styles.name}>Brian Garland</h1>
              <p className={styles.title}>AI Prototype Technologist</p>
            </div>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail24Regular />
              <span>bri.garland@gmail.com</span>
            </div>
            <div className={styles.contactItem}>
              <Location24Regular />
              <span>Seattle, WA</span>
            </div>
          </div>

          <div className={styles.videoPlaceholder}>
            <Video24Regular style={{ marginBottom: "8px" }} fontSize={24} />
            <p className={styles.videoPlaceholderText}>
              Project case study video coming soon
            </p>
          </div>
        </div>
      </header>

      {/* Input Section */}
      <section className={styles.inputSection}>
        <div className={styles.inputSectionContent}>
          <TabList
            selectedValue={inputMode}
            onTabSelect={(_, data) => setInputMode(data.value as TInputMode)}
            className={styles.inputTabs}
          >
            <Tab value="url" icon={<Link24Regular />}>
              Job Posting URL
            </Tab>
            <Tab value="description" icon={<DocumentText24Regular />}>
              Job Description
            </Tab>
          </TabList>

          {autoLoaded && inputMode === "url" && (
            <MessageBar intent="info" style={{ marginBottom: "16px" }}>
              <MessageBarBody>
                Auto-analyzing job posting from shared link...
              </MessageBarBody>
            </MessageBar>
          )}

          <div className={styles.inputForm}>
            {inputMode === "url" ? (
              <Input
                type="url"
                placeholder="https://apply.careers.microsoft.com/..."
                value={jobUrl}
                onChange={(_, data) => setJobUrl(data.value)}
                disabled={analysisState.status === "loading"}
                contentBefore={<Link24Regular />}
                size="large"
                style={{ width: "100%" }}
              />
            ) : (
              <div className={styles.textareaWrapper}>
                <Textarea
                  placeholder="Paste the job description here, or type it in..."
                  value={jobDescription}
                  onChange={(_, data) => setJobDescription(data.value)}
                  disabled={analysisState.status === "loading"}
                  rows={6}
                  resize="vertical"
                  style={{ width: "100%" }}
                />
              </div>
            )}

            <Button
              appearance="primary"
              size="large"
              onClick={handleAnalyze}
              disabled={!isFormValid || analysisState.status === "loading"}
              icon={
                analysisState.status === "loading" ? (
                  <Spinner size="tiny" />
                ) : (
                  <ChartMultiple24Regular />
                )
              }
              className={styles.submitButton}
            >
              {analysisState.status === "loading"
                ? "Analyzing..."
                : "Analyze Job Fit"}
            </Button>
          </div>

          {analysisState.status === "error" && (
            <MessageBar intent="error" style={{ marginTop: "16px" }}>
              <MessageBarBody>
                <strong>Error:</strong> {analysisState.error}
              </MessageBarBody>
            </MessageBar>
          )}
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.contentGrid}>
          {/* Left Column: Score + Skills */}
          {analysisState.status === "complete" && analysisState.data && (
            <div className={styles.leftColumn}>
              <Card className={styles.scoreCard}>
                {/* Header with Job Title and Share Buttons */}
                <div className={styles.scoreCardHeader}>
                  {analysisState.data.jobTitle && (
                    <Title3 className={styles.scoreCardTitle}>
                      {analysisState.data.jobTitle}
                    </Title3>
                  )}
                  <div className={styles.shareButtons}>
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Link20Regular />}
                      onClick={handleCopyLink}
                    >
                      Copy Link
                    </Button>
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Mail20Regular />}
                      onClick={handleShareEmail}
                    >
                      Email
                    </Button>
                    {nativeShareAvailable && (
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={<ShareAndroid20Regular />}
                        onClick={handleNativeShare}
                      >
                        Share
                      </Button>
                    )}
                  </div>
                </div>

                <div className={styles.scoreGauge}>
                  <svg className={styles.scoreCircle} viewBox="0 0 180 180">
                    <circle
                      className={styles.scoreCircleBackground}
                      cx="90"
                      cy="90"
                      r="84"
                    />
                    <circle
                      className={styles.scoreCircleProgress}
                      cx="90"
                      cy="90"
                      r="84"
                      strokeDasharray={scoreData.circumference}
                      strokeDashoffset={scoreData.offset}
                    />
                  </svg>
                  <div className={styles.scoreValue}>
                    {analysisState.data.matchScore}%
                  </div>
                </div>
                <Text className={styles.scoreLabel}>Match Score</Text>
                <div className={styles.scoreSubtitleContainer}>
                  <Caption1 className={styles.scoreSubtitle}>
                    Claude AI (Sonnet 4.5)'s arbitrary opinion
                  </Caption1>
                  <Tooltip
                    content={{
                      children: (
                        <div className={styles.tooltipContent}>
                          This score is entirely generated by Claude AI based on
                          its subjective analysis. There's no algorithmic
                          scoring system - just an LLM's interpretation of how
                          well the resume matches the job description. Consider
                          it a conversation starter, not an objective truth.
                          Welcome to the wonderful world of AI uncertainty!
                        </div>
                      ),
                    }}
                    relationship="description"
                  >
                    <Info16Regular className={styles.infoIcon} />
                  </Tooltip>
                </div>
              </Card>

              {/* Relevant Skills Cloud */}
              <Card className={styles.skillsCard}>
                <Title3 className={styles.skillsTitle}>Relevant Skills</Title3>
                <div className={styles.skillsCloud}>
                  {[
                    "React",
                    "TypeScript",
                    "JavaScript",
                    "Azure",
                    "C#",
                    "Python",
                    "Agile",
                    "UI/UX Design",
                    "Fluent UI",
                    "Data Visualization",
                    "RESTful APIs",
                    "SQL",
                  ].map((skill, i) => (
                    <Badge
                      key={i}
                      appearance="filled"
                      color="brand"
                      size="large"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Middle Column: Recommendation + Strengths/Gaps */}
          {analysisState.status === "complete" && analysisState.data && (
            <div className={styles.middleColumn}>
              {/* Recommendation - Full Width */}
              <Card className={styles.recommendationCard}>
                <CardHeader header={<Title2>Recommendation</Title2>} />
                <Body1>{analysisState.data.recommendation}</Body1>
              </Card>

              {/* Strengths and Growth Areas in 2 columns */}
              <div className={styles.strengthsGapsGrid}>
                {/* Strengths */}
                <Card className={styles.section}>
                  <div className={styles.sectionTitle}>
                    <Checkmark24Regular
                      color={tokens.colorPaletteGreenForeground1}
                    />
                    <Title3>Strengths</Title3>
                  </div>
                  <ul className={styles.list}>
                    {analysisState.data.strengths.map((strength, i) => (
                      <li key={i} className={styles.listItem}>
                        <Body1>{strength}</Body1>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Growth Areas */}
                {analysisState.data.gaps.length > 0 && (
                  <Card className={styles.section}>
                    <div className={styles.sectionTitle}>
                      <Warning24Regular
                        color={tokens.colorPaletteYellowForeground2}
                      />
                      <Title3>Growth Areas</Title3>
                    </div>
                    <ul className={styles.list}>
                      {analysisState.data.gaps.map((gap, i) => (
                        <li key={i} className={styles.listItem}>
                          <Body1>{gap}</Body1>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Third Column: Relevant Stories */}
          {analysisState.status === "complete" &&
            analysisState.data &&
            analysisState.data.relevantStories.length > 0 && (
              <div className={styles.storiesColumn}>
                <div className={styles.sectionTitle}>
                  <Book24Regular color={tokens.colorBrandForeground1} />
                  <Title3>Relevant Experience Stories</Title3>
                </div>
                {analysisState.data.relevantStories.map((story) => (
                  <Card key={story.id} className={styles.storyCard}>
                    <CardHeader
                      header={<Title3>{story.title}</Title3>}
                      description={<Body1>{story.context}</Body1>}
                    />
                    <div className={styles.storySkills}>
                      {story.skills.map((skill, i) => (
                        <Badge key={i} appearance="outline" color="informative">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
        </div>
      </main>

      <footer className={styles.footer}>
        <Caption1>
          Built by Brian Garland Ã¢â‚¬Â¢ Portfolio project demonstrating AI
          integration
        </Caption1>
        <br />
        <a
          href="https://github.com/brigarland/ai-resume-web-app"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default Home;
