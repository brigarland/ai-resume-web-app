import { Badge, Tooltip, tokens } from "@fluentui/react-components";
import type { ISkill } from "@/types";
import { skillRatingLabels } from "@/constants";

interface ISkillBadgeProps {
  skill: ISkill;
}

/**
 * Get badge color based on rating (1-5)
 * 5 = Dark blue (SME)
 * 1 = Very light neutral (Basic)
 */
const getSkillColor = (rating: number): string => {
  const colors = {
    5: tokens.colorBrandBackground3Static, // Darkest blue - SME
    4: tokens.colorBrandBackground, // Dark blue - Extensive
    3: tokens.colorBrandStroke2, // Medium blue - Moderate
    2: tokens.colorNeutralBackground4, // Light neutral - Basic Knowledge
    1: tokens.colorNeutralBackground3, // Very light neutral - Basic Familiarity
  };
  return colors[rating as keyof typeof colors] || colors[3];
};

const getTextColor = (rating: number): string => {
  // Darker ratings need white text, lighter ones need dark text
  return rating >= 4
    ? tokens.colorNeutralForegroundOnBrand
    : tokens.colorNeutralForeground1;
};

function SkillBadge({ skill }: ISkillBadgeProps) {
  return (
    <Tooltip
      content={skillRatingLabels[skill.rating]}
      relationship="description"
    >
      <Badge
        appearance="filled"
        size="large"
        style={{
          backgroundColor: getSkillColor(skill.rating),
          color: getTextColor(skill.rating),
          cursor: "help",
        }}
      >
        {skill.value}
      </Badge>
    </Tooltip>
  );
}

export default SkillBadge;
