import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchContextRepositoryRequest,
  fetchContextRepositorySuccess,
  fetchContextRepositoryFailure
} from "./actions";

export const stateKey = "contextRepository";

export type ContextRepositoryState = Readonly<{
  repository: any | undefined;
  error: any | undefined;
  fetchStatus: FetchStatus;
}>;

export const defaultState: ContextRepositoryState = {
  repository: undefined,
  error: undefined,
  fetchStatus: "none"
};

export type ContextRepositoryAction = ActionType<
  | typeof fetchContextRepositoryRequest
  | typeof fetchContextRepositorySuccess
  | typeof fetchContextRepositoryFailure
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

    default:
      return state;
  }
}
