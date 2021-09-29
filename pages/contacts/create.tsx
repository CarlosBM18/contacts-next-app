import React, { useState } from "react";
import { BasicLayout } from "../../components/BasicLayout";
import styles from "../../styles/pages/Contact.module.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { TextLink } from "../../components/TextLink";
import router from "next/router";
import { useStore } from "../../stores";

export default function CreateContact() {
  // const contactId = router.query.id as string;
  const { rootStore } = useStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onCreateContact = async () => {
    try {
      const res = await rootStore.apiStore.createContact(
        firstName,
        lastName,
        email,
        phoneNumber
      );
      rootStore.appStore.getContacts();
      router.back();
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
          <Button title="Create" type="primary" onClick={onCreateContact} />
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
