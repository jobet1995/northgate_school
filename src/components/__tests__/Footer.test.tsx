import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
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

describe("Footer", () => {
  beforeEach(() => {
    // Mock Date to return a consistent year for testing
    jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(2024);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the footer with correct structure", () => {
    render(<Footer />);

    // Check main footer element
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the brand section with logo and description", () => {
    render(<Footer />);

    // Check brand name
    expect(screen.getByText("Northgate School")).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(
        "Empowering future leaders through quality education. Where curiosity meets excellence.",
      ),
    ).toBeInTheDocument();

    // Check graduation cap icon
    expect(screen.getByTestId("graduation-cap-icon")).toBeInTheDocument();
  });

  it("renders all quick links", () => {
    render(<Footer />);

    // Check all quick links are present
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByText("Teachers")).toBeInTheDocument();
    expect(screen.getByText("Admissions")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<Footer />);

    // Check address
    expect(
      screen.getByText("123 Education Street, Learning City, LC 12345"),
    ).toBeInTheDocument();

    // Check phone number
    expect(screen.getByText("+1 (234) 567-890")).toBeInTheDocument();

    // Check email
    expect(screen.getByText("info@northgateschool.edu")).toBeInTheDocument();
  });

  it("renders contact icons", () => {
    render(<Footer />);

    // Check for contact icons
    expect(document.querySelector("svg.lucide-map-pin")).toBeInTheDocument();
    expect(document.querySelector("svg.lucide-phone")).toBeInTheDocument();
    expect(document.querySelector("svg.lucide-mail")).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<Footer />);

    // Check social media icons
    expect(document.querySelector("svg.lucide-facebook")).toBeInTheDocument();
    expect(document.querySelector("svg.lucide-twitter")).toBeInTheDocument();
    expect(document.querySelector("svg.lucide-instagram")).toBeInTheDocument();
    expect(document.querySelector("svg.lucide-linkedin")).toBeInTheDocument();
  });

  it("renders social media links with correct attributes", () => {
    render(<Footer />);

    // Check social media links have correct attributes
    const facebookLink = screen.getByLabelText("Facebook");
    const twitterLink = screen.getByLabelText("Twitter");
    const instagramLink = screen.getByLabelText("Instagram");
    const linkedinLink = screen.getByLabelText("LinkedIn");

    expect(facebookLink).toHaveAttribute("href", "https://facebook.com");
    expect(facebookLink).toHaveAttribute("target", "_blank");
    expect(facebookLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(twitterLink).toHaveAttribute("href", "https://twitter.com");
    expect(instagramLink).toHaveAttribute("href", "https://instagram.com");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com");
  });

  it("renders copyright notice with current year", () => {
    render(<Footer />);

    // Check copyright notice with mocked year
    expect(
      screen.getByText("© 2024 Northgate School. All rights reserved."),
    ).toBeInTheDocument();
  });

  it("renders all sections with proper headings", () => {
    render(<Footer />);

    // Check section headings
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<Footer />);

    // Check footer has correct background
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-gray-900");

    // Check brand section styling
    const brandSection = screen.getByText("Northgate School").closest("div");
    expect(brandSection).toHaveClass("space-y-4");
  });

  it("renders responsive grid layout", () => {
    render(<Footer />);

    // Check main grid container
    const gridContainer = screen.getByText("Northgate School").closest(".grid");
    expect(gridContainer).toHaveClass(
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
    );
  });

  it("renders contact links as clickable", () => {
    render(<Footer />);

    // Check phone and email links are clickable
    const phoneLink = screen.getByText("+1 (234) 567-890");
    const emailLink = screen.getByText("info@northgateschool.edu");

    expect(phoneLink).toHaveAttribute("href", "tel:+1234567890");
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:info@northgateschool.edu",
    );
  });
});
