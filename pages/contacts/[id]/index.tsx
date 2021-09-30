import React, { useEffect, useState } from "react";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (contact === null && contactId) {
      rootStore.appStore.getContact(Number(contactId));
    }
  }, [contact, contactId, rootStore.appStore]);

  useEffect(() => {
    if (contact) {
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setEmail(contact.email);
      setPhoneNumber(contact.phone_number);
    }
  }, [contact]);

  const onUpdate = async () => {
    try {
      await rootStore.apiStore.updateContact(
        contactId,
        firstName,
        lastName,
        email,
        phoneNumber
      );
      await rootStore.appStore.getContacts();
      rootStore.alertsStore.createSuccessAlert("Updated correctly");
    } catch (err: any) {
      rootStore.alertsStore.handleErrorResponse(err.response);
    }
  };

  const onDelete = async () => {
    try {
      await rootStore.apiStore.deleteContact(contactId);
      await rootStore.appStore.getContacts();
      rootStore.alertsStore.createSuccessAlert("Deleted correctly");
      router.back();
    } catch (err: any) {
      rootStore.alertsStore.handleErrorResponse(err.response);
    }
  };

  return (
    <BasicLayout title="Contact">
      <div className={styles.content}>
        <Input label="First name" value={firstName} setValue={setFirstName} />
        <Input label="Last name" value={lastName} setValue={setLastName} />
        <Input label="Email" value={email} setValue={setEmail} />
        <Input
          label="Phone number"
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
