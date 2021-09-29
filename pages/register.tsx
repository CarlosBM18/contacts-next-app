import React, { useState } from "react";
import { BasicLayout } from "../components/BasicLayout";
import styles from "../styles/pages/Login.module.css";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextLink } from "../components/TextLink";
import router from "next/router";
import { useStore } from "../stores";

export default function Register() {
  const { rootStore } = useStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressRegister = async () => {
    setLoading(true);
    try {
      await rootStore.apiStore.createUser(email, password);
      router.replace("/login");
    } catch (err) {
      setLoading(false);
      console.log({ err });
    }
  };

  return (
    <BasicLayout title="Register">
      <div className={styles.content}>
        <Input label="Email" value={email} setValue={setEmail} />
        <Input label="Password" value={password} setValue={setPassword} />
        <div className={styles.buttonContainer}>
          <Button title="Register" type="primary" onClick={onPressRegister} />
          {loading && (
            <>
              <br />
              Loading...
            </>
          )}
        </div>
        <div className={styles.textLinkContainer}>
          <TextLink
            text="Or login"
            onClick={() => {
              router.push("/login");
            }}
          />
        </div>
      </div>
    </BasicLayout>
  );
}
