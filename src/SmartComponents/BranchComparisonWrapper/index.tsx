import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  branchComparisonActions,
  branchComparisonSelectors
} from "../../store/branchComparison";
import { BranchComparisonWrapper as BranchesBoard } from "./BranchComparisonWrapper";
import { BranchGh, RepoGh } from "../../models/github-models";

export interface OwnProps {
  repo: RepoGh;
  branchBase: BranchGh;
  branchToCompare: BranchGh;
}

const mapStateToProps = createMapStateToProps((state, ownProps: OwnProps) => ({
  branchComparison: branchComparisonSelectors.selectBranchComparison(
    state,
    ownProps.repo.full_name,
    ownProps.branchBase.name,
    ownProps.branchToCompare.name
  ),
  branchComparisonFechStatus: branchComparisonSelectors.selectBranchComparisonFetchStatus(
    state,
    ownProps.repo.full_name,
    ownProps.branchBase.name,
    ownProps.branchToCompare.name
  ),
  branchComparisonError: branchComparisonSelectors.selectBranchComparisonError(
    state,
    ownProps.repo.full_name,
    ownProps.branchBase.name,
    ownProps.branchToCompare.name
  )
}));

const mapDispatchToProps = {
  fetchBranchComparison: branchComparisonActions.fetchBranchComparison
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
