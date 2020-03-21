import React from "react";
import { shallow } from "enzyme";
import { ButtonAboutProject } from "../ButtonAboutProject";

it("Test snapshot", () => {
  const wrapper = shallow(<ButtonAboutProject />);
  expect(wrapper).toMatchSnapshot();
});

it("Test snapshot :: open modal", () => {
  const wrapper = shallow(<ButtonAboutProject />);
  wrapper.find("#aboutButton").simulate("click");
  expect(wrapper).toMatchSnapshot();
});
