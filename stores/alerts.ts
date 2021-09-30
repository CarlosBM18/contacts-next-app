import { makeAutoObservable } from "mobx";

import { RootStore } from ".";
import { AlertObject } from "../libs/types";

class AlertsStore {
  rootStore;
  alerts: AlertObject[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  addAlert = (alert: AlertObject) => {
    this.alerts.push(alert);
  };

  removeAlert = (alert: AlertObject) => {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  };

  handleErrorResponse = (response: any) => {
    const errors = response?.data?.errors;
    if (errors) {
      const errorsArray = Object.keys(errors);
      if (errorsArray.length) {
        errorsArray.forEach((error: any) => {
          const errorKey = errors[error];
          if (errorKey) {
            errorKey.forEach((errorText: string) => {
              this.createErrorAlert(`${error.replace("_", " ")} ${errorText}`);
            });
          }
        });
      }
    } else {
      this.createErrorAlert("Server error");
    }
  };

  createErrorAlert = (message: string) => {
    const alert: AlertObject = {
      id: this.alerts.length,
      status: "error",
      message,
    };
    this.addAlert(alert);
  };

  createSuccessAlert = (message: string) => {
    const alert: AlertObject = {
      id: this.alerts.length,
      status: "success",
      message,
    };
    this.addAlert(alert);
  };
}

export default AlertsStore;
