import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

import { deleteDialogStateKey, deleteDialogReducer } from "./deleteDialog";

const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");

export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  notifications: frontendComponentsNotifications.notifications,
  [deleteDialogStateKey]: deleteDialogReducer
});
