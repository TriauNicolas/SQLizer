import Image, { StaticImageData } from "next/image";
import styles from "./FeatureSection.module.scss";
import SignUpButton from "../SignUpButton/SignUpButton";

type Props = {
  title: string;
  desc: string;
  buttonText?: string;
  src: StaticImageData;
  reverse?: boolean;
};
const FeatureSection = ({ title, desc, buttonText, src, reverse }: Props) => {
  return (
    <section className={`${styles.feature} ${reverse && styles.reverse}`}>
      <div className={styles.wrap}>
        <div className={`${styles.wrapper} ${reverse && styles.reverse}`}>
          <div className={styles.textContainer}>
            <>
              <h2 className={`h2 semibold`}>{title}</h2>
              <p className={`description`}>{desc}</p>
            </>
            {buttonText && (
              <div className={`${styles.buttonContainer}`}>
                <SignUpButton text={buttonText} />
              </div>
            )}
          </div>

          <div className={`${styles.imgHolder} ${reverse && styles.reverse}`}>
            <Image src={src} alt={src.src} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
