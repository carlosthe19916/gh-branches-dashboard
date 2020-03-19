import { Dispatch } from "redux";
import { AlertModel } from "../../models/alert";

const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");
const addNotification = frontendComponentsNotifications.addNotification;

export const alert = (alert: AlertModel) => {
  return (dispatch: Dispatch) => {
    dispatch(addNotification(alert));
  };
};

export const alertFetchEndpoint = (title: string, err: any) => {
  return (dispatch: Dispatch) => {
    dispatch(
      addNotification({
        variant: "danger",
        title: title,
        description: err.message,
        dismissable: true
      })
    );
  };
};
