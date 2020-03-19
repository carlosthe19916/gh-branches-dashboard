import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import { contextRepositorySelectors } from "../../store/contextRepository";
import { commitsActions, commitsSelectors } from "../../store/commits";
import { Branch as BranchesBoard } from "./Branch";

export interface OwnProps {
  repositoryId: string;
  branch: any;
}

const mapStateToProps = createMapStateToProps((state, ownProps: OwnProps) => {
  const branchName = ownProps.branch.name;
  return {
    ctxRepository: contextRepositorySelectors.repository(state),
    commits: commitsSelectors.selectCommits(state, branchName),
    commitsFechStatus: commitsSelectors.selectFetchStatus(state, branchName),
    commitsError: commitsSelectors.selectError(state, branchName)
  };
});

const mapDispatchToProps = {
  fetchCommits: commitsActions.fetchCommits
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
