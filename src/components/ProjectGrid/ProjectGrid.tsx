import ProjectPreview from "@/components/ProjectPreview/ProjectPreview";
import styles from "./ProjectGrid.module.scss";
import { Project } from "@/types/Project";

interface Props {
  projects: Project[];
}

const ProjectGrid = ({ projects }: Props) => {
  return (
    <div className={styles.projectGrid}>
      {projects.map((project) => (
        <ProjectPreview
          key={project.id}
          title={project.title}
          imageSrc={project.imageSrc}
          fav={project.fav}
          lastEdit={project.lastEdit}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
