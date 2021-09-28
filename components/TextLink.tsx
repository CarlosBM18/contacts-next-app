import React from "react";
import { TextLinkProps } from "../libs/types";
import styles from "../styles/components/TextLink.module.css";

export const TextLink = ({ text, onClick }: TextLinkProps) => {
  return (
    <div className={styles.textLink} onClick={onClick}>
      {text}
    </div>
  );
};
