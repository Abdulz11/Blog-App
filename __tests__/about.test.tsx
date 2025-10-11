import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import About from "../src/app/about/page";

describe("About", () => {
  it("renders a heading", () => {
    render(<About />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /Unleash your creativity, share your voice/i,
    });
    const heroImage = screen.getByAltText("hero-image");
    expect(heading).toBeInTheDocument();
    expect(heroImage).toBeInTheDocument();
  });
});
