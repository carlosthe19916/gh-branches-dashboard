import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { deleteDialogStateKey, deleteDialogReducer } from "./deleteDialog";
import {
  contextRepositoryStateKey,
  contextRepositoryReducer
} from "./contextRepository";
import { repoBranchesStateKey, repoBranchesReducer } from "./repoBranches";
import { branchCommitsStateKey, branchCommitsReducer } from "./branchCommits";
import {
  branchComparisonStateKey,
  branchComparisonReducer
} from "./branchComparison";

const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");

export type RootState = StateType<typeof rootReducer>;

export const rootReducer = combineReducers({
  notifications: frontendComponentsNotifications.notifications,
  [deleteDialogStateKey]: deleteDialogReducer,
  [contextRepositoryStateKey]: contextRepositoryReducer,
  [repoBranchesStateKey]: repoBranchesReducer,
  [branchCommitsStateKey]: branchCommitsReducer,
  [branchComparisonStateKey]: branchComparisonReducer
});
