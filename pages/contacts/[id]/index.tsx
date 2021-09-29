import React, { useState } from "react";
import { BasicLayout } from "../../../components/BasicLayout";
import styles from "../../../styles/pages/Contact.module.css";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { TextLink } from "../../../components/TextLink";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores";
import { useRouter } from "next/router";

const Contact = observer(() => {
  const router = useRouter();
  const contactId = router.query.id as string;
  const { rootStore } = useStore();
  const contact = rootStore.appStore.selectedContact;
  const [firstName, setFirstName] = useState(contact?.first_name || "");
  const [lastName, setLastName] = useState(contact?.last_name || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(contact?.phone_number || "");

  const onUpdate = async () => {
    try {
      const res = await rootStore.apiStore.updateContact(
        contactId,
        firstName,
        lastName,
        email,
        phoneNumber
      );
      await rootStore.appStore.getContacts();
      router.back();
      console.log({ res });
    } catch (err) {
      console.log({ err });
    }
  };

  const onDelete = async () => {
    try {
      const res = await rootStore.apiStore.deleteContact(contactId);
      await rootStore.appStore.getContacts();
      router.back();
      console.log({ res });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <BasicLayout title="Contact">
      <div className={styles.content}>
        <Input label="First Name" value={firstName} setValue={setFirstName} />
        <Input label="Last Name" value={lastName} setValue={setLastName} />
        <Input label="Email" value={email} setValue={setEmail} />
        <Input
          label="Phone Number"
          value={phoneNumber}
          setValue={setPhoneNumber}
        />
        <div className={styles.buttonContainer}>
          <Button title="Update" type="primary" onClick={onUpdate} />
        </div>
        <div className={styles.buttonContainer}>
          <Button title="Delete" type="danger" onClick={onDelete} />
        </div>
        <div className={styles.textLinksContainers}>
          <div className={styles.textLinkContainer}>
            <TextLink
              text="History"
              onClick={() => {
                router.push(`/contacts/${contactId}/history`);
              }}
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
      </div>
    </BasicLayout>
  );
});

export default Contact;
