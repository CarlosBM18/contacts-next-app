import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";
import { AlertElementProps, AlertObject } from "../libs/types";
import { useStore } from "../stores";
import styles from "../styles/components/AlertSystem.module.css";

export const AlertSystem = observer(() => {
  const { rootStore } = useStore();

  return (
    <div className={styles.alertSystemContainer}>
      {rootStore.alertsStore.alerts.map((alert, index) => (
        <Alert data={alert} key={index} />
      ))}
    </div>
  );
});

const Alert = ({ data }: AlertElementProps) => {
  const { rootStore } = useStore();

  const removeAlert = useCallback(() => {
    rootStore.alertsStore.removeAlert(data.id);
  }, [data.id, rootStore.alertsStore]);

  useEffect(() => {
    setTimeout(() => {
      removeAlert();
    }, 6000);
  }, [data.id, removeAlert, rootStore.alertsStore]);

  const getAlertStyle = () => {
    switch (data.status) {
      case "success":
        return styles.alertSuccess;
      case "error":
        return styles.alertError;
    }
  };

  return (
    <div
      className={`${styles.alertContainer} ${getAlertStyle()}`}
      onClick={removeAlert}
    >
      {data.message}
    </div>
  );
};
