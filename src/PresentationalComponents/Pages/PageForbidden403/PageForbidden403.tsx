import * as React from "react";
import {
  PageSection,
  Bullseye,
  EmptyState,
  EmptyStateVariant,
  Title,
  EmptyStateIcon
} from "@patternfly/react-core";
import { LockIcon } from "@patternfly/react-icons";

export const PageForbidden403: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <PageSection>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={LockIcon} />
            <Title headingLevel="h5" size="lg">
              Error 403 Forbidden! The web page (or other resource) that you're
              trying to open in your web browser is a resource that you're not
              allowed to access.
            </Title>
            {children}
          </EmptyState>
        </Bullseye>
      </PageSection>
    </React.Fragment>
  );
};
