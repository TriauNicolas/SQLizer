import styles from "./InfoCardGrid.module.scss";
import InfoCard from "../InfoCard/InfoCard";
import MentionIcon from "../Icons/MentionIcon";
import PersonIcon from "../Icons/PersonIcon";
import CheckmarkIcon from "../Icons/CheckmarkIcon";
import FilledFavIcon from "../Icons/FilledFavIcon";

// TODO: Make dummy user, context user on layout !
const InfoCardGrid = () => {
  return (
    <div className={styles.infoCardGrid}>
      <InfoCard text={"Mentions"} value={350}>
        <MentionIcon />
      </InfoCard>
      <InfoCard text={"Assigned to me"} value={450}>
        <PersonIcon />
      </InfoCard>
      <InfoCard text={"Closed"} value={3500}>
        <CheckmarkIcon />
      </InfoCard>
      <InfoCard text={"Favorites"} value={6}>
        <FilledFavIcon />
      </InfoCard>
    </div>
  );
};

export default InfoCardGrid;
