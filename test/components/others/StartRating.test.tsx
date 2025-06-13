import StarRating from "@/components/others/StarRating";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("StarRating", () => {
  it("should render rating value and count by default", () => {
    render(<StarRating rate={4.2} count={1234} />);

    expect(screen.getByText("4.2")).toBeInTheDocument();
    expect(screen.getByText("(1.2K)")).toBeInTheDocument();
  });

  it("should render correct number of stars", () => {
    render(<StarRating rate={3.5} count={100} />);
    const stars = screen
      .getAllByRole("img")[0]
      .querySelectorAll(".relative.size-5");

    expect(stars.length).toBe(5);
  });

  it("should render only stars if justStar is true", () => {
    render(<StarRating rate={5} count={9000} justStar={true} />);

    expect(screen.queryByText("5.0")).not.toBeInTheDocument();
    expect(screen.queryByText("(9K)")).not.toBeInTheDocument();
  });

  it("should not render anything if max is 0", () => {
    const { container } = render(<StarRating rate={5} count={100} max={0} />);

    expect(container.firstChild).toBeNull();
  });

  it("should include correct aria-label for accessibility", () => {
    render(<StarRating rate={4.8} count={666} />);
    const wrapper = screen.getByRole("img", { name: /rating: 4.8 out of 5/i });

    expect(wrapper).toBeInTheDocument();
  });
});
