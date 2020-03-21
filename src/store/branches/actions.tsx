import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepoBranches } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";
import { BranchGh } from "../../models/github-models";

interface RepositoryActionMeta {
  repositoryId: string;
}

export const fetchBranchesRequest = createAction("branches/fetch/request")<
  RepositoryActionMeta
>();
export const fetchBranchesSuccess = createAction("branches/fetch/success")<
  BranchGh[],
  RepositoryActionMeta
>();
export const fetchBranchesFailure = createAction("branches/fetch/failure")<
  AxiosError,
  RepositoryActionMeta
>();

export const fetchBranches = (repositoryId: string) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      repositoryId
    };

    dispatch(fetchBranchesRequest(meta));

    const ownerRepository: string[] = repositoryId.split("/");
    return getRepoBranches(ownerRepository[0], ownerRepository[1])
      .then((res: AxiosResponse<BranchGh[]>) => {
        dispatch(fetchBranchesSuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchBranchesFailure(err, meta));
        alertFetchEndpoint(
          "Error fetching " + repositoryId + " branches",
          err
        )(dispatch);
      });
  };
};
