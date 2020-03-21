import React from "react";
import { FetchStatus } from "../../store/common";
import { Flex, FlexItem } from "@patternfly/react-core";
import Branch from "../Branch";
import { RepoGh, BranchGh } from "../../models/github-models";
import { AxiosError } from "axios";

interface StateToProps {
  ctxRepository: RepoGh | undefined;
  branches: BranchGh[] | undefined;
  branchesError: AxiosError | undefined;
  branchesFechStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchBranches: (repositoryId: string) => any;
  setDefaultBranchContextRepository: (branch: any) => any;
}

interface Props extends StateToProps, DispatchToProps {
  userDefinedBranchOrder: string[];
}

interface State {}

export class BranchesBoard extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchBranches, ctxRepository } = this.props;

    if (ctxRepository) {
      fetchBranches(ctxRepository.full_name);
    }
  }

  render() {
    const { ctxRepository, branches, userDefinedBranchOrder } = this.props;
    const { setDefaultBranchContextRepository } = this.props;

    const branchesList = branches || [];

    let defaultBranch: BranchGh;
    // Default branch
    if (ctxRepository) {
      const find = branchesList.find(
        b => b.name === ctxRepository.default_branch
      );
      if (find) {
        defaultBranch = find;
        setDefaultBranchContextRepository(defaultBranch);
      }
    }

    // Sort
    branchesList.sort((a, b) => {
      if (defaultBranch) {
        if (defaultBranch.name === a.name) return -1;
        else if (defaultBranch.name === b.name) return 1;
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
        {branchesList.map(b => (
          <FlexItem key={b.name}>
            <Branch branch={b} />
          </FlexItem>
        ))}
      </Flex>
    );
  }
}
