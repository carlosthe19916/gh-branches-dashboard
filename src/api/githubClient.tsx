import ApiClient from "./apiClient";
import { AxiosPromise } from "axios";
import {
  RepoGh,
  BranchGh,
  CommitGh,
  ComparisonBranchGh
} from "../models/github-models";

export const getRepo = (
  owner: string,
  repository: string
): AxiosPromise<RepoGh> => {
  return ApiClient.get<RepoGh>(`/repos/${owner}/${repository}`);
};

export const getRepoBranches = (
  owner: string,
  repository: string
): AxiosPromise<BranchGh[]> => {
  return ApiClient.get<BranchGh[]>(`/repos/${owner}/${repository}/branches`);
};

export const getRepoBranchCommits = (
  owner: string,
  repository: string,
  branch: string
): AxiosPromise<CommitGh[]> => {
  return ApiClient.get<CommitGh[]>(
    `/repos/${owner}/${repository}/commits?sha=${branch}`
  );
};

export const getRepoBranchComparison = (
  owner: string,
  repository: string,
  branch1: string,
  branch2: string
): AxiosPromise<ComparisonBranchGh> => {
  return ApiClient.get<ComparisonBranchGh>(
    `/repos/${owner}/${repository}/compare/${owner}:${branch1}...${owner}:${branch2}`
  );
};
