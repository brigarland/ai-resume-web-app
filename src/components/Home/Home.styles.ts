import { makeStyles, tokens, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({
  // Input Section
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

  // Right Column (Stories)
  rightColumn: {
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
});
