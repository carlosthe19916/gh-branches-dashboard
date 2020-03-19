import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";

export const repositoryState = (state: RootState) => state[stateKey];

export const selectCommits = (state: RootState, branchName: string) =>
  repositoryState(state).byId.get(branchName);

export const selectFetchStatus = (state: RootState, branchName: string) =>
  repositoryState(state).fetchStatus.get(branchName);

export const selectError = (state: RootState, branchName: string) =>
  repositoryState(state).errors.get(branchName);
