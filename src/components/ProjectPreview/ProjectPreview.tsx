import Image from "next/image";
import styles from "./ProjectPreview.module.scss";
import { getElapsedTime } from "@/utils/getElapsedTime";
import EditNameIcon from "../Icons/EditNameIcon";
import CopyIcon from "../Icons/CopyIcon";
import DeleteIcon from "../Icons/DeleteIcon";
import FavIcon from "../Icons/FavIcon";
import FilledFavIcon from "../Icons/FilledFavIcon";
import placeholder from "@/../public/img/projectPH.jpg";
import { doFetchRequest } from "@/api/fetch";

interface Props {
  name: string;
  imageSrc?: string | undefined;
  fav?: boolean;
  lastEdit: EpochTimeStamp;
  Open: () => void;
  Duplicate: () => void;
}

const ProjectPreview = ({
  name,
  imageSrc,
  lastEdit,
  fav,
  Open,
  Duplicate,
}: Props) => {
  const timePassed = getElapsedTime(lastEdit);

  return (
    <div className={styles.projectCard}>
      <div className={styles.hoverIcons}>
        <div>
          {/*TODO: Create and use edit function */}
          {/* <EditNameIcon /> */}
          {/*TODO: Create and use copy function */}

          <span onClick={Duplicate}>
            <CopyIcon />
          </span>
        </div>
        <div>
          {/*TODO: Create and use delete function */}
          {/* <DeleteIcon /> */}
          {/*TODO: Create and use favorite function */}
          {/* {fav ? <FilledFavIcon /> : <FavIcon />} */}
        </div>
      </div>
      <Image
        src={imageSrc ? imageSrc : placeholder}
        alt={name}
        width={200}
        height={200}
        onClick={Open}
      />
      {/* TODO: Create and use rename function */}
      <div onClick={Open}>
        <p className={`body ${styles.title}`}>{name}</p>
        <p
          className={`detail ${styles.edited}`}
        >{`Edited ${timePassed} ago`}</p>
      </div>
    </div>
  );
};

export default ProjectPreview;
