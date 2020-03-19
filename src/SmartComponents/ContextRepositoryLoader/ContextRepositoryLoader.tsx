import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { FetchStatus } from "../../store/common";
import { PageSection, Bullseye } from "@patternfly/react-core";

interface StateToProps {
  ctxRepositoryError: AxiosError<any> | undefined;
  ctxRepositoryFetchStatus: FetchStatus;
}

interface DispatchToProps {
  fetchCtxRepository: (owner: string, repository: string) => any;
}

interface Props extends StateToProps, DispatchToProps {
  owner: string;
  repository: string;
  children: React.ReactNode;
}

interface State {}

export class ContextRepositoryLoader extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchCtxRepository, owner, repository } = this.props;
    fetchCtxRepository(owner, repository);
  }

  renderLoading = () => {
    return (
      <PageSection>
        <Bullseye>Loading...</Bullseye>
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
      return <Route render={() => <Redirect to="/error404" />} />;
    }

    switch (ctxRepositoryFetchStatus) {
      case "complete":
        return <React.Fragment>{children}</React.Fragment>;
      default:
        return <React.Fragment>{this.renderLoading()}</React.Fragment>;
    }
  }
}
