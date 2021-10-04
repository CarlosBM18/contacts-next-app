import React from "react";
import renderer from "react-test-renderer";
import { Spinner } from "../../components/Spinner";

test("renders Spinner correctly", () => {
  const tree = renderer.create(<Spinner />).toJSON();
  expect(tree).toMatchSnapshot();
});
