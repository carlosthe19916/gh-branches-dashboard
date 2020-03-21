import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepoBranchComparison } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";
import { ComparisonBranchGh } from "../../models/github-models";

interface RepositoryActionMeta {
  repoFullName: string;
  branch1: string;
  branch2: string;
}

export const fetchBranchComparisonRequest = createAction(
  "branchComparison/fetch/request"
)<RepositoryActionMeta>();
export const fetchBranchComparisonSuccess = createAction(
  "branchComparison/fetch/success"
)<ComparisonBranchGh, RepositoryActionMeta>();
export const fetchBranchComparisonFailure = createAction(
  "branchComparison/fetch/failure"
)<AxiosError, RepositoryActionMeta>();

export const fetchBranchComparison = (
  repoFullName: string,
  branch1: string,
  branch2: string
) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      repoFullName,
      branch1,
      branch2
    };

    dispatch(fetchBranchComparisonRequest(meta));

    return getRepoBranchComparison(repoFullName, branch1, branch2)
      .then((res: AxiosResponse<ComparisonBranchGh>) => {
        dispatch(fetchBranchComparisonSuccess(res.data, meta));
      })
      .catch((err: AxiosError) => {
        dispatch(fetchBranchComparisonFailure(err, meta));
        alertFetchEndpoint(
          "Error fetching comparison " + branch1 + "..." + branch2,
          err
        )(dispatch);
      });
  };
};
