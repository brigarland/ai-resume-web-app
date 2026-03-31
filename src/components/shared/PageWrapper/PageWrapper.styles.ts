import { makeStyles, tokens, shorthands } from "@fluentui/react-components";
import nasaEarthBg from "@/assets/nasa-earth-header-bg.jpg";

export const usePageWrapperStyles = makeStyles({
  // App shell
  app: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },

  // ── Header ────────────────────────────────────────────────────────────────

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
    ":hover": { textDecoration: "underline" },
  },

  socialLink: {
    color: tokens.colorNeutralForegroundOnBrand,
    textDecoration: "none",
    ":hover": { textDecoration: "underline" },
  },

  resumeLink: {
    color: tokens.colorNeutralForegroundOnBrand,
    textDecoration: "none",
    ":hover": { textDecoration: "underline" },
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

  headerInfoIcon: {
    cursor: "help",
    color: tokens.colorNeutralForegroundOnBrand,
  },

  tooltipContent: {
    maxWidth: "280px",
  },

  videoContainer: {
    ...shorthands.padding("24px", "16px"),
    textAlign: "center",
    "@media (max-width: 1200px)": {
      maxWidth: "100%",
      width: "100%",
    },
  },

  // ── Page content slot ─────────────────────────────────────────────────────

  pageContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  // ── Footer ────────────────────────────────────────────────────────────────

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
