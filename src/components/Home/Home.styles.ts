import { makeStyles, tokens, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({
  // App Container
  app: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },

  // Header Section
  header: {
    ...shorthands.padding("32px"),
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackgroundHover} 100%)`,
    color: tokens.colorNeutralForegroundOnBrand,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 768px)": {
      ...shorthands.padding("32px", "16px"),
    },
  },

  headerContent: {
    maxWidth: "1400px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    ...shorthands.gap("32px"),
    alignItems: "center",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "1fr",
      ...shorthands.gap("24px"),
    },
    "@media (max-width: 768px)": {
      ...shorthands.gap("16px"),
    },
  },

  headshotSection: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("24px"),
    "@media (max-width: 1200px)": {
      justifyContent: "center",
    },
    "@media (max-width: 768px)": {
      flexDirection: "column",
      ...shorthands.gap("16px"),
    },
  },

  headshot: {
    width: "100px",
    height: "100px",
    ...shorthands.borderRadius("50%"),
    ...shorthands.border("4px", "solid", tokens.colorNeutralBackground1),
    objectFit: "cover",
    boxShadow: tokens.shadow8,
    "@media (max-width: 768px)": {
      width: "80px",
      height: "80px",
    },
  },

  headerInfo: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("4px"),
    "@media (max-width: 768px)": {
      alignItems: "center",
      textAlign: "center",
    },
  },

  name: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.margin(0),
    lineHeight: "1.2",
    "@media (max-width: 768px)": {
      fontSize: "24px",
    },
  },

  title: {
    fontSize: "18px",
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.margin(0),
    opacity: "0.95",
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },

  contactInfo: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("6px"),
    fontSize: "15px",
    color: tokens.colorNeutralForegroundOnBrand,
    opacity: "0.9",
    "@media (max-width: 1200px)": {
      alignItems: "center",
      textAlign: "center",
    },
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
  },

  videoPlaceholder: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    ...shorthands.border("2px", "dashed", "rgba(255, 255, 255, 0.4)"),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding("32px", "24px"),
    textAlign: "center",
    minWidth: "280px",
    backdropFilter: "blur(10px)",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
  },

  videoPlaceholderText: {
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.margin(0),
  },
  // Input Section (new full-width section below header)
  inputSection: {
    ...shorthands.padding("16px", "32px", "32px"),
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      ...shorthands.padding("24px", "16px"),
    },
  },

  inputSectionContent: {
    maxWidth: "1400px",
    width: "100%",
  },

  inputForm: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    ...shorthands.gap("16px"),
    alignItems: "end",
    "@media (max-width: 992px)": {
      gridTemplateColumns: "1fr",
    },
  },

  inputTabs: {
    marginBottom: "16px",
  },

  textareaWrapper: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
  },

  submitButton: {
    minWidth: "200px",
    "@media (max-width: 992px)": {
      width: "100%",
    },
  },

  // Main Content
  main: {
    flex: 1,
    width: "100%",
    maxWidth: "1800px",
    margin: "0 auto",
    ...shorthands.padding("32px"),
    "@media (max-width: 768px)": {
      ...shorthands.padding("24px", "16px"),
    },
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "400px 1fr 400px",
    ...shorthands.gap("32px"),
    alignItems: "start",
    "@media (max-width: 1400px)": {
      gridTemplateColumns: "360px 1fr",
      ...shorthands.gap("24px"),
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
      ...shorthands.gap("24px"),
    },
  },

  // Left Column
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("24px"),
    position: "sticky",
    top: "24px",
    "@media (max-width: 600px)": {
      position: "static",
    },
  },

  analyzerCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("24px"),
    height: "fit-content",
    boxShadow: tokens.shadow4,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  inputGroup: {
    marginBottom: "24px",
  },

  inputLabel: {
    display: "block",
    marginBottom: "8px",
    fontWeight: tokens.fontWeightSemibold,
  },

  // Score Card
  scoreCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("24px"),
    boxShadow: tokens.shadow4,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  scoreCardHeader: {
    marginBottom: "16px",
    textAlign: "center",
  },

  scoreCardTitle: {
    marginBottom: "12px",
  },

  shareButtons: {
    marginTop: "8px",
    display: "flex",
    ...shorthands.gap("8px"),
    flexWrap: "wrap",
  },

  shareButton: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
  },

  scoreGauge: {
    position: "relative",
    width: "180px",
    height: "180px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "16px",
    "@media (max-width: 768px)": {
      width: "150px",
      height: "150px",
    },
  },

  scoreCircle: {
    width: "100%",
    height: "100%",
    transform: "rotate(-90deg)",
  },

  scoreCircleBackground: {
    fill: "none",
    stroke: tokens.colorNeutralBackground2,
    strokeWidth: "12",
  },

  scoreCircleProgress: {
    fill: "none",
    stroke: tokens.colorBrandBackground,
    strokeWidth: "12",
    strokeLinecap: "round",
    transitionProperty: "stroke-dashoffset",
    transitionDuration: "0.8s",
    transitionTimingFunction: "ease-in-out",
  },

  scoreValue: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "48px",
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorBrandBackground,
    lineHeight: "1",
    "@media (max-width: 768px)": {
      fontSize: "40px",
    },
  },

  scoreLabel: {
    fontSize: "14px",
    lineHeight: "0.2",
    color: tokens.colorNeutralForeground2,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginTop: "8px",
  },

  scoreSubtitleContainer: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("6px"),
  },

  scoreSubtitle: {
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
  },

  infoIcon: {
    cursor: "help",
    color: tokens.colorNeutralForeground3,
  },

  tooltipContent: {
    maxWidth: "280px",
  },

  // Skills Card
  skillsCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("24px"),
    boxShadow: tokens.shadow4,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  skillsTitle: {
    marginBottom: "12px",
    textAlign: "center",
  },

  skillsCloud: {
    display: "flex",
    flexWrap: "wrap",
    ...shorthands.gap("8px"),
    justifyContent: "center",
  },

  // Right Column
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("24px"),
  },

  // Middle Column
  middleColumn: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("24px"),
  },

  strengthsGapsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    ...shorthands.gap("24px"),
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },

  // Third Column (Stories)
  storiesColumn: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("24px"),
  },

  resultsGrid: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("24px"),
  },

  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("24px"),
    minHeight: "200px",
    boxShadow: tokens.shadow4,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  sectionTitle: {
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
  },

  list: {
    ...shorthands.margin(0),
    paddingLeft: "32px",
  },

  listItem: {
    marginBottom: "8px",
    lineHeight: "1.6",
  },

  // Stories Section
  storiesSection: {
    gridColumn: "1 / -1",
  },

  storyCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("24px"),
    marginBottom: "16px",
    boxShadow: tokens.shadow4,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  storySkills: {
    display: "flex",
    flexWrap: "wrap",
    ...shorthands.gap("8px"),
    marginTop: "8px",
  },

  // Recommendation Section
  recommendationSection: {
    gridColumn: "1 / -1",
  },

  recommendationCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("24px"),
    boxShadow: tokens.shadow4,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },

  // Footer
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
    ":hover": {
      textDecoration: "underline",
    },
  },
});
