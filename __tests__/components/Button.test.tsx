import React from "react";
import renderer from "react-test-renderer";
import { Button } from "../../components/Button";

test("renders Button primary correctly", () => {
  const onClick = jest.fn(() => {});
  const tree = renderer
    .create(
      <Button
        title="TEST"
        styleType="primary"
        type="submit"
        loading={false}
        onClick={onClick}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders Button danger correctly", () => {
  const tree = renderer
    .create(
      <Button title="TEST" styleType="danger" type="button" loading={true} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
