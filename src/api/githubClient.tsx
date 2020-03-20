import ApiClient from "./apiClient";
import { AxiosPromise } from "axios";

export const getRepo = (
  owner: string,
  repository: string
): AxiosPromise<any> => {
  return ApiClient.get<any>(`/repos/${owner}/${repository}`);
};

export const getRepoBranches = (
  owner: string,
  repository: string
): AxiosPromise<any> => {
  return ApiClient.get<any>(`/repos/${owner}/${repository}/branches`);
};

export const getRepoBranchCommits = (
  owner: string,
  repository: string,
  branch: string
): AxiosPromise<any> => {
  return ApiClient.get<any>(
    `/repos/${owner}/${repository}/commits?sha=${branch}`
  );
};

export const getRepoBranchComparison = (
  owner: string,
  repository: string,
  branch1: string,
  branch2: string
): AxiosPromise<any> => {
  return ApiClient.get<any>(
    `/repos/${owner}/${repository}/compare/${owner}:${branch1}...${owner}:${branch2}`
  );
};
