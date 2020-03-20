import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { PageForbidden403 } from "./PresentationalComponents/Pages/PageForbidden403";
import { PageHome } from "./PresentationalComponents/Pages/PageHome";
import { PageBranches } from "./PresentationalComponents/Pages/PageBranches";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={PageHome} />
      <Route
        path="/monitor/:owner/:repository/branches"
        component={PageBranches}
      />
      <Route path="/error403" component={PageForbidden403} />
    </Switch>
  );
};
