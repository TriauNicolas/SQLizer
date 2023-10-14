import React from "react";
import NavBar from "@/components/NavBar/NavBar";
import HeroSection from "@/components/HeroSection/HeroSection";
import FeatureSection from "@/components/FeatureSection/FeatureSection";
import CallToActionSection from "@/components/SectionCallToAction/SectionCallToAction";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.scss";
import canvasDemo from "@/../public/canvas.png";

const Home = () => {
  return (
    <div className={styles.homeBody}>
      <NavBar />
      <HeroSection />
      <FeatureSection
        title={`Édition visuelle intuitive`}
        desc={`Oubliez les scripts SQL conventionnels. Grâce à l'interface de SQLizer, créez visuellement des tables, établissez des relations et définissez des contraintes en temps réel.`}
        src={canvasDemo}
        reverse
      />
      <FeatureSection
        title={`Modélisation interactive de la base de données`}
        desc={`Représentez sans effort l'architecture complète de votre base de données, en veillant à ce que les données circulent efficacement et à ce que votre structure soit optimisée.`}
        buttonText={`Allez !`}
        src={canvasDemo}
      />
      <FeatureSection
        title={`Collaboration en temps réel`}
        desc={`Le travail d'équipe en toute simplicité. Collaborez avec les membres de votre équipe en temps réel, comme sur Figma. Discutez, concevez et livrez des bases de données en collaboration.`}
        src={canvasDemo}
        reverse
      />
      <CallToActionSection buttonText="Je me lance !" />
      <Footer />
    </div>
  );
};

export default Home;
