import { makeStyles, tokens, shorthands } from "@fluentui/react-components";

export const useJobCardStyles = makeStyles({
  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    ...shorthands.gap("12px"),
  },

  location: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },

  cardActions: {
    display: "flex",
    ...shorthands.gap("8px"),
    marginTop: "auto",
  },

  actionButton: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  resultsCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding("20px"),
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("12px"),
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    transitionProperty: "box-shadow",
    transitionDuration: "150ms",
    ":hover": {
      boxShadow: tokens.shadow8,
    },
  },

  resultsCardTitle: {
    flex: 1,
    lineHeight: "1.3",
  },
});
