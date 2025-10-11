import Blogs from "@/app/blog/page";
import { render, screen } from "@testing-library/react";

test("inputs and image rendered on screen", () => {
  render(<Blogs />);
  screen.debug();
});
