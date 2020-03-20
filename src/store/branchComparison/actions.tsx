import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { alertFetchEndpoint } from "../alert/actions";
import { getRepoBranchComparison } from "../../api/githubClient";
import { AxiosResponse, AxiosError } from "axios";

interface RepositoryActionMeta {
  repositoryId: string;
  branch1: string;
  branch2: string;
}

export const fetchBranchComparisonRequest = createAction(
  "branchComparison/fetch/request"
)<RepositoryActionMeta>();
export const fetchBranchComparisonSuccess = createAction(
  "branchComparison/fetch/success"
)<any, RepositoryActionMeta>();
export const fetchBranchComparisonFailure = createAction(
  "branchComparison/fetch/failure"
)<any, RepositoryActionMeta>();

export const fetchBranchComparison = (
  repositoryId: string,
  branch1: string,
  branch2: string
) => {
  return (dispatch: Dispatch) => {
    const meta: RepositoryActionMeta = {
      repositoryId,
      branch1,
      branch2
    };

    dispatch(fetchBranchComparisonRequest(meta));

    const ownerRepository: string[] = repositoryId.split("/");
    return getRepoBranchComparison(
      ownerRepository[0],
      ownerRepository[1],
      branch1,
      branch2
    )
      .then((res: AxiosResponse<any>) => {
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
