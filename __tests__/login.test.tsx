import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../pages/login";

describe("Login", () => {
  it("renders heading", () => {
    render(<Login />);

    const heading = screen.getByRole("heading", {
      name: "Login",
    });

    expect(heading).toBeInTheDocument();
  });
});
