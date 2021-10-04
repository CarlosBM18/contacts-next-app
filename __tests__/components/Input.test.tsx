import React from "react";
import renderer from "react-test-renderer";
import { Input } from "../../components/Input";

test("renders Input normal correctly", () => {
  const tree = renderer
    .create(<Input label="Test" value={"Test"} setValue={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders Input password correctly", () => {
  const tree = renderer
    .create(
      <Input
        label="Password"
        value={"Test"}
        setValue={() => {}}
        type="password"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
