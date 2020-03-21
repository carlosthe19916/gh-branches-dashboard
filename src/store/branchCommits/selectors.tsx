import { RootState } from "../rootReducer";
import { stateKey, getIdQuery } from "./reducer";

export const branchCommitsState = (state: RootState) => state[stateKey];

export const selectBranchCommits = (
  state: RootState,
  repoFullName: string,
  branchName: string
) => branchCommitsState(state).byId.get(getIdQuery(repoFullName, branchName));

export const selectBranchCommitsFetchStatus = (
  state: RootState,
  repoFullName: string,
  branchName: string
) => branchCommitsState(state).fetchStatus.get(getIdQuery(repoFullName, branchName));

export const selectBranchCommitsError = (
  state: RootState,
  repoFullName: string,
  branchName: string
) => branchCommitsState(state).errors.get(getIdQuery(repoFullName, branchName));
