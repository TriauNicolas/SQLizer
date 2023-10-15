"use client";
import Link from "next/link";
import styles from "./SignUpButton.module.scss";

interface Props {
  text: string;
}
const SignUpButton = ({ text }: Props) => {
  return (
    <Link href="/register">
      <button className={`callout regular ${styles.signUpButton}`}>
        {text}
      </button>
    </Link>
  );
};

export default SignUpButton;
