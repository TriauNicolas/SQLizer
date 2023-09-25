import Image from "next/image";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      {/* <input type="text" placeholder="Search projects..." /> */}
      <div className={styles.userContainer}>
        <Image
          className={styles.userAvatar}
          src={"/img/shrek.jpg"}
          alt={"user avatar"}
          width={32}
          height={32}
        />
        <Image
          className={styles.notifications}
          src={"/icons/alertOn.svg"}
          alt={"notifications"}
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default Header;
