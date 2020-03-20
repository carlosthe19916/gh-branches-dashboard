import React from "react";
import { FetchStatus } from "../../store/common";
import { OwnProps } from ".";
import Box from "@material-ui/core/Box";
import BranchComparisonBox from "../BranchComparisonBox";

interface StateToProps {
  ctxRepository: any | undefined;
  commits: any[] | undefined;
  commitsError: any | undefined;
  commitsFechStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchCommits: (repositoryId: string, branchName: string) => any;
}

interface Props extends StateToProps, DispatchToProps, OwnProps {}

interface State {}

export class Branch extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchCommits, branch, ctxRepository } = this.props;
    fetchCommits(ctxRepository.full_name, branch.name);
  }

  render() {
    const { branch, commits, ctxRepository } = this.props;

    const branchName1: string = branch.name;
    const branchName2: string = ctxRepository.default_branch;
    const repositoryId: string = ctxRepository.full_name;

    return (
      <div style={{ width: "300px" }} className="pf-c-notification-drawer">
        <div className="pf-c-notification-drawer__header">
          <h1 className="pf-c-notification-drawer__header-title">
            {branch.name}
          </h1>
        </div>
        <div className="pf-c-notification-drawer__body">
          <BranchComparisonBox
            repositoryId={repositoryId}
            branch1={branchName2}
            branch2={branchName1}
          />

          {(commits || []).map(c => (
            <ul key={c.sha} className="pf-c-notification-drawer__list">
              <li className="pf-c-notification-drawer__list-item pf-m-read pf-m-info pf-m-hoverable">
                <div className="pf-c-notification-drawer__list-item-header">
                  <span className="pf-c-notification-drawer__list-item-header-icon">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                  </span>
                  <h2
                    className="pf-c-notification-drawer__list-item-header-title"
                    style={{ width: 230, whiteSpace: "nowrap" }}
                  >
                    <span className="pf-screen-reader">
                      Success notification:
                    </span>
                    <Box
                      component="div"
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      <a
                        href={c.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {c.commit.message}
                      </a>
                    </Box>
                  </h2>
                </div>
                {/* <div className="pf-c-notification-drawer__list-item-action">
                  <div className="pf-c-dropdown pf-m-top">
                    <button
                      className="pf-c-dropdown__toggle pf-m-plain"
                      type="button"
                      id="notification-drawer-basic-action4-button"
                      aria-expanded="false"
                      aria-label="Actions"
                    >
                      <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
                    </button>
                    <ul
                      className="pf-c-dropdown__menu pf-m-align-right"
                      aria-labelledby="notification-drawer-basic-action4-button"
                      hidden
                    >
                      <li>
                        <a className="pf-c-dropdown__menu-item" href="#">
                          Link
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
                {/* <div className="pf-c-notification-drawer__list-item-description">
                  {c.author.login}
                </div>
                <div className="pf-c-notification-drawer__list-item-timestamp">
                  {c.commit.message}
                </div> */}
              </li>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}
