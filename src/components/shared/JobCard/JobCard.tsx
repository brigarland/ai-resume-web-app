import {
  Title3,
  Caption1,
  Button,
  Badge,
  Tooltip,
} from "@fluentui/react-components";
import {
  Open16Regular,
  ChartMultiple16Regular,
  Checkmark16Regular,
} from "@fluentui/react-icons";
import { ScoreRing } from "@/components/shared";
import type { IJobCardProps } from "./JobCard.types";
import { useJobCardStyles } from "./JobCard.styles";

function JobCard({ job }: IJobCardProps) {
  const styles = useJobCardStyles();

  return (
    <div className={styles.resultsCard}>
      <div className={styles.cardHeader}>
        <Title3 className={styles.resultsCardTitle}>{job.title}</Title3>
        <ScoreRing score={job.score} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <Caption1 className={styles.location}>{job.location}</Caption1>
        {job.fromCache && (
          <Tooltip content="Score loaded from cache" relationship="description">
            <Badge
              appearance="outline"
              color="informative"
              size="small"
              icon={<Checkmark16Regular />}
            >
              Cached
            </Badge>
          </Tooltip>
        )}
      </div>

      <div className={styles.cardActions}>
        <div className={styles.actionButton}>
          <Button
            as="a"
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            appearance="outline"
            size="small"
            icon={<Open16Regular />}
          >
            Job Posting
          </Button>
        </div>
        <div className={styles.actionButton}>
          <Button
            as="a"
            href={job.analyzeUrl}
            target="_blank"
            rel="noopener noreferrer"
            appearance="primary"
            size="small"
            icon={<ChartMultiple16Regular />}
          >
            Full Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
