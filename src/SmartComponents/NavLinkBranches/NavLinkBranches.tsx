import React from "react";
import { NavLink } from "react-router-dom";
import { RepoGh } from "../../models/github-models";

export interface NavLinkBranchesStateToProps {
  ctxRepository: RepoGh | undefined;
}

export interface NavLinkBranchesDispatchToProps {}

export interface Props
  extends NavLinkBranchesStateToProps,
    NavLinkBranchesDispatchToProps {}

export const NavLinkBranches: React.FC<Props> = ({ ctxRepository }) => {
  return ctxRepository ? (
    <NavLink
      to={`/monitor/${ctxRepository.full_name}/branches`}
      className="pf-c-nav__link"
      activeClassName="pf-m-current"
    >
      Branches
    </NavLink>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
