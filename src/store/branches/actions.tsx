import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepoBranches } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";

interface RepositoryActionMeta {
  repositoryId: string;
}

export const fetchBranchesRequest = createAction("branches/fetch/request")<
  RepositoryActionMeta
>();
export const fetchBranchesSuccess = createAction("branches/fetch/success")<
  any,
  RepositoryActionMeta
>();
export const fetchBranchesFailure = createAction("branches/fetch/failure")<
  any,
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
      .then((res: AxiosResponse<any>) => {
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
