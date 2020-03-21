import { RootState } from "../rootReducer";
import { stateKey } from "./reducer";

export const repositoryState = (state: RootState) => state[stateKey];

export const repository = (state: RootState) => repositoryState(state).repository;
export const defaultBranch = (state: RootState) => repositoryState(state).defaultBranch;
export const fetchStatus = (state: RootState) => repositoryState(state).fetchStatus;
export const error = (state: RootState) => repositoryState(state).error;
