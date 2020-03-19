import * as React from "react";
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  Bullseye
} from "@patternfly/react-core";
import { AppRouterProps } from "../../../models/routerProps";
import ContextRepositoryLoader from "../../../SmartComponents/ContextRepositoryLoader";
import BranchesBoard from "../../../SmartComponents/BranchesBoard";

export interface PageBranchesProps extends AppRouterProps {}

export const PageBranches: React.FC<PageBranchesProps> = ({ match }) => {
  const repositoryId = `${match.params.owner}/${match.params.repository}`;
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
            <BranchesBoard repositoryId={repositoryId} />
          </Bullseye>
        </PageSection>
      </ContextRepositoryLoader>
    </React.Fragment>
  );
};
