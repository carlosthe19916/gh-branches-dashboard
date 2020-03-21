import React from "react";
import { AxiosError } from "axios";
import { FetchStatus } from "../../store/common";
import {
  PageSection,
  Bullseye,
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateVariant,
  Button,
  ButtonVariant,
  EmptyStateBody
} from "@patternfly/react-core";
import { CloudRainIcon } from "@patternfly/react-icons";

export interface ContextRepositoryLoaderStateToProps {
  ctxRepositoryError: AxiosError<any> | undefined;
  ctxRepositoryFetchStatus: FetchStatus;
}

export interface ContextRepositoryLoaderDispatchToProps {
  fetchCtxRepository: (repoFullName: string) => any;
}

export interface ContextRepositoryLoaderProps
  extends ContextRepositoryLoaderStateToProps,
    ContextRepositoryLoaderDispatchToProps {
  repoFullName: string;
  children: React.ReactNode;
}

interface State {}

export class ContextRepositoryLoader extends React.Component<
  ContextRepositoryLoaderProps,
  State
> {
  componentDidMount() {
    const { fetchCtxRepository, repoFullName } = this.props;
    fetchCtxRepository(repoFullName);
  }

  renderMessage = (message: string) => {
    return (
      <PageSection>
        <Bullseye>{message}</Bullseye>
      </PageSection>
    );
  };

  reloadCurrentPage = () => {
    window.location.reload();
  };

  renderError = () => {
    const { repoFullName } = this.props;
    return (
      <PageSection>
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.large}>
            <EmptyStateIcon icon={CloudRainIcon} />
            <Title headingLevel="h5" size="lg">
              {repoFullName}.
            </Title>
            <EmptyStateBody>
              Error fetching repository. Try to reload the page to fetch the
              data again. You can reload the page clicking on the button below.
            </EmptyStateBody>
            <Button
              id="ContextRepositoryLoader_retryButton"
              onClick={this.reloadCurrentPage}
              variant={ButtonVariant.primary}
            >
              Retry
            </Button>
          </EmptyState>
        </Bullseye>
      </PageSection>
    );
  };

  render() {
    const {
      ctxRepositoryError,
      ctxRepositoryFetchStatus,
      children
    } = this.props;

    if (ctxRepositoryError) {
      return this.renderError();
    }

    switch (ctxRepositoryFetchStatus) {
      case "none":
        return this.renderMessage("Waiting for fetch");
      case "inProgress":
        return this.renderMessage("Fetching...");
      case "complete":
        return <React.Fragment>{children}</React.Fragment>;
    }
  }
}
