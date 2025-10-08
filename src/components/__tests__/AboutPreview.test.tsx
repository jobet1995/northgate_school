import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AboutPreview from "../AboutPreview";
import React from "react";

// Mock the next/link and framer-motion modules
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => {
    return <div data-testid="mocked-link">{children}</div>;
  };
});

jest.mock("framer-motion", () => ({
  motion: {
    section: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mocked-motion-section">{children}</div>
    ),
    div: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mocked-motion-div">{children}</div>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mocked-motion-h2">{children}</div>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mocked-motion-p">{children}</div>
    ),
  },
}));

describe("AboutPreview", () => {
  it("renders the AboutPreview component correctly", () => {
    render(<AboutPreview />);

    // Check for the main heading
    expect(
      screen.getByText("Building Foundations for Tomorrow's Leaders"),
    ).toBeInTheDocument();

    // Check for the first paragraph
    expect(
      screen.getByText(
        /At Excel Academy, we believe every student has unique talents waiting to be discovered\. Our dedicated faculty and modern facilities create an environment where curiosity thrives and excellence becomes a habit\./i,
      ),
    ).toBeInTheDocument();

    // Check for the mission heading and text
    expect(screen.getByText("Our Mission")).toBeInTheDocument();
    expect(
      screen.getByText(
        "To provide transformative education that nurtures critical thinking, creativity, and character.",
      ),
    ).toBeInTheDocument();

    // Check for the vision heading and text
    expect(screen.getByText("Our Vision")).toBeInTheDocument();
    expect(
      screen.getByText(
        "To be a beacon of educational excellence that inspires lifelong learning and global citizenship.",
      ),
    ).toBeInTheDocument();

    // Check for the image with the correct alt text and attributes
    expect(
      screen.getByAltText(
        "Students and teachers collaborating in a modern learning environment",
      ),
    ).toBeInTheDocument();

    // Verify that the mocked components are used
    expect(screen.getByTestId("mocked-motion-section")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-motion-div")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-motion-h2")).toBeInTheDocument();
    expect(screen.getAllByTestId("mocked-motion-p").length).toBeGreaterThan(0); // Check for multiple paragraphs
    expect(screen.getByTestId("mocked-link")).toBeInTheDocument();
  });
});
