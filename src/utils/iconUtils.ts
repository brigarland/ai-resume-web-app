import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faFrog, faMountain, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const getStoryIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    frog: faFrog,
    mountain: faMountain,
    video: faVideo,
    github: faGithub,
  };
  return icons[iconName] || faComment;
};
