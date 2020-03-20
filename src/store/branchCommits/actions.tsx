import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepoBranchCommits } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";

interface RepositoryActionMeta {
  repositoryId: string;
  branch: string;
}

export const fetchBranchCommitsRequest = createAction(
  "branchCommits/fetch/request"
)<RepositoryActionMeta>();
export const fetchBranchCommitsSuccess = createAction(
  "branchCommits/fetch/success"
)<any, RepositoryActionMeta>();
export const fetchBranchCommitsFailure = createAction(
  "branchCommits/fetch/failure"
)<any, RepositoryActionMeta>();

export const fetchBranchCommits = (repositoryId: string, branch: string) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      repositoryId,
      branch
    };

    dispatch(fetchBranchCommitsRequest(meta));

    const ownerRepository: string[] = repositoryId.split("/");
    return getRepoBranchCommits(ownerRepository[0], ownerRepository[1], branch)
      .then((res: AxiosResponse<any>) => {
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
