import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  branchComparisonActions,
  branchComparisonSelectors
} from "../../store/branchComparison";
import { BranchComparisonBox as BranchesBoard } from "./BranchComparisonBox";

export interface OwnProps {
  branch1: any;
  branch2: any;
}

const mapStateToProps = createMapStateToProps((state, ownProps: OwnProps) => {
  const branch1 = ownProps.branch1;
  const branch2 = ownProps.branch2;
  return {
    branchComparison: branchComparisonSelectors.selectBranchComparison(
      state,
      branch1,
      branch2
    ),
    branchComparisonFechStatus: branchComparisonSelectors.selectBranchComparisonFetchStatus(
      state,
      branch1,
      branch2
    ),
    branchComparisonError: branchComparisonSelectors.selectBranchComparisonError(
      state,
      branch1,
      branch2
    )
  };
});

const mapDispatchToProps = {
  fetchBranchComparison: branchComparisonActions.fetchBranchComparison
};

export default connect(mapStateToProps, mapDispatchToProps)(BranchesBoard);
