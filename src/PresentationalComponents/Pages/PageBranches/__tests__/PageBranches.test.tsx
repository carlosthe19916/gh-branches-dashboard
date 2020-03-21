import React from "react";
import { shallow } from "enzyme";
import queryString from "query-string";
import {
  PageBranches,
  PageBranchesProps,
  extractBranchOrderQueryParam
} from "../PageBranches";

it("Test extractBranchOrderQueryParam :: no param", () => {
  const queryParams = queryString.parse("");
  const result = extractBranchOrderQueryParam(queryParams);

  expect(result).toMatchObject([]);
});

it("Test extractBranchOrderQueryParam :: single param", () => {
  const queryParams = queryString.parse("?branchOrder=branch1");
  const result = extractBranchOrderQueryParam(queryParams);

  expect(result).toMatchObject(["branch1"]);
});

it("Test extractBranchOrderQueryParam :: multiple params", () => {
  const queryParams = queryString.parse(
    "?branchOrder=branch1&branchOrder=branch2"
  );
  const result = extractBranchOrderQueryParam(queryParams);

  expect(result).toMatchObject(["branch1", "branch2"]);
});

it("Test snapshot", () => {
  const props: PageBranchesProps = {
    match: {
      params: {
        owner: "carlosthe19916",
        repository: "gh-branches-dashboard"
      }
    },
    history: jest.fn(),
    location: {
      seach: "?"
    }
  };

  const wrapper = shallow(<PageBranches {...props} />);
  expect(wrapper).toMatchSnapshot();
});
