import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import { contextRepositorySelectors } from "../../store/contextRepository";
import {
  branchCommitsActions,
  branchCommitsSelectors
} from "../../store/branchCommits";
import { Branch as BranchesBoard } from "./Branch";
import { BranchGh } from "../../models/github-models";

export interface OwnProps {
  branch: BranchGh;
}

const mapStateToProps = createMapStateToProps((state, ownProps: OwnProps) => {
  const branchName = ownProps.branch.name;
  return {
    ctxRepository: contextRepositorySelectors.repository(state),
    commits: branchCommitsSelectors.selectBranchCommits(state, branchName),
    commitsFechStatus: branchCommitsSelectors.selectBranchCommitsFetchStatus(
      state,
      branchName
    ),
    commitsError: branchCommitsSelectors.selectBranchCommitsError(
      state,
      branchName
    )
  };
});

const mapDispatchToProps = {
  fetchCommits: branchCommitsActions.fetchBranchCommits
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
