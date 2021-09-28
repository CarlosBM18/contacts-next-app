import React from "react";
import { InputProps } from "../libs/types";
import styles from "../styles/components/Input.module.css";

export const Input = ({ label, value, setValue }: InputProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.label}>{label}</div>
      <input
        className={styles.input}
        value={value}
        onChange={(event: any) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
};
