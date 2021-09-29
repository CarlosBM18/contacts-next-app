import React, { useState } from "react";
import { BasicLayout } from "../components/BasicLayout";
import styles from "../styles/pages/Login.module.css";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextLink } from "../components/TextLink";
import router from "next/router";
import { useStore } from "../stores";

export default function Login() {
  const { rootStore } = useStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    setLoading(true);
    try {
      const res: any = await rootStore.apiStore.login(email, password);
      rootStore.appStore.saveToken(res.data.token, localStorage);
      if (res?.data?.token.length) {
        router.replace("/");
      }
    } catch (err) {
      console.log({ err });
    }
    setLoading(false);
  };

  return (
    <BasicLayout title="Login">
      <div className={styles.content}>
        <Input label="Email" value={email} setValue={setEmail} />
        <Input
          label="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <div className={styles.buttonContainer}>
          <Button title="Login" type="primary" onClick={onPressLogin} />
          {loading && (
            <>
              <br />
              Loading...
            </>
          )}
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
