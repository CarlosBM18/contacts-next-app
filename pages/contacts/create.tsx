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

  const onCreateContact = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await rootStore.apiStore.createContact(
        firstName,
        lastName,
        email,
        phoneNumber
      );
      rootStore.appStore.getContacts();
      rootStore.alertsStore.createSuccessAlert("User created correctly");
      router.back();
    } catch (err: any) {
      rootStore.alertsStore.handleErrorResponse(err.response);
    }
  };

  return (
    <BasicLayout title="Contact">
      <div className={styles.content}>
        <form onSubmit={onCreateContact}>
          <Input label="First name" value={firstName} setValue={setFirstName} />
          <Input label="Last name" value={lastName} setValue={setLastName} />
          <Input label="Email" value={email} setValue={setEmail} />
          <Input
            label="Phone number"
            value={phoneNumber}
            setValue={setPhoneNumber}
          />
          <div className={styles.buttonContainer}>
            <Button title="Create" styleType="primary" type="submit" />
          </div>
          <div className={styles.textLinkContainer}>
            <TextLink
              text="Go back"
              onClick={() => {
                router.back();
              }}
            />
          </div>
        </form>
      </div>
    </BasicLayout>
  );
}
