import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <h2 className="h2 bold">SQLizer</h2>
        <div className={styles.navItems}>
          <a href="/login" className={`${styles.navItem} ${styles.login}`}>
            Se connecter
          </a>
          <a
            href="/register"
            className={`${styles.navItem} ${styles.register}`}
          >
            Créer un compte
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
