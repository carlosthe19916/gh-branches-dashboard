import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepoBranches, getRepoCommits } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";

interface RepositoryActionMeta {
  repositoryId: string;
  branch: string;
}

export const fetchCommitsRequest = createAction("commits/fetch/request")<
  RepositoryActionMeta
>();
export const fetchCommitsSuccess = createAction("commits/fetch/success")<
  any,
  RepositoryActionMeta
>();
export const fetchCommitsFailure = createAction("commits/fetch/failure")<
  any,
  RepositoryActionMeta
>();

export const fetchCommits = (repositoryId: string, branch: string) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      repositoryId,
      branch
    };

    dispatch(fetchCommitsRequest(meta));

    const ownerRepository: string[] = repositoryId.split("/");
    return getRepoCommits(ownerRepository[0], ownerRepository[1], branch)
      .then((res: AxiosResponse<any>) => {
        dispatch(fetchCommitsSuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchCommitsFailure(err, meta));
        alertFetchEndpoint(
          "Error fetching " + branch + " commits",
          err
        )(dispatch);
      });
  };
};
