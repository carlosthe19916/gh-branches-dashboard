import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import { contextRepositorySelectors } from "../../store/contextRepository";
import { branchesActions, branchesSelectors } from "../../store/branches";
import { BranchesBoard as BranchesBoard } from "./BranchesBoard";

export interface OwnProps {
  repositoryId: string;
}

const mapStateToProps = createMapStateToProps((state, ownProps: OwnProps) => {
  const repoId = ownProps.repositoryId;
  return {
    ctxRepository: contextRepositorySelectors.repository(state),
    branches: branchesSelectors.selectBranches(state, repoId),
    branchesFechStatus: branchesSelectors.selectFetchStatus(state, repoId),
    branchesError: branchesSelectors.selectError(state, repoId)
  };
});

const mapDispatchToProps = {
  fetchBranches: branchesActions.fetchBranches
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
