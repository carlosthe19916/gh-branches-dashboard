import React from "react";
import { shallow } from "enzyme";
import { PageHome } from "../PageHome";

it("Test snapshot", () => {
  const wrapper = shallow(<PageHome />);
  expect(wrapper).toMatchSnapshot();
});
