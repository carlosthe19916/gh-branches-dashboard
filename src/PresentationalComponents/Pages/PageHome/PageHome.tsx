import * as React from "react";
import { PageSection, Bullseye } from "@patternfly/react-core";
import SearchRepository from "../../../SmartComponents/SearchRepository";

export interface PageHomeProps {}

export const PageHome: React.FC<PageHomeProps> = () => {
  return (
    <React.Fragment>
      <PageSection>
        <Bullseye>
          <SearchRepository />
        </Bullseye>
      </PageSection>
    </React.Fragment>
  );
};
