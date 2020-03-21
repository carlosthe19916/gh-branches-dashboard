import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepo } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";
import { RepoGh, BranchGh } from "../../models/github-models";

interface RepositoryActionMeta {
  repositoryId: string;
}

export const fetchContextRepositoryRequest = createAction(
  "contextRepository/fetch/request"
)<RepositoryActionMeta>();
export const fetchContextRepositorySuccess = createAction(
  "contextRepository/fetch/success"
)<RepoGh, RepositoryActionMeta>();
export const fetchContextRepositoryFailure = createAction(
  "contextRepository/fetch/failure"
)<AxiosError, RepositoryActionMeta>();

export const setDefaultBranchContextRepository = createAction(
  "contextRepository/defaultBranch/set"
)<BranchGh>();

export const fetchContextRepository = (repositoryId: string) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      repositoryId
    };

    dispatch(fetchContextRepositoryRequest(meta));

    const ownerRepository: string[] = repositoryId.split("/");
    return getRepo(ownerRepository[0], ownerRepository[1])
      .then((res: AxiosResponse<RepoGh>) => {
        dispatch(fetchContextRepositorySuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchContextRepositoryFailure(err, meta));
        alertFetchEndpoint("Error fetching " + repositoryId, err)(dispatch);
      });
  };
};
