import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";

export const repositoryState = (state: RootState) => state[stateKey];

export const selectRepoBranches = (state: RootState, repoFullName: string) =>
  repositoryState(state).byId.get(repoFullName);

export const selectFetchStatus = (state: RootState, repoFullName: string) =>
  repositoryState(state).fetchStatus.get(repoFullName);

export const selectError = (state: RootState, repoFullName: string) =>
  repositoryState(state).errors.get(repoFullName);
