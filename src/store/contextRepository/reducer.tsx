import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchContextRepositoryRequest,
  fetchContextRepositorySuccess,
  fetchContextRepositoryFailure,
  setDefaultBranchContextRepository
} from "./actions";
import { AxiosError } from "axios";

export const stateKey = "contextRepository";

export type ContextRepositoryState = Readonly<{
  repository: any | undefined;
  error: AxiosError | undefined;
  fetchStatus: FetchStatus;

  defaultBranch: any | undefined;
}>;

export const defaultState: ContextRepositoryState = {
  repository: undefined,
  error: undefined,
  fetchStatus: "none",

  defaultBranch: undefined
};

export type ContextRepositoryAction = ActionType<
  | typeof fetchContextRepositoryRequest
  | typeof fetchContextRepositorySuccess
  | typeof fetchContextRepositoryFailure
  | typeof setDefaultBranchContextRepository
>;

export function contextRepositoryReducer(
  state = defaultState,
  action: ContextRepositoryAction
): ContextRepositoryState {
  switch (action.type) {
    case getType(fetchContextRepositoryRequest):
      return {
        ...state,
        fetchStatus: "inProgress"
      };
    case getType(fetchContextRepositorySuccess):
      return {
        ...state,
        fetchStatus: "complete",
        error: undefined,
        repository: action.payload
      };
    case getType(fetchContextRepositoryFailure):
      return {
        ...state,
        fetchStatus: "complete",
        error: action.payload
      };

    case getType(setDefaultBranchContextRepository):
      return {
        ...state,
        defaultBranch: { ...action.payload }
      };

    default:
      return state;
  }
}
