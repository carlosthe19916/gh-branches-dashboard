import React from "react";
import { Button, ButtonVariant } from "@patternfly/react-core";
import { GithubIcon } from "@patternfly/react-icons";

export const SignInButton: React.FC = () => {
  return (
    <React.Fragment>
      <Button variant={ButtonVariant.tertiary}>
        <GithubIcon /> Sign in
      </Button>
    </React.Fragment>
  );
};
