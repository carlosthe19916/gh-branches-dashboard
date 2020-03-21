import React from "react";
import { shallow } from "enzyme";
import { SearchRepository } from "../SearchRepository";
import { AppRouterProps } from "../../../models/routerProps";

it("Test snapshot", () => {
  const props: AppRouterProps = {
    match: {},
    location: {},
    history: {
      push: jest.fn()
    }
  };

  const wrapper = shallow(<SearchRepository {...props} />);
  expect(wrapper).toMatchSnapshot();
});
