import { makeAutoObservable } from "mobx";
import router from "next/router";

import { RootStore } from ".";
import { ContactHistoryObject, ContactObject } from "../libs/types";

class AppStore {
  rootStore;
  token: string | null = null;
  contacts: ContactObject[] = [];
  selectedContact: ContactObject | null = null;
  contactHistory: ContactHistoryObject[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  saveToken = async (token: string, localStorage: Storage) => {
    localStorage.setItem("token", token);
    this.setToken(token);
  };

  getContacts = async () => {
    try {
      const res: any = await this.rootStore.apiStore.getContacts();
      const contacts = res.data as ContactObject[];
      this.setContacts(contacts);
    } catch (err) {
      console.log({ err });
    }
  };

  getContact = async (id: number) => {
    try {
      const res: any = await this.rootStore.apiStore.getContact(id);
      const contact = res.data as ContactObject;
      this.setSelectedContact(contact);
    } catch (err) {
      this.rootStore.alertsStore.createErrorAlert("Can't show that contact");
      router.replace("/");
      console.log({ err });
    }
  };

  getContactHistory = async (id: number) => {
    try {
      const res: any = await this.rootStore.apiStore.getContactHistory(id);
      const contactHistory = res.data as ContactHistoryObject[];
      this.setContactHistory(contactHistory);
    } catch (err) {
      this.rootStore.alertsStore.createErrorAlert("Can't show that histroy");
      router.replace("/");
      console.log({ err });
    }
  };

  setToken = (token: string) => {
    this.token = token;
  };

  setContacts = (contacts: ContactObject[]) => {
    this.contacts = contacts;
  };

  setContactHistory = (contactHistory: ContactHistoryObject[]) => {
    this.contactHistory = contactHistory;
  };

  setSelectedContact = (contact: ContactObject) => {
    this.selectedContact = contact;
  };

  get loadingUser() {
    return this.token === null;
  }

  get isLogged() {
    return !this.loadingUser && this.token?.length;
  }

  logout = () => {
    this.saveToken("", localStorage);
    this.rootStore.alertsStore.createSuccessAlert("Logged out correctly");
  };
}

export default AppStore;
