import { useState } from 'react';
import type { IJobAnalysisRequest, IAnalysisState } from '../../types';
import styles from './Home.module.scss';

function Home() {
  const [jobUrl, setJobUrl] = useState('');
  const [analysisState, setAnalysisState] = useState<IAnalysisState>({
    status: 'idle',
    data: null,
    error: null
  });

  const handleAnalyze = async () => {
    if (!jobUrl.trim()) {
      return;
    }

    setAnalysisState({ status: 'loading', data: null, error: null });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobUrl } as IJobAnalysisRequest)
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysisState({ status: 'complete', data, error: null });
    } catch (error) {
      setAnalysisState({
        status: 'error',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>AI Resume Analyzer</h1>
        <p className={styles.subtitle}>
          Powered by Claude • Analyze job fit with AI-driven insights
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.analyzerCard}>
          <div className={styles.inputGroup}>
            <label htmlFor="job-url">Job Posting URL</label>
            <input
              id="job-url"
              type="url"
              placeholder="https://apply.careers.microsoft.com/..."
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              disabled={analysisState.status === 'loading'}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!jobUrl.trim() || analysisState.status === 'loading'}
            className={styles.analyzeButton}
          >
            {analysisState.status === 'loading' ? 'Analyzing...' : 'Analyze Job Fit'}
          </button>

          {analysisState.status === 'error' && (
            <div className={styles.error}>
              <strong>Error:</strong> {analysisState.error}
            </div>
          )}

          {analysisState.status === 'complete' && analysisState.data && (
            <div className={styles.results}>
              <div className={styles.matchScore}>
                <h2>Match Score</h2>
                <div className={styles.score}>{analysisState.data.matchScore}%</div>
              </div>

              <div className={styles.section}>
                <h3>Strengths</h3>
                <ul>
                  {analysisState.data.strengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>

              {analysisState.data.gaps.length > 0 && (
                <div className={styles.section}>
                  <h3>Growth Areas</h3>
                  <ul>
                    {analysisState.data.gaps.map((gap, i) => (
                      <li key={i}>{gap}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisState.data.relevantStories.length > 0 && (
                <div className={styles.section}>
                  <h3>Relevant Experience Stories</h3>
                  {analysisState.data.relevantStories.map((story) => (
                    <div key={story.id} className={styles.story}>
                      <h4>{story.title}</h4>
                      <p>{story.context}</p>
                      <div className={styles.storySkills}>
                        {story.skills.map((skill, i) => (
                          <span key={i} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className={`${styles.section} ${styles.recommendation}`}>
                <h3>Recommendation</h3>
                <p>{analysisState.data.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Built by Brian Garland • Portfolio project demonstrating AI integration
        </p>
        <a
          href="https://github.com/yourusername/ai-resume-analyzer"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default Home;
