import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  contextRepositoryActions,
  contextRepositorySelectors
} from "../../store/contextRepository";
import { branchesActions, branchesSelectors } from "../../store/branches";
import { BranchesBoard } from "./BranchesBoard";

const mapStateToProps = createMapStateToProps(state => {
  const ctxRepository = contextRepositorySelectors.repository(state);
  const repoFullName = ctxRepository ? ctxRepository.full_name : "";

  return {
    ctxRepo: ctxRepository ? ctxRepository : undefined,
    ctxRepoDefaultBranch: contextRepositorySelectors.defaultBranch(state),
    cxtRepoBranches: branchesSelectors.selectBranches(state, repoFullName),
    ctxRepoBranchesFechStatus: branchesSelectors.selectFetchStatus(
      state,
      repoFullName
    ),
    ctxRepoBranchesError: branchesSelectors.selectError(state, repoFullName)
  };
});

const mapDispatchToProps = {
  fetchBranches: branchesActions.fetchBranches,
  setDefaultBranchCtxRepository:
    contextRepositoryActions.setDefaultBranchContextRepository
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
