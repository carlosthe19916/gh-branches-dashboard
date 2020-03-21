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
    ctxRepository: ctxRepository ? ctxRepository : undefined,
    branches: branchesSelectors.selectBranches(state, repoFullName),
    branchesFechStatus: branchesSelectors.selectFetchStatus(
      state,
      repoFullName
    ),
    branchesError: branchesSelectors.selectError(state, repoFullName)
  };
});

const mapDispatchToProps = {
  fetchBranches: branchesActions.fetchBranches,
  setDefaultBranchContextRepository:
    contextRepositoryActions.setDefaultBranchContextRepository
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
