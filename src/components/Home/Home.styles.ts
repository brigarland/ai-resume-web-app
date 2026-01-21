import { makeStyles, tokens, shorthands } from "@fluentui/react-components";
import nasaEarthBg from "@/assets/nasa-earth-header-bg.jpg";

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
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${nasaEarthBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
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
    ...shorthands.gap("16px"),
    fontSize: "15px",
    color: tokens.colorNeutralForegroundOnBrand,
    opacity: "0.9",
    "@media (max-width: 1200px)": {
      alignItems: "center",
      textAlign: "center",
    },
  },

  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    ...shorthands.gap("24px", "32px"),
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "1fr 1fr",
      ...shorthands.gap("16px", "24px"),
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      ...shorthands.gap("16px"),
    },
  },

  contactColumn: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
  },

  emailLink: {
    color: tokens.colorNeutralForegroundOnBrand,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },

  socialLink: {
    color: tokens.colorNeutralForegroundOnBrand,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },

  resumeLink: {
    color: tokens.colorNeutralForegroundOnBrand,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },

  resumeContainer: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("4px"),
  },

  resumeContainerHover: {
    ":hover + .downloadButtonHidden": {
      opacity: "1",
      visibility: "visible",
    },
  },

  downloadButton: {
    marginLeft: "4px",
    minWidth: "auto",
    color: tokens.colorNeutralForegroundOnBrand,
    borderTopColor: tokens.colorNeutralForegroundOnBrand,
    borderRightColor: tokens.colorNeutralForegroundOnBrand,
    borderBottomColor: tokens.colorNeutralForegroundOnBrand,
    borderLeftColor: tokens.colorNeutralForegroundOnBrand,
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderTopColor: tokens.colorNeutralForegroundOnBrand,
      borderRightColor: tokens.colorNeutralForegroundOnBrand,
      borderBottomColor: tokens.colorNeutralForegroundOnBrand,
      borderLeftColor: tokens.colorNeutralForegroundOnBrand,
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },

  externalIcon: {
    fontSize: "12px",
    marginLeft: "2px",
  },

  resumeDownloadSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.gap("8px"),
    ...shorthands.padding("12px"),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backdropFilter: "blur(10px)",
    minWidth: "240px",
    maxWidth: "240px",
    "@media (max-width: 1200px)": {
      maxWidth: "100%",
      width: "100%",
    },
  },

  resumeButton: {
    width: "100%",
    color: tokens.colorNeutralForegroundOnBrand,
    ":hover": {
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },

  resumeSubtitle: {
    textAlign: "center",
    color: tokens.colorNeutralForegroundOnBrand,
    opacity: "0.85",
    fontSize: "11px",
    maxWidth: "220px",
    lineHeight: "1.3",
  },
  videoPlaceholder: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    ...shorthands.border("2px", "dashed", "rgba(255, 255, 255, 0.4)"),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding("24px", "16px"),
    textAlign: "center",
    minWidth: "200px",
    maxWidth: "200px",
    backdropFilter: "blur(10px)",
    "@media (max-width: 1200px)": {
      maxWidth: "100%",
      width: "100%",
    },
  },

  videoPlaceholderText: {
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.margin(0),
    lineHeight: "1.3",
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

  inputFormDescription: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("16px"),
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

  submitButtonFullWidth: {
    width: "100%",
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
    gridTemplateColumns: "400px 1fr",
    ...shorthands.gap("32px"),
    alignItems: "start",
    "@media (max-width: 850px)": {
      gridTemplateColumns: "1fr",
      ...shorthands.gap("24px"),
    },
  },

  // Wrapper for middle + right columns
  mainContentWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    ...shorthands.gap("32px"),
    "@media (max-width: 1400px)": {
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
    "@media (max-width: 850px)": {
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

  scoreCardOrgHeader: {
    textAlign: "center",
    marginBottom: "4px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: tokens.colorNeutralForeground2,
    display: "block",
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
    fontSize: "12px",
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

  headerInfoIcon: {
    cursor: "help",
    color: tokens.colorNeutralForegroundOnBrand,
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
  //   rightColumn: {
  //     display: "flex",
  //     flexDirection: "column",
  //     ...shorthands.gap("24px"),
  //   },

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
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "1fr",
    },
    "@media (min-width: 1201px) and (max-width: 1400px)": {
      gridTemplateColumns: "1fr 1fr",
    },
    "@media (min-width: 1401px) and (max-width: 1600px)": {
      gridTemplateColumns: "1fr",
    },
    "@media (min-width: 1601px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },

  // Third Column (Stories)
  rightColumn: {
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

  // Error View
  errorView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    ...shorthands.padding("64px", "32px"),
    minHeight: "400px",
  },

  errorIcon: {
    fontSize: "64px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "24px",
  },

  errorTitle: {
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
  },

  errorMessage: {
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
    maxWidth: "600px",
    marginBottom: "24px",
  },

  errorHelp: {
    maxWidth: "700px",
  },

  wrappableLink: {
    wordBreak: "break-all",
    overflowWrap: "anywhere",
    display: "inline",
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

  footerSubtitle: {
    color: tokens.colorNeutralForeground3,
  },

  footerCopyright: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: tokens.colorNeutralForeground2,
  },
});
