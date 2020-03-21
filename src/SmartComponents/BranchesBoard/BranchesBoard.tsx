import React from "react";
import { FetchStatus } from "../../store/common";
import { Flex, FlexItem } from "@patternfly/react-core";
import BranchBoard from "../BranchBoard";
import { RepoGh, BranchGh } from "../../models/github-models";
import { AxiosError } from "axios";

interface StateToProps {
  ctxRepo: RepoGh | undefined;
  cxtRepoBranches: BranchGh[] | undefined;
  ctxRepoDefaultBranch: BranchGh | undefined;
  ctxRepoBranchesError: AxiosError | undefined;
  ctxRepoBranchesFechStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchBranches: (repoFullName: string) => any;
  setDefaultBranchCtxRepository: (branch: BranchGh) => any;
}

interface Props extends StateToProps, DispatchToProps {
  userDefinedBranchOrder: string[];
}

interface State {}

export class BranchesBoard extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchBranches, ctxRepo } = this.props;
    if (ctxRepo) {
      fetchBranches(ctxRepo.full_name);
    }
  }

  componentDidUpdate(_prevProps: Props) {
    const {
      ctxRepo,
      cxtRepoBranches,
      setDefaultBranchCtxRepository
    } = this.props;

    if (ctxRepo && cxtRepoBranches && !_prevProps.ctxRepoDefaultBranch) {
      const defaultBranch: BranchGh | undefined = cxtRepoBranches.find(
        elem => elem.name === ctxRepo.default_branch
      );

      if (defaultBranch) {
        setDefaultBranchCtxRepository(defaultBranch);
      }
    }
  }

  render() {
    const {
      ctxRepo,
      cxtRepoBranches,
      ctxRepoDefaultBranch,
      userDefinedBranchOrder
    } = this.props;

    const branches = cxtRepoBranches ? [...cxtRepoBranches] : [];
    branches.sort((a, b) => {
      if (ctxRepoDefaultBranch) {
        if (ctxRepoDefaultBranch.name === a.name) return -1;
        else if (ctxRepoDefaultBranch.name === b.name) return 1;
      }

      const aIndex = userDefinedBranchOrder.findIndex(p => a.name === p);
      const bIndex = userDefinedBranchOrder.findIndex(p => b.name === p);

      if (aIndex >= 0 && bIndex >= 0) return aIndex - bIndex;
      else if (aIndex >= 0 && bIndex === -1) return 1;
      else if (aIndex === -1 && bIndex >= 0 - 1) return -1;

      return a.name.localeCompare(b.name);
    });

    return (
      <Flex>
        {ctxRepo && branches.map(element => (
          <FlexItem key={element.name}>
            <BranchBoard repo={ctxRepo} branch={element} />
          </FlexItem>
        ))}
      </Flex>
    );
  }
}
