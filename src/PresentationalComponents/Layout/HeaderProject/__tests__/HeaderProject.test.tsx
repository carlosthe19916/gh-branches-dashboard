import React from "react";
import { shallow } from "enzyme";
import { HeaderProject, HeaderProjectProps } from "../HeaderProject";
import { Button } from "@patternfly/react-core";

it("Test snapshot", () => {
  const props: HeaderProjectProps = {
    aboutButton: <Button>About Button</Button>
  };

  const wrapper = shallow(<HeaderProject {...props} />);
  expect(wrapper).toMatchSnapshot();
});
