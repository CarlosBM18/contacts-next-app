import { observer } from "mobx-react-lite";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AlertElementProps, AlertStatus } from "../libs/types";
import { useStore } from "../stores";
import styles from "../styles/components/AlertSystem.module.css";

const TIME_TO_SHOW_ALERT = 100;
const TIME_TO_REMOVE_ALERT = 6000;
const TIME_TO_WAIT_ANIMATION_TO_FINISH = 600;

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

  const toggleAlert = () => {
    alertRef.current?.classList.toggle(styles.show);
  };

  const removeAlert = useCallback(() => {
    toggleAlert();
    setTimeout(() => {
      componentRef.current && setVisible(false);
    }, TIME_TO_WAIT_ANIMATION_TO_FINISH);
  }, []);

  useEffect(() => {
    componentRef.current = true;
    () => {
      componentRef.current = false;
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      alertRef.current?.classList.toggle(styles.show);
    }, TIME_TO_SHOW_ALERT);
    setTimeout(() => {
      removeAlert();
    }, TIME_TO_REMOVE_ALERT);

    return () => {
      rootStore.alertsStore.removeAlert(data);
    };
  }, [data, data.id, alertRef, removeAlert, rootStore.alertsStore]);

  const alertStyle = useMemo(() => {
    switch (data.status) {
      case AlertStatus.SUCCESS:
        return styles.alertSuccess;
      case AlertStatus.ERROR:
        return styles.alertError;
    }
  }, [data.status]);

  return (
    <>
      {visible && (
        <div
          ref={alertRef}
          className={`${styles.alertContainer} ${alertStyle}`}
          onClick={removeAlert}
        >
          {data.message}
        </div>
      )}
    </>
  );
};
