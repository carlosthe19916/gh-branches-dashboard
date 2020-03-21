import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchBranchCommitsRequest,
  fetchBranchCommitsSuccess,
  fetchBranchCommitsFailure
} from "./actions";
import { AxiosError } from "axios";
import { CommitGh } from "../../models/github-models";

export const stateKey = "branchCommits";

export const getIdQuery = (repoFullName: string, branchName: string) => {
  return `${repoFullName}...${branchName}`;
};

export type BranchCommitsState = Readonly<{
  byId: Map<string, CommitGh[]>;
  errors: Map<string, AxiosError | undefined>;
  fetchStatus: Map<string, FetchStatus>;
}>;

export const defaultState: BranchCommitsState = {
  byId: new Map(), // repoFullName...branchName
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
          getIdQuery(action.payload.repoFullName, action.payload.branchName),
          "inProgress"
        )
      };
    case getType(fetchBranchCommitsSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          getIdQuery(action.meta.repoFullName, action.meta.branchName),
          "complete"
        ),
        byId: new Map(state.byId).set(
          getIdQuery(action.meta.repoFullName, action.meta.branchName),
          action.payload
        ),
        errors: new Map(state.errors).set(
          getIdQuery(action.meta.repoFullName, action.meta.branchName),
          undefined
        )
      };
    case getType(fetchBranchCommitsFailure):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          getIdQuery(action.meta.repoFullName, action.meta.branchName),
          "complete"
        ),
        errors: new Map(state.errors).set(
          getIdQuery(action.meta.repoFullName, action.meta.branchName),
          action.payload
        )
      };

    default:
      return state;
  }
}
