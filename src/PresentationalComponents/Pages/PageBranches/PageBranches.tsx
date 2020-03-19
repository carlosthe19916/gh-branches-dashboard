import * as React from "react";
import { PageSection } from "@patternfly/react-core";
import { AppRouterProps } from "../../../models/routerProps";
import ContextRepositoryLoader from "../../../SmartComponents/ContextRepositoryLoader";

export interface PageBranchesProps extends AppRouterProps {}

export const PageBranches: React.FC<PageBranchesProps> = ({ match }) => {
  return (
    <React.Fragment>
      <ContextRepositoryLoader
        owner={match.params.owner}
        repository={match.params.repository}
      >
        <PageSection>branches</PageSection>
      </ContextRepositoryLoader>
    </React.Fragment>
  );
};
