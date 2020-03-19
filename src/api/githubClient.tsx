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

export const getRepoCommits = (
  owner: string,
  repository: string,
  branch: string
): AxiosPromise<any> => {
  return ApiClient.get<any>(
    `/repos/${owner}/${repository}/commits?sha=${branch}`
  );
};
