import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { PageForbidden403 } from "./PresentationalComponents/Pages/PageForbidden403";
import { PageHome } from "./PresentationalComponents/Pages/PageHome";
import { PageBranches } from "./PresentationalComponents/Pages/PageBranches";
import { OAuthCallback } from "./SmartComponents/OAuth2/OAuth2";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/home" component={PageHome} />
      <Route
        path="/monitor/:owner/:repository/branches"
        component={PageBranches}
      />
      <Route path="/error403" component={PageForbidden403} />
      <Route path="/oauth2/callback" component={OAuthCallback} />
      <Route path="/" render={() => <Redirect to={"/home"} />} />
    </Switch>
  );
};
