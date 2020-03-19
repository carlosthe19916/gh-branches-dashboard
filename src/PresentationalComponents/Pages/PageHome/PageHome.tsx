import * as React from "react";
import {
  PageSection,
  Title,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  EmptyStateBody,
  Button,
  TextInput,
  Bullseye
} from "@patternfly/react-core";
import { GithubIcon, AngleUpIcon } from "@patternfly/react-icons";

export interface PageHomeProps {}

const exampleRepoUrl = "https://github.com/project-xavier/xavier-ui";

export const PageHome: React.FC<PageHomeProps> = () => {
  const [repoUrl, setRepoUrl] = React.useState("");

  const handleRepoUrlTextInputChange = (value: string) => {
    setRepoUrl(value);
  };

  const handleSelectExampleRepoUrl = () => {
    setRepoUrl(exampleRepoUrl);
  };

  return (
    <React.Fragment>
      <PageSection>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={GithubIcon} />
            <Title headingLevel="h5" size="lg">
              <div className="pf-l-split ins-c-conditional-filter">
                <div className="pf-l-split__item pf-m-fill">
                  <TextInput
                    id="find-repository"
                    type="text"
                    value={repoUrl}
                    onChange={handleRepoUrlTextInputChange}
                    className="ins-c-conditional-filter"
                    aria-label="search repository input text"
                  />
                </div>
              </div>
            </Title>
            <EmptyStateBody>
              Paste your repository URL and then click in the button below.
              <Button
                variant="link"
                icon={<AngleUpIcon />}
                iconPosition="right"
                onClick={handleSelectExampleRepoUrl}
              >
                {exampleRepoUrl}
              </Button>
            </EmptyStateBody>
            <Button variant="primary">Find and monitor</Button>
          </EmptyState>
        </Bullseye>
      </PageSection>
    </React.Fragment>
  );
};
