import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";

export const repositoryState = (state: RootState) => state[stateKey];

export const selectBranches = (state: RootState, id: string) =>
  repositoryState(state).byId.get(id);

export const selectFetchStatus = (state: RootState, id: string) =>
  repositoryState(state).fetchStatus.get(id);

export const selectError = (state: RootState, id: string) =>
  repositoryState(state).errors.get(id);
