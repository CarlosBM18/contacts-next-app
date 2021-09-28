import { createContext, useContext } from "react";

import AppStore from "./app";
import ApiStore from "./api";

export class RootStore {
  appStore;
  apiStore;

  constructor() {
    this.appStore = new AppStore(this);
    this.apiStore = new ApiStore(this);
  }
}

interface IStore {
  rootStore: RootStore;
}

const store: IStore = {
  rootStore: new RootStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
