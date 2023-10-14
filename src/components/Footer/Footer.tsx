import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        <Link href="">About Us</Link>
        <span className={styles.separator} />
        <Link href="">Contact</Link>
        <span className={styles.separator} />
        <Link href="">Blog</Link>
        <span className={styles.separator} />
        <Link href="">Terms of Service</Link>
        <span className={styles.separator} />
        <Link href="">Privacy Policy</Link>
      </div>
      <div>© 2023 SQLizer. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
