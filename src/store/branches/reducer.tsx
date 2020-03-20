import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchBranchesRequest,
  fetchBranchesSuccess,
  fetchBranchesFailure
} from "./actions";
import { AxiosError } from "axios";

export const stateKey = "branches";

export type BranchesState = Readonly<{
  byId: Map<string, any[]>;
  errors: Map<string, AxiosError | undefined>;
  fetchStatus: Map<string, FetchStatus>;
}>;

export const defaultState: BranchesState = {
  byId: new Map(),
  errors: new Map(),
  fetchStatus: new Map()
};

export type BranchesAction = ActionType<
  | typeof fetchBranchesRequest
  | typeof fetchBranchesSuccess
  | typeof fetchBranchesFailure
>;

export function branchesReducer(
  state = defaultState,
  action: BranchesAction
): BranchesState {
  switch (action.type) {
    case getType(fetchBranchesRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.payload.repositoryId,
          "inProgress"
        )
      };
    case getType(fetchBranchesSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.meta.repositoryId,
          "complete"
        ),
        byId: new Map(state.byId).set(action.meta.repositoryId, action.payload),
        errors: new Map(state.errors).set(action.meta.repositoryId, undefined)
      };
    case getType(fetchBranchesFailure):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.meta.repositoryId,
          "complete"
        ),
        errors: new Map(state.errors).set(
          action.meta.repositoryId,
          action.payload
        )
      };

    default:
      return state;
  }
}
