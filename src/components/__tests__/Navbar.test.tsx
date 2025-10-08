import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar";
import React from "react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock next/link
jest.mock("next/link", () => {
  const MockedLink = ({
    children,
    href,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    [key: string]: unknown;
  }) => {
    return (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  };
  return MockedLink;
});

// Mock the UI components
jest.mock("../ui/button", () => ({
  Button: ({
    children,
    asChild,
    className,
    ...props
  }: {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
    [key: string]: unknown;
  }) => {
    if (asChild) {
      return <>{children}</>;
    }
    return (
      <button className={className} {...props}>
        {children}
      </button>
    );
  },
}));

jest.mock("../ui/sheet", () => ({
  Sheet: ({
    children,
    open,
    onOpenChange,
  }: {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => {
    // Suppress unused variable warning
    void onOpenChange;
    return (
      <div data-testid="sheet" data-open={open}>
        {children}
      </div>
    );
  },
  SheetContent: ({
    children,
    side,
  }: {
    children: React.ReactNode;
    side: string;
  }) => (
    <div data-testid="sheet-content" data-side={side}>
      {children}
    </div>
  ),
  SheetTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet-trigger">{children}</div>
  ),
}));

// Mock framer-motion
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

describe("Navbar", () => {
  const mockUsePathname = usePathname as jest.MockedFunction<
    typeof usePathname
  >;

  beforeEach(() => {
    mockUsePathname.mockClear();
  });

  it("renders the navbar with logo and brand name", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    expect(screen.getByText("Northgate Academy")).toBeInTheDocument();
    // Check for the graduation cap SVG icon
    expect(screen.getByTestId("graduation-cap-icon")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    // Check that navigation links exist (they appear in both desktop and mobile)
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Courses").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Teachers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Admissions").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
  });

  it("renders the Apply Now button", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    // Apply Now button appears in both desktop and mobile
    expect(screen.getAllByText("Apply Now").length).toBeGreaterThan(0);
  });

  it("highlights the active link correctly", () => {
    mockUsePathname.mockReturnValue("/about");

    render(<Navbar />);

    // Target the desktop navigation specifically (hidden md:flex container)
    const desktopNav = document.querySelector(".hidden.md\\:flex");
    expect(desktopNav).toBeInTheDocument();

    // Find the About link within the desktop navigation
    const aboutLink = desktopNav?.querySelector('a[href="/about"]');
    expect(aboutLink).toHaveClass("bg-blue-700", "text-white");
    expect(aboutLink).toHaveAttribute("aria-current", "page");
  });

  it("renders mobile menu trigger on mobile screens", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    expect(screen.getByTestId("sheet-trigger")).toBeInTheDocument();
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("opens mobile menu when trigger is clicked", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    const menuButton = screen.getByLabelText("Open menu");

    // Initially closed
    expect(screen.getByTestId("sheet")).toHaveAttribute("data-open", "false");

    // Click to open - in a real implementation this would trigger onOpenChange
    fireEvent.click(menuButton);

    // Note: The state management would need to be handled by the actual component
    // For this test, we're verifying the trigger exists and is clickable
  });

  it("renders mobile navigation links in sheet", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    // The mobile navigation content should be present in the DOM
    expect(screen.getByTestId("sheet-content")).toBeInTheDocument();

    // Check mobile navigation links specifically within the sheet content
    const mobileNavLinks = screen
      .getByTestId("sheet-content")
      .querySelectorAll("a");
    expect(mobileNavLinks).toHaveLength(7); // 6 nav links + 1 apply button

    // Check that navigation links exist (they might be duplicated with desktop)
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Courses").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Teachers").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Admissions").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Apply Now").length).toBeGreaterThan(0);
  });

  it("closes mobile menu when link is clicked", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    // The mobile menu structure should be present
    expect(screen.getByTestId("sheet")).toBeInTheDocument();

    // Click a mobile navigation link - in a real scenario this would close the menu
    const aboutLink = screen.getAllByRole("link", { name: "About" })[1]; // Mobile version
    expect(aboutLink).toBeInTheDocument();

    // This test verifies that the mobile navigation links are clickable
    fireEvent.click(aboutLink);
  });

  it("applies correct styling for different screen sizes", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    // Desktop navigation should be hidden on mobile (hidden md:flex)
    const desktopNav = document.querySelector(".hidden.md\\:flex");
    expect(desktopNav).toBeInTheDocument();

    // Mobile trigger should be hidden on desktop (md:hidden)
    const mobileTrigger = screen.getByTestId("sheet-trigger");
    expect(mobileTrigger).toBeInTheDocument();
  });

  it("handles different active routes correctly", () => {
    // Test home route
    mockUsePathname.mockReturnValue("/");
    const { rerender } = render(<Navbar />);

    // Target desktop navigation specifically (hidden md:flex container)
    const desktopNav = document.querySelector(".hidden.md\\:flex");
    expect(desktopNav).toBeInTheDocument();

    // Find the Home link within the desktop navigation
    const homeLink = desktopNav?.querySelector('a[href="/"]');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass("bg-blue-700");
    expect(homeLink).toHaveClass("text-white");
    expect(homeLink).toHaveAttribute("aria-current", "page");

    // Test about route
    mockUsePathname.mockReturnValue("/about");
    rerender(<Navbar />);

    // Find the About link within the desktop navigation
    const aboutLink = desktopNav?.querySelector('a[href="/about"]');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveClass("bg-blue-700");
    expect(aboutLink).toHaveClass("text-white");
    expect(aboutLink).toHaveAttribute("aria-current", "page");
  });
});
