import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AboutPreview from "../AboutPreview";
import React from "react";

// Mock the next/image module
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="mocked-image" {...props} />
  ),
}));

// Mock the next/link and framer-motion modules
jest.mock("next/link", () => {
  const MockedLink = ({ children }: { children: React.ReactNode }) => {
    return <div data-testid="mocked-link">{children}</div>;
  };
  return MockedLink;
});

jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => {
      // Filter out framer-motion specific props that shouldn't go to DOM
      const {
        initial,
        animate,
        exit,
        transition,
        viewport,
        whileInView,
        whileHover,
        whileTap,
        ...domProps
      } = props;

      // Suppress unused variable warnings for framer-motion props
      void initial;
      void animate;
      void exit;
      void transition;
      void viewport;
      void whileInView;
      void whileHover;
      void whileTap;

      return (
        <div data-testid="mocked-motion-div" {...domProps}>
          {children}
        </div>
      );
    },
  },
}));

describe("AboutPreview", () => {
  it("renders the AboutPreview component correctly", () => {
    render(<AboutPreview />);
    // Check for the main heading
    expect(
      screen.getByText("Building Foundations for Tomorrow's Leaders"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /At Northgate Academy, we believe every student has unique talents/,
      ),
    ).toBeInTheDocument();
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
    expect(screen.getAllByTestId("mocked-motion-div").length).toBe(2); // Should have 2 motion.div elements
    expect(screen.getByTestId("mocked-link")).toBeInTheDocument();
  });
});
