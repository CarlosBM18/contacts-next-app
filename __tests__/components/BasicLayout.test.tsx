import React from "react";
import renderer from "react-test-renderer";
import { BasicLayout } from "../../components/BasicLayout";

test("renders BasicLayout correctly", () => {
  const tree = renderer
    .create(
      <BasicLayout title="Test">
        <div>Test</div>
      </BasicLayout>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
