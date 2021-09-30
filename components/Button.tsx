import React from "react";
import { ButtonProps } from "../libs/types";
import styles from "../styles/components/Button.module.css";
import { Spinner } from "./Spinner";

export const Button = ({
  styleType,
  onClick,
  type,
  title,
  loading,
  disabled,
}: ButtonProps) => {
  function buttonType() {
    switch (styleType) {
      case "primary":
        return `${styles.button} ${disabled ? styles.buttonDisabled : null}`;
      case "danger":
        return `${styles.button} ${styles.buttonDanger}`;
      default:
        return styles.button;
    }
  }

  return (
    <button
      className={buttonType()}
      onClick={() => {
        !disabled && onClick?.();
      }}
      type={type}
    >
      {loading ? <Spinner /> : title}
    </button>
  );
};
