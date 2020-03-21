import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepoBranchCommits } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";
import { CommitGh } from "../../models/github-models";

interface RepositoryActionMeta {
  repoFullName: string;
  branch: string;
}

export const fetchBranchCommitsRequest = createAction(
  "branchCommits/fetch/request"
)<RepositoryActionMeta>();
export const fetchBranchCommitsSuccess = createAction(
  "branchCommits/fetch/success"
)<CommitGh[], RepositoryActionMeta>();
export const fetchBranchCommitsFailure = createAction(
  "branchCommits/fetch/failure"
)<AxiosError, RepositoryActionMeta>();

export const fetchBranchCommits = (repoFullName: string, branch: string) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      repoFullName,
      branch
    };

    dispatch(fetchBranchCommitsRequest(meta));

    return getRepoBranchCommits(repoFullName, branch)
      .then((res: AxiosResponse<CommitGh[]>) => {
        dispatch(fetchBranchCommitsSuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchBranchCommitsFailure(err, meta));
        alertFetchEndpoint(
          "Error fetching " + branch + "'s commits",
          err
        )(dispatch);
      });
  };
};
