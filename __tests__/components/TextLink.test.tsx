import React from "react";
import renderer from "react-test-renderer";
import { TextLink } from "../../components/TextLink";

test("renders TextLink correctly", () => {
  const tree = renderer
    .create(<TextLink text="Test" onClick={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
