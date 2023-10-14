import Image from "next/image";
import heroBG from "@/../public/heroBG.jpg";
import styles from "./HeroSection.module.scss";
import Link from "next/link";
import SignUpButton from "../SignUpButton/SignUpButton";

const HeroSection = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.wrap}>
          <h1 className="h1 semiBold">SQLizer</h1>
          <h2 className="h2 regular">
            {`Concevez, définissez et affinez vos bases de données SQL à l'aide
            d'une interface simple de type "glisser-déposer".`}
          </h2>
          <SignUpButton text="Essai gratuit" />
        </div>
        <div className={styles.imgHolder}>
          <Image src={heroBG} alt="hero background" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
