import { makeAutoObservable } from "mobx";

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

  getContactHistory = async (id: number) => {
    try {
      const res: any = await this.rootStore.apiStore.getContactHistory(id);
      const contactHistory = res.data as ContactHistoryObject[];
      this.setContactHistory(contactHistory);
    } catch (err) {
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
}

export default AppStore;
