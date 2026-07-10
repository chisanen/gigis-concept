import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { PopupManager } from "@/components/PopupManager";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

function createPopup(overrides = {}) {
  return {
    id: "popup-1",
    name: "Test Popup",
    heading: "Welcome!",
    body: "Get 20% off your first booking.",
    offerLabel: "LIMITED TIME",
    discountCode: "GIGI20",
    ctaLabel: "Book Now",
    ctaHref: "/contact",
    trigger: "onLoad" as const,
    frequency: "always" as const,
    isActive: true,
    ...overrides,
  };
}

// Create a simple in-memory localStorage mock
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    Object.keys(store).forEach((key) => delete store[key]);
  }),
  get length() {
    return Object.keys(store).length;
  },
  key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
};

describe("PopupManager", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
      configurable: true,
    });
    // Clear store between tests
    Object.keys(store).forEach((key) => delete store[key]);
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders nothing when no popups fetched", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ docs: [] }),
    } as Response);

    const { container } = render(<PopupManager />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(container.innerHTML).toBe("");
  });

  it("shows popup with trigger onLoad", async () => {
    const popup = createPopup();
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ docs: [popup] }),
    } as Response);

    render(<PopupManager />);

    // Flush the fetch promise then advance past the 500ms onLoad delay
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(screen.getByText("Welcome!")).toBeInTheDocument();
  });

  it("close button dismisses the popup", async () => {
    const popup = createPopup();
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ docs: [popup] }),
    } as Response);

    render(<PopupManager />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(screen.getByText("Welcome!")).toBeInTheDocument();

    const closeBtn = screen.getByLabelText("Close popup");
    fireEvent.click(closeBtn);

    expect(screen.queryByText("Welcome!")).not.toBeInTheDocument();
  });

  it("shows heading, body, and CTA", async () => {
    const popup = createPopup();
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ docs: [popup] }),
    } as Response);

    render(<PopupManager />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(
      screen.getByText("Get 20% off your first booking."),
    ).toBeInTheDocument();
    expect(screen.getByText("Book Now")).toBeInTheDocument();

    const ctaLink = screen.getByText("Book Now");
    expect(ctaLink).toHaveAttribute("href", "/contact");
  });

  it("shows offer label badge", async () => {
    const popup = createPopup({ offerLabel: "SPECIAL OFFER" });
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ docs: [popup] }),
    } as Response);

    render(<PopupManager />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(screen.getByText("SPECIAL OFFER")).toBeInTheDocument();
  });

  it("shows discount code", async () => {
    const popup = createPopup({ discountCode: "SAVE50" });
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ docs: [popup] }),
    } as Response);

    render(<PopupManager />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(screen.getByText("SAVE50")).toBeInTheDocument();
    expect(screen.getByText("Your code")).toBeInTheDocument();
  });

  it("renders nothing when fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("Network error"),
    );

    const { container } = render(<PopupManager />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(container.innerHTML).toBe("");
  });
});
