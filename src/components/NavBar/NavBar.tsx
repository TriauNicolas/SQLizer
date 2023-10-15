"use client";
import { useSession } from "next-auth/react";
import styles from "./NavBar.module.scss";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <h2 className="h2 bold">SQLizer</h2>
        {status === "authenticated" ? (
          <div className={styles.navItems}>
            <button
              onClick={() =>
                signOut({ callbackUrl: "http://localhost:3000/login" })
              }
              className={`${styles.navItem} ${styles.register}`}
            >
              Se déconnecter
            </button>
          </div>
        ) : (
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
        )}
      </nav>
    </div>
  );
};

export default NavBar;
