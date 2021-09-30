import { createContext, useContext } from "react";

import AppStore from "./app";
import ApiStore from "./api";
import AlertsStore from "./alerts";

export class RootStore {
  appStore;
  apiStore;
  alertsStore;

  constructor() {
    this.appStore = new AppStore(this);
    this.apiStore = new ApiStore(this);
    this.alertsStore = new AlertsStore(this);
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
