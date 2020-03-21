import { Dispatch } from "redux";
import { AlertModel } from "../../models/alert";
import { AxiosError } from "axios";

const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");
const addNotification = frontendComponentsNotifications.addNotification;

export const alert = (alert: AlertModel) => {
  return (dispatch: Dispatch) => {
    dispatch(addNotification(alert));
  };
};

export const alertFetchEndpoint = (title: string, err: AxiosError) => {
  const message = err.response ? err.response.data.message : undefined;
  return (dispatch: Dispatch) => {
    dispatch(
      addNotification({
        variant: "danger",
        title: title,
        description: message ? message : err.message,
        dismissable: true
      })
    );
  };
};
