import { RootState } from "../rootReducer";
import { stateKey, getIdQuery } from "./reducer";

export const branchComparisonState = (state: RootState) => state[stateKey];

export const selectBranchComparison = (
  state: RootState,
  repoFullName: string,
  branch1: string,
  branch2: string
) =>
  branchComparisonState(state).byId.get(
    getIdQuery(repoFullName, branch1, branch2)
  );

export const selectBranchComparisonFetchStatus = (
  state: RootState,
  repoFullName: string,
  branch1: string,
  branch2: string
) =>
  branchComparisonState(state).fetchStatus.get(
    getIdQuery(repoFullName, branch1, branch2)
  );

export const selectBranchComparisonError = (
  state: RootState,
  repoFullName: string,
  branch1: string,
  branch2: string
) =>
  branchComparisonState(state).errors.get(
    getIdQuery(repoFullName, branch1, branch2)
  );
