import { makeStyles, tokens } from "@fluentui/react-components";

export const useScoreRingStyles = makeStyles({
  scoreRing: {
    position: "relative",
    width: "64px",
    height: "64px",
    flexShrink: 0,
  },

  scoreRingSvg: {
    width: "100%",
    height: "100%",
    transform: "rotate(-90deg)",
  },

  scoreRingBg: {
    fill: "none",
    stroke: tokens.colorNeutralBackground4,
    strokeWidth: "6",
  },

  scoreRingFg: {
    fill: "none",
    strokeWidth: "6",
    strokeLinecap: "round",
    transitionProperty: "stroke-dashoffset, stroke",
    transitionDuration: "600ms",
    transitionTimingFunction: "ease-out",
  },

  scoreText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "15px",
    fontWeight: tokens.fontWeightBold,
    lineHeight: "1",
  },
});
