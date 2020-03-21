import React from "react";
import { shallow } from "enzyme";
import { DeleteDialogBase, DeleteDialogBaseProps } from "../DeleteDialog";

it("Test snapshot", () => {
  const props: DeleteDialogBaseProps = {
    name: "myFolder",
    type: "Folder",
    isOpen: false,
    isProcessing: false,
    isError: false,
    onDelete: jest.fn(),
    onCancel: jest.fn()
  };

  const wrapper = shallow(<DeleteDialogBase {...props} />);
  expect(wrapper).toMatchSnapshot();
});
