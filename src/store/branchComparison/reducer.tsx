import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchBranchComparisonRequest,
  fetchBranchComparisonSuccess,
  fetchBranchComparisonFailure
} from "./actions";
import { AxiosError } from "axios";
import { ComparisonBranchGh } from "../../models/github-models";

export const stateKey = "branchComparison";

export const getIdQuery = (
  repoFullName: string,
  branchName1: string,
  branchName2: string
) => {
  return `${repoFullName}:${branchName1}...${branchName2}`;
};

export type BranchComparisonState = Readonly<{
  byId: Map<string, ComparisonBranchGh>;
  errors: Map<string, AxiosError | undefined>;
  fetchStatus: Map<string, FetchStatus>;
}>;

export const defaultState: BranchComparisonState = {
  byId: new Map(),
  errors: new Map(),
  fetchStatus: new Map()
};

export type BranchComparisonAction = ActionType<
  | typeof fetchBranchComparisonRequest
  | typeof fetchBranchComparisonSuccess
  | typeof fetchBranchComparisonFailure
>;

export function branchComparisonReducer(
  state = defaultState,
  action: BranchComparisonAction
): BranchComparisonState {
  switch (action.type) {
    case getType(fetchBranchComparisonRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          getIdQuery(
            action.payload.repoFullName,
            action.payload.branch1,
            action.payload.branch2
          ),
          "inProgress"
        )
      };
    case getType(fetchBranchComparisonSuccess):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          getIdQuery(
            action.meta.repoFullName,
            action.meta.branch1,
            action.meta.branch2
          ),
          "complete"
        ),
        byId: new Map(state.byId).set(
          getIdQuery(
            action.meta.repoFullName,
            action.meta.branch1,
            action.meta.branch2
          ),
          action.payload
        ),
        errors: new Map(state.errors).set(
          getIdQuery(
            action.meta.repoFullName,
            action.meta.branch1,
            action.meta.branch2
          ),
          undefined
        )
      };
    case getType(fetchBranchComparisonFailure):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          getIdQuery(
            action.meta.repoFullName,
            action.meta.branch1,
            action.meta.branch2
          ),
          "complete"
        ),
        errors: new Map(state.errors).set(
          getIdQuery(
            action.meta.repoFullName,
            action.meta.branch1,
            action.meta.branch2
          ),
          action.payload
        )
      };

    default:
      return state;
  }
}
