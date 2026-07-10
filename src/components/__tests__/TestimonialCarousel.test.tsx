import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

describe("TestimonialCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders fallback testimonials when no props provided", () => {
    render(<TestimonialCarousel />);
    expect(
      screen.getByText(/The photo booth was the highlight/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Latoya E./)).toBeInTheDocument();
    expect(
      screen.getByText(/60th Birthday Celebration/),
    ).toBeInTheDocument();
  });

  it("renders custom testimonials when passed as props", () => {
    const custom = [
      { quote: "Amazing experience!", author: "Jane D.", event: "Wedding" },
      { quote: "Loved it!", author: "John S.", event: "Birthday" },
    ];
    render(<TestimonialCarousel testimonials={custom} />);
    expect(screen.getByText("Amazing experience!")).toBeInTheDocument();
    expect(screen.getByText(/Jane D./)).toBeInTheDocument();
    expect(screen.getByText(/Wedding/)).toBeInTheDocument();
  });

  it("shows dot navigation with correct count", () => {
    const custom = [
      { quote: "Quote 1", author: "A1", event: "E1" },
      { quote: "Quote 2", author: "A2", event: "E2" },
      { quote: "Quote 3", author: "A3", event: "E3" },
    ];
    render(<TestimonialCarousel testimonials={custom} />);
    const dots = screen.getAllByRole("button", {
      name: /Go to testimonial/,
    });
    expect(dots).toHaveLength(3);
  });

  it("clicking a dot changes the displayed testimonial", async () => {
    vi.useRealTimers();
    const custom = [
      { quote: "First quote", author: "Author1", event: "Event1" },
      { quote: "Second quote", author: "Author2", event: "Event2" },
    ];
    render(<TestimonialCarousel testimonials={custom} />);

    expect(screen.getByText("First quote")).toBeInTheDocument();

    const dot2 = screen.getByLabelText("Go to testimonial 2");
    fireEvent.click(dot2);

    await waitFor(() => {
      expect(screen.getByText("Second quote")).toBeInTheDocument();
    });
  });

  it("does not render dots when only one testimonial", () => {
    const single = [
      { quote: "Only one", author: "Solo", event: "Event" },
    ];
    render(<TestimonialCarousel testimonials={single} />);
    expect(
      screen.queryByRole("button", { name: /Go to testimonial/ }),
    ).not.toBeInTheDocument();
  });
});
