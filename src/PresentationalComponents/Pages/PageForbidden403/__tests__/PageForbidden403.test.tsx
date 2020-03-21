import React from "react";
import { shallow } from "enzyme";
import { PageForbidden403 } from "../PageForbidden403";

it("Test snapshot", () => {
  const wrapper = shallow(<PageForbidden403 />);
  expect(wrapper).toMatchSnapshot();
});
