import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { PageForbidden403 } from "./PresentationalComponents/Pages/PageForbidden403";
import { PageHome } from "./PresentationalComponents/Pages/PageHome";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/home" component={PageHome} />
      <Route path="/error403" component={PageForbidden403} />
      <Route path="/" render={() => <Redirect to={"/home"} />} />
    </Switch>
  );
};
