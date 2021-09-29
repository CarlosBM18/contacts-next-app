import { observer } from "mobx-react-lite";
import router from "next/router";
import React, { useEffect } from "react";
import { BasicLayout } from "../components/BasicLayout";
import { Button } from "../components/Button";
import { ContactObject, ContactElementProps } from "../libs/types";
import { useStore } from "../stores";
import styles from "../styles/pages/Index.module.css";

const index = observer(() => {
  const { rootStore } = useStore();

  useEffect(() => {
    const getInfo = () => {
      !rootStore.appStore.loadingUser && rootStore.appStore.getContacts();
    };
    getInfo();
  }, [rootStore.appStore, rootStore.appStore.loadingUser]);

  const ContactElement = ({ data }: ContactElementProps) => {
    const onSelectContact = () => {
      rootStore.appStore.setSelectedContact(data);
      router.push(`/contacts/${data.id}`);
    };
    return (
      <div className={styles.contactElementContainer} onClick={onSelectContact}>
        <div className={styles.name}>
          {`${data.first_name} ${data.last_name}`}
        </div>
        <div>{data.email}</div>
      </div>
    );
  };

  return (
    <BasicLayout title="Contacts">
      <>
        <div className={styles.createContactButtonContainer}>
          <Button
            title="New contact"
            onClick={() => {
              router.push("/contacts/create");
            }}
            type="primary"
          />
        </div>

        <div className={styles.content}>
          {rootStore.appStore.contacts.map((contact) => (
            <ContactElement data={contact} key={contact.id} />
          ))}
        </div>
      </>
    </BasicLayout>
  );
});

export default index;
