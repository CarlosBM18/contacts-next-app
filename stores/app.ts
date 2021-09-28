import { makeAutoObservable } from "mobx";

import { RootStore } from ".";

class AppStore {
  rootStore;
  token: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    setTimeout(() => {
      this.setToken("iii");
    }, 2000);
  }

  setToken = (token: string) => {
    this.token = token;
  };

  get loadingUser() {
    return this.token === null;
  }
}

export default AppStore;
