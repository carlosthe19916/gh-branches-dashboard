import React from "react";
import { shallow } from "enzyme";
import { HorizontalLayout } from "../HorizontalLayout";

it("Test snapshot", () => {
  const wrapper = shallow(<HorizontalLayout />);
  expect(wrapper).toMatchSnapshot();
});
