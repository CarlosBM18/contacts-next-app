import { makeAutoObservable } from "mobx";

import { RootStore } from ".";
import { AlertObject, AlertStatus } from "../libs/types";

const UNKNOWN_SERVER_ERROR = "Unknown server error";

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
    try {
      const errorsArray = Object.keys(errors);
      errorsArray.forEach((error: any) => {
        const errorKey = errors[error];
        errorKey.forEach((errorText: string) => {
          this.createErrorAlert(`${error.replace("_", " ")} ${errorText}`);
        });
      });
    } catch (err) {
      this.createErrorAlert(UNKNOWN_SERVER_ERROR);
    }
  };

  createErrorAlert = (message: string) => {
    const alert: AlertObject = {
      id: this.alerts.length,
      status: AlertStatus.ERROR,
      message,
    };
    this.addAlert(alert);
  };

  createSuccessAlert = (message: string) => {
    const alert: AlertObject = {
      id: this.alerts.length,
      status: AlertStatus.SUCCESS,
      message,
    };
    this.addAlert(alert);
  };
}

export default AlertsStore;
