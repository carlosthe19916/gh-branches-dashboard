import * as React from "react";

export interface OAuthOptions {
  authorizeUrl: string;
  accessTokenUrl: string;
  scope?: string[];
  redirectUri: string;
  clientID: string;
}

export type authorize = () => void;

const storagePrefix = "oauth2";
const localStorageConfigName = storagePrefix + "-config";
const localStorageStateName = storagePrefix + "-state";

export const useOAuth2 = ({
  authorizeUrl,
  accessTokenUrl,
  scope = [],
  redirectUri,
  clientID
}: OAuthOptions): [authorize] => {
  const configOptions = JSON.stringify({
    authorizeUrl,
    accessTokenUrl,
    scope,
    redirectUri,
    clientID
  });
  const state = cryptoRandomString();

  localStorage.setItem(localStorageConfigName, configOptions);
  localStorage.setItem(localStorageStateName, state);

  const authorize = () => {
    window.location.replace(
      OAuth2AuthorizeURL({
        scope,
        clientID,
        authorizeUrl,
        state,
        redirectUri
      })
    );
  };

  return [authorize];
};

export const OAuthCallback: React.FunctionComponent<{}> = ({ children }) => {
  // const state = localStorage.getItem(localStorageStateName);
  const config = localStorage.getItem(localStorageConfigName);
  const configOptions: OAuthOptions = JSON.parse(config || "");

  React.useEffect(() => {
    const params: Map<string, string> = new Map();

    urlDecode(window.location.search.slice(1)).forEach((k, v) => {
      params.set(v, k);
    });
    urlDecode(window.location.hash.slice(1)).forEach((k, v) => {
      params.set(v, k);
    });

    // if (state !== params.get("state")) throw new Error("incorrect state token");

    const code: string | undefined = params.get("code");
    if (code === undefined) throw new Error("No code found");

    let data = new FormData();
    data.append("client_id", configOptions.clientID);
    // data.append("client_secret", configOptions.client_secret);
    data.append("code", code);
    fetch(configOptions.accessTokenUrl, {
      method: "post",
      body: data
    }).then(response => {
      console.log("response", response);
    });
  });

  return <React.Fragment>{children || "please wait..."}</React.Fragment>;
};

const OAuth2AuthorizeURL = ({
  scope,
  clientID,
  state,
  authorizeUrl,
  redirectUri
}: {
  scope: string[];
  clientID: string;
  state: string;
  authorizeUrl: string;
  redirectUri: string;
}) =>
  `${authorizeUrl}?${Object.entries({
    scope: scope.join(","),
    client_id: clientID,
    state,
    redirect_uri: redirectUri
  })
    .map(([k, v]) => [k, v].map(encodeURIComponent).join("="))
    .join("&")}`;

const cryptoRandomString = (): string => {
  return Math.random().toString(36).substring(7);
};


const urlDecode = (urlString: string): Map<string, string> => {
  const result: Map<string, string> = new Map();
  urlString.split("&").forEach((param: string) => {
    const sepIndex = param.indexOf("=");
    const k = decodeURIComponent(param.slice(0, sepIndex));
    const v = decodeURIComponent(param.slice(sepIndex + 1));
    return result.set(k, v);
  });
  return result;
};
