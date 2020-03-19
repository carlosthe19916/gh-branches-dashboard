import React from "react";
import { FetchStatus } from "../../store/common";
import { OwnProps } from ".";
import {
  Flex,
  FlexItem,
  Card,
  CardBody,
  CardHeader
} from "@patternfly/react-core";
import Branch from "../Branch";

interface StateToProps {
  ctxRepository: any | undefined;
  branches: any[] | undefined;
  branchesError: any | undefined;
  branchesFechStatus: FetchStatus | undefined;
}

interface DispatchToProps {
  fetchBranches: (repositoryId: string) => any;
}

interface Props extends StateToProps, DispatchToProps, OwnProps {}

interface State {}

export class BranchesBoard extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchBranches, repositoryId } = this.props;
    fetchBranches(repositoryId);
  }

  render() {
    const { branches, repositoryId } = this.props;

    return (
      <Flex>
        {(branches || []).map((b, i) => (
          <FlexItem key={b.name}>
            <Branch repositoryId={repositoryId} branch={b} />
          </FlexItem>
        ))}
      </Flex>
    );
  }
}
