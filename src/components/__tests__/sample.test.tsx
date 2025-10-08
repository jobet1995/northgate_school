import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Simple Test", () => {
  it("should render a heading", () => {
    render(<h1>Hello, World!</h1>);
    const heading = screen.getByText(/Hello, World!/i);
    expect(heading).toBeInTheDocument();
  });
});
