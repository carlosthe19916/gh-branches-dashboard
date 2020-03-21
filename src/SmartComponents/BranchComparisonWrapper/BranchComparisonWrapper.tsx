import React from "react";
import { FetchStatus } from "../../store/common";
import { OwnProps } from ".";
import { AxiosError } from "axios";
import { ComparisonBranchGh } from "../../models/github-models";

interface StateToProps {
  branchComparison: ComparisonBranchGh | undefined;
  branchComparisonError: AxiosError | undefined;
  branchComparisonFechStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchBranchComparison: (
    repoFullName: string,
    branchBaseName: string,
    branchToCompareName: string
  ) => any;
}

interface Props extends StateToProps, DispatchToProps, OwnProps {
  children: React.ReactNode;
}

interface State {}

export class BranchComparisonWrapper extends React.Component<Props, State> {
  componentDidMount() {
    const {
      fetchBranchComparison,
      repo,
      branchBase,
      branchToCompare
    } = this.props;
    fetchBranchComparison(
      repo.full_name,
      branchBase.name,
      branchToCompare.name
    );
  }

  render() {
    const { branchComparison, children } = this.props;

    return (
      <React.Fragment>
        {branchComparison &&
          Array.apply(0, Array(branchComparison.behind_by)).map((c, i) => (
            <ul key={i} className="pf-c-notification-drawer__list">
              <li className="pf-c-notification-drawer__list-item pf-m-read pf-m-warning pf-m-hoverable">
                <div className="pf-c-notification-drawer__list-item-header">
                  <span className="pf-c-notification-drawer__list-item-header-icon">
                    <i
                      className="fas fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <h2
                    className="pf-c-notification-drawer__list-item-header-title"
                    style={{ width: 200, whiteSpace: "nowrap" }}
                  >
                    <span className="pf-screen-reader">
                      Success notification:
                    </span>
                  </h2>
                </div>
              </li>
            </ul>
          ))}
        {children}
      </React.Fragment>
    );
  }
}
