import React from "react";
import { shallow } from "enzyme";
import {
  ContextRepositoryLoader,
  ContextRepositoryLoaderStateToProps,
  ContextRepositoryLoaderDispatchToProps
} from "../ContextRepositoryLoader";
import { AxiosError } from "axios";

it("Test snapshot", () => {
  const stateToProps: ContextRepositoryLoaderStateToProps = {
    ctxRepositoryError: undefined,
    ctxRepositoryFetchStatus: "none"
  };
  const dispatchToProps: ContextRepositoryLoaderDispatchToProps = {
    fetchCtxRepository: jest.fn()
  };

  const wrapper = shallow(
    <ContextRepositoryLoader
      {...stateToProps}
      {...dispatchToProps}
      repositoryId={"carlosthe19916/gh-branches-dashboard"}
    >
      <p>my content</p>
    </ContextRepositoryLoader>
  );

  expect(wrapper).toMatchSnapshot();
});

it("Test snapshot :: fetch 'none'", () => {
  const stateToProps: ContextRepositoryLoaderStateToProps = {
    ctxRepositoryError: undefined,
    ctxRepositoryFetchStatus: "none"
  };
  const dispatchToProps: ContextRepositoryLoaderDispatchToProps = {
    fetchCtxRepository: jest.fn()
  };

  const wrapper = shallow(
    <ContextRepositoryLoader
      {...stateToProps}
      {...dispatchToProps}
      repositoryId={"carlosthe19916/gh-branches-dashboard"}
    >
      <p>my content</p>
    </ContextRepositoryLoader>
  );

  expect(wrapper).toMatchSnapshot();
});

it("Test snapshot :: fetch 'inProgress'", () => {
  const stateToProps: ContextRepositoryLoaderStateToProps = {
    ctxRepositoryError: undefined,
    ctxRepositoryFetchStatus: "inProgress"
  };
  const dispatchToProps: ContextRepositoryLoaderDispatchToProps = {
    fetchCtxRepository: jest.fn()
  };

  const wrapper = shallow(
    <ContextRepositoryLoader
      {...stateToProps}
      {...dispatchToProps}
      repositoryId={"carlosthe19916/gh-branches-dashboard"}
    >
      <p>my content</p>
    </ContextRepositoryLoader>
  );

  expect(wrapper).toMatchSnapshot();
});

it("Test snapshot :: fetch 'complete'", () => {
  const stateToProps: ContextRepositoryLoaderStateToProps = {
    ctxRepositoryError: undefined,
    ctxRepositoryFetchStatus: "complete"
  };
  const dispatchToProps: ContextRepositoryLoaderDispatchToProps = {
    fetchCtxRepository: jest.fn()
  };

  const wrapper = shallow(
    <ContextRepositoryLoader
      {...stateToProps}
      {...dispatchToProps}
      repositoryId={"carlosthe19916/gh-branches-dashboard"}
    >
      <p>my content</p>
    </ContextRepositoryLoader>
  );

  expect(wrapper).toMatchSnapshot();
});

it("Test snapshot :: error", () => {
  // Given
  const stateToProps: ContextRepositoryLoaderStateToProps = {
    ctxRepositoryError: {
      name: "Axios error",
      message: "Error fetching data",
      isAxiosError: true,
      config: {},
      toJSON: jest.fn()
    },
    ctxRepositoryFetchStatus: "none"
  };
  const dispatchToProps: ContextRepositoryLoaderDispatchToProps = {
    fetchCtxRepository: jest.fn()
  };

  // When
  const wrapper = shallow(
    <ContextRepositoryLoader
      {...stateToProps}
      {...dispatchToProps}
      repositoryId={"carlosthe19916/gh-branches-dashboard"}
    >
      <p>my content</p>
    </ContextRepositoryLoader>
  );

  // Then
  expect(wrapper).toMatchSnapshot();
});

it("Test snapshot :: error 'retry'", () => {
  // Given
  window.location.reload = jest.fn();  

  const stateToProps: ContextRepositoryLoaderStateToProps = {
    ctxRepositoryError: {
      name: "Axios error",
      message: "Error fetching data",
      isAxiosError: true,
      config: {},
      toJSON: jest.fn()
    },
    ctxRepositoryFetchStatus: "none"
  };
  const dispatchToProps: ContextRepositoryLoaderDispatchToProps = {
    fetchCtxRepository: jest.fn()
  };

  // When
  const wrapper = shallow(
    <ContextRepositoryLoader
      {...stateToProps}
      {...dispatchToProps}
      repositoryId={"carlosthe19916/gh-branches-dashboard"}
    >
      <p>my content</p>
    </ContextRepositoryLoader>
  );

  wrapper.find("#ContextRepositoryLoader_retryButton").simulate("click");

  // Then
  expect(window.location.reload).toHaveBeenCalled();
});
