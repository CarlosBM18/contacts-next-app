import React from "react";
import { render, screen } from "@testing-library/react";
import MyAccount from "../pages/my-account";

describe("MyAccount", () => {
  it("renders heading", () => {
    render(<MyAccount />);

    const heading = screen.getByRole("heading", {
      name: "My Account",
    });

    expect(heading).toBeInTheDocument();
  });
});
