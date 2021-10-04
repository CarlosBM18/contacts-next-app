import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../../pages/register";

test("renders Register heading", () => {
  render(<Register />);

  const heading = screen.getByRole("heading", {
    name: "Register",
  });

  expect(heading).toBeInTheDocument();
});
