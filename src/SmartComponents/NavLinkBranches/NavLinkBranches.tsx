import React from "react";
import { NavLink } from "react-router-dom";

interface Props {}

export const NavLinkBranches: React.FC<Props> = () => {
  return (
    <NavLink
      to={`/devops/:owner/:repository/branches`}
      activeClassName="pf-m-current"
    >
      Branches
    </NavLink>
  );
};
