"use client";
import { useSession } from "next-auth/react";
import styles from "./NavBar.module.scss";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <h2 className="h2 bold">SQLizer</h2>
        {status === "authenticated" ? (
          <div className={styles.navItems}>
            <button
              onClick={() =>
                router.push('/dashboard')
              }
              className={`${styles.navItem} ${styles.register}`}
            >
              Dashboard
            </button>
            <button
              onClick={() =>
                router.push('/user')
              }
              className={`${styles.navItem} ${styles.register}`}
            >
              Mon Compte
            </button>
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
