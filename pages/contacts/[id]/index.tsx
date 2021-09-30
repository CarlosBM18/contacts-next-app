import React, { useEffect, useMemo, useState } from "react";
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
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

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

  const onUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (someChange) {
      setUpdating(true);
      try {
        await rootStore.apiStore.updateContact(
          contactId,
          firstName,
          lastName,
          email,
          phoneNumber
        );
        await rootStore.appStore.getContacts();
        await rootStore.appStore.getContact(Number(contactId));
        rootStore.alertsStore.createSuccessAlert("Contact updated correctly");
      } catch (err: any) {
        rootStore.alertsStore.handleErrorResponse(err.response);
      }
      setUpdating(false);
    }
  };

  const onRemove = async () => {
    setRemoving(true);
    try {
      await rootStore.apiStore.removeContact(contactId);
      await rootStore.appStore.getContacts();
      rootStore.alertsStore.createSuccessAlert("Contact deleted correctly");
      router.back();
    } catch (err: any) {
      rootStore.alertsStore.handleErrorResponse(err.response);
    }
    setRemoving(false);
  };

  const someChange = useMemo(
    () =>
      !!(
        contact?.email !== email ||
        contact?.first_name !== firstName ||
        contact?.last_name !== lastName ||
        contact?.phone_number !== phoneNumber
      ),
    [
      contact?.email,
      contact?.first_name,
      contact?.last_name,
      contact?.phone_number,
      email,
      firstName,
      lastName,
      phoneNumber,
    ]
  );

  return (
    <BasicLayout title="Contact">
      <div className={styles.content}>
        <form onSubmit={onUpdate}>
          <Input label="First name" value={firstName} setValue={setFirstName} />
          <Input label="Last name" value={lastName} setValue={setLastName} />
          <Input label="Email" value={email} setValue={setEmail} />
          <Input
            label="Phone number"
            value={phoneNumber}
            setValue={setPhoneNumber}
          />
          <div className={styles.actionButtonsContainer}>
            <div className={styles.buttonContainer}>
              <Button
                title="Update"
                styleType="primary"
                type="submit"
                loading={updating}
                disabled={!someChange}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button
                title="Delete"
                styleType="danger"
                onClick={onRemove}
                loading={removing}
                type="button"
              />
            </div>
          </div>
          <div className={styles.textLinksContainers}>
            <div className={styles.textLinkContainer}>
              <TextLink
                text="Go back"
                onClick={() => {
                  router.back();
                }}
              />
            </div>
            <div className={styles.textLinkContainer}>
              <TextLink
                text="History"
                onClick={() => {
                  router.push(`/contacts/${contactId}/history`);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </BasicLayout>
  );
});

export default Contact;
