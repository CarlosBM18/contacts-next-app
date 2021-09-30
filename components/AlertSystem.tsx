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

  const ref = useRef<HTMLDivElement>(null);

  const removeAlert = useCallback(() => {
    ref.current?.classList.toggle(styles.show);
    setTimeout(() => {
      setVisible(false);
    }, 600);
  }, [ref]);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.classList.toggle(styles.show);
    }, 100);
    setTimeout(() => {
      removeAlert();
    }, 6000);

    return () => {
      rootStore.alertsStore.removeAlert(data);
    };
  }, [data, data.id, ref, removeAlert, rootStore.alertsStore]);

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
          ref={ref}
          className={`${styles.alertContainer} ${getAlertStyle()}`}
          onClick={removeAlert}
        >
          {data.message}
        </div>
      )}
    </>
  );
};
