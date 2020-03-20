import React from "react";
import { FetchStatus } from "../../store/common";
import { OwnProps } from ".";
import { AxiosError } from "axios";

interface StateToProps {
  branchComparison: any | undefined;
  branchComparisonError: AxiosError | undefined;
  branchComparisonFechStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchBranchComparison: (
    repositoryId: string,
    branch1: string,
    branch2: string
  ) => any;
}

interface Props extends StateToProps, DispatchToProps, OwnProps {
  repositoryId: string;
}

interface State {}

export class BranchComparisonBox extends React.Component<Props, State> {
  componentDidMount() {
    const {
      fetchBranchComparison,
      repositoryId,
      branch1,
      branch2
    } = this.props;
    fetchBranchComparison(repositoryId, branch1, branch2);
  }

  render() {
    const { branchComparison } = this.props;

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
                    style={{ width: 230, whiteSpace: "nowrap" }}
                  >
                    <span className="pf-screen-reader">
                      Success notification:
                    </span>
                  </h2>
                </div>
              </li>
            </ul>
          ))}
      </React.Fragment>
    );
  }
}
