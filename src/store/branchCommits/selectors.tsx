import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";

export const branchCommitsState = (state: RootState) => state[stateKey];

export const selectBranchCommits = (state: RootState, branch: string) =>
  branchCommitsState(state).byId.get(branch);

export const selectBranchCommitsFetchStatus = (
  state: RootState,
  branch: string
) => branchCommitsState(state).fetchStatus.get(branch);

export const selectBranchCommitsError = (state: RootState, branch: string) =>
  branchCommitsState(state).errors.get(branch);
