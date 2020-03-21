import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  branchCommitsActions,
  branchCommitsSelectors
} from "../../store/branchCommits";
import { BranchBoard as BranchesBoard } from "./BranchBoard";
import { BranchGh, RepoGh } from "../../models/github-models";

export interface OwnProps {
  repo: RepoGh;
  repoDefaultBranch: BranchGh;
  branch: BranchGh;
}

const mapStateToProps = createMapStateToProps((state, ownProps: OwnProps) => ({
  branchCommits: branchCommitsSelectors.selectBranchCommits(
    state,
    ownProps.repo.full_name,
    ownProps.branch.name
  ),
  branchCommitsFechStatus: branchCommitsSelectors.selectBranchCommitsFetchStatus(
    state,
    ownProps.repo.full_name,
    ownProps.branch.name
  ),
  branchCommitsError: branchCommitsSelectors.selectBranchCommitsError(
    state,
    ownProps.repo.full_name,
    ownProps.branch.name
  )
}));

const mapDispatchToProps = {
  fetchBranchCommits: branchCommitsActions.fetchBranchCommits
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
