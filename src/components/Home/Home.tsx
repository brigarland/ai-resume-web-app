import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
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
  Link24Regular,
  Mail24Regular,
  Location24Regular,
  Video24Regular,
  DocumentText24Regular,
  Info16Regular,
  Link20Regular,
  Mail20Regular,
  ShareAndroid20Regular,
  DocumentPdf24Regular,
  CodeCircle20Regular,
  ArrowDownload20Regular,
} from "@fluentui/react-icons";
import { getStoryIcon } from "@/utils";
import { SkillBadge } from "@/components/SkillBadge";
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
    errorType: undefined,
  });
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [analyzingJobUrl, setAnalyzingJobUrl] = useState<string>("");
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

    // Save the URL being analyzed (or clear if using description)
    setAnalyzingJobUrl(urlToAnalyze || "");
    setAnalysisState({
      status: "loading",
      data: null,
      error: null,
      errorType: undefined,
    });

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
        const errorData = await response.json();
        const errorType = errorData.error || "Analysis failed";
        const errorDetails = errorData.details || "";

        // Throw with combined message that includes type
        throw new Error(`${errorType}|||${errorDetails}`);
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

      setAnalysisState({
        status: "complete",
        data,
        error: null,
        errorType: undefined,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const [errorType, errorDetails] = errorMessage.split("|||");

      setAnalysisState({
        status: "error",
        data: null,
        error: errorDetails || errorType,
        errorType: errorDetails ? errorType : undefined,
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
      setTimeout(async () => {
        await performAnalysis(decodedUrl);
        // Clear the URL parameter and field after auto-submit
        clearUrlParameter();
        setJobUrl("");
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
      await performAnalysis(jobUrl);
      // Clear URL field after successful submission
      setJobUrl("");
    } else {
      performAnalysis(undefined, jobDescription);
    }
  };

  // Generate shareable URL
  const getShareUrl = () => {
    if (analyzingJobUrl) {
      const baseUrl = window.location.origin;
      return `${baseUrl}?url=${encodeURIComponent(analyzingJobUrl)}`;
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
            <div className={styles.contactGrid}>
              {/* Column 1 */}
              <div className={styles.contactColumn}>
                <div className={styles.contactItem}>
                  <Mail24Regular />
                  <a
                    href="mailto:bri.garland@gmail.com"
                    className={styles.emailLink}
                  >
                    bri.garland@gmail.com
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    style={{ fontSize: "20px" }}
                  />
                  <a
                    href="https://www.linkedin.com/in/brian-garland-672477b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    LinkedIn
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <Location24Regular />
                  <span>Seattle, WA</span>
                </div>
              </div>

              {/* Column 2 */}
              <div className={styles.contactColumn}>
                <div className={styles.contactItem}>
                  <FontAwesomeIcon
                    icon={faGithub}
                    style={{ fontSize: "20px" }}
                  />
                  <a
                    href="https://github.com/brigarland"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    brigarland
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <CodeCircle20Regular />
                  <a
                    href="https://github.com/brigarland/ai-resume-web-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    style={{ marginLeft: "4px" }}
                  >
                    Portfolio Code on Github
                  </a>
                  <Tooltip
                    content={{
                      children: (
                        <div className={styles.tooltipContent}>
                          Links to the code for this web app in my public Github
                          repositorys
                        </div>
                      ),
                    }}
                    relationship="description"
                  >
                    <Info16Regular className={styles.headerInfoIcon} />
                  </Tooltip>
                </div>
                <div className={`${styles.contactItem} resume-item-wrapper`}>
                  <DocumentPdf24Regular />
                  <a
                    href="/brian-garland-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resumeLink}
                  >
                    Resume/CV
                  </a>
                  <div className="download-btn-hidden">
                    <Button
                      as="a"
                      href="/brian-garland-resume.pdf"
                      download
                      appearance="outline"
                      size="small"
                      icon={<ArrowDownload20Regular />}
                      className={styles.downloadButton}
                      title="Download PDF"
                    />
                  </div>
                </div>
              </div>
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
            onTabSelect={(_, data) => {
              setInputMode(data.value as TInputMode);
              // Clear both fields when switching tabs
              setJobUrl("");
              setJobDescription("");
            }}
            className={styles.inputTabs}
          >
            <Tab value="url" icon={<Link24Regular />}>
              Job Posting URL
            </Tab>
            <Tab value="description" icon={<DocumentText24Regular />}>
              Job Description
            </Tab>
          </TabList>

          {(analysisState.status === "loading" ||
            analysisState.status === "complete") &&
            analyzingJobUrl && (
              <MessageBar intent="info" style={{ marginBottom: "16px" }}>
                <MessageBarBody>
                  {autoLoaded ? "Auto-analyzing" : "Analyzing"} job posting from{" "}
                  <a
                    href={analyzingJobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: tokens.colorBrandForeground1,
                      textDecoration: "underline",
                    }}
                  >
                    {analyzingJobUrl}
                  </a>
                </MessageBarBody>
              </MessageBar>
            )}

          <div
            className={
              inputMode === "description"
                ? styles.inputFormDescription
                : styles.inputForm
            }
          >
            {inputMode === "url" ? (
              <Input
                type="url"
                placeholder="Paste any job listing URL here..."
                value={jobUrl}
                onChange={(_, data) => setJobUrl(data.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && jobUrl.trim()) {
                    handleAnalyze();
                  }
                }}
                disabled={analysisState.status === "loading"}
                contentBefore={<Link24Regular />}
                size="large"
                style={{ width: "100%" }}
              />
            ) : (
              <Textarea
                placeholder="Paste a job description here, or type in a description manually..."
                value={jobDescription}
                onChange={(_, data) => setJobDescription(data.value)}
                disabled={analysisState.status === "loading"}
                rows={6}
                resize="vertical"
                style={{ width: "100%" }}
              />
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
              className={
                inputMode === "description"
                  ? styles.submitButtonFullWidth
                  : styles.submitButton
              }
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
          {/* Error View for Invalid Job Description */}
          {analysisState.status === "error" &&
            analysisState.errorType === "INVALID_JOB_DESCRIPTION" && (
              <Card
                style={{
                  gridColumn: "1 / -1",
                }}
              >
                <div className={styles.errorView}>
                  <Warning24Regular className={styles.errorIcon} />
                  <Title2 className={styles.errorTitle}>
                    Unable to Scrape Job Description
                  </Title2>
                  <Body1 className={styles.errorMessage}>
                    Sorry, we were unable to scrape a valid job description from{" "}
                    <a
                      href={analyzingJobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: tokens.colorBrandForeground1,
                        textDecoration: "underline",
                      }}
                    >
                      {analyzingJobUrl}
                    </a>
                    .
                  </Body1>
                  <MessageBar intent="info" className={styles.errorHelp}>
                    <MessageBarBody>
                      <strong>For best results:</strong> Be sure to use a job
                      listing/posting with its own URL, not just a page that is
                      a listing of many jobs opening a panel to view the one you
                      selected. In that scenario, the URL alone is not enough
                      info to scrape the information for that specific job, but
                      in most cases panel job listings have a link to view the
                      job posting on its own standalone page and URL.
                    </MessageBarBody>
                  </MessageBar>
                </div>
              </Card>
            )}

          {/* Left Column: Score + Skills */}
          {analysisState.status === "complete" && analysisState.data && (
            <div className={styles.leftColumn}>
              <Card className={styles.scoreCard}>
                {/* Header with Job Title and Share Buttons */}
                <div className={styles.scoreCardHeader}>
                  {analysisState.data.hiringOrganization && (
                    <Caption1 className={styles.scoreCardOrgHeader}>
                      {analysisState.data.hiringOrganization}
                    </Caption1>
                  )}
                  {analysisState.data.jobTitle && (
                    <Title3 className={styles.scoreCardTitle}>
                      {analysisState.data.jobTitle}
                    </Title3>
                  )}
                  <div className={styles.shareButtons}>
                    {nativeShareAvailable && (
                      <div className={styles.shareButton}>
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<ShareAndroid20Regular />}
                          onClick={handleNativeShare}
                        >
                          Share
                        </Button>
                      </div>
                    )}
                    <div className={styles.shareButton}>
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={<Link20Regular />}
                        onClick={handleCopyLink}
                      >
                        Copy Link
                      </Button>
                    </div>
                    <div className={styles.shareButton}>
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={<Mail20Regular />}
                        onClick={handleShareEmail}
                      >
                        Email
                      </Button>
                    </div>
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
                          This score is Claude AI's subjective interpretation
                          based on analyzing Brian's resume, skills (rated 1-5),
                          and personal experience stories against the job
                          posting. Claude considers skill alignment, relevant
                          experience depth, and how well the stories demonstrate
                          required competencies. There's no fixed algorithm -
                          Claude weighs these factors holistically and assigns a
                          0-100 score based on its understanding of job fit. The
                          same resume and job posting might receive slightly
                          different scores if re-analyzed, as LLMs don't have
                          deterministic scoring systems. Consider this a
                          conversation starter, not objective truth. Welcome to
                          the wonderful world of AI uncertainty!
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
                  {analysisState.data.relevantSkills?.map((skill, i) => (
                    <SkillBadge key={i} skill={skill} />
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Main Content Wrapper: Middle + Right Columns */}
          {analysisState.status === "complete" && analysisState.data && (
            <div className={styles.mainContentWrapper}>
              {/* Middle Column: Recommendation + Strengths/Gaps */}
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

              {/* Right Column: Relevant Stories */}
              {analysisState.data.relevantStories.length > 0 && (
                <div className={styles.rightColumn}>
                  {analysisState.data.relevantStories.map((story) => (
                    <Card key={story.id} className={styles.storyCard}>
                      <CardHeader
                        header={
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={getStoryIcon(story.icon)}
                              style={{
                                fontSize: "20px",
                                color: tokens.colorBrandForeground1,
                              }}
                            />
                            <Title3>{story.title}</Title3>
                          </div>
                        }
                      />
                      <Body1>{story.context}</Body1>
                      <div className={styles.storySkills}>
                        {story.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            appearance="outline"
                            color="informative"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <Caption1>
          Built by Brian Garland | Portfolio project demonstrating AI
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
