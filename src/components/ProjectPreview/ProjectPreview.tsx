import Image from "next/image";
import styles from "./ProjectPreview.module.scss";

interface Props {
  title: string;
  imageSrc: string;
}

const ProjectPreview = ({ title, imageSrc }: Props) => {
  return (
    <div className={styles.projectCard}>
      <Image src={imageSrc} alt={title} width={200} height={200} />
      <h3>{title}</h3>
    </div>
  );
};

export default ProjectPreview;
