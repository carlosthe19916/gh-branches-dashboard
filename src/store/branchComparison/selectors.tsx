import { RootState } from "../rootReducer";
import { stateKey, getBranchComparisonComposedKey } from "./reducer";

export const branchComparisonState = (state: RootState) => state[stateKey];

export const selectBranchComparison = (
  state: RootState,
  branch1: string,
  branch2: string
) =>
  branchComparisonState(state).byBranchNameComposedKey.get(
    getBranchComparisonComposedKey(branch1, branch2)
  );

export const selectBranchComparisonFetchStatus = (
  state: RootState,
  branch1: string,
  branch2: string
) =>
  branchComparisonState(state).fetchStatusComposedKey.get(
    getBranchComparisonComposedKey(branch1, branch2)
  );

export const selectBranchComparisonError = (
  state: RootState,
  branch1: string,
  branch2: string
) =>
  branchComparisonState(state).errorsComposedKey.get(
    getBranchComparisonComposedKey(branch1, branch2)
  );
