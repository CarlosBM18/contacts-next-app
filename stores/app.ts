import { makeAutoObservable } from "mobx";
import router from "next/router";

import { RootStore } from ".";
import { ContactHistoryObject, ContactObject, UserObject } from "../libs/types";

class AppStore {
  rootStore;
  token: string | null = null;
  contacts: ContactObject[] = [];
  selectedContact: ContactObject | null = null;
  contactHistory: ContactHistoryObject[] = [];
  user: UserObject | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  getToken = (localStorage: Storage) => {
    const token = localStorage.getItem("token") || "";
    this.setToken(token);
  };

  getUserInfo = async (localStorage: Storage) => {
    try {
      const userId = Number(localStorage.getItem("user_id") || "");
      if (userId) {
        const userResponse = await this.rootStore.apiStore.getUser(userId);
        const user = userResponse.data as UserObject;
        this.setUser(user);
      }
    } catch (err) {
      this.rootStore.alertsStore.createErrorAlert("Can't get user info");
    }
  };

  saveToken = (token: string, localStorage: Storage) => {
    localStorage.setItem("token", token);
    this.setToken(token);
  };

  saveUserId = (id: string, localStorage: Storage) => {
    localStorage.setItem("user_id", id);
    this.user = null;
  };

  saveUidToken = (token: string, localStorage: Storage) => {
    localStorage.setItem("token", token);
    this.setToken(token);
  };

  saveUserInfo = (user: UserObject, localStorage: Storage) => {
    localStorage.setItem("user_id", String(user.id));
    this.setUser(user);
  };

  setUser = (user: UserObject | null) => {
    this.user = user;
  };

  getContacts = async () => {
    try {
      const res: any = await this.rootStore.apiStore.getContacts();
      const contacts = res.data as ContactObject[];
      this.setContacts(contacts);
    } catch (err) {
      this.rootStore.alertsStore.createErrorAlert("Can't show contacts");
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
    return !this.loadingUser && !!this.token?.length;
  }

  logout = () => {
    this.saveToken("", localStorage);
    this.saveUserId("", localStorage);
    this.rootStore.alertsStore.createSuccessAlert("Logged out correctly");
  };

  cleanUp = () => {
    this.setToken("");
    this.setContacts([]);
    this.selectedContact = null;
    this.setContactHistory([]);
    this.setUser(null);
  };
}

export default AppStore;
