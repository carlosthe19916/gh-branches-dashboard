import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  contextRepositoryActions,
  contextRepositorySelectors
} from "../../store/contextRepository";
import {
  repoBranchesActions,
  repoBranchesSelectors
} from "../../store/repoBranches";
import { BranchesBoard } from "./BranchesBoard";

const mapStateToProps = createMapStateToProps(state => {
  const ctxRepository = contextRepositorySelectors.repository(state);
  const repoFullName = ctxRepository ? ctxRepository.full_name : "";

  return {
    ctxRepo: ctxRepository ? ctxRepository : undefined,
    ctxRepoDefaultBranch: contextRepositorySelectors.defaultBranch(state),
    cxtRepoBranches: repoBranchesSelectors.selectRepoBranches(state, repoFullName),
    ctxRepoBranchesFechStatus: repoBranchesSelectors.selectFetchStatus(
      state,
      repoFullName
    ),
    ctxRepoBranchesError: repoBranchesSelectors.selectError(state, repoFullName)
  };
});

const mapDispatchToProps = {
  fetchBranches: repoBranchesActions.fetchRepoBranches,
  setDefaultBranchCtxRepository:
    contextRepositoryActions.setDefaultBranchContextRepository
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
