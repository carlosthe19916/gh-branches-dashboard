import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchCommitsRequest,
  fetchCommitsSuccess,
  fetchCommitsFailure
} from "./actions";

export const stateKey = "commits";

export type CommitsState = Readonly<{
  byId: Map<string, any[]>;
  errors: Map<string, any | undefined>;
  fetchStatus: Map<string, FetchStatus>;
}>;

export const defaultState: CommitsState = {
  byId: new Map(),
  errors: new Map(),
  fetchStatus: new Map()
};

export type BranchesAction = ActionType<
  | typeof fetchCommitsRequest
  | typeof fetchCommitsSuccess
  | typeof fetchCommitsFailure
>;

export function commitsReducer(
  state = defaultState,
  action: BranchesAction
): CommitsState {
  switch (action.type) {
    case getType(fetchCommitsRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.payload.branch,
          "inProgress"
        )
      };
    case getType(fetchCommitsSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.meta.repositoryId,
          "complete"
        ),
        byId: new Map(state.byId).set(action.meta.branch, action.payload),
        errors: new Map(state.errors).set(action.meta.branch, undefined)
      };
    case getType(fetchCommitsFailure):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.meta.branch,
          "complete"
        ),
        errors: new Map(state.errors).set(action.meta.branch, action.payload)
      };

    default:
      return state;
  }
}
