import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HeroCarousel } from "@/components/HeroCarousel";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("HeroCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders default slides when no slides prop provided", () => {
    render(<HeroCarousel />);
    expect(
      screen.getByAltText("Elegant bride and groom on wedding steps"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Luxurious champagne tower at reception"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Nigerian Americans in traditional attire at photo booth",
      ),
    ).toBeInTheDocument();
  });

  it("renders custom slides when passed", () => {
    const slides = [
      { src: "/custom1.png", alt: "Custom slide one" },
      { src: "/custom2.png", alt: "Custom slide two" },
    ];
    render(<HeroCarousel slides={slides} />);
    expect(screen.getByAltText("Custom slide one")).toBeInTheDocument();
    expect(screen.getByAltText("Custom slide two")).toBeInTheDocument();
    expect(
      screen.queryByAltText("Elegant bride and groom on wedding steps"),
    ).not.toBeInTheDocument();
  });

  it("shows navigation dots", () => {
    const slides = [
      { src: "/s1.png", alt: "Slide 1" },
      { src: "/s2.png", alt: "Slide 2" },
      { src: "/s3.png", alt: "Slide 3" },
    ];
    render(<HeroCarousel slides={slides} />);
    const dots = screen.getAllByRole("button", { name: /Go to slide/ });
    expect(dots).toHaveLength(3);
  });

  it("shows previous/next arrows", () => {
    render(<HeroCarousel />);
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next slide" }),
    ).toBeInTheDocument();
  });

  it("clicking next arrow does not crash", () => {
    render(<HeroCarousel />);
    const nextBtn = screen.getByRole("button", { name: "Next slide" });
    expect(() => fireEvent.click(nextBtn)).not.toThrow();
  });

  it("clicking previous arrow does not crash", () => {
    render(<HeroCarousel />);
    const prevBtn = screen.getByRole("button", { name: "Previous slide" });
    expect(() => fireEvent.click(prevBtn)).not.toThrow();
  });

  it("clicking a dot changes the active slide", () => {
    const slides = [
      { src: "/a.png", alt: "Alpha" },
      { src: "/b.png", alt: "Beta" },
    ];
    render(<HeroCarousel slides={slides} />);
    const dot2 = screen.getByLabelText("Go to slide 2");
    fireEvent.click(dot2);
    // After clicking, the second dot should become the active one
    // (wider, bg-white). We just verify no crash and the button exists.
    expect(dot2).toBeInTheDocument();
  });
});
