import * as React from "react";
import { Page, SkipToContent } from "@patternfly/react-core";
import { ButtonAboutProject } from "../ButtonAboutProject";
import { HeaderProject } from "../HeaderProject";

export interface HorizontalLayoutProps {}

interface State {}

export class HorizontalLayout extends React.Component<
  HorizontalLayoutProps,
  State
> {
  renderAboutButton = () => {
    return <ButtonAboutProject />;
  };

  render() {
    const { children } = this.props;

    const pageId = "main-content-page-layout-horizontal-nav";
    const PageSkipToContent = (
      <SkipToContent href={`#${pageId}`}>Skip to content</SkipToContent>
    );

    return (
      <React.Fragment>
        <Page
          header={<HeaderProject aboutButton={this.renderAboutButton()} />}
          skipToContent={PageSkipToContent}
          mainContainerId={pageId}
        >
          {children}
        </Page>
      </React.Fragment>
    );
  }
}
