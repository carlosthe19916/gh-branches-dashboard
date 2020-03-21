import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  branchCommitsActions,
  branchCommitsSelectors
} from "../../store/branchCommits";
import { BranchBoard as BranchesBoard } from "./BranchBoard";
import { BranchGh } from "../../models/github-models";

export interface OwnProps {
  branch: BranchGh;
}

const mapStateToProps = createMapStateToProps((state, ownProps: OwnProps) => {
  const branchName = ownProps.branch.name;
  return {
    branchCommits: branchCommitsSelectors.selectBranchCommits(
      state,
      branchName
    ),
    branchCommitsFechStatus: branchCommitsSelectors.selectBranchCommitsFetchStatus(
      state,
      branchName
    ),
    branchCommitsError: branchCommitsSelectors.selectBranchCommitsError(
      state,
      branchName
    )
  };
});

const mapDispatchToProps = {
  fetchBranchCommits: branchCommitsActions.fetchBranchCommits
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
