import Image from "next/image";
import styles from "./Header.module.scss";

// Images
import alertOff from "/public/img/icons/alertOff.svg";
import alertOn from "/public/img/icons/alertOn.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      {/* <input type="text" placeholder="Search projects..." /> */}
      <div className={styles.userContainer}>
        <Image
          className={styles.notifications}
          src={alertOn}
          alt={"notifications"}
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default Header;
