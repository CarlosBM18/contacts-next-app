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

  const onPressRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await rootStore.apiStore.createUser(email, password);
      rootStore.alertsStore.createSuccessAlert(
        "User created correctly. Please login"
      );
      router.replace("/login");
    } catch (err: any) {
      rootStore.alertsStore.handleErrorResponse(err.response);
    }
    setLoading(false);
  };

  return (
    <BasicLayout title="Register">
      <div className={styles.content}>
        <form onSubmit={onPressRegister}>
          <Input label="Email" value={email} setValue={setEmail} />
          <Input
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <div className={styles.buttonContainer}>
            <Button
              title="Register"
              styleType="primary"
              type="submit"
              loading={loading}
            />
          </div>
          <div className={styles.textLinkContainer}>
            <TextLink
              text="Or login"
              onClick={() => {
                router.push("/login");
              }}
            />
          </div>
        </form>
      </div>
    </BasicLayout>
  );
}
