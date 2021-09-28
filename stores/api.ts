import { makeAutoObservable } from "mobx";

import { RootStore } from ".";

class ApiStore {
  rootStore;
  baseUrl = process.env.NEXT_PUBLIC_API;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}

export default ApiStore;
