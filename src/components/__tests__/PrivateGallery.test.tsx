import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PrivateGallery } from "@/components/PrivateGallery";

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

describe("PrivateGallery", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows password form initially", () => {
    render(<PrivateGallery />);
    expect(
      screen.getByPlaceholderText("Enter your gallery password"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ACCESS GALLERY" }),
    ).toBeInTheDocument();
  });

  it("shows error when submitting empty password", async () => {
    const user = userEvent.setup();
    render(<PrivateGallery />);

    const submitBtn = screen.getByRole("button", {
      name: "ACCESS GALLERY",
    });
    await user.click(submitBtn);

    expect(
      screen.getByText("Please enter your gallery password."),
    ).toBeInTheDocument();
  });

  it("shows 'Invalid password' error on 401 response", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({}),
    } as Response);

    render(<PrivateGallery />);

    const input = screen.getByPlaceholderText(
      "Enter your gallery password",
    );
    await user.type(input, "wrongpassword");

    const submitBtn = screen.getByRole("button", {
      name: "ACCESS GALLERY",
    });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Invalid password. Please try again."),
      ).toBeInTheDocument();
    });
  });

  it("shows unlocked gallery on 200 response with images", async () => {
    const user = userEvent.setup();
    const mockImages = [
      { src: "/img1.jpg", alt: "Photo 1" },
      { src: "/img2.jpg", alt: "Photo 2" },
      { src: "/img3.jpg", alt: "Photo 3" },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        collectionName: "Wedding Collection",
        images: mockImages,
      }),
    } as Response);

    render(<PrivateGallery />);

    const input = screen.getByPlaceholderText(
      "Enter your gallery password",
    );
    await user.type(input, "correct-password");

    const submitBtn = screen.getByRole("button", {
      name: "ACCESS GALLERY",
    });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Wedding Collection"),
      ).toBeInTheDocument();
    });

    expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    expect(screen.getByAltText("Photo 3")).toBeInTheDocument();
    expect(screen.getByText(/3 photos and videos/)).toBeInTheDocument();
  });

  it("'ENTER ANOTHER CODE' button resets to form", async () => {
    const user = userEvent.setup();
    const mockImages = [
      { src: "/img1.jpg", alt: "Photo 1" },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        collectionName: "Event Photos",
        images: mockImages,
      }),
    } as Response);

    render(<PrivateGallery />);

    const input = screen.getByPlaceholderText(
      "Enter your gallery password",
    );
    await user.type(input, "mypassword");

    const submitBtn = screen.getByRole("button", {
      name: "ACCESS GALLERY",
    });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Event Photos")).toBeInTheDocument();
    });

    const resetBtn = screen.getByRole("button", {
      name: "ENTER ANOTHER CODE",
    });
    await user.click(resetBtn);

    // Should be back to the password form
    expect(
      screen.getByPlaceholderText("Enter your gallery password"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ACCESS GALLERY" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Event Photos"),
    ).not.toBeInTheDocument();
  });

  it("shows generic error on non-401 failure", async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    render(<PrivateGallery />);

    const input = screen.getByPlaceholderText(
      "Enter your gallery password",
    );
    await user.type(input, "somepassword");

    const submitBtn = screen.getByRole("button", {
      name: "ACCESS GALLERY",
    });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again."),
      ).toBeInTheDocument();
    });
  });
});
