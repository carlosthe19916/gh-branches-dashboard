import React from "react";
import { NavLink } from "react-router-dom";

interface Props {}

export const NavLinkBranches: React.FC<Props> = () => {
  return (
    <NavLink
      to={`/devops/:owner/:repository/branches`}
      className="pf-c-nav__link"
      activeClassName="pf-m-current"
    >
      Branches
    </NavLink>
  );
};
