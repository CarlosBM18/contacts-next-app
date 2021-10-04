import React from "react";
import { render, screen } from "@testing-library/react";
import MyAccount from "../../pages/my-account";

test("renders MyAccount heading", () => {
  render(<MyAccount />);

  const heading = screen.getByRole("heading", {
    name: "My Account",
  });

  expect(heading).toBeInTheDocument();
});
