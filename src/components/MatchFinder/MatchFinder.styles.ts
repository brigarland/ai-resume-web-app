import { makeStyles, tokens, shorthands } from "@fluentui/react-components";

export const useMatchFinderStyles = makeStyles({
  subtitle: {
    color: tokens.colorNeutralForeground3,
    marginTop: "8px",
  },

  sectionLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("6px"),
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
    ":hover": { textDecoration: "underline" },
  },

  controls: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    ...shorthands.padding("16px", "32px"),
    display: "flex",
    justifyContent: "center",
    marginBottom: "32px",
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

  emptyState: {
    textAlign: "center",
    ...shorthands.padding("80px", "32px"),
    color: tokens.colorNeutralForeground3,
  },

  // ── Company selector page (/matchfinder) ──────────────────────────────────

  companyMain: {
    flex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    ...shorthands.padding("48px", "32px"),
    "@media (max-width: 768px)": {
      ...shorthands.padding("32px", "16px"),
    },
  },

  companyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    ...shorthands.gap("24px"),
  },

  companyCard: {
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

  companyCardDisabled: {
    opacity: "0.5",
    cursor: "not-allowed",
    ":hover": {
      boxShadow: tokens.shadow4,
      transform: "none",
    },
  },

  companyCardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  companyLogo: {
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

  companyLogoImg: {
    padding: "8px",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  companyCardTitle: {
    marginBottom: "4px",
  },

  companyCardDesc: {
    display: "block",
  },

  // ── Results pages (/matchfinder/anthropic etc.) ───────────────────────────

  resultsMain: {
    flex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    paddingTop: 0,
    paddingRight: "32px",
    paddingBottom: "32px",
    paddingLeft: "32px",
    "@media (max-width: 768px)": {
      paddingRight: "16px",
      paddingBottom: "24px",
      paddingLeft: "16px",
    },
  },

  resultsPageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    ...shorthands.gap("16px"),
    marginBottom: "24px",
  },

  pageHeaderLeft: {
    flex: "1",
    display: "flex",
    alignItems: "center",
  },

  pageHeaderCenter: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("12px"),
  },

  pageHeaderLogo: {
    height: "26px",
    width: "auto",
  },

  pageHeaderTitle: {
    fontSize: "17px",
    fontWeight: "600",
    letterSpacing: "0.18em",
    color: "#1c1c1c",
    textTransform: "uppercase",
  },

  pageHeaderRight: {
    flex: "1",
    display: "flex",
    ...shorthands.gap("8px"),
    justifyContent: "flex-end",
    alignItems: "center",
  },

  infoIcon: {
    color: tokens.colorNeutralForeground3,
    cursor: "help",
  },

  statsSecondary: {
    color: tokens.colorNeutralForeground3,
  },

  successBanner: {
    marginBottom: "16px",
  },

  errorBanner: {
    marginBottom: "24px",
  },

  crawlStatusRow: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("12px"),
    marginBottom: "32px",
  },

  emptyStateTitle: {
    marginBottom: "8px",
  },

  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    ...shorthands.gap("20px"),
  },
});
