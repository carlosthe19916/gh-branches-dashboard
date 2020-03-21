import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  branchComparisonActions,
  branchComparisonSelectors
} from "../../store/branchComparison";
import { BranchComparisonWrapper as BranchesBoard } from "./BranchComparisonWrapper";

export interface OwnProps {
  branchBase: any;
  branchToCompare: any;
}

const mapStateToProps = createMapStateToProps((state, ownProps: OwnProps) => {
  const branch1 = ownProps.branchBase;
  const branch2 = ownProps.branchToCompare;
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
