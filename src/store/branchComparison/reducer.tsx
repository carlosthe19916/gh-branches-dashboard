import { ActionType, getType } from "typesafe-actions";
import { FetchStatus } from "../common";
import {
  fetchBranchComparisonRequest,
  fetchBranchComparisonSuccess,
  fetchBranchComparisonFailure
} from "./actions";
import { AxiosError } from "axios";

export const stateKey = "branchComparison";

export type BranchComparisonState = Readonly<{
  byBranchName: Map<string, string>;
  byBranchNameComposedKey: Map<string, any>;

  errors: Map<string, string>;
  errorsComposedKey: Map<string, AxiosError | undefined>;

  fetchStatus: Map<string, string>;
  fetchStatusComposedKey: Map<string, FetchStatus>;
}>;

export const defaultState: BranchComparisonState = {
  byBranchName: new Map(),
  byBranchNameComposedKey: new Map(),

  errors: new Map(),
  errorsComposedKey: new Map(),

  fetchStatus: new Map(),
  fetchStatusComposedKey: new Map()
};

export type BranchComparisonAction = ActionType<
  | typeof fetchBranchComparisonRequest
  | typeof fetchBranchComparisonSuccess
  | typeof fetchBranchComparisonFailure
>;

export const getBranchComparisonComposedKey = (
  branch1: string,
  branch2: string
) => {
  return `${branch1}...${branch2}`;
};

export function branchComparisonReducer(
  state = defaultState,
  action: BranchComparisonAction
): BranchComparisonState {
  switch (action.type) {
    case getType(fetchBranchComparisonRequest):
      return {
        ...state,
        fetchStatus: new Map(state.fetchStatus).set(
          action.payload.branch1,
          getBranchComparisonComposedKey(
            action.payload.branch1,
            action.payload.branch2
          )
        ),
        fetchStatusComposedKey: new Map(state.fetchStatusComposedKey).set(
          getBranchComparisonComposedKey(
            action.payload.branch1,
            action.payload.branch2
          ),
          "inProgress"
        )
      };
    case getType(fetchBranchComparisonSuccess):
      return {
        ...state,
        fetchStatusComposedKey: new Map(state.fetchStatusComposedKey).set(
          getBranchComparisonComposedKey(
            action.meta.branch1,
            action.meta.branch2
          ),
          "complete"
        ),
        byBranchName: new Map(state.byBranchName).set(
          action.meta.branch1,
          getBranchComparisonComposedKey(
            action.meta.branch1,
            action.meta.branch2
          )
        ),
        byBranchNameComposedKey: new Map(state.byBranchNameComposedKey).set(
          getBranchComparisonComposedKey(
            action.meta.branch1,
            action.meta.branch2
          ),
          action.payload
        ),
        errors: new Map(state.errors).set(
          action.meta.branch1,
          getBranchComparisonComposedKey(
            action.meta.branch1,
            action.meta.branch2
          )
        ),
        errorsComposedKey: new Map(state.errorsComposedKey).set(
          getBranchComparisonComposedKey(
            action.meta.branch1,
            action.meta.branch2
          ),
          undefined
        )
      };
    case getType(fetchBranchComparisonFailure):
      return {
        ...state,
        fetchStatusComposedKey: new Map(state.fetchStatusComposedKey).set(
          getBranchComparisonComposedKey(
            action.meta.branch1,
            action.meta.branch2
          ),
          "complete"
        ),
        errorsComposedKey: new Map(state.errorsComposedKey).set(
          getBranchComparisonComposedKey(
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
