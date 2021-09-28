import router from "next/router";
import React from "react";
import { BasicLayout } from "../components/BasicLayout";
import { Button } from "../components/Button";
import { ContactObject, ContactElementProps } from "../libs/types";
import styles from "../styles/pages/Index.module.css";

const CONTACTS: ContactObject[] = [
  {
    id: 1,
    first_name: "Carlos",
    last_name: "Bertomeu",
    phone_number: "+346666666999",
    email: "carlos@test.es",
  },
  {
    id: 2,
    first_name: "Carlos",
    last_name: "Bertomeu",
    phone_number: "+346666666999",
    email: "carlos@test.es",
  },
  {
    id: 3,
    first_name: "Carlos",
    last_name: "Bertomeu",
    phone_number: "+346666666999",
    email: "carlos@test.es",
  },
  {
    id: 4,
    first_name: "Carlos",
    last_name: "Bertomeu",
    phone_number: "+346666666999",
    email: "carlos@test.es",
  },
  {
    id: 5,
    first_name: "Carlos",
    last_name: "Bertomeu",
    phone_number: "+346666666999",
    email: "carlos@test.es",
  },
];

export default function index() {
  return (
    <BasicLayout title="Contacts">
      <>
        <Button
          title="New contact"
          onClick={() => {
            router.push("/contacts/create");
          }}
          type="primary"
        />
        <div className={styles.content}>
          {CONTACTS.map((contact) => (
            <ContactElement data={contact} key={contact.id} />
          ))}
        </div>
      </>
    </BasicLayout>
  );
}

const ContactElement = ({ data }: ContactElementProps) => {
  return (
    <div
      className={styles.contactElementContainer}
      onClick={() => {
        router.push("/contacts/1");
      }}
    >
      <div className={styles.name}>
        {`${data.first_name} ${data.last_name}`}
      </div>
      <div>{data.email}</div>
    </div>
  );
};

const CreateNewContactButton = () => {
  return <div className={styles.newContactButton}>New contact</div>;
};
