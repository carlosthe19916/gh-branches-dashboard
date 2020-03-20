import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchBranchCommitsRequest,
  fetchBranchCommitsSuccess,
  fetchBranchCommitsFailure
} from "./actions";
import { AxiosError } from "axios";

export const stateKey = "branchCommits";

export type BranchCommitsState = Readonly<{
  byId: Map<string, any[]>;
  errors: Map<string, AxiosError | undefined>;
  fetchStatus: Map<string, FetchStatus>;
}>;

export const defaultState: BranchCommitsState = {
  byId: new Map(),
  errors: new Map(),
  fetchStatus: new Map()
};

export type BranchCommitsAction = ActionType<
  | typeof fetchBranchCommitsRequest
  | typeof fetchBranchCommitsSuccess
  | typeof fetchBranchCommitsFailure
>;

export function branchCommitsReducer(
  state = defaultState,
  action: BranchCommitsAction
): BranchCommitsState {
  switch (action.type) {
    case getType(fetchBranchCommitsRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.payload.branch,
          "inProgress"
        )
      };
    case getType(fetchBranchCommitsSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.meta.repositoryId,
          "complete"
        ),
        byId: new Map(state.byId).set(action.meta.branch, action.payload),
        errors: new Map(state.errors).set(action.meta.branch, undefined)
      };
    case getType(fetchBranchCommitsFailure):
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
