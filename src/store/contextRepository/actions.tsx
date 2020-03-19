import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { GithubApi } from "../../api/githubClient";
import { alertFetchEndpoint } from "../alert/actions";

interface RepositoryActionMeta {
  id: string;
  owner: string;
  repository: string;
}

export const fetchContextRepositoryRequest = createAction(
  "contextRepository/fetch/request"
)<RepositoryActionMeta>();
export const fetchContextRepositorySuccess = createAction(
  "contextRepository/fetch/success"
)<any, RepositoryActionMeta>();
export const fetchContextRepositoryFailure = createAction(
  "contextRepository/fetch/failure"
)<any, RepositoryActionMeta>();

export const fetchContextRepository = (owner: string, repository: string) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      id: `${owner}/${owner}`,
      owner,
      repository
    };

    dispatch(fetchContextRepositoryRequest(meta));

    return GithubApi.repos(owner, repository)
      .fetch()
      .then((res: any) => {
        dispatch(fetchContextRepositorySuccess(res, meta));
      })
      .catch((err: any) => {
        dispatch(fetchContextRepositoryFailure(err, meta));
        alertFetchEndpoint("Repository not found", err)(dispatch);
      });
  };
};
