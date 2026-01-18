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
} from "@fluentui/react-icons";
import { apiUrl } from "@/constants/env";
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

          {/* Right Column: Results */}
          {analysisState.status === "complete" && analysisState.data && (
            <div className={styles.rightColumn}>
              <div className={styles.resultsGrid}>
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

              {/* Relevant Stories - Full Width */}
              {analysisState.data.relevantStories.length > 0 && (
                <div className={styles.storiesSection}>
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

              {/* Recommendation - Full Width */}
              <div className={styles.recommendationSection}>
                <Card className={styles.recommendationCard}>
                  <CardHeader header={<Title2>Recommendation</Title2>} />
                  <Body1>{analysisState.data.recommendation}</Body1>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <Caption1>
          Built by Brian Garland • Portfolio project demonstrating AI
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
