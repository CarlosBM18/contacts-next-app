import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "../pages/register";

describe("Register", () => {
  it("renders heading", () => {
    render(<Register />);

    const heading = screen.getByRole("heading", {
      name: "Register",
    });

    expect(heading).toBeInTheDocument();
  });
});
