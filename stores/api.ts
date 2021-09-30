import { makeAutoObservable } from "mobx";
import axios from "axios";
import { RootStore } from ".";

class ApiStore {
  rootStore;
  baseUrl = process.env.NEXT_PUBLIC_API;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  login = async (email: string, password: string) => {
    return await axios.post(
      `${this.baseUrl}/login?email=${email}&password=${password}`
    );
  };

  createUser = async (email: string, password: string) => {
    const data = {
      user: {
        email,
        password,
      },
    };
    return await axios.post(`${this.baseUrl}/users`, data);
  };

  getContacts = async () => {
    return await axios.get(`${this.baseUrl}/contacts`, this.authHeader);
  };

  getContact = async (id: number) => {
    return await axios.get(`${this.baseUrl}/contacts/${id}`, this.authHeader);
  };

  getContactHistory = async (id: number) => {
    return await axios.get(
      `${this.baseUrl}/contact_histories/${id}`,
      this.authHeader
    );
  };

  createContact = async (
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string
  ) => {
    const data = {
      contact: {
        first_name,
        last_name,
        email,
        phone_number,
      },
    };
    return await axios.post(`${this.baseUrl}/contacts`, data, this.authHeader);
  };

  updateContact = (
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string
  ) => {
    const data = {
      contact: {
        first_name,
        last_name,
        email,
        phone_number,
      },
    };
    return axios.patch(`${this.baseUrl}/contacts/${id}`, data, this.authHeader);
  };

  removeContact = async (id: string) => {
    return await axios.delete(
      `${this.baseUrl}/contacts/${id}`,
      this.authHeader
    );
  };

  deleteUser = async (id: number) => {
    return await axios.delete(`${this.baseUrl}/users/${id}`, this.authHeader);
  };

  get authHeader() {
    return {
      headers: {
        Authorization: `Basic ${this.rootStore.appStore.token}`,
      },
    };
  }
}

export default ApiStore;
