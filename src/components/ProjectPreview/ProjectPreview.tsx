import Image from "next/image";
import styles from "./ProjectPreview.module.scss";
import { getElapsedTime } from "@/utils/getElapsedTime";
import EditNameIcon from "../Icons/EditNameIcon";
import CopyIcon from "../Icons/CopyIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import FavIcon from "../Icons/FavIcon";
import FilledFavIcon from "../Icons/FilledFavIcon";
import placeholder from "@/../public/img/projectPH.jpg";

interface Props {
  title: string;
  imageSrc: string | undefined;
  fav: boolean;
  lastEdit: EpochTimeStamp;
}

const ProjectPreview = ({ title, imageSrc, lastEdit, fav }: Props) => {
  const timePassed = getElapsedTime(lastEdit);

  return (
    <div className={styles.projectCard}>
      <div className={styles.hoverIcons}>
        <div>
          {/*TODO: Create and use edit function */}
          <EditNameIcon />
          {/*TODO: Create and use copy function */}
          <CopyIcon />
        </div>
        <div>
          {/*TODO: Create and use delete function */}
          <DeleteIcon />
          {/*TODO: Create and use favorite function */}
          {fav ? <FilledFavIcon /> : <FavIcon />}
        </div>
      </div>
      <Image
        src={imageSrc ? imageSrc : placeholder}
        alt={title}
        width={200}
        height={200}
      />
      {/* TODO: Create and use rename function */}
      <p className={`body ${styles.title}`}>{title}</p>
      <p className={`detail ${styles.edited}`}>{`Edited ${timePassed} ago`}</p>
    </div>
  );
};

export default ProjectPreview;
