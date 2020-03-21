import React from "react";
import { FetchStatus } from "../../store/common";
import { OwnProps } from ".";
import Box from "@material-ui/core/Box";
import BranchComparisonBox from "../BranchComparisonWrapper";
import { CommitGh } from "../../models/github-models";
import { AxiosError } from "axios";

interface StateToProps {
  branchCommits: CommitGh[] | undefined;
  branchCommitsFechStatus: FetchStatus | undefined;
  branchCommitsError: AxiosError | undefined;
}

interface DispatchToProps {
  fetchBranchCommits: (repoFullName: string, branchName: string) => any;
}

interface Props extends StateToProps, DispatchToProps, OwnProps {}

interface State {}

export class BranchBoard extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchBranchCommits, branch, repo } = this.props;
    fetchBranchCommits(repo.full_name, branch.name);
  }

  render() {
    const { repo, branch, branchCommits } = this.props;

    return (
      <div style={{ width: "250px" }} className="pf-c-notification-drawer">
        <div className="pf-c-notification-drawer__header">
          <h1 className="pf-c-notification-drawer__header-title">
            {branch.name}
          </h1>
        </div>
        <div className="pf-c-notification-drawer__body">
          <BranchComparisonBox
            repo={repo}
            branchBase={repo.default_branch}
            branchToCompare={branch.name}
          >
            {(branchCommits || []).map(c => (
              <ul key={c.sha} className="pf-c-notification-drawer__list">
                <li className="pf-c-notification-drawer__list-item pf-m-read pf-m-info pf-m-hoverable">
                  <div className="pf-c-notification-drawer__list-item-header">
                    <span className="pf-c-notification-drawer__list-item-header-icon">
                      {/* <i className="fas fa-check-circle" aria-hidden="true"></i> */}
                    </span>
                    <h2
                      className="pf-c-notification-drawer__list-item-header-title"
                      style={{ width: 200, whiteSpace: "nowrap" }}
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
          </BranchComparisonBox>
        </div>
      </div>
    );
  }
}
