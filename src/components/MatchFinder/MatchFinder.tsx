import { useNavigate } from "react-router-dom";
import {
  Title1,
  Title3,
  Body1,
  Caption1,
  Badge,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import { Search24Regular, ArrowLeft24Regular } from "@fluentui/react-icons";
import type { ICompanyCard } from "./MatchFinder.types";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    ...shorthands.padding("32px"),
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow4,
  },

  headerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
  },

  backButton: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    marginBottom: "8px",
    ":hover": {
      textDecoration: "underline",
    },
  },

  subtitle: {
    color: tokens.colorNeutralForeground3,
  },

  main: {
    flex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    ...shorthands.padding("48px", "32px"),
    "@media (max-width: 768px)": {
      ...shorthands.padding("32px", "16px"),
    },
  },

  sectionLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "24px",
    display: "block",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    ...shorthands.gap("24px"),
  },

  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding("28px"),
    boxShadow: tokens.shadow4,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("16px"),
    transitionProperty: "box-shadow, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    ":hover": {
      boxShadow: tokens.shadow16,
      transform: "translateY(-2px)",
    },
  },

  cardDisabled: {
    opacity: "0.5",
    cursor: "not-allowed",
    ":hover": {
      boxShadow: tokens.shadow4,
      transform: "none",
    },
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: "56px",
    height: "56px",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralBackground1,
    flexShrink: 0,
  },

  cardTitle: {
    marginBottom: "4px",
  },

  footer: {
    textAlign: "center",
    ...shorthands.padding("32px", "24px"),
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
});

const COMPANIES: ICompanyCard[] = [
  {
    id: "anthropic",
    name: "Anthropic",
    description:
      "AI safety company building Claude. ~350 open roles, fully crawlable.",
    logoInitials: "AN",
    color: "#c96442",
    path: "/matchfinder/anthropic",
    isAvailable: true,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    description: "Coming soon — careers.microsoft.com requires JS rendering.",
    logoInitials: "MS",
    color: "#0078d4",
    path: "/matchfinder/microsoft",
    isAvailable: false,
  },
  {
    id: "google",
    name: "Google",
    description: "Coming soon — careers.google.com requires JS rendering.",
    logoInitials: "G",
    color: "#4285f4",
    path: "/matchfinder/google",
    isAvailable: false,
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Coming soon — amazon.jobs requires JS rendering.",
    logoInitials: "A",
    color: "#ff9900",
    path: "/matchfinder/amazon",
    isAvailable: false,
  },
];

export function MatchFinder() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.backButton} onClick={() => navigate("/")}>
            <ArrowLeft24Regular />
            Back to Resume Analyzer
          </button>
          <Title1>Match Finder</Title1>
          <Body1 className={styles.subtitle}>
            Batch-scan job boards and surface roles above your match threshold —
            no more manually testing jobs one by one.
          </Body1>
        </div>
      </header>

      <main className={styles.main}>
        <span className={styles.sectionLabel}>
          <Search24Regular
            style={{ verticalAlign: "middle", marginRight: "6px" }}
          />
          Select a company to scan
        </span>

        <div className={styles.grid}>
          {COMPANIES.map((company) => (
            <div
              key={company.id}
              className={`${styles.card} ${!company.isAvailable ? styles.cardDisabled : ""}`}
              onClick={() => company.isAvailable && navigate(company.path)}
              role="button"
              tabIndex={company.isAvailable ? 0 : -1}
              onKeyDown={(e) => {
                if (
                  company.isAvailable &&
                  (e.key === "Enter" || e.key === " ")
                ) {
                  navigate(company.path);
                }
              }}
            >
              <div className={styles.cardTop}>
                <div
                  className={styles.logo}
                  style={{ backgroundColor: company.color }}
                >
                  {company.logoInitials}
                </div>
                {company.isAvailable ? (
                  <Badge appearance="filled" color="success" size="medium">
                    Available
                  </Badge>
                ) : (
                  <Badge appearance="outline" color="informative" size="medium">
                    Coming Soon
                  </Badge>
                )}
              </div>

              <div>
                <Title3 className={styles.cardTitle}>{company.name}</Title3>
                <Body1>{company.description}</Body1>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <Caption1>
          <a href="/" className={styles.footerLink}>
            brigarland.com
          </a>{" "}
          · AI Resume Analyzer · Match Finder
        </Caption1>
      </footer>
    </div>
  );
}

export default MatchFinder;
