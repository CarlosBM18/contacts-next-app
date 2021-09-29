import { observer } from "mobx-react-lite";
import router from "next/router";
import React, { useEffect } from "react";
import { BasicLayout } from "../../../components/BasicLayout";
import { TextLink } from "../../../components/TextLink";
import {
  ContactHistoryElementProps,
  ContactHistoryStates,
} from "../../../libs/types";
import { useStore } from "../../../stores";
import styles from "../../../styles/pages/History.module.css";

const History = observer(() => {
  const { rootStore } = useStore();

  useEffect(() => {
    const getInfo = () => {
      const id = rootStore.appStore.selectedContact?.id;
      if (id) {
        console.log("in", id);
        !rootStore.appStore.loadingUser &&
          rootStore.appStore.getContactHistory(id);
      }
    };
    getInfo();
  }, [rootStore.appStore, rootStore.appStore.loadingUser]);

  const getStyleFromState = (state: ContactHistoryStates) => {
    switch (state) {
      case "created":
        return styles.stateCreated;
      case "updated":
        return styles.stateUpdated;
      case "deleted":
        return styles.stateDeleted;
    }
  };

  const ContactHistoryElement = ({ data }: ContactHistoryElementProps) => {
    return (
      <div className={styles.contactHistoryElementContainer}>
        <div className={styles.historyInfoContainer}>
          {`${data.first_name} ${data.last_name}`}
          <br />
          {data.email}
          <br />
          {data.phone_number}
        </div>
        <div className={styles.historyStateContainer}>
          <div
            className={`${styles.stateIndicator} ${getStyleFromState(
              data.state
            )}`}
          >
            {data.state}
          </div>
        </div>
      </div>
    );
  };

  return (
    <BasicLayout title="History">
      <>
        <div className={styles.content}>
          {rootStore.appStore.contactHistory.map((contactHistory) => (
            <ContactHistoryElement
              data={contactHistory}
              key={contactHistory.id}
            />
          ))}
        </div>
        <div className={styles.textLinkContainer}>
          <TextLink
            text="Go back"
            onClick={() => {
              router.back();
            }}
          />
        </div>
      </>
    </BasicLayout>
  );
});

export default History;
