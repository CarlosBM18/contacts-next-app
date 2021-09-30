import React, { useState } from "react";
import { BasicLayout } from "../components/BasicLayout";
import styles from "../styles/pages/Login.module.css";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TextLink } from "../components/TextLink";
import router from "next/router";
import { useStore } from "../stores";

export default function MyAccount() {
  const { rootStore } = useStore();

  const [deleting, setDeleting] = useState(false);

  const onDelete = async () => {
    setDeleting(true);
    try {
      const userId = rootStore.appStore.user?.id;
      if (userId) {
        await rootStore.apiStore.deleteUser(userId);
        rootStore.alertsStore.createSuccessAlert("User deleted correctly");
        rootStore.appStore.logout();
      }
    } catch (err: any) {
      rootStore.alertsStore.handleErrorResponse(err.response);
    }
    setDeleting(false);
  };

  return (
    <BasicLayout title="My Account">
      <div className={styles.content}>
        <div className={styles.buttonContainer}>
          <Button
            title="Delete account"
            styleType="danger"
            type="submit"
            loading={deleting}
            onClick={onDelete}
          />
        </div>
        <div className={styles.textLinkContainer}>
          <TextLink
            text="Go back"
            onClick={() => {
              router.back();
            }}
          />
        </div>
      </div>
    </BasicLayout>
  );
}
