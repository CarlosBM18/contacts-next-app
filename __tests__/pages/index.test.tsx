import React from "react";
import { render, screen } from "@testing-library/react";
import Index from "../../pages/index";

test("renders Index heading", () => {
  render(<Index />);

  const heading = screen.getByRole("heading", {
    name: "Contacts",
  });

  expect(heading).toBeInTheDocument();
});
