import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, NavList, NavVariants } from "@patternfly/react-core";

interface Props {}

interface State {}

export class PageNav extends React.Component<Props, State> {
  render() {
    return (
      <Nav id="nav-primary-simple" aria-label="Nav">
        <NavList variant={NavVariants.horizontal}>
          <NavItem>
            <NavLink to="/home" activeClassName="pf-m-current">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={`/devops/:owner/:repository/branches`}
              activeClassName="pf-m-current"
            >
              Branches
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
    );
  }
}
