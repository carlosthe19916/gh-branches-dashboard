import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchRepoBranchesRequest,
  fetchRepoBranchesSuccess,
  fetchRepoBranchesFailure
} from "./actions";
import { AxiosError } from "axios";
import { BranchGh } from "../../models/github-models";

export const stateKey = "repoBranches";

export type RepoBranchesState = Readonly<{
  byId: Map<string, BranchGh[]>;
  errors: Map<string, AxiosError | undefined>;
  fetchStatus: Map<string, FetchStatus>;
}>;

export const defaultState: RepoBranchesState = {
  byId: new Map(),
  errors: new Map(),
  fetchStatus: new Map()
};

export type RepoBranchesAction = ActionType<
  | typeof fetchRepoBranchesRequest
  | typeof fetchRepoBranchesSuccess
  | typeof fetchRepoBranchesFailure
>;

export function repoBranchesReducer(
  state = defaultState,
  action: RepoBranchesAction
): RepoBranchesState {
  switch (action.type) {
    case getType(fetchRepoBranchesRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.payload.repoFullName,
          "inProgress"
        )
      };
    case getType(fetchRepoBranchesSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.meta.repoFullName,
          "complete"
        ),
        byId: new Map(state.byId).set(action.meta.repoFullName, action.payload),
        errors: new Map(state.errors).set(action.meta.repoFullName, undefined)
      };
    case getType(fetchRepoBranchesFailure):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.meta.repoFullName,
          "complete"
        ),
        errors: new Map(state.errors).set(
          action.meta.repoFullName,
          action.payload
        )
      };

    default:
      return state;
  }
}
