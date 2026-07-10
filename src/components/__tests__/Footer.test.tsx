import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Footer } from "@/components/Footer";

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

describe("Footer", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders default links when no props", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Build Your Quote")).toBeInTheDocument();
    expect(screen.getByText("Inquire")).toBeInTheDocument();
  });

  it("renders CMS links when passed as props", () => {
    const links = [
      { href: "/custom", label: "Custom Link" },
      { href: "/faq", label: "FAQ" },
    ];
    render(<Footer links={links} />);
    expect(screen.getByText("Custom Link")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.queryByText("Build Your Quote")).not.toBeInTheDocument();
  });

  it("shows custom contact email", () => {
    render(<Footer contactEmail="support@example.com" />);
    expect(screen.getByText("support@example.com")).toBeInTheDocument();
  });

  it("shows custom tagline", () => {
    render(<Footer tagline="Best photo booth ever." />);
    expect(
      screen.getByText("Best photo booth ever."),
    ).toBeInTheDocument();
  });

  it("returns null when pathname starts with /admin", () => {
    mockUsePathname.mockReturnValue("/admin/dashboard");
    const { container } = render(<Footer />);
    expect(container.innerHTML).toBe("");
  });

  it("shows copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`${year}.*Gigi`)),
    ).toBeInTheDocument();
  });

  it("shows social media links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("TikTok")).toBeInTheDocument();
  });

  it("shows default tagline when no tagline prop", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        /Editorial content and a timeless photo-booth experience/,
      ),
    ).toBeInTheDocument();
  });
});
