import React from "react";
import { Button, ButtonVariant } from "@patternfly/react-core";
import { GithubIcon } from "@patternfly/react-icons";
import { useOAuth2 } from "../../SmartComponents/OAuth2/OAuth2";

export const SignInButton: React.FC = () => {
  const authorizeUrl = process.env.REACT_APP_GITHUB_AUTHORIZE_URL || "";
  const accessTokenUrl = process.env.REACT_APP_GITHUB_ACCESS_TOKEN_URL || "";
  const clientID = process.env.REACT_APP_GITHUB_CLIENT_ID || "";
  const scope = process.env.REACT_APP_GITHUB_SCOPE || "";
  const redirectUri = `${window.location.origin}${process.env.PUBLIC_URL}/oauth2/callback`;

  const [authorize] = useOAuth2({
    clientID: clientID,
    authorizeUrl: authorizeUrl,
    accessTokenUrl: accessTokenUrl,
    redirectUri: redirectUri,
    scope: scope.split(",")
  });

  return (
    <React.Fragment>
      <Button variant={ButtonVariant.tertiary} onClick={authorize}>
        <GithubIcon /> Sign in
      </Button>
    </React.Fragment>
  );
};
