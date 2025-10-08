import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";
import React from "react";

// Mock next/link
jest.mock("next/link", () => {
  const MockedLink = ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
  return MockedLink;
});

// Mock next/image
jest.mock("next/image", () => {
  const MockedImage = ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    // Filter out Next.js specific props that don't work on img elements
    const { ...imgProps } = props;
    return <img src={src} alt={alt} {...imgProps} />;
  };
  return MockedImage;
});

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
  },
}));

describe("Hero", () => {
  it("renders the hero section with correct structure", () => {
    render(<Hero />);

    // Check main section element
    const heroSection = document.querySelector("section");
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass("relative", "overflow-hidden");
  });

  it("renders the welcome badge with sparkle icon", () => {
    render(<Hero />);

    // Check welcome badge text
    expect(screen.getByText("Welcome to Excellence")).toBeInTheDocument();

    // Check sparkle icon (aria-hidden indicates it's decorative)
    const sparkleIcon = document.querySelector("svg[aria-hidden='true']");
    expect(sparkleIcon).toBeInTheDocument();
  });

  it("renders the main heading with correct text", () => {
    render(<Hero />);

    // Check main heading
    expect(
      screen.getByText("Empowering Future Leaders Through"),
    ).toBeInTheDocument();
    expect(screen.getByText("Quality Education")).toBeInTheDocument();

    // Check that "Quality Education" is highlighted in blue
    const qualityEducation = screen.getByText("Quality Education");
    expect(qualityEducation).toHaveClass("text-blue-700");
  });

  it("renders the description paragraph", () => {
    render(<Hero />);

    expect(
      screen.getByText(
        "Where curiosity meets excellence. Join our community of learners and unlock your full potential in a supportive, innovative environment.",
      ),
    ).toBeInTheDocument();
  });

  it("renders CTA buttons with correct links", () => {
    render(<Hero />);

    // Check "Enroll Now" button
    const enrollButton = screen.getByText("Enroll Now");
    expect(enrollButton).toBeInTheDocument();
    expect(enrollButton.closest("a")).toHaveAttribute("href", "/admissions");

    // Check "Learn More" button
    const learnMoreButton = screen.getByText("Learn More");
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton.closest("a")).toHaveAttribute("href", "/about");
  });

  it("renders buttons with correct styling", () => {
    render(<Hero />);

    // Check primary button styling (rendered as anchor tag)
    const enrollButton = screen.getByText("Enroll Now").closest("a");
    expect(enrollButton).toHaveClass("bg-blue-700", "text-white");

    // Check outline button styling (rendered as anchor tag)
    const learnMoreButton = screen.getByText("Learn More").closest("a");
    expect(learnMoreButton).toHaveClass("border-2", "border-gray-300");
  });

  it("renders the image with correct attributes", () => {
    render(<Hero />);

    // Check image element
    const image = screen.getByAltText(
      "Students engaged in collaborative learning in a modern classroom environment",
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://images.pexels.com/photos/8500704/pexels-photo-8500704.jpeg?auto=compress&cs=tinysrgb&w=800",
    );
  });

  it("renders the success rate card", () => {
    render(<Hero />);

    // Check success rate text
    expect(screen.getByText("98% Success Rate")).toBeInTheDocument();
    expect(screen.getByText("Student Achievement")).toBeInTheDocument();

    // Check checkmark icon
    const checkIcon = document.querySelector("svg path[d='M5 13l4 4L19 7']");
    expect(checkIcon).toBeInTheDocument();
  });

  it("applies correct background styling", () => {
    render(<Hero />);

    const heroSection = document.querySelector("section");
    expect(heroSection).toHaveClass(
      "bg-gradient-to-br",
      "from-blue-50",
      "via-white",
      "to-blue-50",
    );
  });

  it("renders responsive grid layout", () => {
    render(<Hero />);

    // Check grid container
    const gridContainer = document.querySelector(".grid");
    expect(gridContainer).toHaveClass(
      "lg:grid-cols-2",
      "gap-12",
      "items-center",
    );
  });

  it("renders motion animations (mocked)", () => {
    render(<Hero />);

    // Check that motion divs are rendered (mocked as regular divs)
    const motionDivs = document.querySelectorAll(
      "div[class*='space-y-8'], div[class*='relative']",
    );
    expect(motionDivs.length).toBeGreaterThan(0);
  });
});
