import React, { useEffect, useState } from "react";
import { BasicLayout } from "../components/BasicLayout";
import styles from "../styles/pages/Login.module.css";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextLink } from "../components/TextLink";
import router from "next/router";
import { useStore } from "../stores";
import { UserObject } from "../libs/types";

export default function Login() {
  const { rootStore } = useStore();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    rootStore.appStore.cleanUp();
  }, [rootStore.appStore]);

  const onPressLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res: any = await rootStore.apiStore.login(email, password);
      rootStore.appStore.saveUserInfo(res.data.user as UserObject);
      rootStore.appStore.saveToken(res.data.token, localStorage);
      rootStore.alertsStore.createSuccessAlert("Logged correctly");
    } catch (err: any) {
      rootStore.alertsStore.handleErrorResponse(err.response);
    }
    setLoading(false);
  };

  return (
    <BasicLayout title="Login">
      <div className={styles.content}>
        <form onSubmit={onPressLogin}>
          <Input label="Email" value={email} setValue={setEmail} />
          <Input
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <div className={styles.buttonContainer}>
            <Button
              title="Login"
              styleType="primary"
              type="submit"
              loading={loading}
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
        </form>
      </div>
    </BasicLayout>
  );
}
