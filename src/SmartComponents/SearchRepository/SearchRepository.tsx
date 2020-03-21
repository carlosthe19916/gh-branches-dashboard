import * as React from "react";
import {
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateVariant,
  TextInput,
  EmptyStateBody,
  Button
} from "@patternfly/react-core";
import { GithubIcon, LevelUpAltIcon } from "@patternfly/react-icons";
import { AppRouterProps } from "../../models/routerProps";

var gitRegex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)$/;
const exampleRepoUrl = "https://github.com/project-xavier/xavier-ui.git";

interface Props extends AppRouterProps {}

export const SearchRepository: React.FC<Props> = ({ history }) => {
  const [repoUrl, setRepoUrl] = React.useState("");
  const [validUrl, setValidUrl] = React.useState(false);

  const handleRepoUrlTextInputChange = (value: string) => {
    changeRepoUrl(value);
  };

  const handleSelectExampleRepoUrl = () => {
    changeRepoUrl(exampleRepoUrl);
  };

  const changeRepoUrl = (url: string) => {
    setRepoUrl(url);
    setValidUrl(gitRegex.test(url));
  };

  const handlePrimaryButtonClick = () => {
    const repoFullName: string[] = repoUrl
      .replace("https://github.com/", "")
      .replace(".git", "")
      .split("/");

    history.push(`/monitor/${repoFullName[0]}/${repoFullName[1]}/branches`);
  };

  return (
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
          icon={<LevelUpAltIcon />}
          iconPosition="right"
          onClick={handleSelectExampleRepoUrl}
        >
          {exampleRepoUrl}
        </Button>
      </EmptyStateBody>
      <Button
        variant="primary"
        onClick={handlePrimaryButtonClick}
        isDisabled={!validUrl}
      >
        Find and monitor
      </Button>
    </EmptyState>
  );
};
