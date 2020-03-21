import React from "react";
import { FetchStatus } from "../../store/common";
import { OwnProps } from ".";
import Box from "@material-ui/core/Box";
import BranchComparisonBox from "../BranchComparisonBox";
import { RepoGh, CommitGh } from "../../models/github-models";
import { AxiosError } from "axios";

interface StateToProps {
  ctxRepository: RepoGh | undefined;
  commits: CommitGh[] | undefined;
  commitsError: AxiosError | undefined;
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
    if (ctxRepository) {
      fetchCommits(ctxRepository.full_name, branch.name);
    }
  }

  render() {
    const { branch, commits, ctxRepository } = this.props;

    const branchName1: string = branch.name;

    return (
      <div style={{ width: "250px" }} className="pf-c-notification-drawer">
        <div className="pf-c-notification-drawer__header">
          <h1 className="pf-c-notification-drawer__header-title">
            {branch.name}
          </h1>
        </div>
        <div className="pf-c-notification-drawer__body">
          {ctxRepository && (
            <BranchComparisonBox
              repositoryId={ctxRepository.full_name}
              branch1={ctxRepository.default_branch}
              branch2={branchName1}
            />
          )}
          {(commits || []).map(c => (
            <ul key={c.sha} className="pf-c-notification-drawer__list">
              <li className="pf-c-notification-drawer__list-item pf-m-read pf-m-info pf-m-hoverable">
                <div className="pf-c-notification-drawer__list-item-header">
                  <span className="pf-c-notification-drawer__list-item-header-icon">
                    {/* <i className="fas fa-check-circle" aria-hidden="true"></i> */}
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
                        <small>{c.commit.message}</small>
                      </a>
                    </Box>
                  </h2>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}
