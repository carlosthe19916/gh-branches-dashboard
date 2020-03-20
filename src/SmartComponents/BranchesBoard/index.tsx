import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  contextRepositoryActions,
  contextRepositorySelectors
} from "../../store/contextRepository";
import { branchesActions, branchesSelectors } from "../../store/branches";
import { BranchesBoard } from "./BranchesBoard";

const mapStateToProps = createMapStateToProps(state => {
  const repoId = contextRepositorySelectors.repository(state).full_name;
  return {
    ctxRepository: contextRepositorySelectors.repository(state),
    branches: branchesSelectors.selectBranches(state, repoId),
    branchesFechStatus: branchesSelectors.selectFetchStatus(state, repoId),
    branchesError: branchesSelectors.selectError(state, repoId)
  };
});

const mapDispatchToProps = {
  fetchBranches: branchesActions.fetchBranches,
  setDefaultBranchContextRepository:
    contextRepositoryActions.setDefaultBranchContextRepository
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
