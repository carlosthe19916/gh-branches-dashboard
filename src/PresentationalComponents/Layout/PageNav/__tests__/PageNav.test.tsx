import React from "react";
import { shallow } from "enzyme";
import { PageNav } from "../PageNav";

it("Test snapshot", () => {
  const wrapper = shallow(<PageNav />);
  expect(wrapper).toMatchSnapshot();
});
