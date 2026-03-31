import { tokens } from "@fluentui/react-components";
import { useScoreRingStyles } from "./ScoreRing.styles";

function getScoreColor(score: number): string {
  if (score >= 80) return tokens.colorPaletteGreenForeground1;
  if (score >= 60) return tokens.colorBrandBackground;
  if (score >= 40) return tokens.colorPaletteYellowForeground2;
  return tokens.colorNeutralForeground3;
}

function ScoreRing({ score }: { score: number }) {
  const styles = useScoreRingStyles();

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className={styles.scoreRing}>
      <svg className={styles.scoreRingSvg} viewBox="0 0 64 64">
        <circle className={styles.scoreRingBg} cx="32" cy="32" r={radius} />
        <circle
          className={styles.scoreRingFg}
          cx="32"
          cy="32"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={styles.scoreText} style={{ color }}>
        {score}
      </span>
    </div>
  );
}

export default ScoreRing;
