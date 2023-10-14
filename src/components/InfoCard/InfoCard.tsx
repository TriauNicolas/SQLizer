import styles from "./InfoCard.module.scss";
import MentionIcon from "../Icons/MentionIcon";

interface Props {
  children: React.ReactNode; // Is the svg
  text: string;
  value: number;
}
const InfoCard = ({ children, text, value }: Props) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.svgContainer}>{children}</div>
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
        <p className={`h2 bold ${styles.value}`}>{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
