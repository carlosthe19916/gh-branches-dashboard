import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepoBranches } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";
import { BranchGh } from "../../models/github-models";

interface RepositoryActionMeta {
  repoFullName: string;
}

export const fetchRepoBranchesRequest = createAction(
  "repoBranches/fetch/request"
)<RepositoryActionMeta>();
export const fetchRepoBranchesSuccess = createAction(
  "repoBranches/fetch/success"
)<BranchGh[], RepositoryActionMeta>();
export const fetchRepoBranchesFailure = createAction(
  "repoBranches/fetch/failure"
)<AxiosError, RepositoryActionMeta>();

export const fetchRepoBranches = (repoFullName: string) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      repoFullName
    };

    dispatch(fetchRepoBranchesRequest(meta));

    return getRepoBranches(repoFullName)
      .then((res: AxiosResponse<BranchGh[]>) => {
        dispatch(fetchRepoBranchesSuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchRepoBranchesFailure(err, meta));
        alertFetchEndpoint(
          "Error fetching " + repoFullName + " branches",
          err
        )(dispatch);
      });
  };
};
