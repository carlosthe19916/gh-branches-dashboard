import React from "react";
import { shallow } from "enzyme";
import {
  NavLinkBranches,
  NavLinkBranchesStateToProps
} from "../NavLinkBranches";

it("Test snapshot :: with ctxRepository", () => {
  const props: NavLinkBranchesStateToProps = {
    ctxRepository: {
      full_name: "carlosthe19916/gh-branches-dashboard"
    }
  };

  const wrapper = shallow(<NavLinkBranches {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it("Test snapshot :: without ctxRepository", () => {
  const props: NavLinkBranchesStateToProps = {
    ctxRepository: undefined
  };

  const wrapper = shallow(<NavLinkBranches {...props} />);
  expect(wrapper).toMatchSnapshot();
});
