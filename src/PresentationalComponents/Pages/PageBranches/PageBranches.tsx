import React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Bullseye
} from "@patternfly/react-core";
import queryString, { ParsedQuery } from "query-string";
import { AppRouterProps } from "../../../models/routerProps";
import ContextRepositoryLoader from "../../../SmartComponents/ContextRepositoryLoader";
import BranchesBoard from "../../../SmartComponents/BranchesBoard";
import { getRepositoryId } from "../../../Utils/Utils";

export interface PageBranchesProps extends AppRouterProps {}

export const extractBranchOrderQueryParam = (queryParams: ParsedQuery) => {
  const branchOrderQueryParam = queryParams.branchOrder;

  let result: string[] = [];
  if (typeof branchOrderQueryParam === "string") {
    result = [branchOrderQueryParam];
  } else if (Array.isArray(branchOrderQueryParam)) {
    result = branchOrderQueryParam;
  }

  return result;
};

export const PageBranches: React.FC<PageBranchesProps> = ({
  match,
  location
}) => {
  const repositoryId = getRepositoryId(
    match.params.owner,
    match.params.repository
  );

  const queryParams = queryString.parse(location.search);
  let userDefinedBranchOrder: string[] = extractBranchOrderQueryParam(
    queryParams
  );

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
