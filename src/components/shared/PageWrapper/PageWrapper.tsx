import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Button, Caption1, Tooltip } from "@fluentui/react-components";
import {
  Mail24Regular,
  Location24Regular,
  DocumentPdf24Regular,
  CodeCircle20Regular,
  Info16Regular,
  ArrowDownload20Regular,
} from "@fluentui/react-icons";
import bgAvatarImg from "@/assets/brian-garland-headshot.jpeg";
import { usePageWrapperStyles } from "./PageWrapper.styles";

interface IPageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: IPageWrapperProps) {
  const styles = usePageWrapperStyles();

  return (
    <div className={styles.app}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Headshot + name */}
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

          {/* Contact info */}
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
                          repository
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

          {/* YouTube embed */}
          <div className={styles.videoContainer}>
            <iframe
              width="280"
              height="158"
              src="https://www.youtube.com/embed/k669GcR1cOg"
              title="AI Integration Tutorial: Building a Smart Resume Web App"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                borderRadius: "8px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            />
          </div>
        </div>
      </header>

      {/* ── Page content (injected by each page) ───────────────────────── */}
      <div className={styles.pageContent}>{children}</div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <Caption1 className={styles.footerSubtitle}>
          Designed and built by Brian Garland | Portfolio project demonstrating
          AI integration
        </Caption1>
        <br />
        <Caption1 className={styles.footerCopyright}>
          © {new Date().getFullYear()} Brian Garland | Open source under{" "}
          <a
            href="https://github.com/brigarland/ai-resume-web-app/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            MIT License
          </a>
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

export default PageWrapper;
