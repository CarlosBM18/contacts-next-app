import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../../pages/login";

test("renders Login heading", () => {
  render(<Login />);

  const heading = screen.getByRole("heading", {
    name: "Login",
  });

  expect(heading).toBeInTheDocument();
});
