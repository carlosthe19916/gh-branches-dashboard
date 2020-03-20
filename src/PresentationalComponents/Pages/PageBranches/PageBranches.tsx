import * as React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Bullseye
} from "@patternfly/react-core";
import queryString from "query-string";
import { AppRouterProps } from "../../../models/routerProps";
import ContextRepositoryLoader from "../../../SmartComponents/ContextRepositoryLoader";
import BranchesBoard from "../../../SmartComponents/BranchesBoard";

export interface PageBranchesProps extends AppRouterProps {}

export const PageBranches: React.FC<PageBranchesProps> = ({
  match,
  location
}) => {
  const repositoryId = `${match.params.owner}/${match.params.repository}`;

  const queryParams = queryString.parse(location.search);

  let userDefinedBranchOrder: string[] = [];
  if (typeof queryParams.branchOrder === "string") {
    userDefinedBranchOrder = [queryParams.branchOrder];
  } else if (Array.isArray(queryParams.branchOrder)) {
    userDefinedBranchOrder = queryParams.branchOrder;
  } else if (queryParams.branchOrder) {
    console.warn(
      "branchOrder should be string or string[]",
      userDefinedBranchOrder
    );
  }

  return (
    <React.Fragment>
      <ContextRepositoryLoader repositoryId={repositoryId}>
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">Branches</Text>
            <Text component="p">Monitor your branches here.</Text>
          </TextContent>
        </PageSection>
        <PageSection>
          <Bullseye>
            <BranchesBoard userDefinedBranchOrder={userDefinedBranchOrder} />
          </Bullseye>
        </PageSection>
      </ContextRepositoryLoader>
    </React.Fragment>
  );
};
