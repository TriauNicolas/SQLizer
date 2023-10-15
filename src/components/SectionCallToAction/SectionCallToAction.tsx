import SignUpButton from "../SignUpButton/SignUpButton";
import styles from "./SectionCallToAction.module.scss";

interface Props {
  buttonText: string;
}
const SectionCallToAction = ({ buttonText }: Props) => {
  return (
    <section className={styles.callToAction}>
      <div className={styles.wrap}>
        <h2 className={`h2 semibold`}>
          Commencez à concevoir votre database avec SQLizer
        </h2>
        <SignUpButton text={buttonText} />
      </div>
    </section>
  );
};

export default SectionCallToAction;
