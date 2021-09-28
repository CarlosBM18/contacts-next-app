import React, { useState } from "react";
import { BasicLayout } from "../components/BasicLayout";
import styles from "../styles/pages/Login.module.css";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextLink } from "../components/TextLink";
import router from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <BasicLayout title="Login">
      <div className={styles.content}>
        <Input label="Email" value={email} setValue={setEmail} />
        <Input label="Password" value={password} setValue={setPassword} />
        <div className={styles.buttonContainer}>
          <Button
            title="Login"
            type="primary"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className={styles.textLinkContainer}>
          <TextLink
            text="Or create an account"
            onClick={() => {
              router.push("/register");
            }}
          />
        </div>
      </div>
    </BasicLayout>
  );
}
