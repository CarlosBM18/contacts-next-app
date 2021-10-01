import { observer } from "mobx-react-lite";
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AlertElementProps } from "../libs/types";
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
  const [visible, setVisible] = useState(true);

  const alertRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef(true);

  useEffect(() => {
    componentRef.current = true;
    () => {
      componentRef.current = false;
    };
  }, []);

  const removeAlert = useCallback(() => {
    alertRef.current?.classList.toggle(styles.show);
    setTimeout(() => {
      componentRef.current && setVisible(false);
    }, 600);
  }, [alertRef]);

  useEffect(() => {
    setTimeout(() => {
      alertRef.current?.classList.toggle(styles.show);
    }, 100);
    setTimeout(() => {
      removeAlert();
    }, 6000);

    return () => {
      rootStore.alertsStore.removeAlert(data);
    };
  }, [data, data.id, alertRef, removeAlert, rootStore.alertsStore]);

  const getAlertStyle = () => {
    switch (data.status) {
      case "success":
        return styles.alertSuccess;
      case "error":
        return styles.alertError;
    }
  };

  return (
    <>
      {visible && (
        <div
          ref={alertRef}
          className={`${styles.alertContainer} ${getAlertStyle()}`}
          onClick={removeAlert}
        >
          {data.message}
        </div>
      )}
    </>
  );
};
