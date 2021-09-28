import React from "react";
import { ButtonProps } from "../libs/types";
import styles from "../styles/components/Button.module.css";

export const Button = ({ title, onClick, type }: ButtonProps) => {
  function buttonType() {
    switch (type) {
      case "primary":
        return styles.button;
      case "danger":
        return `${styles.button} ${styles.buttonDanger}`;
      default:
        return styles.button;
    }
  }
  return (
    <div className={buttonType()} onClick={onClick}>
      {title}
    </div>
  );
};
