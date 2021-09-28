import React, { useState } from "react";
import { BasicLayout } from "../../components/BasicLayout";
import styles from "../../styles/pages/Contact.module.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { TextLink } from "../../components/TextLink";
import router from "next/router";

export default function CreateContact() {
  const contactId = router.query.id as string;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
          <Button title="Create" type="primary" />
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
