import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Navbar } from "@/components/Navbar";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));
vi.mock("next/link", () => ({
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a {...props}>{children}</a>,
}));

const mockUsePathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useParams: () => ({}),
}));

describe("Navbar", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders default navigation links when no props", () => {
    render(<Navbar />);
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("ABOUT")).toBeInTheDocument();
    expect(screen.getByText("SERVICES")).toBeInTheDocument();
    expect(screen.getByText("GALLERY")).toBeInTheDocument();
    expect(screen.getByText("BLOG")).toBeInTheDocument();
    expect(screen.getByText("PRICING")).toBeInTheDocument();
  });

  it("renders CMS links when passed as props", () => {
    const links = [
      { href: "/custom", label: "CUSTOM PAGE" },
      { href: "/another", label: "ANOTHER" },
    ];
    render(<Navbar links={links} />);
    expect(screen.getByText("CUSTOM PAGE")).toBeInTheDocument();
    expect(screen.getByText("ANOTHER")).toBeInTheDocument();
    expect(screen.queryByText("BLOG")).not.toBeInTheDocument();
  });

  it("shows custom CTA label and href", () => {
    render(<Navbar ctaLabel="BOOK NOW" ctaHref="/book" />);
    const ctaLinks = screen.getAllByText("BOOK NOW");
    expect(ctaLinks.length).toBeGreaterThan(0);
    // The desktop CTA link should have the correct href
    const desktopCta = ctaLinks.find(
      (el) => el.getAttribute("href") === "/book",
    );
    expect(desktopCta).toBeTruthy();
  });

  it("shows custom contact info in mobile menu", () => {
    render(
      <Navbar
        contactEmail="custom@test.com"
        phone="+1 (555) 000-1234"
      />,
    );
    // Open mobile menu
    const menuBtn = screen.getByLabelText("Menu");
    fireEvent.click(menuBtn);

    expect(screen.getByText(/custom@test.com/)).toBeInTheDocument();
    expect(
      screen.getByText(/\+1 \(555\) 000-1234/),
    ).toBeInTheDocument();
  });

  it("returns null when pathname starts with /admin", () => {
    mockUsePathname.mockReturnValue("/admin/collections");
    const { container } = render(<Navbar />);
    expect(container.innerHTML).toBe("");
  });

  it("shows logo image", () => {
    render(<Navbar />);
    expect(screen.getByAltText("Gigi's Concept")).toBeInTheDocument();
  });

  it("opens and closes mobile menu", () => {
    render(<Navbar />);
    const menuBtn = screen.getByLabelText("Menu");

    // Menu should not show contact info initially (mobile menu closed)
    expect(
      screen.queryByText(/hello@gigisconcept.com/),
    ).not.toBeInTheDocument();

    // Open mobile menu
    fireEvent.click(menuBtn);
    expect(
      screen.getByText(/hello@gigisconcept.com/),
    ).toBeInTheDocument();
  });
});
