import { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Card,
  CardHeader,
  Input,
  Button,
  Text,
  Title1,
  Title2,
  Title3,
  Body1,
  Caption1,
  Badge,
  MessageBar,
  MessageBarBody,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import {
  ChartMultiple24Regular,
  Checkmark24Regular,
  Warning24Regular,
  Book24Regular,
  Link24Regular,
} from "@fluentui/react-icons";
import { apiUrl } from "@/constants/env";
import type { IJobAnalysisRequest, IAnalysisState } from "@/types";
import styles from "./Home.module.scss";

function Home() {
  const [jobUrl, setJobUrl] = useState("");
  const [analysisState, setAnalysisState] = useState<IAnalysisState>({
    status: "idle",
    data: null,
    error: null,
  });

  const handleAnalyze = async () => {
    if (!jobUrl.trim()) {
      return;
    }

    setAnalysisState({ status: "loading", data: null, error: null });

    try {
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobUrl } as IJobAnalysisRequest),
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

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.app}>
        <header className={styles.header}>
          <Title1 className={styles.headerTitle}>AI Resume Analyzer</Title1>
          <Text className={styles.subtitle}>
            Powered by Claude • Analyze job fit with AI-driven insights
          </Text>
        </header>

        <main className={styles.main}>
          <Card className={styles.analyzerCard}>
            <CardHeader
              header={<Title3>Enter Job Posting</Title3>}
              description={
                <Caption1>
                  Paste the URL of a job posting to analyze your fit
                </Caption1>
              }
            />

            <div className={styles.inputGroup}>
              <Text className={styles.inputLabel}>Job Posting URL</Text>
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
            </div>

            <Button
              appearance="primary"
              size="large"
              onClick={handleAnalyze}
              disabled={!jobUrl.trim() || analysisState.status === "loading"}
              icon={
                analysisState.status === "loading" ? (
                  <Spinner size="tiny" />
                ) : (
                  <ChartMultiple24Regular />
                )
              }
              style={{ width: "100%" }}
            >
              {analysisState.status === "loading"
                ? "Analyzing..."
                : "Analyze Job Fit"}
            </Button>

            {analysisState.status === "error" && (
              <MessageBar intent="error" style={{ marginTop: "24px" }}>
                <MessageBarBody>
                  <strong>Error:</strong> {analysisState.error}
                </MessageBarBody>
              </MessageBar>
            )}
          </Card>

          {analysisState.status === "complete" && analysisState.data && (
            <div className={styles.results}>
              <Card className={styles.matchScoreCard}>
                <Title2 className={styles.matchScoreTitle}>Match Score</Title2>
                <div className={styles.score}>
                  {analysisState.data.matchScore}%
                </div>
              </Card>

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

              {analysisState.data.relevantStories.length > 0 && (
                <div className={styles.section}>
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

              <Card className={styles.recommendationCard}>
                <CardHeader header={<Title3>Recommendation</Title3>} />
                <Body1>{analysisState.data.recommendation}</Body1>
              </Card>
            </div>
          )}
        </main>

        <footer className={styles.footer}>
          <Caption1>
            Built by Brian Garland • Portfolio project demonstrating AI
            integration
          </Caption1>
          <br />
          <a
            href="https://github.com/brigarland/ai-resume-analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            View on GitHub
          </a>
        </footer>
      </div>
    </FluentProvider>
  );
}

export default Home;
