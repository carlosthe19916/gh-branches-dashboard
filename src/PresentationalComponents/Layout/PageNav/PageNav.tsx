import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, NavList, NavVariants } from "@patternfly/react-core";
import NavLinkBranches from "../../../SmartComponents/NavLinkBranches";

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
            <NavLinkBranches />
          </NavItem>
        </NavList>
      </Nav>
    );
  }
}
