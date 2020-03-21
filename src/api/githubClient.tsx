import ApiClient from "./apiClient";
import { AxiosPromise } from "axios";
import {
  RepoGh,
  BranchGh,
  CommitGh,
  ComparisonBranchGh
} from "../models/github-models";

export const getRepo = (repoFullName: string): AxiosPromise<RepoGh> => {
  return ApiClient.get<RepoGh>(`/repos/${repoFullName}`);
};

export const getRepoBranches = (
  repoFullName: string
): AxiosPromise<BranchGh[]> => {
  return ApiClient.get<BranchGh[]>(`/repos/${repoFullName}/branches`);
};

export const getRepoBranchCommits = (
  repoFullName: string,
  branch: string
): AxiosPromise<CommitGh[]> => {
  return ApiClient.get<CommitGh[]>(
    `/repos/${repoFullName}/commits?sha=${branch}`
  );
};

export const getRepoBranchComparison = (
  repoFullName: string,
  branch1: string,
  branch2: string
): AxiosPromise<ComparisonBranchGh> => {
  return ApiClient.get<ComparisonBranchGh>(
    `/repos/${repoFullName}/compare/${branch1}...${branch2}`
  );
};
