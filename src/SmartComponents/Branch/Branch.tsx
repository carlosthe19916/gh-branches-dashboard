import React from "react";
import { FetchStatus } from "../../store/common";
import { OwnProps } from ".";
import {
  Flex,
  FlexItem,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackItem
} from "@patternfly/react-core";

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
    const { fetchCommits, repositoryId, branch } = this.props;
    fetchCommits(repositoryId, branch.name);
  }

  render() {
    const { branch, commits } = this.props;
    console.log(commits);

    return (
      <Card>
        <CardHeader>{branch.name}</CardHeader>
        <CardBody>
          <Stack gutter="md">
            {(commits || []).map(c => (
              <StackItem key={c.sha}>
                <Card style={{ width: "300px" }}>
                  <CardHeader>{c.commit.message}</CardHeader>
                  <CardBody>This is a card</CardBody>
                </Card>
              </StackItem>
            ))}
          </Stack>
        </CardBody>
      </Card>
    );
  }
}
